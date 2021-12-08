import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "./toast-manager";
import "react-datetime/css/react-datetime.css";


import AuthLayout from "./layouts/Auth.js";
import AdminLayout from "./layouts/Admin.js";

function App() {

    return(
        <div>
            <ToastProvider>
                <BrowserRouter>
                    <Switch>
                    <Route path="/DEV-Vendors/auth" render={(props) => <AuthLayout {...props} />} />
                    <Route path="/DEV-Vendors/admin" render={(props) => <AdminLayout {...props} />} />
                    <Redirect to="/DEV-Vendors/auth/login" />
                    </Switch>
                </BrowserRouter>
            </ToastProvider>
        </div>
    )
}

export default App;
