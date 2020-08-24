const express = require("express")
const Expo = require("expo-server-sdk").default
const cors = require("cors")

const expo = new Expo()
const expressServer = express();

expressServer.use(cors())
expressServer.listen(process.env.PORT || 3000, () => {
    console.log("Serveur en ecoute sur "+ (process.env.PORT || 3000 ) )
    expressServer.get("/", function(req, res) {
        const token = req.query.token;
        if(!Expo.isExpoPushToken(token)){
            console.log("Erreur d'envoie");
            res.send( {err : "Erreur d'envoie"} )
        }else{
            let messages = [
                {
                    to: token,
                    sound: 'default',
                    body : 'Notification test',
                    data : { test : 'asfrdh'}
                }
            ]

            expo.sendPushNotificationsAsync(messages).then( ticket => {
                res.send( { ticket : ticket} )
            }).catch( err => {
                console.log("Erreur d'envoie");
            res.send( {err : "Erreur d'envoie"} )
            } )
        }
    })
});