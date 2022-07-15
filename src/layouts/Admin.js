import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import { Link, useHistory } from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import IdleTimer from 'react-idle-timer';
import axios from 'axios'

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
import CartaPorteRequests from "../pages/carga/CartaPorteRequests"
import CargaXML from "../pages/carga/CargaXML"
import CargaEvidencias from "../pages/carga/CargaEvidencias"
import CompaniesVendors from "../pages/companies-vendors/CompaniesVendors"
import GeneralParameters from "../pages/cat-general-parameters/GeneralParameters"
import Pool from "../pages/carga/Pool"
import VerEvidencias from "../pages/carga/VerEvidencias"
import InvoicesPools from "../pages/carga/InvoicesPools"
import DashboardAdmin from '../dashboards/admin'
import DashboardSysAdmin from '../dashboards/sysadmin'
import DashboardSalfreight from '../dashboards/salfreight'
import DashboardPurfreight from '../dashboards/purfreight'
import DashboardVendor from '../dashboards/vendor'
import DashboardAccPaya from '../dashboards/accpaya'
import DashboardAdobeSigner from '../dashboards/adobesigner'
import ExternalApplications from "../pages/applications/ExternalApplications"
import Accounts from "../pages/cat-accounts/Accounts"
import CartaPorteRequestsXML from "../pages/carga/CartaPorteRequestsXML"

import Cargando from "../assets/img/loading_icon.gif";

import {
  Row,
  Col,
} from "reactstrap";

