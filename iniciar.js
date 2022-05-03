const { rejects } = require('assert');
const chil_process = require('child_process');
const { resolve } = require('path');

const arg = process.argv.slice(2);

let nombre = String(arg[0]);
let ext = String(arg[1]);
let ind = String(arg[2]);
let pes = Number(arg[3]);


function ejecutar(archivo){
    return new Promise((resolve,reject) =>{
        chil_process.exec(`node ${archivo} ${nombre} ${ext} ${ind} ${pes}`, function(err, result){
            if(err){
                console.log("Ha ocurrido un error al ejecutar el archivo :" +archivo)
                reject();
            }else{
                resolve(result)
            }
        })
    })
}


ejecutar('datos.js').then( dato => {
    console.log(dato);
}).catch(error => {
    console.log("Ha ocurrido un error al ejecutar el llamado a la informacion.")
})