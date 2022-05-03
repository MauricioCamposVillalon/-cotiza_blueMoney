/*Recibir por la línea de comando los siguientes argumentos:
a. Nombre del archivo que se creará.
b. Extensión del archivo.
c. Indicador económico que se desea convertir.
d. Cantidad de pesos que se quiere cambiar.*/

const argumentos = process.argv.slice(2);
console.log(argumentos)

let nombre = String(argumentos[0]);
let extencion = String(argumentos[1]);
let indicador = String(argumentos[2]);
let pesos = Number(argumentos[3]);



console.log(nombre, " ", extencion, " ", indicador, " ", pesos);

let fecha = new Date().toDateString();
let hora = new Date().toTimeString();
let tiempo = fecha + " " + hora;

const valorFinal = 1;
/* Consultar la API con el módulo https y almacenar la respuesta en una variable. */

const https = require('https');
const url = 'https://mindicador.cl/api/';
https.get(url, (resp) => {

  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  })
  resp.on('end', () => {
    let indicaVl = JSON.parse(data);
    if (indicador == "dolar") {
      let valord = indicaVl.dolar.valor;
      let valorFinal = pesos / valord;
      let dato = crearInformacion(valorFinal); // crearInformacion esta creado mas abajo y crea la extructura que llevara el documanto.
      crearArchivo(dato);
      leerArchivo();
    } else if (indicador == "uf") {
      let valorUf = indicaVl.uf.valor;
      let valorFinal = pesos / valorUf;
      let dato = crearInformacion(valorFinal);
      crearArchivo(dato);
      leerArchivo();
    } else if (indicador == "dolar_intercambio") {
      let valorDi = indicaVl.dolar_intercambio.valor;
      let valorFinal = pesos / valorDi;
      let dato = crearInformacion(valorFinal);
      crearArchivo(dato);
      leerArchivo();
    } else if (indicador == "euro") {
      let valorEu = indicaVl.euro.valor;
      let valorFinal = pesos / valorEu;
      let dato = crearInformacion(valorFinal);
      crearArchivo(dato);
      leerArchivo();
    } else if (indicador == "utm") {
      let valorUtm = indicaVl.utm.valor;
      let valorFinal = pesos / valorUtm;
      let dato = crearInformacion(valorFinal);
      crearArchivo(dato);
      leerArchivo();
    } else if (indicador == "bitcoin") {
      let valorBtc = indicaVl.bitcoin.valor;
      valorFinal = pesos / valorBtc;
      let dato = crearInformacion(valorFinal);
      crearArchivo(dato);
      leerArchivo();
    } else {
      console.log("error Valor de indicador no encontrado")
    }
  })
}).on('error', (error) => {
  console.log("error" + error)
})


let archi = "repositorio/." + nombre + ".";
let ext = extencion;
let archivo = archi + ext;
const fs = require('fs');

const crearInformacion = (valorTrans) => {
  let linea1 = "A la fecha: " + tiempo;
  let linea2 = "Fue realizada cotización con los siguientes datos:";
  let linea3 = "Cantidad de pesos a convertir:" + pesos;
  let linea4 = 'Convertido a " ' + indicador + '" da un total de:';
  let linea5 = "$ " + valorTrans;
  let tareas = [linea1, linea2, linea3, linea4, linea5]
  let data = "";
  tareas.forEach(tarea => {
    data += tarea + "\n";
  })
  return data
}

const crearArchivo = (data) => {
  fs.writeFile(archivo, data, "utf8", (error) => {
    if (error) {
      console.log("Ha ocurrido un error al crear el archivo.");
    } else {
      console.log("El archivo ha sido creado con exito.");
    }
  });
}
const leerArchivo = () => {
  fs.readFile(archivo, "utf8", (err, data) => {
    err ? console.log("Error al leer el archivo") : console.log(data);
  });
}


