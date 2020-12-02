let oAuth2Client;
var oAuthData = handy.readStartOauth(fs).
then(things=> oAuth2Client = new google.auth.OAuth2(
    things.web.client_id,
    things.web.client_secret,
    process.env.NODE_ENV=='production'?
 things.web.redirect_uris[1]  : things.web.redirect_uris[0]
)

).catch(err=>{console.log('EROW:'+err)}).then(console.log('*') )