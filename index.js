/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import router from './routers/masterRouter.js';
import usersRepository from './repositories/userRepository.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(router);
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('search-value', async (value) => {
    const search = await usersRepository.getUserByInput(value);
    socket.emit('search_result', search);
  });
});
httpServer.listen(4005, () => {
  console.log('Sockets running on port 4005');
});
app.listen(process.env.PORT, () => {
  console.log(chalk.bold.blue('Server running on port', process.env.PORT));
});
