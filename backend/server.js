require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const frontend_uri = process.env.FRONTEND_URI;

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

app.get('/login', (req, res) => {
    var state = generateRandomString(16);
    const scope = [
        'streaming',
        'user-read-private',
        'user-read-email'
      ].join(' ');
    const redirect_uri = process.env.REDIRECT_URI;
    const client_id = process.env.SPOTIFY_CLIENT_ID;

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
});

app.get('/callback', async (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;
    

    let tokenResponse;

    try {  
        if (state === null) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
                code,
                redirect_uri,
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
                }
            });
        }

        const access_token = tokenResponse.data.access_token;
        res.cookie('spotify_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        });

        res.redirect('http://localhost:5173/dashboard');

    } catch (error) {
        console.error('Error fetching Spotify token!');
        res.status(400).send('Error getting tokens.');
    }
});

app.get('/token', (req, res) => {
    const token = req.cookies.spotify_token;
    res.json({ token });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));