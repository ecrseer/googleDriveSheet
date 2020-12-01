const sampl = require('./driveApiSample');
async function downloadMyFile(google,oAuth2Client){
    return new Promise((resolve,reject)=>{
       try{
        const idF = '1oFmgWIHeQYjwcyC2N0W8TwnBwFicI5B8';
        const drive = google.drive({ version: "v3", auth: oAuth2Client });
        sampl(idF,drive).then((dt)=>{console.log('A '+dt) }
        ).catch((err)=> console.log('Mrr'+err))
       }catch(err){
            reject(err);
       }

       

    })    
}
async function readMyToken(fs,oAuth2Client){
    return new Promise(
       (resolve,reject)=>{
               console.log('reading token');
               let myJson = fs.readFileSync('./meutoken.json');
               if (!myJson) reject(err);
               oAuth2Client.setCredentials(JSON.parse(myJson));
           }
       )
       }
       async function readStart(fs){
        return new Promise(
           (resolve,reject)=>{
                   
                   let myJson = fs.readFileSync('./armazen/gooSheetY.json');
                   if (!myJson) reject(err);
                   resolve(JSON.parse(myJson));
               }
           )
           }

module.exports={downloadMyFile ,readMyToken,readStart}