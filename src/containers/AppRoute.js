import React from 'react';
import { Route, Redirect }  from 'react-router';

import AuthenticationService from '../services/authentication';
import { BlankLayout } from './Layouts/BlankLayout';
let auth = true;
const AppRoute = ({
  component: Component,
  layout: Layout = BlankLayout,
  auth: auth = true, ...rest
}) => {
  // return <Route {...rest} render={(props) => (
  //   (!auth || (auth && AuthenticationService.isAuthenticated() === true))
  //     ? <Layout className='layout-wrapper'><Component {...props} /></Layout>
  //     : <Redirect to='/login' />
  // )} />

    return <Route {...rest} render={(props) => (
    (!auth || (auth === true))
      ? <Layout className='layout-wrapper'><Component {...props} /></Layout>
      : <Redirect to='/login' />
  )} />
}
export default AppRoute;