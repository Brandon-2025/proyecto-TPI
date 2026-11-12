const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002;
const NODE_NAME = process.env.NODE_NAME || 'Nodo 2 (3002)';
const JWT_SECRET = process.env.JWT_SECRET || 'SecretClaveCompartidaFase0';

app.use(express.json());
app.use(cookieParser());

// Serve static frontend assets (React/PWA build)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify or attach JWT session
app.use((req, res, next) => {
    let token = req.cookies.poc_session || req.headers['authorization']?.split(' ')[1];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            req.user = null;
        }
    }
    
    if (!req.user) {
        // Create initial guest session if none exists
        const newUser = {
            id: 'user_' + Math.floor(1000 + Math.random() * 9000),
            role: 'Estudiante/Evaluador',
            createdAt: new Date().toISOString()
        };
        token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '24h' });
        res.cookie('poc_session', token, { httpOnly: false, sameSite: 'lax' });
        req.user = newUser;
        req.newToken = token;
    }
    next();
});

// API Endpoint returning cluster status and current handling node
app.get('/api/info', (req, res) => {
    res.json({
        handledBy: NODE_NAME,
        user: req.user,
        environment: process.env.APP_ENV || 'Desarrollo / Intranet',
        timestamp: new Date().toLocaleTimeString(),
        token: req.newToken || req.cookies.poc_session
    });
});

// Login endpoint simulation
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    const user = {
        id: username || 'usuario_demo',
        role: 'Usuario Autenticado',
        loginTime: new Date().toLocaleTimeString()
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('poc_session', token, { httpOnly: false, sameSite: 'lax' });
    res.json({ success: true, user, token, handledBy: NODE_NAME });
});

// Serve PWA SPA entry
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[${NODE_NAME}] Servidor iniciado en puerto ${PORT}`);
});
