import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth.js";
import AdminLayout from "./layouts/Admin.js";

function App() {
    return(
        <div>
            <BrowserRouter>
                <Switch>
                  <Route path="/DEV/auth" render={(props) => <AuthLayout {...props} />} />
                  <Route path="/DEV/admin" render={(props) => <AdminLayout {...props} />} />
                  <Redirect to="/DEV/auth/login" />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
