import { Room, Client } from 'colyseus';
import { jwtVerify } from 'jose/jwt/verify'

export class GameRoom extends Room {

    clientsDict = new Map<string, Client>();

    onJoin(client: Client) {
        this.clientsDict.set(client.sessionId,client)
        console.table(this.clientsDict);
    }

    getJSONP(url: string, success: (arg0: any) => any) {

        var ud = '_' + +new Date,
            script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0] 
                   || document.documentElement;
    
        window[ud] = function(data: any) {
            head.removeChild(script);
            success && success(data);
        };
    
        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);
    
    }
    
    

    async onAuth(client: Client, options: any) {
        const firebaseKeyJSON = await this.getJSONP('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com',function(data) {
            console.log(data);
    });
        const jwt = options.token;
        // const { payload, protectedHeader } = await jwtVerify(jwt, publicKey, {
        //     /**You need to fill this values by yourself */
        //     issuer: 'https://securetoken.google.com/<projectId>', // Must be "https://securetoken.google.com/<projectId>", where <projectId> is the same project ID used for aud above.
        //     audience: 'Firebase project ID' // Must be your Firebase project ID, the unique identifier for your Firebase project, which can be found in the URL of that project's console.
        //   })
    }

    onLeave(client: Client) {
        this.clientsDict.delete(client.sessionId);
        console.table(this.clientsDict);
    }

}