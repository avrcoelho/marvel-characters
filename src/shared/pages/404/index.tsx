import { ReactComponent as Logo } from '../../../assets/svgs/logo.svg';
import { Container } from './styles';

const Page404 = (): JSX.Element => (
  <Container>
    <div className="logo-container">
      <Logo />
    </div>

    <h1>404</h1>
  </Container>
);

export default Page404;
