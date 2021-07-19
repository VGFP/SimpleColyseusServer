import { Room, Client } from 'colyseus';

export class GameRoom extends Room {

    clientsDict = new Map<string, Client>();

    onJoin(client: Client) {
        this.clientsDict.set(client.sessionId,client)
        console.table(this.clientsDict);
    }

    onLeave(client: Client) {
        this.clientsDict.delete(client.sessionId);
        console.table(this.clientsDict);
    }

}