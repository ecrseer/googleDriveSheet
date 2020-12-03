const fs = require("fs");
const cors = require('cors');
const express = require("express");
const multer = require("multer");
const handy = require('./myUsefulFunctions');
const { google } = require("googleapis");
var OAuth2Data = require("./google-credentials.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = process.env.NODE_ENV == 'production'?
OAuth2Data.web.redirect_uris[1] : OAuth2Data.web.redirect_uris[0] ;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);



const app = express();
const tabelaCrud = require("./tabelaCrud");

var name, pic;
var authed = false;


// If modifying these scopes, delete token.json.
const SCOPES =
    "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";

app.set("view engine", "ejs");

//me
app.use(express.json());
app.use(cors());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images");
    },
    filename: function (req, file, callback) {
        let aleatori=Math.random() * (142 - 42) + 42;
        callback(null, file.fieldname + "_" + 'gabriel v'+aleatori + "_" + file.originalname);
    },
});

var upload = multer({
    storage: Storage,
}).single("file"); //Field name and max count

function templateBehaviour(resposta){
    var url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    //console.log(url);
    resposta.render("index", { url: url });
}
app.get('/envtest',(req,res)=>{
    console.log(process.env.NODE_ENV);
})


//app.get("/arquivo",tabelaCrud.pesquisar);
let sheetUrl = process.env.MY_SHEET ? ""+process.env.MY_SHEET+"" 
: 'arquivo';
app.post("/"+sheetUrl,tabelaCrud.pesquisar);


app.get("/", (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        try{
       handy.readMyToken(fs,oAuth2Client)
       .then(handy.downloadMyFile(google,oAuth2Client))
       .catch(err=>console.log('erro no handy.readMyToken'))
       
    }catch(err){
        console.log('deu m'+err);        
        //console.log(url);       
        }finally{templateBehaviour(res);}
    } else {
        var oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: "v2",
        });
        oauth2.userinfo.get(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                /* console.log("foi autenticado, irei redirecionar")
                console.log(response.data); */
                name = response.data.name
                pic = response.data.picture
                res.render("success", {
                    name: response.data.name,
                    pic: response.data.picture,
                    success: false
                });
            }
        });
    }
});

app.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong");
        } else {
            console.log(req.file.path);
            const drive = google.drive({ version: "v3", auth: oAuth2Client });
            const fileMetadata = {
                name: req.file.filename,
            };
            const media = {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(req.file.path),
            };
            drive.files.create(
                {
                    resource: fileMetadata,
                    media: media,
                    fields: "id",
                },
                (err, file) => {
                    if (err) {
                        // Handle error
                        console.error('pois é amigo: '+err);
                    } else {
                        fs.unlinkSync(req.file.path)
                        res.render("success", { name: name, pic: pic, success: true })
                    }

                }
            );
        }
    });
});
app.get('/download',(req,res)=>{
    
    handy.downloadMyFile(google,oAuth2Client);
        res.redirect('/')   ;
 }
)
app.get('/logout', (req, res) => {
    authed = false
    res.redirect('/')
})

app.get("/google/callback", function (req, res) {
    const code = req.query.code;
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log("Error authenticating");
                console.log(err);
            } else {
                console.log("Successfully authenticated");
               // console.log(tokens);
                oAuth2Client.setCredentials(tokens);
                //
                fs.writeFile('./meutoken.json', JSON.stringify(tokens), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', './meutoken.json');
                  });

                authed = true;
                res.redirect("/");
            }
        });
    }
});
var porta = process.env.PORT || 5000;
function escutar(){
    app.listen(porta, () => 
    {
        console.log("App is listening on Port"+porta);
    });
}
escutar();
module.exports={escutar}