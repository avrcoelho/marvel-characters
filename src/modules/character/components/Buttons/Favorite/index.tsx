import { ButtonHTMLAttributes } from 'react';

import { ReactComponent as Hearth } from '../../../../../assets/svgs/hearth-sm.svg';
import { ReactComponent as HearthBorder } from '../../../../../assets/svgs/hearth-border-sm.svg';
import { Container } from './styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { isFavorite: boolean };

const Favorite = ({ isFavorite, ...rest }: Props): JSX.Element => (
  <Container type="button" {...rest}>
    {isFavorite ? (
      <Hearth data-testid="hearth" />
    ) : (
      <HearthBorder data-testid="hearth-border" />
    )}
  </Container>
);

export default Favorite;
