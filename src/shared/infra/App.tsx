import Routes from './routes';
import AppProvider from '../../modules/character/hooks/context';
import GlobalStyles from '../../assets/styles/Global';

const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
