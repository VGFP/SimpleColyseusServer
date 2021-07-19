import { GameRoom } from './room/GameRoom';
import { Server } from 'colyseus';
import express from 'express';
import * as http from 'http';
import * as url from "url";

const app = express();
app.use(express.json());

const gameServer = new Server({
    server: http.createServer(app)
});
gameServer.define("GameRoom", GameRoom);
gameServer.listen(5796);

console.log('Server is listening on port 5796');