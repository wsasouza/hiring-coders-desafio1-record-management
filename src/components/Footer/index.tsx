import { GoMarkGithub } from "react-icons/go";
import { MdCopyright } from "react-icons/md";
import { Container } from './styles';

const Footer = (): JSX.Element => {

  return (
    <Container>
      <MdCopyright size={20} />
      <span>Todos os direitos reservados | Desenvolvido por </span>
      <a href="https://github.com/wsasouza/hiring-coders-desafio2-record-management">
        <span>wsasouza@hotmail.com</span>
        <GoMarkGithub size={20}/>
      </a>      
    </Container>
  );

}

export default Footer;