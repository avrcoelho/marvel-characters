import { CharacterProvider } from './character';

const AppProvider: React.FC = ({ children }) => (
  <CharacterProvider>{children}</CharacterProvider>
);

export default AppProvider;
