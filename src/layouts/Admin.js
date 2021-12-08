import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import { Link, useHistory } from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import IdleTimer from 'react-idle-timer';

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
import Users from '../pages/users/Users.js'
import Roles from '../pages/roles/Roles.js'
import Companies from '../pages/companies/Companies'
import Vendors from '../pages/vendors/Vendors'
import Portal from '../pages/catalogs/portal/Portal'
import Sat from '../pages/catalogs/sat/Sat'
import Carga from "../pages/carga/Carga.js"
import CargaXML from "../pages/carga/CargaXML"
import CompaniesVendors from "../pages/companies-vendors/CompaniesVendors"

function Admin(props) {
    const [isEmptyView, setIsEmptyView] = useState(false)
    const [layout, setLayout] = useState('default-sidebar-1')
    const [navbar, setNavbar] = useState("light")
    const [logo, setLogo] = useState("info")
    const [leftSidebar, setLeftSidebar] = useState("dark")

    const ambiente = "/DEV-Vendors"
    const history = useHistory();

    const logged = localStorage.getItem("Logged");
    //const role = localStorage.getItem("Id_Role");
    const role = localStorage.getItem("Id_Role");
    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    //GUARDAR EL ESTADO PARA LAS RUTAS
    const [dbRoutes, setDbRoutes] = useState([]);

    //GUARDAR EL ESTADO PARA LAS RUTAS QUE NO VAN EN EL SIDEBAR
    const [dbRoutesS, setDbRoutesS] = useState([]);

    //Para mostrar una alerta al actualizar o insertar registro
    const [alert, setAlert] = React.useState(null);

    //Para el cierre de sesión cuando no hay actividad
    const [timeout, setTimeout] = useState(1800000); //despues de media hora se cierra la sesión
    const [showModal, setShowModal] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isTimedOut, setIsTimedOut] = useState(false);
    const [idleTimer, setIdleTimer] = useState(false);

    const [pathFile, setPathFile] = useState("");

    //Para actualizar la imagen automaticamente cada que la actualicemos
    const [changeImageP, setChangeImageP] = useState(false)
    
    function _onAction(e) {
      //console.log('user did something', e)
      setIsTimedOut(false)
    }
    
    function _onActive(e) {
      //console.log('user is active', e)
      setIsTimedOut(false)
    }
    
    function _onIdle(e) {
      localStorage.setItem("Logged", false);
      localStorage.removeItem("User");
      localStorage.removeItem("Id_Role");
      localStorage.removeItem("Id_Customer");
      localStorage.removeItem("Token");
      history.push(ambiente + "/auth/login")
    }

    useEffect(() => {
      //Si el usuario no ha iniciado sesión que se le redirija al login
      if(logged !== "true")
      {
        history.push(ambiente + "/auth/login");
      }
    }, []);

    useEffect(() => {

      //estos parametros se van a tomar del local storage o del usecontext
      const params = {
        pvOptionCRUD: "R",
        pvIdRole : role
      };
  
      var url = new URL(`http://129.159.99.152/develop-vendors/api/security-access/`);
  
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      //console.log(url)
  
      fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
      })
      .then(function(response) {
          return response.ok ? response.json() : Promise.reject();
      })
      .then(function(data) {

        if(data.mensaje === 'Token inválida')
        {
          localStorage.setItem("Logged", false);
          localStorage.removeItem("User");
          localStorage.removeItem("Id_Role");
          localStorage.removeItem("Id_Customer");
          localStorage.removeItem("Token");
          history.push(ambiente + "/auth/login")
        }
        else{
          console.log(data)
          var routesAux = [];

          /*if(role == "ADMIN")
          {
            routesAux.push(
              {
                collapse: false,
                path: "dashboard",
                name: "Dashboard",
                icon: 'dashboard',
                component: Analytics,
                layout: ambiente + "/admin",
                views: []
              }
            )
          }*/
         
          for(var i=0; i<data.length; i++)
          {
            if(data[i].Status === true)
            {
              //console.log(data[i])
              if(data[i].Component_Module!=="")
              {
                if(data[i].Component_Module === "DashboardAdmin")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: "dashboard",
                      component: Analytics,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else if(data[i].Component_Module === "DashboardSoporte")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: String(data[i].Icon),
                      component: Analytics,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else{
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: String(data[i].Icon),
                      component: Analytics,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
              }
              else{
                //El componente es padre pero collapse
                if(data[i-1].Module_Desc !== data[i].Module_Desc)
                {
                  var views = []
                  if(data[i].Component_Submodule === "GeneralParameters")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: Analytics,
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "Roles")
                  {
                      views.push(
                        {
                          path: data[i].Url,
                          name: data[i].SubModule_Desc,
                          component: "Roles",
                          layout: ambiente + data[i].Layout_SubModule,
                          views: []
                        }
                      )
                  }
                  else if(data[i].Component_Submodule === "Users")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "Users",
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "Companies")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "Companies",
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "Vendors")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: Analytics,
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "CartaPorte")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "CartaPorte",
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "PortalCatalogs")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "PortalCatalogs",
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "SATCatalogs")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "SATCatalogs",
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  else if(data[i].Component_Submodule === "CompaniesVendors")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "CompaniesVendors",
                        layout: ambiente + data[i].Layout_SubModule,
                        views: []
                      }
                    )
                  }
                  var j= i+1;
                  while(j<data.length)
                  {
                    //Este ciclo se utiliza para meter a los demás hijos (cuando un padre tiene más de 1 hijo)
                    if(data[i].Id_Module === data[j].Id_Module && data[j].Status === true)
                    {
                      if(data[j].Component_Submodule === "GeneralParameters")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: Analytics,
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "Roles")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "Roles",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "Users")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "Users",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "Companies")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "Companies",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "Vendors")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "Vendors",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "CartaPorte")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: Analytics,
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "PortalCatalogs")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: Analytics,
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "SATCatalogs")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "SATCatalogs",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "CompaniesVendors")
                      {
                        console.log("estoy dentro")
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "CompaniesVendors",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                    }
                    j++
                  }
                  //Ya cuando se terminan de meter a los hijos agregamos la ruta
                  //var iconn = String(data[i].Icon.toString())
                  var iconn = String(data[i].Icon.toString())
                  //var ultimo = routesAux.length
                  //console.log(routesAux.length)
                  //console.log(routesAux[ultimo-1])
                  //console.log(data[i])
                  //if(routesAux[ultimo-1].name !== data[i].Module_Desc)
                  //{
                    routesAux.push(
                      {
                        collapse: true,
                        name: data[i].Module_Desc,
                        icon: iconn,
                        state: data[i].Module_Desc,
                        views: views,
                      }
                    )
                  //}
                }
              }
            }
          }


          
         
          //Agregar rutas solo para roles en específico
          //Se van a agregar en otro arreglo de rutas
          var routesAux2 = [];
          if(params.pvIdRole == "ADMIN" || params.pvIdRole == "SYSADMIN")
          {
            routesAux2.push(
              {
                collapse: false,
                path: "/xml-tree/:uUID/",
                name: "Árbol XML",
                icon: 'dashboard',
                component: "CargaXML",
                layout: ambiente + "/admin",
                views: []
              }
            )
          }

          //FINALIZAMOS RUTAS PARA EL MENU
          setDbRoutes([
            {
              collapse: true,
              name: 'GTC Portal Proveedores',
              views: routesAux
            }
          ])

          setDbRoutesS([
            {
              collapse: true,
              name: 'GTC Portal Proveedores',
              views: routesAux2
            }
          ])
        }
      })
      .catch(function(err) {
          console.log(err)
      });
    }, []);

    useEffect(() => {
      //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
      const params = {
        pvOptionCRUD: "R"
      };
    
      var url = new URL(`http://129.159.99.152/develop-vendors/api/general-parameters/`);
    
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
      fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
      })
      .then(function(response) {
          return response.ok ? response.json() : Promise.reject();
      })
      .then(function(data) {
          var aux = data.find( o => o.Id_Catalog === 9 )
          setPathFile(aux.Value)
      })
      .catch(function(err) {
          console.log(err)
      });
    }, []);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
          if (prop.collapse) {
            return getRoutes(prop.views);
          }
          if (prop.layout === ambiente + "/admin") {
            if(prop.component === "Users")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Users autoCloseAlert = {autoCloseAlert} changeImageP = {changeImageP} setChangeImageP = {setChangeImageP}/>
                </Route>
              );
            }
            else if(prop.component === "Roles")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Roles autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "Companies")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Companies autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "Vendors")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Vendors autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "CompaniesVendors")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <CompaniesVendors autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "PortalCatalogs")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Portal autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "SATCatalogs")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Sat autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "CartaPorte")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <Carga autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "CargaXML")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <CargaXML pathFile = {pathFile}/>
                </Route>
              );
            }
            else{
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            }
          } else {
            return null;
          }
        });
    };

    React.useEffect(() => {
      return function cleanup() {
        var id = window.setTimeout(null, 0);
        while (id--) {
          window.clearTimeout(id);
        }
      };
    }, []);
  
    const autoCloseAlert = (mensaje) => {
        setAlert(
            <ReactBSAlert
                style={{ display: "block", display: "flex", justifyContent: "center", alignItems: "center" }}
                title="Mensaje"
                onConfirm={() => hideAlert()}
                showConfirm={false}
                >
            {mensaje}
            </ReactBSAlert>
        );
        window.setTimeout(()=>{
          hideAlert()
        },3000)
    };
  
    const hideAlert = () => {
        setAlert(null);
    };

    return (
        <div
            data-layout={layout}
           
            data-logo={logo}
            data-left-sidebar={leftSidebar}
        >
            <IdleTimer
              ref={ref => { setIdleTimer(ref) }}
              element={document}
              onActive={_onActive}
              onIdle={_onIdle}
              onAction={_onAction}
              debounce={250}
              timeout={timeout} 
            />

            {alert}
            <Navbar1 layout = {layout} setLayout = {setLayout} changeImageP = {changeImageP}/>
            <div className={isEmptyView ? '' : 'container-fluid'}>
                <div className={isEmptyView ? '' : 'row'}>
                    <LeftSidebar navigation = {dbRoutes}/>
                    <div className="col main">
                        {/*<Jumbotron />*/}
                        <Switch>
                          {getRoutes(dbRoutes)}
                          {getRoutes(dbRoutesS)}
                        </Switch>
                        {/*<Routes />*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
