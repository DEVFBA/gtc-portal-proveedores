import React from "react";
import axios from 'axios'

import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";

function ChangePassword() {
  
    const history = useHistory();

    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState("");

    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [registerConfirmPasswordState, setregisterConfirmPasswordState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    //Para guardar los días transcurridos
    const [validDays, setValidDays] = React.useState();

    const Logged = localStorage.getItem("Logged");
    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("Id_Role");
    const [vendor, setVendor] = React.useState("");
    const [name, setName] = React.useState("");

    const ambiente = "/DEV-Vendors"

    const [ip, setIP] = React.useState("");
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    useEffect(() => {
        //Si el usuario ya ha iniciado sesión que se le redirija al dashboard
        if(Logged==="true")
        {
          history.push(ambiente + "/admin/dashboard");
        }
    }, []);

    useEffect(() => {
        //Descargamos la IP del usuario
        getData()
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
            var aux = data.find( o => o.Id_Catalog === 1 )
            setValidDays(parseInt(aux.Value,10))
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los general parameters" + err);
        });
    }, []);

    useEffect(() => {
        //Si el usuario no está loggeado no se va a descargar la imagen
          var url = new URL(`http://129.159.99.152/develop-vendors/api/security-users/${user}`);
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
              setVendor(data[0].Id_Vendor)
              setName(data[0].Name)
          })
          .catch(function(err) {
              alert("No se pudo consultar la informacion del usuario" + err);
          });
    },[]);

    // function that verifies if two strings are equal
    const compare = (string1, string2) => {
        if (string1 === string2) {
        return true;
        }
        return false;
    };

    const verifyPassword = (value) => {
        var passwordRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,50}$/;
        if (passwordRex.test(value)) {
        return true;
        }
        return false;
    };

    const isValidated = () => {
        if (
            registerPasswordState === "has-success" &&
            registerConfirmPasswordState === "has-success"
        ) {
          return true;
        } else {
          if (registerPasswordState !== "has-success") {
            setregisterPasswordState("text-danger");
          }
          if (registerConfirmPasswordState !== "has-success") {
            setregisterConfirmPasswordState("text-danger");
          }
          return false;
        }
    };

    const registerClick = () => {
        event.preventDefault();
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           updateRegister()
        }
        else{
            console.log("no entre")
        }
    };

    /* Función que suma o resta días a una fecha, si el parámetro
    días es negativo restará los días*/
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    function updateRegister(){

        var d = new Date();
        var finalDate = sumarDias(d, validDays);
        var date = finalDate.getDate();
        var month = finalDate.getMonth() + 1
        var year = finalDate.getFullYear()

        var finalDate2 = "" 
        if(month < 10 && date < 10)
        {
            finalDate2 = "" + year + "0" + month + "0" + date;  
        }
        else if(date < 10)
        {
            finalDate2 = "" + year + "" + month + "0" + date;
        }
        else if(month < 10) 
        {  
            finalDate2 = "" + year + "0" + month + "" + date;
        }
        else{
            finalDate2 = "" + year + "" + month + "" + date;
        }  
        
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pvOptionCRUD: "U",
            piIdVendor : vendor,
            pvIdUser: user,
            pvIdRole: role,
            pvPassword: registerPassword,
            pvName: name,
            pbTempPassword: false,
            pvFinalEffectiveDate: finalDate2,
            pvUser: user,
            pvIP: ip
        };

        fetch(`http://129.159.99.152/develop-vendors/api/security-users/update-user-pass/`, {
            method: "PUT",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                setError(
                    <p>Hubo un error al realizar tu solicitud</p>
                );
            }
            else{
                if(data[0].Code_Type === "Warning")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("text-danger")
                }
                if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("text-danger")
                }
                else{
                    setErrorState("has-success");
                    localStorage.setItem("Logged", true)
                    history.push(ambiente + "/admin/dashboard");
                }
            }
        });
    }
    
    return (
        <div className="change-password">
            <h3 className="title-password">CAMBIAR CONTRASEÑA</h3>
            <form method="">
                <div className="description-password">Tu contraseña ha vencido. Por favor ingresa una nueva.</div>
                <div className='form-group'>
                    <label className="labels-password">Contraseña *</label>
                    <div className="input-group">
                    <span className="input-group-addon rounded-left">
                        <i className={'material-icons'}>
                        lock_outline
                        </i>
                    </span>
                    <input 
                        className="form-control rounded-right"
                        placeholder=''
                        type="password"
                        name="password"
                        onChange={(e) => {
                            if (!verifyPassword(e.target.value)) {
                                setregisterPasswordState("text-danger");
                            } else {
                                setregisterPasswordState("has-success");
                            }
                            setregisterPassword(e.target.value);
                        }}
                    />
                    </div>
                    {registerPasswordState === "text-danger" ? (
                        <label className="error-password">La contraseña debe tener una longitud mínima de 10 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial.</label>
                    ) : null}
                </div>
                <div className='form-group'>
                    <label className="labels-password">Confirmar contraseña *</label>
                    <div className="input-group">
                    <span className="input-group-addon rounded-left">
                        <i className={'material-icons'}>
                        lock_outline
                        </i>
                    </span>
                    <input 
                        className="form-control rounded-right"
                        placeholder=''
                        type="password"
                        name="confirmpassword"
                        onChange={(e) => {
                            if (!compare(e.target.value, registerPassword)) {
                                setregisterConfirmPasswordState("text-danger");
                                //setregisterPasswordState("has-danger");
                            } else {
                                setregisterConfirmPasswordState("has-success");
                                //setregisterPasswordState("has-success");
                            }
                            setregisterConfirmPassword(e.target.value);
                            }}
                    />
                    </div>
                    {registerConfirmPasswordState === "text-danger" ? (
                        <label className="error-password">La contraseña no coincide.</label>
                    ) : null}
                </div>
                <div className="form-group">
                    {errorState === "text-danger" ? (
                        <label className="error">{errorMessage}</label>
                    ) : null}
                </div>
            </form>
            <button
                className="btn btn-primary btn-rounded btn-outline"
                onClick={registerClick}
            >
                Enviar
            </button>
        </div>
  );
}

export default ChangePassword;