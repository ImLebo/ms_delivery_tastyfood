import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {


  return (
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
  );
}

export default App;
