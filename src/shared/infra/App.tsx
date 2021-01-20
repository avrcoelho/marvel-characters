import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import AppProvider from '../../modules/character/hooks/context';
import GlobalStyles from '../../assets/styles/Global';
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <AppProvider>
        <Routes />
        <ToastContainer autoClose={3000} />
      </AppProvider>
    </>
  );
};

export default App;
