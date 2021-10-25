import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows

//global css
import '../css/bootstrap/bootstrap.css'
import '../css/main.css'

//structural elements
import LeftSidebar from '../elements/left-sidebar/LeftSidebar'
import Navbar1 from '../elements/navbar-1/Navbar1.js'
import Navbar2 from '../elements/navbar-2/Navbar2.js'
import TopNavigation1 from '../elements/top-navigation-1/TopNavigation1.js'
import Jumbotron from '../elements/jumbotron'
import Backdrops from '../elements/backdrops'
import Routes from '../Routes'
import Analytics from '../dashboards/analytics/Analytics.js'

import urls from "./navigation2"

function Admin(props) {
    const [isEmptyView, setIsEmptyView] = useState(false)
    const [layout, setLayout] = useState('default-sidebar-1')
    const [navbar, setNavbar] = useState("light")
    const [logo, setLogo] = useState("info")
    const [leftSidebar, setLeftSidebar] = useState("dark")

    useEffect(() => {
      //Si el usuario no ha iniciado sesión que se le redirija al login
      /*if(logged !== "true")
      {
        history.push(ambiente + "/auth/login");
      }*/
    }, []);

    const getRoutes = (routes) => {
      console.log(routes.length)
        return routes.map((prop, key) => {
          if (prop.collapse) {
            return getRoutes(prop.views);
          }
          if (prop.layout === "/admin") {
            console.log(prop)
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
        <div
            data-layout={layout}
           
            data-logo={logo}
            data-left-sidebar={leftSidebar}
        >
            <Navbar1 layout = {layout} setLayout = {setLayout}/>
            <div className={isEmptyView ? '' : 'container-fluid'}>
                <div className={isEmptyView ? '' : 'row'}>
                    <LeftSidebar navigation = {urls}/>
                    <div className="col main">
                        {/*<Jumbotron />*/}
                        <Switch>
                          {getRoutes(urls)}
                        </Switch>
                        {/*<Routes />*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
