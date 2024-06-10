// "dev": "next dev",
// "build": "next build",
// "start": "next start",
// "lint": "next lint",
// "node": "node server.js"
import socketio from 'socket.io';
import { verify } from 'jsonwebtoken';
import { model } from 'mongoose';

import { ROLES } from '../constants';
import { jwt as _jwt } from '../config/keys';
const User = model('User');

import { findUserById, users, supportHandler } from './support';

const authHandler = async (socket, next) => {
    const { token = null } = socket.handshake.auth;
    if (token) {
        const [authType, tokenValue] = token.trim().split(' ');
        if (authType !== 'Bearer' || !tokenValue) {
            return next(new Error('no token'));
        }

        const { secret } = _jwt;
        const payload = verify(tokenValue, secret);
        const id = payload.id.toString();
        const user = await User.findById(id);

        if (!user) {
            return next(new Error('no user found'));
        }

        const u = {
            id,
            role: user?.role,
            isAdmin: user.role === ROLES.Admin,
            name: `${user?.firstName} ${user?.lastName}`,
            socketId: socket.id,
            messages: []
        };

        const existingUser = findUserById(id);
        if (!existingUser) {
            users.push(u);
        } else {
            existingUser.socketId = socket.id;
        }
    }
    else {
        return next(new Error('no token'));
    }

    next();
};

const socket = server => {
    const io = socketio(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.use(authHandler);

    const onConnection = socket => {
        supportHandler(io, socket);
    };

    io.on('connection', onConnection);
};

export default socket;