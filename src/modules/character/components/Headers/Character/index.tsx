import { Container } from './styles';
import { ReactComponent as Logo } from '../../../../../assets/svgs/logo.svg';

const Header = (): JSX.Element => (
  <Container>
    <div className="content">
      <div className="logo-container">
        <Logo />
      </div>
    </div>
  </Container>
);

export default Header;
