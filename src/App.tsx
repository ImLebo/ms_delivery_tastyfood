import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENTE_ID = "828480505438-lfssskehmilcnc0fv3q9hrjls1v1oh5m.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENTE_ID}>
      <Router>
        <div className="app">
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              {routes.map((route, index) => {
                // Ruta padre (puede tener children)
                return (
                  <Route
                    key={index}
                    path={route.path}
                    Component={route.component} // Usamos element directamente
                  >
                    {/* Mapeamos los hijos si existen */}
                    {route.children?.map((child, childIndex) => (
                      <Route
                        key={`${index}-${childIndex}`}
                        path={child.path}
                        Component={child.component}
                      />
                    ))}
                  </Route>
                );
              })}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;