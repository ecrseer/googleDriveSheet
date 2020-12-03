const xlsx = require('node-xlsx').default;
const fs = require('fs');
const { downloadMyFile } = require('./myUsefulFunctions');
var readFilePromise = function(file) {
  return new Promise(function(ok, notOk) {
    fs.readFile(file, function(err, data) {
        if (err) {
          notOk(err)
        } else {
          ok(data)
        }
    })
  })
}
/*(array)=> array.length==4*/
function filtro(arr){ return arr.length==4;}

async function pesquisar(requisicao,response){
    downloadMyFile();
    const workSheetsFromFile = xlsx.parse(`${__dirname}/armazen/tabela.xlsx`),
        nomezin = requisicao.body.nomezin,
        planilha = workSheetsFromFile[1].data,
        arraysBuscados = planilha.filter(array=>array.some(stri=>stri==nomezin))
    
    
    let placeb = { meuArray:arraysBuscados};
    console.log(arraysBuscados ) ;
    const copy = await placeb;

    return response.json(copy);
}



module.exports={
    pesquisar}
    