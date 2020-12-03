const sampl = require('./driveApiSample');
async function downloadMyFile(google,oAuth2Client){
    return new Promise((resolve,reject)=>{
       try{
        const idF = '194t1ptGWmjV1uDGqepXUZhiEUAgnr8D9';
        const drivest = google.drive({ version: "v3", auth: oAuth2Client });
        const path =  sampl(idF,drivest).then((dt)=>{console.log('A '+dt) }
        ).catch((err)=> console.log('Erro no downloadMyFile: '+err))
        resolve(path);
       }catch(err){
            reject(err);
       }

       

    })    
}
async function readMyToken(fs,oAuth2Client){
    return new Promise(
       (resolve,reject)=>{               
               let myJson = JSON.parse(
                   fs.readFileSync('./meutoken.json')
                   );
               if (!myJson) reject(err);


               
               oAuth2Client.setCredentials(myJson);
               
               resolve(myJson);
           }
       )
       }
       const readMyTokenENV = function(oAuth2Client){
           return new Promise((resolve,reject)=>{
                resolve('testinnn'+oAuth2Client)
           })
       }
       

module.exports={downloadMyFile ,readMyToken,readMyTokenENV}