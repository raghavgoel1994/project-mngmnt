import React, { useEffect, useRef } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { compose } from 'redux';
import { ProductPage } from '../containers/ProductPage';

export const routes = [
  {
    path: '/',
    component: ProductPage,
    exact: true,
  },
  {
    path: '/project',
    component: ProductPage,
    exact: true,
  },
];

function Router(props) {
  const { location } = props;

  return (
    <React.Fragment>
      <Switch>
        {routes.map(r => (
          <Route
            {...props}
            path={r.path}
            component={r.component}
            key={r.path}
            exact={r.exact}
          />
        ))}
      </Switch>
    </React.Fragment>
  );
}

export default compose(withRouter)(Router);
