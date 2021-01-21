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
    <Suspense fallback="carregando...">
      <Switch>
        <Route path="/" exact component={CharacterHome} />
        <Route path="/character/:id" exact component={CharacterDateils} />
        <Route component={Page404} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Routes;
