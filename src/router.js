import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './routes/App';
import D1 from './routes/d1';
import D2 from './routes/d2';
import Explain from '@/pages/Explain'
const routerList = [
  {
    component: Explain,
    path: '/d1'
  },
  {
    component: D2,
    path: '/d2'
  }
]

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={({ match }) => {
          return (
            <App>
              <>
                <Route exact path={match.url} component={Explain} />
                {routerList.map(item => (
                  <Route
                    path={item.path}
                    component={item.component}
                  />
                ))}
              </>
            </App>
          )
        }} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
