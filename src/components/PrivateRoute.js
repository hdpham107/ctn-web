import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import AuthenticationService from '../services/authentication';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthenticationService.isAuthenticated() === true
      ? <Layout><Component {...props} /></Layout>
      : <Redirect to='/login' />
  )} />
)
export default PrivateRoute;