const dotnev = require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const fs = require("fs");
const path = require('path');
const { json } = require('stream/consumers');
const { error } = require('console');

const filePath = path.resolve('tracks.json');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.PUBLIC_REDIRECT_URI;
const frontend_uri = process.env.PUBLIC_FRONTEND_URI;
const strapi_uri = process.env.STRAPI_URI;
const strapi_token = process.env.STRAPI_TOKEN;

const app = express();
app.use(express.json());

app.use(cors({
    origin: frontend_uri,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(cookieParser());

let authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

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
                    'Authorization': 'Basic ' + authHeader
                }
            });
        }

        const access_token = tokenResponse.data.access_token;
        let time_created = Date.now();
        const refresh_token = tokenResponse.data.refresh_token;

        const data = JSON.stringify([access_token, time_created, refresh_token]);

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

    if(!data)
    {
        res.json({ success: false, token: "" });
    }

    let spotify_data = JSON.parse(data);
    let access_token = spotify_data[0];
    let time_created = spotify_data[1];
    let refresh_token = spotify_data[2];

    let dt = time_created + (60*60*1000) - Date.now();

    try {
        if(dt <= 0)
        {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token', new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token
                }),
                {
                    headers: {
                        Authorization: `Basic ` + authHeader,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            if(!response.data)
            {
                throw error;
            }

            spotify_data = JSON.parse(response.data);

            access_token = spotify_data[0];
        }



        res.json({ success: true, token: access_token});

    } catch (error) {
        console.log("ERROR");
        res.json({ success: false, token: "" });
    }
});

app.get('/get-random-song', async (req, res) => {
    try{
        const response = await axios.get(
            strapi_uri + "/api/songs",
            {
                headers: {
                    Authorization: `Bearer ` + strapi_token
                },
            }
        );

        let index = Math.floor(Math.random() * response.data.data.length);

        res.json({success: true, data: response.data.data[index]});
    }
    catch(error)
    {
        res.json({success: false, data: ""})
    }

});

app.post('/add-song', async (req, res) => {
    
    let errMes = "Standart Error!";

    try {
        const data = req.cookies.spotify_data;
        spotify_data = JSON.parse(data);

        const trackInfo = await axios.get('https://api.spotify.com/v1/tracks/' + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + spotify_data[0]
            }
        });

        let title = trackInfo.data.name;
        let artist = trackInfo.data.artists[0].name;
        let year = trackInfo.data.album.release_date.slice(0, 4);
        let trackID = trackInfo.data.id;

        let duplicate = false;

        const res = await axios.get(
            strapi_uri + "/api/songs",
            {
                headers: {
                    Authorization: `Bearer ` + strapi_token
                }
            }
        );

        if(!res.data)
        {
            errMes = "No Strapi response!"
            throw error;
        }

        for(let i = 0; i < res.data.data.length; i++)
        {
            if(res.data.data[i]["TrackID"] == trackID)
            {
                duplicate = true;
                break;
            }
        }

        if(duplicate)
        {
            errMes = title + ' is already added!';
            throw error;
        }

        const response = await axios.post(
            strapi_uri + "/api/songs",
            {
                data: {
                    Title: title,
                    Artist: artist,
                    Year: year,
                    TrackID: trackID
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ` + strapi_token
                }
            }
        );
        
        res.json({success: true, message: 'Added ' + title + "!"});
    }
    catch(error)
    {
        res.json({success: false, message: errMes})
    }
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));