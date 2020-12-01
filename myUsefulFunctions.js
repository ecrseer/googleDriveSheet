const sampl = require('./driveApiSample');

module.exports={
 downloadMyFile(google,oAuth2Client){
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const idF = '1oFmgWIHeQYjwcyC2N0W8TwnBwFicI5B8';
    sampl(idF,drive).then((dt)=>{     
    console.log('A '+dt) }).catch((err)=> console.log('Mrr'+err))

},
 readMyToken(fs,oAuth2Client){
        console.log('reading token');
        let myJson = fs.readFileSync('./meutoken.json');
        oAuth2Client.setCredentials(JSON.parse(myJson));
//        res.render("index", { url: url });    
}
}