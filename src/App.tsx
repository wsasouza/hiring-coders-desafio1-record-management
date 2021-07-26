import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import Footer from './components/Footer';
import AppProvider from './hooks';
import { CartProvider } from './hooks/useCart';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppProvider>
       <CartProvider>
         <GlobalStyles />
         <Header />
         <Routes /> 
         <Footer />      
       </CartProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;