const dotnev = require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const fs = require("fs");
const path = require('path');
const { json } = require('stream/consumers');

const filePath = path.resolve('tracks.json');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
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

app.post('/serialize', (req, res) => {
	const track = req.body;

    console.log(track);

	let existingData = [];

	if (fs.existsSync(filePath)) {
		const raw = fs.readFileSync(filePath, 'utf-8');
		try {
			existingData = JSON.parse(raw);
		} catch {
			existingData = [];
            res.json({"ok": false})
            return;
		}
	}

	existingData.push(track);

	fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.json({"ok": true});
});

app.get('/deserialize', (req, res) => {
	let existingData = [];

	if (fs.existsSync(filePath)) {
		const raw = fs.readFileSync(filePath, 'utf-8');
		try {
			existingData = JSON.parse(raw);
		} catch {
			existingData = [];
		}
	}
    
    res.json(existingData); 
});


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
        let expires_in = tokenResponse.data.expires_in;
        const refresh_token = tokenResponse.data.refresh_token;

        expires_in -= 60;

        const data = [access_token, expires_in, refresh_token]

        res.cookie('spotify_data', data, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.redirect(frontend_uri);

    } catch (error) {
        console.error('Error fetching Spotify token!');
        res.status(400).send('Error getting tokens.');
    }
});

app.get('/token', async (req, res) => {
    const data = req.cookies.spotify_data;

    try {
        if(data[1] <= 0)
        {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: data.refresh_token
                }),
                {
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            if(!response.data["success"])
            {
                throw error;
            }
        }

        res.json({ success: true, token: req.cookies.spotify_data[0]});

    } catch (error) {
        res.json({ success: false, token: "" });
    }
});

app.get('/refresh-token', async (req, res) => {
    const data = req.cookies.data;

    const authHeader = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');
    
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: data[2]
            }),
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const data = [response.data.access_token, response.data.expires_in, response.data.refresh_token];

        res.cookie('spotfiy_data', data, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true });

    } catch (error) {
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));