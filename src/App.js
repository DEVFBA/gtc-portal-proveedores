import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "./toast-manager";
import "react-datetime/css/react-datetime.css";


import AuthLayout from "./layouts/Auth.js";
import AdminLayout from "./layouts/Admin.js";

function App() {

    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const auth = ambiente + "/auth"
    const admin = ambiente + "/admin"
    const login = ambiente + "/auth/login"
    return(
        <div>
            <ToastProvider>
                <BrowserRouter>
                    <Switch>
                    <Route path={auth} render={(props) => <AuthLayout {...props} />} />
                    <Route path={admin} render={(props) => <AdminLayout {...props} />} />
                    <Redirect to={login} />
                    </Switch>
                </BrowserRouter>
            </ToastProvider>
        </div>
    )
}

export default App;
