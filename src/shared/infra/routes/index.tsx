import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const CharacterHome = lazy(
  () => import('../../../modules/character/pages/Home'),
);
const CharacterDateils = lazy(
  () => import('../../../modules/character/pages/Character'),
);
const Page404 = lazy(() => import('../../pages/404'));

const Routes = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback="carregando...">
        <Route path="/" exact component={CharacterHome} />
        <Route path="/character/:id" component={CharacterDateils} />
        <Route path="*" component={Page404} />
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default Routes;
