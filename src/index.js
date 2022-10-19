import 'core-js';
import 'regenerator-runtime/runtime';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { store, history} from './store';
// import config from './config';
// import analyticsServices from './services/analytics.services';
// import { I18nextProvider } from 'react-i18next';

// import i18n from './config/i18n';
import i18next from 'i18next';
import App from './containers/App';

i18next.init({
  interpolation: { escapeValue: false },
});

// function uncaughtErrorHandler(message, source, lineno, colno, error) {
//   try {
//     analyticsServices.reportError({
//       message,
//       source,
//       lineno,
//       colno,
//       error: _.split(error.stack, '\n'),
//     }).catch(() => {});
//   } catch (e) {
//     console.log('error in uncaughtErrorHandler', error);
//   }
// }
// window.onerror = uncaughtErrorHandler;

ReactDOM.render((
  // <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
      </ConnectedRouter>
    </Provider>
  // </I18nextProvider>

), document.getElementById('root'));
