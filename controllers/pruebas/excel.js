const { response } = require('express');
var excel = require('xlsx');


const deExcelAJson = async() => {

    const ex = excel.readFile( "C:\\Users\\EstudioReal - Admin\\Desktop\\Prueba.xlsx" );
    
    const nombreHoja = ex.SheetNames;
    let datos= excel.utils.sheet_to_json(ex.Sheets[nombreHoja[0]]);
    console.log(datos);
} 
 

module.exports = {
deExcelAJson
}