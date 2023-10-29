"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const constants_1 = require("./constants");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const users = [];
const messages = [];
const messenger = (ws) => {
    const socket = ws;
    return function (type, data) {
        return socket.send(JSON.stringify({
            type,
            data
        }));
    };
};
wss.on('connection', (ws) => {
    const send = messenger(ws);
    //connection is up
    ws.on('message', (message) => {
        try {
            //log the received message
            const parsedMessage = JSON.parse(message.toString());
            console.log('received: %s', parsedMessage);
            switch (parsedMessage.type) {
                case constants_1.MessageTypesEnum.WS_PING:
                    send(constants_1.MessageTypesEnum.WS_PONG);
                    break;
                case constants_1.MessageTypesEnum.WS_SEND_MESSAGE:
                    messages.push(parsedMessage.data);
                    users.push(parsedMessage.data.username);
                    send(constants_1.MessageTypesEnum.GET_MESSAGES, messages);
                    break;
                case constants_1.MessageTypesEnum.REQUEST_MESSAGES:
                    if (messages.length === 0) {
                        send(constants_1.MessageTypesEnum.WS_NO_MESSAGES);
                    }
                    else {
                        send(constants_1.MessageTypesEnum.WS_MESSAGES, messages);
                    }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
});
const PORT = 8999;
//start our server
server.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on port ${PORT} :)`);
});
//# sourceMappingURL=server.js.map