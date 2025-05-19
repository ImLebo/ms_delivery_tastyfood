import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENTE_ID = "828480505438-lfssskehmilcnc0fv3q9hrjls1v1oh5m.apps.googleusercontent.com"

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENTE_ID}>
      <Router>
        <div className="app">
          <Routes>
            {routes.map((routes, index) => {
              const {path, component: Component} = routes;
              return(
              <Route
                key={index}
                path={path}
                element={
                  <Component></Component>
                }
              >

              </Route>);
            })}
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
