import React, { useState, useEffect } from "react";
import Tree from 'react-animated-tree'
import JsxParser from 'react-jsx-parser'
import TreeMenu from 'react-simple-tree-menu';


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
      /*if(json[i].elements !== undefined)
      {
        console.log(nombre + "tiene " + json[i].elements.length + " hijos")
      }*/
      
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
      if(nombre !== "cfdi:Concepto" && nombre !== "cfdi:Retencion" && nombre !== "cfdi:Traslado" && nombre !== "cartaporte20:Ubicacion" && nombre !== "cartaporte20:Mercancia" && nombre !== "cartaporte20:Remolque")
      {
        componente = componente + "<Tree  key ='"+json[i].name+i+"' content='"+nombreF+"' style={{ whiteSpace: 'normal' }}>"
        type = typeof json[i].elements;
        if (type=="undefined")
        {				
          var columnas  = Object.keys(json[i].attributes).length;
          var lista = ""
          var filas = 2
          var tabla = ""

          tabla = tabla + '<Table responsive className = "horizontal-scroll table-bordered">'
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
                    tabla = tabla + '<td>' + Object.values(json[i].attributes)[y] + "</td>"
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
        }
        else{ 
          if(json[i].attributes !== undefined && json[i].name !== "cfdi:Comprobante")
          {
            if(json[i].name === "cartaporte20:Mercancias")
            {
              //Pintamos primero su tabla superior
              var columnas  = Object.keys(json[i].attributes).length;
              var lista = ""
              var tabla = ""
              var filas = 2
              
              tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered">'
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
                        divs = divs + encabezado
                    }
                    else
                    {
                        tabla = tabla + '<td>' + Object.values(json[i].attributes)[y] + "</td>"
                        divs = divs + Object.values(json[i].attributes)[y]
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

              //Posteriormente vamos a pintar la tabla de Mercancias
              var conceptos = json[i]
              
              //console.log(conceptos)
              var columnas  = Object.keys(conceptos.elements[0].attributes).length;
              //console.log(columnas)
              var tabla = ""
              //Para sacar las mercancias (no todas son)
              var contadorColumnas = 0;
              for(var cC = 0; cC<conceptos.elements.length; cC++)
              {
                if(conceptos.elements[cC].name === "cartaporte20:Mercancia")
                {
                  contadorColumnas++
                }
              }

              var filas = contadorColumnas
              var divs = '<div className="container">'
              for(var x = 0; x< filas; x++)
              {
                tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered">'
                tabla = tabla + "<tbody>"
                if(x===0)
                {
                  tabla = tabla + "<tr>"
                  divs = divs + '<Row className="tree-rows">' 
                  for(var y=0; y< columnas; y++)
                  {
                    divs = divs + '<Col>' 
                    var encabezado = Object.keys(conceptos.elements[x].attributes)[y]
                    encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                    tabla = tabla + "<th>"+ encabezado + "</th>"
                    divs = divs + encabezado
                    divs = divs + '</Col>' 
                  }
                  tabla = tabla + "</tr>"
                  divs = divs + '</Row>'
                  divs = divs + '<Row className="tree-rows-content-first">'  
                  tabla = tabla + "<tr>"
                  for(var y=0; y< columnas; y++)
                  {
                    divs = divs + '<Col>' 
                    tabla = tabla + '<td className="table-active">'+ Object.values(conceptos.elements[x].attributes)[y] + "</td>"
                    divs = divs + Object.values(conceptos.elements[x].attributes)[y] 
                    divs = divs + '</Col>' 
                  }
                  tabla = tabla + "</tr>"
                  divs = divs + '</Row>'
                  if(conceptos.elements[x].elements!==undefined)
                  {
                    //console.log(conceptos.elements[x].elements)
                    tabla = tabla + "</tbody>"
                    tabla = tabla + "</Table>"
                    var childs = conceptos.elements[x].elements
                    //console.log(childs)
                    var columnas = Object.keys(childs[0].attributes).length
                    //console.log(columnas)
                    tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered table-sm">'
                    tabla = tabla + "<tbody>"
                    for(var listaU = 0; listaU < childs.length; listaU++)
                    {
                      if(listaU === 0)
                      {
                        tabla = tabla + "<tr>"
                        divs = divs + '<Row className="tree-table-rows">'
                        for(var y=0; y< columnas; y++)
                        {
                          divs = divs + '<Col>' 
                          var encabezado = Object.keys(childs[listaU].attributes)[y]
                          encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                          tabla = tabla + "<th>"+ encabezado + "</th>"
                          divs = divs + encabezado
                          divs = divs + '</Col>' 
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>'
                        tabla = tabla + "<tr>"
                        divs = divs + '<Row className="tree-table-rows-content">'
                        for(var y=0; y< columnas; y++)
                        {
                          divs = divs + '<Col>' 
                          tabla = tabla + "<td>"+ Object.values(childs[listaU].attributes)[y] + "</td>"
                          divs = divs + Object.values(childs[listaU].attributes)[y]
                          divs = divs + '</Col>' 
                        }
                        divs = divs + '</Row>'
                        tabla = tabla + "</tr>"
                      }
                      else {
                        tabla = tabla + "<tr>"
                        divs = divs + '<Row className="tree-table-rows-content">'
                        for(var y=0; y< columnas; y++)
                        {
                            divs = divs + '<Col>' 
                            tabla = tabla + "<td>"+ Object.values(childs[listaU].attributes)[y] + "</td>"
                            divs = divs + Object.values(childs[listaU].attributes)[y]
                            divs = divs + '</Col>' 
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>'
                      }
                    }
                  }
                }
                else {
                  var columnas  = Object.keys(conceptos.elements[0].attributes).length;
                  tabla = tabla + "<tr>"
                  divs = divs + '<Row className="tree-rows-content-late">'
                  for(var y=0; y< columnas; y++)
                  {
                      divs = divs + '<Col>' 
                      tabla = tabla + '<td className="table-active">' + Object.values(conceptos.elements[x].attributes)[y] + "</td>"
                      divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                      divs = divs + '</Col>' 
                  }
                  tabla = tabla + "</tr>"
                  divs = divs + '</Row>'
                  if(conceptos.elements[x].elements!==undefined)
                  {
                    tabla = tabla + "</tbody>"
                    tabla = tabla + "</Table>"
                    var childs = conceptos.elements[x].elements
                    var columnas = Object.keys(childs[0].attributes).length
                    tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered table-sm">'
                    tabla = tabla + "<tbody>"
                    for(var listaU = 0; listaU < childs.length; listaU++)
                    {
                      if(listaU === 0)
                      {
                        tabla = tabla + "<tr>"
                        divs = divs + '<Row className="tree-table-rows">'
                        for(var y=0; y< columnas; y++)
                        {
                             divs = divs + '<Col>' 
                            var encabezado = Object.keys(childs[listaU].attributes)[y]
                            encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                            tabla = tabla + "<th>"+ encabezado + "</th>"
                            divs = divs + '</Col>' 
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>'
                        divs = divs + '<Row className="tree-table-rows-content">'
                        tabla = tabla + "<tr>"
                        for(var y=0; y< columnas; y++)
                        {
                          divs = divs + '<Col>' 
                          tabla = tabla + "<td>"+ Object.values(childs[listaU].attributes)[y] + "</td>"
                          divs = divs + Object.values(childs[listaU].attributes)[y]
                          divs = divs + '</Col>' 
                        }
                        divs = divs + '</Row>'
                        tabla = tabla + "</tr>"
                      }
                      else {
                        tabla = tabla + "<tr>"
                        divs = divs + '<Row className="tree-table-rows-content">'
                        for(var y=0; y< columnas; y++)
                        {
                          divs = divs + '<Col>'
                          tabla = tabla + "<td>"+ Object.values(childs[listaU].attributes)[y] + "</td>"
                          divs = divs + Object.values(childs[listaU].attributes)[y]
                          divs = divs + '</Col>'
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>'
                      }
                    }
                  }
                }
                tabla = tabla + "</tbody>"
                tabla = tabla + "</Table>"
              }
              var divs =  divs + '</div>'
              //console.log(divs)
              componente = componente + divs
            }
            else {
              var columnas  = Object.keys(json[i].attributes).length;
              var lista = ""
              var tabla = ""
              var filas = 2

              tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered">'
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
                        tabla = tabla + '<td>' + Object.values(json[i].attributes)[y] + "</td>"
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
            }
          }
          else if(json[i].name === "cfdi:Conceptos")
          {
            var conceptos = json[i]
            var columnas  = Object.keys(conceptos.elements[0].attributes).length;
            //console.log(conceptos.elements[0].attributes)
            var lista = ""
            var tabla = ""
            var filas = conceptos.elements.length
            var divs = '<div className="container">'
            for(var x = 0; x< filas; x++)
            {
              tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered table-tree">'
              tabla = tabla + "<tbody>"
              if(x===0)
              {
                tabla = tabla + "<tr>"
                divs =  divs + '<Row className="tree-rows">';
                for(var y=0; y< columnas; y++)
                {
                  divs = divs + '<Col className="tree-cols">'
                  var encabezado = Object.keys(conceptos.elements[x].attributes)[y]
                  encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                  tabla = tabla + "<th>"+ encabezado + "</th>"
                  divs = divs + encabezado;
                  divs = divs + '</Col>';
                }
                divs = divs + '</Row>';
                tabla = tabla + "</tr>"
                tabla = tabla + "<tr>"
                divs = divs + '<Row className="tree-rows-content-first">';
                for(var y=0; y< columnas; y++)
                {
                  divs = divs + '<Col>'
                  tabla = tabla + '<td className="table-active row-tree">'+ Object.values(conceptos.elements[x].attributes)[y] + "</td>"
                  divs = divs + Object.values(conceptos.elements[x].attributes)[y];
                  divs = divs + '</Col>';
                }
                divs = divs + '</Row>';
                tabla = tabla + "</tr>"
                
                if(conceptos.elements[x].elements!==undefined)
                {
                  tabla = tabla + "</tbody>"
                  tabla = tabla + "</Table>"
                  var childs = conceptos.elements[x].elements[0].elements
                  var columnas = Object.keys(childs[0].elements[0].attributes).length + 1
                  tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered table-sm">'
                  tabla = tabla + "<tbody>"
                  for(var listaU = 0; listaU < childs.length; listaU++)
                  {
                    if(listaU === 0)
                    {
                      divs = divs + '<Row className ="tree-table-rows">';
                      tabla = tabla + "<tr>"
                      for(var y=0; y< columnas; y++)
                      {
                        if(y===0)
                        {
                          divs = divs + '<Col className ="tree-table-cols">Impuestos'
                          tabla = tabla + "<th>Impuestos</th>"
                          divs = divs + '</Col>';
                        }
                        else{
                          divs = divs + '<Col className="tree-table-cols">'
                          var encabezado = Object.keys(childs[listaU].elements[0].attributes)[y-1]
                          encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                          tabla = tabla + "<th>"+ encabezado + "</th>"
                          divs = divs + encabezado
                          divs = divs + '</Col>';
                        }
                      }
                      tabla = tabla + "</tr>"
                      divs = divs + '</Row>';
                      
                      for(var t=0; t<childs[listaU].elements.length; t++)
                      {
                        divs = divs + '<Row className ="tree-table-rows-content">';
                        tabla = tabla + "<tr>"
                        for(var y=0; y< columnas; y++)
                        {
                          
                          if(y===0)
                          {
                            divs = divs + '<Col className="tree-table-cols">'
                            var nombreF = childs[listaU].elements[t].name.substr(5)
                            tabla = tabla + "<td>" + nombreF + "</td>"
                            divs = divs + nombreF
                            divs = divs + '</Col>';
                          }
                          else{
                            divs = divs + '<Col className="tree-table-cols">'
                            tabla = tabla + "<td>"+ Object.values(childs[listaU].elements[t].attributes)[y-1] + "</td>"
                            divs = divs + Object.values(childs[listaU].elements[t].attributes)[y-1]
                            divs = divs + '</Col>';
                          }
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>';
                      }
                    }
                    else {
                      for(var t=0; t<childs[listaU].elements.length; t++)
                      {
                        divs = divs + '<Row className ="tree-table-rows-content">';
                        tabla = tabla + "<tr>"
                        for(var y=0; y< columnas; y++)
                        {
                          if(y===0)
                          {
                            divs = divs + '<Col className="tree-table-cols">'
                            var nombreF = childs[listaU].elements[t].name.substr(5)
                            tabla = tabla + "<td>" + nombreF + "</td>"
                            divs = divs + nombreF
                            divs = divs + '</Col>';
                          }
                          else{
                            divs = divs + '<Col className="tree-table-cols">'
                            tabla = tabla + "<td>"+ Object.values(childs[listaU].elements[t].attributes)[y-1] + "</td>"
                            divs = divs + Object.values(childs[listaU].elements[t].attributes)[y-1]
                            divs = divs + '</Col>';
                          }
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>';
                      }
                    }
                  }
                }
              }
              else {
                tabla = tabla + "<tr>"
                divs = divs + '<Row className="tree-rows-content-late">';
                for(var y=0; y< columnas; y++)
                {
                    divs = divs + '<Col>'
                    tabla = tabla + '<td className="table-active row-tree"><span>' + Object.values(conceptos.elements[x].attributes)[y] + "</span></td>"
                    divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                    divs = divs + '</Col>';
                }
                divs = divs + '</Row>';
                tabla = tabla + "</tr>"
                if(conceptos.elements[x].elements!==undefined)
                {
                  tabla = tabla + "</tbody>"
                  tabla = tabla + "</Table>"
                  var childs = conceptos.elements[x].elements[0].elements
                  var columnas = Object.keys(childs[0].elements[0].attributes).length + 1
                  tabla = tabla + '<Table responsive className="horizontal-scroll table-bordered table-sm">'
                  tabla = tabla + "<tbody>"
                  for(var listaU = 0; listaU < childs.length; listaU++)
                  {
                    if(listaU === 0)
                    {
                      tabla = tabla + "<tr>"
                      divs = divs + '<Row className ="tree-table-rows">';
                      for(var y=0; y< columnas; y++)
                      {
                        if(y===0)
                        {
                          divs = divs + '<Col className="tree-table-cols">'
                          tabla = tabla + "<th>Impuestos</th>"
                          divs = divs + 'Impuestos'
                          divs = divs + '</Col>';
                        }
                        else{
                          divs = divs + '<Col className="tree-table-cols">'
                          var encabezado = Object.keys(childs[listaU].elements[0].attributes)[y-1]
                          encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                          tabla = tabla + "<th>"+ encabezado + "</th>"
                          divs = divs + encabezado
                          divs = divs + '</Col>';
                        }
                      }
                      divs = divs + '</Row>';
                      tabla = tabla + "</tr>"
                      for(var t=0; t<childs[listaU].elements.length; t++)
                      {
                        tabla = tabla + "<tr>"
                        divs = divs + '<Row className ="tree-table-rows-content">';
                        for(var y=0; y< columnas; y++)
                        {
                          if(y===0)
                          {
                            divs = divs + '<Col className="tree-table-cols">'
                            var nombreF = childs[listaU].elements[t].name.substr(5)
                            tabla = tabla + "<td>" + nombreF + "</td>"
                            divs = divs + nombreF
                            divs = divs + '</Col>';
                          }
                          else{
                            divs = divs + '<Col className="tree-table-cols">'
                            tabla = tabla + "<td>"+ Object.values(childs[listaU].elements[t].attributes)[y-1] + "</td>"
                            divs = divs + Object.values(childs[listaU].elements[t].attributes)[y-1]
                            divs = divs + '</Col>';
                          }
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>';
                      }
                    }
                    else {
                      for(var t=0; t<childs[listaU].elements.length; t++)
                      {
                        divs = divs + '<Row className ="tree-table-rows-content">';
                        tabla = tabla + "<tr>"
                        for(var y=0; y< columnas; y++)
                        {
                          if(y===0)
                          {
                            divs = divs + '<Col className="tree-table-cols">'
                            var nombreF = childs[listaU].elements[t].name.substr(5)
                            tabla = tabla + "<td>" + nombreF + "</td>"
                            divs = divs + nombreF
                            divs = divs + '</Col>';
                          }
                          else{
                            divs = divs + '<Col className="tree-table-cols">'
                            tabla = tabla + "<td>"+ Object.values(childs[listaU].elements[t].attributes)[y-1] + "</td>"
                            divs = divs + Object.values(childs[listaU].elements[t].attributes)[y-1]
                            divs = divs + '</Col>';
                          }
                        }
                        tabla = tabla + "</tr>"
                        divs = divs + '</Row>';
                      }
                    }
                  }
                }
              }
              tabla = tabla + "</tbody>"
              tabla = tabla + "</Table>"
            }

            divs = divs + "</div>"
            //console.log(divs)
            componente = componente + divs
          }
          else if(json[i].name === "cfdi:Retenciones"){
            var conceptos = json[i]
            var columnas  = Object.keys(conceptos.elements[0].attributes).length;
            //console.log(conceptos.elements[0].attributes)
      
            var filas = conceptos.elements.length
            var divs = '<div className="container">'
            for(var x = 0; x< filas; x++)
            {
              if(x===0)
              {
                divs = divs + '<Row className="tree-rows">'
                for(var y=0; y< columnas; y++)
                {
                  divs = divs + '<Col>'
                  var encabezado = Object.keys(conceptos.elements[x].attributes)[y]
                  encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                  divs = divs + encabezado
                  divs = divs + '</Col>'
                } 
                divs = divs + '</Row>'
                divs = divs + '<Row className="tree-rows-content-first">'
                for(var y=0; y< columnas; y++)
                {
                  divs = divs + '<Col>'
                  divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                  divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                  divs = divs + '</Col>'
                }
                divs = divs + '</Row>'
              }
              else {
                divs = divs + '<Row className="tree-rows-content-first">'
                for(var y=0; y< columnas; y++)
                {
                    divs = divs + '<Col>'
                    divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                    divs = divs + '</Col>'
                }
                divs = divs + '</Row>'
              }
            }
            divs = divs + '</div>'
            componente = componente + divs
          }
          else if(json[i].name === "cfdi:Traslados")
          {
            var conceptos = json[i]
            var columnas  = Object.keys(conceptos.elements[0].attributes).length;
            //console.log(conceptos.elements[0].attributes)
            var filas = conceptos.elements.length
            var divs = '<div className="container">'
            for(var x = 0; x< filas; x++)
            {
              if(x===0)
              {
                divs = divs + '<Row className="tree-rows">'
                for(var y=0; y< columnas; y++)
                {
                  divs = divs + '<Col>'
                  var encabezado = Object.keys(conceptos.elements[x].attributes)[y]
                  encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                  divs = divs + encabezado
                  divs = divs + '</Col>'
                }
                divs = divs + '</Row>'
                divs = divs + '<Row className="tree-rows-content-first">'
                for(var y=0; y< columnas; y++)
                {
                  divs = divs + '<Col>'
                  divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                  divs = divs + '</Col>'
                }
                divs = divs + '</Row>'
              }
              else {
                divs = divs + '<Row className="tree-rows-content-late">'
                for(var y=0; y< columnas; y++)
                {
                    divs = divs + '<Col>'
                    divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                    divs = divs + '</Col>'
                }
                divs = divs + '</Row>'
              }
            }
            divs = divs + '</div>'
            componente = componente + divs
          }
          else if(json[i].name === "cartaporte20:Ubicaciones")
          {
            var conceptos = json[i]
            var columnas  = Object.keys(conceptos.elements[0].attributes).length;
            var filas = conceptos.elements.length
            var divs = '<div className="container">'
            for(var x = 0; x< filas; x++)
            {
              if(x===0)
              {
                divs =  divs + '<Row className="tree-rows">';
                for(var y=0; y< columnas; y++)
                {
                  divs =  divs + '<Col className="tree-cols">';
                  var encabezado = Object.keys(conceptos.elements[x].attributes)[y]
                  encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                  divs = divs + encabezado
                  divs = divs + '</Col>'
                }
                divs =  divs + '</Row>';
                divs =  divs + '<Row>';
                for(var y=0; y< columnas; y++)
                {
                  divs =  divs + '<Col className="tree-rows-content-first">';
                  divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                  divs =  divs + '</Col>';
                }
                divs =  divs + '</Row>';
                if(conceptos.elements[x].elements!==undefined)
                {
                  var childs = conceptos.elements[x].elements
                  var columnas = Object.keys(childs[0].attributes).length
                  for(var listaU = 0; listaU < childs.length; listaU++)
                  {
                    if(listaU === 0)
                    {
                      divs = divs + '<Row className="tree-table-rows">'
                      for(var y=0; y< columnas; y++)
                      {
                        divs = divs + '<Col>';
                        var encabezado = Object.keys(childs[listaU].attributes)[y]
                        encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                        divs = divs + encabezado
                        divs = divs + '</Col>'
                      }
                      divs = divs + '</Row>'
                      divs = divs + '<Row className="tree-table-rows-content">'
                      for(var y=0; y< columnas; y++)
                      {
                        divs = divs + '<Col>';
                        divs = divs + Object.values(childs[listaU].attributes)[y]
                        divs = divs + '</Col>'
                      }
                      divs = divs + '</Row>'
                    }
                    else {
                      divs = divs + '<Row className="tree-table-rows-content">'
                      for(var y=0; y< columnas; y++)
                      {
                        divs = divs + '<Col>';
                        divs = divs + Object.values(childs[listaU].attributes)[y]
                        divs = divs + '</Col>'
                      }
                      divs = divs + '</Row>'
                    }
                  }
                }
              }
              else {
                var columnas  = Object.keys(conceptos.elements[0].attributes).length;
                divs = divs + '<Row className="tree-rows-content-late">'
                for(var y=0; y< columnas; y++)
                {
                    divs = divs + '<Col>';
                    divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                    divs = divs + '</Col>'
                }
                divs = divs + '</Row>'
                if(conceptos.elements[x].elements!==undefined)
                {
                  var childs = conceptos.elements[x].elements
                  var columnas = Object.keys(childs[0].attributes).length
                  for(var listaU = 0; listaU < childs.length; listaU++)
                  {
                    if(listaU === 0)
                    {
                      divs = divs + '<Row className="tree-table-rows">'
                      for(var y=0; y< columnas; y++)
                      {
                          divs = divs + '<Col>';
                          var encabezado = Object.keys(childs[listaU].attributes)[y]
                          encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                          divs = divs + encabezado
                          divs = divs + '</Col>'
                      }
                      divs = divs + '</Row>'
                      divs = divs + '<Row className="tree-table-rows-content">'
                      for(var y=0; y< columnas; y++)
                      {
                        divs = divs + '<Col>';
                        divs = divs + Object.values(childs[listaU].attributes)[y]
                        divs = divs + '</Col>'
                      }
                      divs = divs + '</Row>'
                    }
                    else {
                      divs = divs + '<Row className="tree-table-rows-content">'
                      for(var y=0; y< columnas; y++)
                      {
                        divs = divs + '<Col>';
                        divs = divs + Object.values(childs[listaU].attributes)[y]
                        divs = divs + '</Col>'
                      }
                      divs = divs + '</Row>'
                    }
                  }
                }
              }
            }
            divs = divs + '</div>'
            componente = componente + divs
          }
          else if(json[i].name === "cartaporte20:Remolques")
          {
              //Posteriormente vamos a pintar la tabla de remolques
              var conceptos = json[i]
              //console.log(conceptos)
              var columnas  = Object.keys(conceptos.elements[0].attributes).length;
              //Para sacar los remolques
              var contadorColumnas = 0;
              for(var cC = 0; cC<conceptos.elements.length; cC++)
              {
                if(conceptos.elements[cC].name === "cartaporte20:Remolque")
                {
                  contadorColumnas++
                }
              }

              var filas = contadorColumnas
              var divs = '<div className="container">'
              for(var x = 0; x< filas; x++)
              {
                if(x===0)
                {
                  divs = divs + '<Row className="tree-rows">' 
                  for(var y=0; y< columnas; y++)
                  {
                    divs = divs + '<Col>' 
                    var encabezado = Object.keys(conceptos.elements[x].attributes)[y]
                    encabezado = encabezado.replace(/([A-Z])/g, ' $1').trim()
                    divs = divs + encabezado
                    divs = divs + '</Col>' 
                  }
                  divs = divs + '</Row>'
                  divs = divs + '<Row className="tree-rows-content-first">'  
                  for(var y=0; y< columnas; y++)
                  {
                    divs = divs + '<Col>' 
                    divs = divs + Object.values(conceptos.elements[x].attributes)[y] 
                    divs = divs + '</Col>' 
                  }
                  divs = divs + '</Row>'
                }
                else {
                  var columnas  = Object.keys(conceptos.elements[0].attributes).length;
                  divs = divs + '<Row className="tree-rows-content-late">'
                  for(var y=0; y< columnas; y++)
                  {
                      divs = divs + '<Col>' 
                      tabla = tabla + '<td className="table-active">' + Object.values(conceptos.elements[x].attributes)[y] + "</td>"
                      divs = divs + Object.values(conceptos.elements[x].attributes)[y]
                      divs = divs + '</Col>' 
                  }
                  tabla = tabla + "</tr>"
                  divs = divs + '</Row>'
                }
              }
              divs =  divs + '</div>'
              componente = componente + divs
          }
          resultado = recorrerArbol(json[i].elements);
        }
        
        componente = componente + "</Tree>"
      }
    }
  }
  return (
   <div>
      <JsxParser
          components={{ Tree, Table, Row, Col }}
          jsx={componente}
      />
    </div>
  );
}

export default XmlTree;