function Admin(props) {
    const [isEmptyView, setIsEmptyView] = useState(false)
    const [layout, setLayout] = useState('default-sidebar-1')
    const [navbar, setNavbar] = useState("light")
    const [logo, setLogo] = useState("info")
    const [leftSidebar, setLeftSidebar] = useState("dark")

    const ambiente = process.env.REACT_APP_ENVIRONMENT
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

    //Para mostrar una alerta al Rechazar evidencias
    const [alert2, setAlert2] = React.useState(null);

    //Para mostrar una alerta al Crear Pool
    const [alert3, setAlert3] = React.useState(null);

    //Para el alert de cargando carga
    const [alert4, setAlert4] = React.useState(null);

    //Para mostrar una alerta al actualizar o insertar registro
    const [alert5, setAlert5] = React.useState(null);

    //Para el cierre de sesión cuando no hay actividad
    const [timeout, setTimeout] = useState(1800000); //despues de media hora se cierra la sesión
    const [showModal, setShowModal] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isTimedOut, setIsTimedOut] = useState(false);
    const [idleTimer, setIdleTimer] = useState(false);

    const [dataFind, setDataFind] = useState(true);

    const [pathFile, setPathFile] = useState("");

    //Para actualizar la imagen automaticamente cada que la actualicemos
    const [changeImageP, setChangeImageP] = useState(false)

    //Para los archivos que se tienen que subir en carga de evidencias
    const [trackerEProveedor, setTrackerEProveedor] = useState([]);

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = useState("");

    const getData = async () => {
      //const res = await axios.get('https://geolocation-db.com/json/')
      //setIP(res.data.IPv4)
  
      try{
          let response = await axios({
              method: 'get',
              url: "https://geolocation-db.com/json/",
              json: true
          })
          setIP(response.data.IPv4)
      } catch(err){
              return {
              mensaje: "Error al obtener IP",
              error: err
              }
      }
    }
  
    useEffect(() => {
        //Descargamos la IP del usuario
        getData()
    }, []);

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
  
      var url = new URL(`${process.env.REACT_APP_API_URI}security-access/`);
  
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
        //console.log(data)

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
         
          for(var i=0; i<data.length; i++)
          {
            if(data[i].Status === true)
            {
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
                      component: DashboardAdmin,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else if(data[i].Component_Module === "DashboardSalesFreight")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: "dashboard",
                      component: DashboardSalfreight,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else if(data[i].Component_Module === "DashboardSysAdmin")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: "dashboard",
                      component: DashboardSysAdmin,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else if(data[i].Component_Module === "DashboardPurchaseFreight")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: String(data[i].Icon),
                      component: DashboardPurfreight,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else if(data[i].Component_Module === "DashboardAP")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: String(data[i].Icon),
                      component: DashboardAccPaya,
                      layout: ambiente + data[i].Layout_Module,
                      views: []
                    }
                  )
                }
                else if(data[i].Component_Module === "DashboardASSigner")
                {
                  routesAux.push(
                    {
                      collapse: false,
                      path: data[i].Url,
                      name: data[i].Module_Desc,
                      icon: String(data[i].Icon),
                      component: DashboardAdobeSigner,
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
                      component: DashboardVendor,
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
                        component: "GeneralParameters",
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
                  else if(data[i].Component_Submodule === "Invoices")
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
                  else if(data[i].Component_Submodule === "CartaPorteRequests")
                  {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: "CartaPorteRequests",
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
                      else if(data[j].Component_Submodule === "Invoices")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "Invoices",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "CartaPorteRequests")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "CartaPorteRequests",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "InvoicesPools")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "InvoicesPools",
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
                      else if(data[j].Component_Submodule === "JDEAccounts")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "JDEAccounts",
                            layout: ambiente + data[j].Layout_SubModule,
                            views: []
                          }
                        )
                      }
                      else if(data[j].Component_Submodule === "ExternalApplications")
                      {
                        views.push(
                          {
                            path: data[j].Url,
                            name: data[j].SubModule_Desc,
                            component: "ExternalApplications",
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
          if(params.pvIdRole == "ADMIN" || params.pvIdRole == "SYSADMIN" || params.pvIdRole == "PURFREIGHT" || params.pvIdRole == "SALFREIGHT")
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

            routesAux2.push(
              {
                collapse: false,
                path: "/xml-tree-cp-requests/:requestNumber/",
                name: "Árbol XML Solicitud Carta Porte",
                icon: 'dashboard',
                component: "CartaPorteRequestsXML",
                layout: ambiente + "/admin",
                views: []
              }
            )

            routesAux2.push(
              {
                collapse: false,
                path: "/carga-evidencias/:uUID/",
                name: "Carga de Evidencias",
                icon: 'dashboard',
                component: "CargaEvidencias",
                layout: ambiente + "/admin",
                views: []
              }
            )
            routesAux2.push(
              {
                collapse: false,
                path: "/create-pool/",
                name: "Crear Pool",
                icon: 'dashboard',
                component: "Pool",
                layout: ambiente + "/admin",
                views: []
              }
            )
            routesAux2.push(
              {
                collapse: false,
                path: "/ver-evidencias/:uUID/",
                name: "Ver Evidencias",
                icon: 'dashboard',
                component: "VerEvidencias",
                layout: ambiente + "/admin",
                views: []
              }
            )
          }
          else if(params.pvIdRole == "VENDOR"){
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

            routesAux2.push(
              {
                collapse: false,
                path: "/xml-tree-cp-requests/:requestNumber/",
                name: "Árbol XML Solicitud Carta Porte",
                icon: 'dashboard',
                component: "CartaPorteRequestsXML",
                layout: ambiente + "/admin",
                views: []
              }
            )

            routesAux2.push(
              {
                collapse: false,
                path: "/ver-evidencias/:uUID/",
                name: "Ver Evidencias",
                icon: 'dashboard',
                component: "VerEvidencias",
                layout: ambiente + "/admin",
                views: []
              }
            )

            routesAux2.push(
              {
                collapse: false,
                path: "/carga-evidencias/:uUID/",
                name: "Carga de Evidencias",
                icon: 'dashboard',
                component: "CargaEvidencias",
                layout: ambiente + "/admin",
                views: []
              }
            )
          }
          else if(params.pvIdRole == "ASSIGN"){
            routesAux2.push(
              {
                collapse: false,
                path: "/carga-evidencias/:uUID/",
                name: "Carga de Evidencias",
                icon: 'dashboard',
                component: "CargaEvidencias",
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
    
      var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);
    
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
      fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
      })
      .then(function(response) {
        if(response.status === 401)
        {
          localStorage.setItem("Logged", false);
          localStorage.removeItem("User");
          localStorage.removeItem("Id_Role");
          localStorage.removeItem("Id_Customer");
          localStorage.removeItem("Token");
          history.push(ambiente + "/auth/login")
        }
          return response.ok ? response.json() : Promise.reject();
      })
      .then(function(data) {
          //console.log(data)
          var aux = data.find( o => o.Id_Catalog === 9 )
          setPathFile(aux.Value)

          var WFTrackerFileTypes = data.find( o => o.Id_Catalog === 24 )
          getWFTrackerFileTypes(WFTrackerFileTypes.Value)
      })
      .catch(function(err) {
          console.log(err)
      });
    }, []);

  function getWFTrackerFileTypes(value)
  {
    var url = new URL(`${process.env.REACT_APP_API_URI}workflow-tracker-file-types/${value}`);
    //var url = new URL(`${process.env.REACT_APP_API_URI}vendors/`);

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
        setTrackerEProveedor(data)
        setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion del general parameter" + err);
    });
  }

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
            else if(prop.component === "GeneralParameters")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <GeneralParameters autoCloseAlert = {autoCloseAlert}/>
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
            else if(prop.component === "JDEAccounts")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                  //element={<Users autoCloseAlert = {autoCloseAlert}/>}
                  //key={key}
                >
                  <Accounts autoCloseAlert = {autoCloseAlert}/>
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
            else if(prop.component === "Invoices")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <Carga autoCloseAlert = {autoCloseAlert} autoCloseAlertEvidencias = {autoCloseAlertEvidencias} autoCloseAlertCarga = {autoCloseAlertCarga} hideAlert4 = {hideAlert4} autoCloseAlertCargaInvoices = {autoCloseAlertCargaInvoices}/>
                </Route>
              );
            }
            else if(prop.component === "CartaPorteRequests")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <CartaPorteRequests autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "InvoicesPools")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <InvoicesPools autoCloseAlert = {autoCloseAlert}/>
                </Route>
              );
            }
            else if(prop.component === "Pool")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <Pool autoCloseAlert = {autoCloseAlertPool} autoCloseAlertCarga = {autoCloseAlertCarga} hideAlert4 = {hideAlert4}/>
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
            else if(prop.component === "CartaPorteRequestsXML")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <CartaPorteRequestsXML/>
                </Route>
              );
            }
            else if(prop.component === "CargaEvidencias")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <CargaEvidencias autoCloseAlert = {autoCloseAlert} trackerEProveedor = {trackerEProveedor}/>
                </Route>
              );
            }
            else if(prop.component === "VerEvidencias")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <VerEvidencias/>
                </Route>
              );
            }
            else if(prop.component === "ExternalApplications")
            {
              return (
                <Route
                  path={prop.layout + prop.path}
                >
                  <ExternalApplications autoCloseAlert = {autoCloseAlert}/>
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

    const autoCloseAlertCargaInvoices = (mensaje) => {
      setAlert5(
          <ReactBSAlert
              style={{ display: "block", display: "flex", justifyContent: "center", alignItems: "center" }}
              title="Mensaje"
              onConfirm={() => hideAlert5()}
              showConfirm={false}
              >
          {mensaje}
          </ReactBSAlert>
      );
      window.setTimeout(()=>{
        hideAlert5()
      },9000)
    };

    const autoCloseAlertPool = (mensaje) => {
      setAlert3(
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
        hideAlert3()
      },6000)
    };

    const autoCloseAlertEvidencias = (cfdi) => {
      console.log(cfdi)
      setAlert2(
          <ReactBSAlert
              style={{ display: "block", display: "flex", justifyContent: "center", alignItems: "center" }}
              warning
              showCancel
              cancelBtnText="CANCELAR"
              confirmBtnText="Si, rechazar evidencia"
              confirmBtnBsStyle="danger"
              title="Mensaje"
              onCancel={() => hideAlert2()}
              onConfirm={() => rechazarEvidencia(cfdi)}
              focusCancelBtn
              >
            ¿Estás seguro que quieres rechazar la evidencia?  &nbsp; Serie: {cfdi.serie} Folio: {cfdi.folio}
          </ReactBSAlert>
      );
    };

    function rechazarEvidencia(cfdi)
    {
      const catRegister = {
        user: user,
        ip: ip,
        uuid: cfdi.uuid
      };

      console.log(catRegister)
      hideAlert2()
      var url = new URL(`${process.env.REACT_APP_API_URI}invoices/reject-invoice-evidence`);

      fetch(url, {
          method: "POST",
          body: JSON.stringify(catRegister),
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
      })
      .then(function(response) {
          return response.ok ? response.json() : Promise.reject();
      })
      .then((data) => {
          if (data.errors) {
              console.log("Hubo un error al procesar tu solicitud")
          }
          else {
            if(data.data.success === 1)
            {
              autoCloseAlert(data.data.message)
              //history.push(ambiente + `/admin/invoices/`);
              window.location.reload(false);
            }
            else {
              autoCloseAlert(data.data.message)
              //history.push(ambiente + `/admin/invoices/`);
              window.location.reload(false);
            }
          }
      });
    }

    const autoCloseAlertCarga = (mensaje) => {
      console.log("entre al alert")
      setAlert4(
        <ReactBSAlert
          style={{ display: "block", display: "flex", justifyContent: "center", alignItems: "center" }}
          title=""
          onConfirm={() => hideAlert4()}
          showConfirm={false}
        >
          <Row>
            <Col sm="4">
            </Col>
            <Col sm="4">
              <img 
                src = {Cargando} 
                style ={{ width: "50px", height: "50px" }}
              />
            </Col>
            <Col sm="4">
            </Col>
          </Row>
          &nbsp;
          {mensaje}
        </ReactBSAlert>
      );
    };
  
    const hideAlert = () => {
        setAlert(null);
    };

    const hideAlert2 = () => {
      setAlert2(null);
    };

    const hideAlert3 = () => {
      setAlert3(null);
    };

    const hideAlert4 = () => {
      setAlert4(null);
    };

    const hideAlert5 = () => {
      setAlert5(null);
    };

    return dataFind === false ? (
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
            {alert2}
            {alert3}
            {alert4}
            {alert5}
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
    ): (
      null
    );
}

export default Admin;
