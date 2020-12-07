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

async function pesquisar(requisicao,resposta){
    //const pat = await downloadMyFile()
    console.log('começou pes')
    
    const workSheetsFromFile = xlsx.parse(`${__dirname}/armazen/tabela.xlsx`),
        nomezin = ""+requisicao.body.nomezin.toLowerCase(),
        planilha = workSheetsFromFile[1].data; 
        

    let
        arraysBuscarei=[];
        for (let index = 0; index < planilha.length; index++) {            
            let linhaAtual=[];
            isNecessario=false;
            for (let coluna = 0; coluna < planilha[index].length; coluna++) {
              let stringer =  ""+planilha[index][coluna];
                if(stringer.toLowerCase().indexOf(nomezin)!==-1||
                    isNecessario){
                    linhaAtual.push(planilha[index][coluna]);
                    isNecessario=true;
                }
                
            }
            //arraysBuscarei=arraysBuscarei.join([]);
            arraysBuscarei.push(linhaAtual);
       }

         //planilha.filter(array=>array
         //   .some(stri=>stri==nomezin ))
    
    console.log(arraysBuscarei);
    let placeb = { meuArray:nomezin};
    return resposta.json(placeb);    
}



module.exports={
    pesquisar}
    