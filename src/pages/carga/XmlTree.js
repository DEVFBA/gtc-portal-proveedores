import React, { useState, useEffect } from "react";
import Tree from 'react-animated-tree'
import JsxParser from 'react-jsx-parser'

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";

function XmlTree({dataString}) {

  const treeStyles = {
    position: 'absolute',
    top: 40,
    left: 40,
    color: 'red',
    fill: 'white',
    width: '100%'
  }
  
  const typeStyles = {
    fontSize: '2em',
    verticalAlign: 'middle'
  }

  var componente = ""
  recorrerArbol(dataString)
  
  function recorrerArbol(json)		{
    //console.log("TAMAÑO : " + json.length)
    var type;
    var resultado
    var nombre=""
    for (var i=0; i<json.length; i++)
    {
      nombre = json[i].name
      var nombreF;
      if(nombre.includes("cfdi:"))
      {
        nombreF = nombre.substr(5)
        nombreF = nombreF.replace(/([A-Z])/g, ' $1').trim()
      }
      else if(nombre.includes("cartaporte20:"))
      {
        nombreF = nombre.substr(13)
        nombreF = nombreF.replace(/([A-Z])/g, ' $1').trim()
      }
      else 
      {
        nombreF = nombre.substr(4)
        nombreF = nombreF.replace(/([A-Z])/g, ' $1').trim()
      }
      componente = componente + "<Tree style={treeStyles} key ='"+json[i].name+i+"' content='"+nombreF+"'>"
      type = typeof json[i].elements;
      if (type=="undefined")
      {
        resultado = true;					
        var columnas  = Object.keys(json[i].attributes).length;
        var lista = ""
        var filas = 2
        var tabla = ""

        tabla = tabla + '<Table responsive className = "horizontal-scroll">'
        for(var x = 0; x< filas; x++)
        {
            if(x===0)
            {
                tabla = tabla + "<thead>"
            }
            else{
                tabla = tabla + "<tbody>"
            }
            tabla = tabla + "<tr>"
            for(var y=0; y< columnas; y++)
            {
            if(x===0)
            {
                //pintamos el encabezado
                var encabezado = Object.keys(json[i].attributes)[y]
                encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                tabla = tabla + "<th scope='col'>"+ encabezado + "</th>"
            }
            else
            {
                tabla = tabla + "<td>"+ Object.values(json[i].attributes)[y] + "</td>"
            }
            }
            tabla = tabla + "</tr>"
            if(x===0)
            {
                tabla = tabla + "</thead>"
            }
            else{
                tabla = tabla + "</tbody>"
            }
        }
        tabla = tabla + "</Table>"
        componente = componente + tabla
        //console.log("si entro")
        /*for(var x = 0; x< filas; x++)
        {
            if(x===0)
            {
            lista = lista + "<ul className='list-group'>"
            }
            for(var y=0; y< columnas; y++)
            {
            lista = lista + "<li className='list-group-item'>"+ Object.keys(json[i].attributes)[y] + "</li>"
            }
            
        }*/

        /*lista = lista + "<div className='row'>"
        lista = lista + "<div className='col-3 izquierda'>"
        lista = lista + "<ul className='list-group list-left'>" 
        for(var y=0; y< columnas; y++)
        {
          lista = lista + "<li className='list-group-item list-group-item-warning'><strong>"+ Object.keys(json[i].attributes)[y] + "</strong></li>"
        }
        lista = lista + "</ul>"
        lista = lista + "</div>"
        lista = lista + "<div className='col-5 derecha'>"
        lista = lista + "<ul className='list-group list-right'>" 
        for(var y=0; y< columnas; y++)
        {
          lista = lista + "<li className='list-group-item'>"+ Object.values(json[i].attributes)[y] + "</li>"
        }
        lista = lista + "</ul>"
        //Cerramos la columna
        lista = lista + "</div>"
        //Cerramos el row
        lista = lista + "</div>"
        componente = componente + lista*/
      }
      else{ 
        if(json[i].attributes !== undefined && json[i].name !== "cfdi:Comprobante")
        {
          var columnas  = Object.keys(json[i].attributes).length;
          var lista = ""
          var tabla = ""
          var filas = 2

            tabla = tabla + '<Table responsive className="horizontal-scroll">'
            for(var x = 0; x< filas; x++)
            {
                if(x===0)
                {
                    tabla = tabla + "<thead>"
                }
                else{
                    tabla = tabla + "<tbody>"
                }
                tabla = tabla + "<tr>"
                for(var y=0; y< columnas; y++)
                {
                if(x===0)
                {
                    //pintamos el encabezado
                    var encabezado = Object.keys(json[i].attributes)[y]
                    encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                    tabla = tabla + "<th scope='col'>"+ encabezado + "</th>"
                }
                else
                {
                    tabla = tabla + "<td>"+ Object.values(json[i].attributes)[y] + "</td>"
                }
                }
                tabla = tabla + "</tr>"
                if(x===0)
                {
                    tabla = tabla + "</thead>"
                }
                else{
                    tabla = tabla + "</tbody>"
                }
            }
            tabla = tabla + "</Table>"
            componente = componente + tabla
      
          /*lista = lista + "<div className='row'>"
          lista = lista + "<div className='col-3 izquierda'>"
          lista = lista + "<ul className='list-group list-left'>" 
          for(var y=0; y< columnas; y++)
          {
            lista = lista + "<li className='list-group-item list-group-item-warning'><strong>"+ Object.keys(json[i].attributes)[y] + "</strong></li>"
          }
          lista = lista + "</ul>"
          lista = lista + "</div>"
          lista = lista + "<div className='col-5 derecha'>"
          lista = lista + "<ul className='list-group list-right'>"
          for(var y=0; y< columnas; y++)
          {
            lista = lista + "<li className='list-group-item'>"+ Object.values(json[i].attributes)[y] + "</li>"
          }
          lista = lista + "</ul>"
          //Cerramos la columna
          lista = lista + "</div>"
          //Cerramos el row
          lista = lista + "</div>"
          componente = componente + lista*/
        }
        resultado = recorrerArbol(json[i].elements);
      }
      componente = componente + "</Tree>"
    }
    return resultado;
  }


  return (
    <div className="content">
    {<JsxParser
        components={{ Tree, Table }}
        jsx={componente}
    />}
    </div>
  );
}

export default XmlTree;