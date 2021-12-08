import React from "react";
import { useState, useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import { Route, Switch } from "react-router-dom";
import Login from '../pages/login/Login.js'
import ChangePassword from '../pages/change-password/ChangePassword'

function Pages() {
    const [dbRoutes, setDbRoutes] = useState([]);
    const [isEmptyView, setIsEmptyView] = useState(true)
    const ambiente = "/DEV-Vendors"
    const [layout, setLayout] = useState('empty-view-1')
    useEffect(() => {
        var routesAux = [];
        //Agregando las rutas del auth
        
        routesAux.push(
          {
            invisible: true,
            path: "/login/",
            name: "Login",
            icon: "nc-icon nc-bank",
            component: Login,
            layout:  ambiente + "/auth",
          },
        )
        routesAux.push(
          {
            invisible: true,
            path: "/edit-password/",
            name: "Edit Password",
            icon: "nc-icon nc-bank",
            component: ChangePassword,
            layout:  ambiente + "/auth",
          },
        )
        setDbRoutes(routesAux)
    }, []);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
          if (prop.collapse) {
            return getRoutes(prop.views);
          }
          if (prop.layout === ambiente + "/auth") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
    };
  
    return (
      <div className="login-page">
        <div
          data-layout={layout}
          data-background="light"
          data-navbar="light"
          data-top-navigation="light"
          data-logo="info"
          data-left-sidebar="dark"
          data-collapsed="false"
        
        >
          <div className={isEmptyView ? '' : 'container-fluid'}>
              <div className={isEmptyView ? '' : 'row'}>
                  <div className="col main">
                      {/*<Jumbotron />*/}
                      <Switch>{getRoutes(dbRoutes)}</Switch>
                      {/*<Routes />*/}
                  </div>
              </div>
          </div>
          
        </div>
      </div>  
    );
}

export default Pages;
