import Routes from './routes';
import AppProvider from '../../modules/character/hooks/context';

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
