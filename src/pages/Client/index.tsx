import { useCallback, useRef } from "react";
import { MdPersonOutline, 
         MdEmail, 
         MdAssignmentInd,
         MdSearch,
         MdLocationCity,
         MdTextFields,
         MdAddBox,
         MdLooksOne,
         MdDomain,
         MdPlace } from "react-icons/md";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { validateCPF, validateCep } from "validations-br";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../util/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, PersonalData, AddressData } from "./styles";
import axios from "axios";

interface ClientFormData {
  name: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  state: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ClientFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório!"),
          email: Yup.string()
            .required("E-mail é obrigatório")
            .email("E-mail inválido"),
          cpf: Yup.string()
            .required("CPF é obrigatório")
            .test("is-cpf", "CPF não é válido", () => validateCPF(data.cpf)),
          cep: Yup.string()
            .required("CEP é obrigatório")
            .test("is-cep", "CEP não é válido", () => validateCep(data.cep)),
          street: Yup.string().required("Logradouro é obrigatório"),
          number: Yup.number()
            .positive("O número deve ser positivo")
            .integer("O número deve ser inteiro")
            .required("Número é obrigatório"),
          complement: Yup.string(),
          district: Yup.string().required("Bairro é obrigatório!"),
          city: Yup.string().required("Cidade é obrigatório!"),
          state: Yup.string().required("Estado é obrigatório!"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        localStorage.setItem("@GamersWorld:client", JSON.stringify(data));

        history.push("/");

        addToast({
          type: "success",
          title: "Compra realizada com sucesso!",
          description:
            "Você vai receber um e-mail de confirmação em instantes.",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: "error",
          title: "Erro ao confirmar a compra",
          description:
            "Ocorreu em erro na confirmação de compra, tente novamente",
        });
      }
    },
    [addToast, history]
  );

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cep = e.target.value;

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

    if (formRef.current !== null) {
      formRef.current.setFieldValue("street", response.data.logradouro);
      formRef.current.setFieldValue("district", response.data.bairro);
      formRef.current.setFieldValue("city", response.data.localidade);
      formRef.current.setFieldValue("state", response.data.uf);
    }
  }

  return (
    <>
      <Container>
        
          <Form ref={formRef} onSubmit={handleSubmit}>            

            <PersonalData>
              <legend>Dados Pessoais</legend>
              <Input name="name" icon={MdPersonOutline} placeholder="Nome" />
              <div className="form-user-data">
                <Input name="email" icon={MdEmail} placeholder="E-mail" />
                <Input name="cpf" icon={MdAssignmentInd} placeholder="CPF" />
              </div>
            </PersonalData>

            <AddressData>
              <legend>Endereço</legend>
              <Input
                name="cep"
                icon={MdSearch}
                onBlur={handleCepChange}
                placeholder="CEP: 99999-999"
              />
              <Input name="street" icon={MdLocationCity} placeholder="Logradouro" />
              <Input name="number" icon={MdLooksOne} placeholder="Número" />
              <Input
                name="complement"
                icon={MdAddBox}
                placeholder="Complemento"
              />
              <Input name="district" icon={MdTextFields} placeholder="Bairro" />
              <Input name="city" icon={MdDomain} placeholder="Cidade" />
              <Input name="state" icon={MdPlace} placeholder="Estado" />
            </AddressData>

            <Button type="submit">FINALIZAR</Button>
          </Form>
        
      </Container>
    </>
  );
};

export default Profile;