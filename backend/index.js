// ---1st attempt
global.window = { screen: {} };
global.document = {
    documentElement: { style: {} },
    getElementsByTagName: () => { return []; },
    createElement: () => { return {}; }
};
global.navigator = { userAgent: 'nodejs', platform: 'nodejs' };

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/index', (req, res) => {
    res.send('Hello World! ');
});
app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`);
});

//2nd
// global.window = { screen: {} };
// global.document = {
//     documentElement: { style: {} },
//     getElementsByTagName: () => { return []; },
//     createElement: () => { return {}; }
// };
// global.navigator = { userAgent: 'nodejs', platform: 'nodejs' };

// import { app } from './app.js';
// import debug from "debug"
// import http from "http"
// import {HttpError} from "http-errors"

// const port = process.env.PORT || 3000;
// app.set("port", port);
// console.log(`Starting server on port ${port}`);

// const server = http.createServer(app);

// server.listen(port);
// server.on("error", onError);
// server.on("listening", onListening);

// global.window = { screen: {} };
// global.document = {
//     documentElement: { style: {} },
//     getElementsByTagName: () => { return []; },
//     createElement: () => { return {}; }
// };
// global.navigator = { userAgent: 'nodejs', platform: 'nodejs' };
// import { app } from "./app";
// import debug from "debug";
// import { createServer } from "http";
// const port = process.env.PORT || 3000;
// app.set("port", port);
// console.log(`Starting server on port ${port}`);
// const server = createServer(app);
// server.listen(port);
// server.on("error", onError);
// server.on("listening", onListening);
// function onError(error) {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//     const bind = typeof port === 'string'
//         ? 'Pipe ' + port
//         : 'Port ' + port;
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// }
// function onListening() {
//     let addr = server.address();
//     let bind = typeof addr === 'string'
//         ? 'pipe ' + addr
//         : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
//     debug('Listening on ' + bind);
// }

