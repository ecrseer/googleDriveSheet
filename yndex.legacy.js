let oAuth2Client;
var oAuthData = handy.readStartOauth(fs).
then(things=> oAuth2Client = new google.auth.OAuth2(
    things.web.client_id,
    things.web.client_secret,
    process.env.NODE_ENV=='production'?
 things.web.redirect_uris[1]  : things.web.redirect_uris[0]
)

).catch(err=>{console.log('EROW:'+err)}).then(console.log('*') )

//usefulfunctns----------------

async function readStartOauth(fs){
    return new Promise(
       (resolve,reject)=>{
               
               let myJson = fs.readFileSync('./google-credentials.json');
               if (!myJson) reject({'lindo':'mar'});
               let
               things = JSON.parse(myJson)
               

               resolve(things);
           }
       )
       }