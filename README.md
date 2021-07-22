# Overview
This is very simple Colyseus server template. It is mostly initial setup but it could help as a starting point. It creates simple room and displays table of players in room.
# Instalation
You can clone repository by using the command:
```
git clone https://github.com/VGFP/SimpleColyseusServer.git
```
After that you can install it using this command:
```
cd ./SimpleColyseusServer
npm install
```
# Running the server
To run the server simply use this command in project root directory:
```
npm start
```
Server will be listening on port *5796*

For development you can use:
```
npm run start:dev
```
For production you neet to create a build:
```
npm run build
```
After that you can start the server with:
```
npm run start:prod
```
More on the Colyseus website: https://docs.colyseus.io/colyseus/how-to/setup-server-from-scratch-typescript/
# Connecting to the server form Cocos Creator 3.x and Firebase user authentication
To connet with the server using Cocos Creator 3.x you need to install it in your project: https://docs.colyseus.io/getting-started/cocos-creator/
and after that add to the beginig of your script (if you are using *colyseus.js* as an plugin):
```
import Colyseus from "./colyseus.js";
```
and in your class:
```
    @property hostname = "localhost";
    @property port = 5796;
    @property useSSL = false;

    client!: Colyseus.Client;
    room!: Colyseus.Room;
```
Finally to connect the user to the server add this code (for example in function activated by pressing the button):
```
    auth.currentUser.getIdToken(/* forceRefresh */ true).then(async function(idToken) {
      // Send token to your backend via HTTPS
      try {
        NetworkManager.room = await NetworkManager.client.joinOrCreate("GameRoom", 
          {/* options */ accessToken: [idToken, user.uid]});
            console.log("joined successfully", NetworkManager.room);
              
          } catch (e) {
            console.error("join error", e);
          }
            // ...
          }).catch(function(error) {
            // Handle error
          });
```
User must be logged to your firebase project. If you dont want to use firebase delete not needed functions and variables from GameRoom.ts
**To learn more about user verification with firebase check GameRoom.ts and firebase docs: https://firebase.google.com/docs/auth/admin/verify-id-tokens**
In console running the server after player is connected you should see a table with connected users.