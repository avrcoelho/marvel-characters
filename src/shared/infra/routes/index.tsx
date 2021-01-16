import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const HeroHome = lazy(() => import('../../../modules/character/pages/Home'));

const Routes = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback="carregando...">
        <Route path="/" exact component={HeroHome} />
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default Routes;
