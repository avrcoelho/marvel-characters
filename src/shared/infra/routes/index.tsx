import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={() => <h1>Hello world</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
