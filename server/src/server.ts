import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { MessageTypesEnum } from './constants';

interface Message {
    username: string;
    value: string;
}

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

const users = [];
const messages: Message[] = [];

const messenger = (ws: WebSocket) => {
    const socket = ws;
    return function (type: string, data?: any) {
        return socket.send(JSON.stringify({
            type,
            data
        }))
    }
}


wss.on('connection', (ws: WebSocket) => {
    const send = messenger(ws);

    //connection is up
    ws.on('message', (message: string) => {
        try {
            //log the received message
            const parsedMessage = JSON.parse(message.toString());
            console.log('received: %s', parsedMessage);

            switch (parsedMessage.type) {
                case MessageTypesEnum.WS_PING:
                    send(MessageTypesEnum.WS_PONG)
                    break;
                case MessageTypesEnum.WS_SEND_MESSAGE:
                    messages.push(parsedMessage.data);
                    users.push(parsedMessage.data.username);
                    send(MessageTypesEnum.GET_MESSAGES, messages);
                    break;
                case MessageTypesEnum.REQUEST_MESSAGES:
                    if (messages.length === 0) {
                        send(MessageTypesEnum.WS_NO_MESSAGES);
                    } else {
                        send(MessageTypesEnum.WS_MESSAGES, messages)
                    }
            }
        } catch (error) {
            console.error(error)
        }
    });
});



const PORT = 8999;

//start our server
server.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on port ${PORT} :)`);
});