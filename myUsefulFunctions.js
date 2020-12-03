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
        let myJsonTk;           
           try{  
            myJsonTk = fs.readFileSync('./meutoken.json');                   
               }catch(err){
                myJsonTk = process.env.TEMP_TK;
                if (!myJsonTk) return reject();
               }finally{
                oAuth2Client.setCredentials(JSON.parse(myJsonTk));
                return resolve();
               }              
               
           })
       }


       
       

module.exports={downloadMyFile ,readMyToken}