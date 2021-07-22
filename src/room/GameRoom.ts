import { Room, Client } from 'colyseus';
import { request } from 'https';
import * as admin from 'firebase-admin';

// Please check documentation: 
/** https://firebase.google.com/docs/auth/admin/verify-id-tokens#web */ 
const serviceAccount = require('path to your json file with private key');

export class GameRoom extends Room {

    clientsDict = new Map<string, Client>();

    onCreate() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "you will get this URL when you create your private key"
          });
    }

    onJoin(client: Client) {
        this.clientsDict.set(client.sessionId,client)
        console.table(this.clientsDict);
    }
    
    async onAuth(client: Client, options: any) {
        
        const jwt = options.accessToken[0];

        let ret_val: boolean;
        
        await admin
            .auth()
            .verifyIdToken(jwt)
            .then((decodedToken) => {
                
                const uid = decodedToken.uid;
                // console.log(uid);
                if (uid == options.accessToken[1]) {
                    console.log(":)");
                    ret_val = true;
                } else {
                    console.log("UID do not match");                   
                    ret_val = false;
                }

            })
            .catch((error) => {
                // Handle error
                console.log(error);
                
                ret_val = false;
            });

            return ret_val;
    }

    onLeave(client: Client) {
        this.clientsDict.delete(client.sessionId);
        console.table(this.clientsDict);
    }

}