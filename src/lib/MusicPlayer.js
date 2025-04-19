export default class MusicPlayer 
{
    constructor()
    {
		this.player;
        this.deviceId = 0;
		this.token = "";
    }

    async Init()
    {
        const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		document.body.appendChild(script);

		this.token = "BQC5FHFTRAp2RrSdxSsXy8BuKSmEUPGWWczExXEEQ828G9fzcuykHQZl52tbSPHhW_Wo0XG966gVl1OHn0DXqH2lQ6ZC_aw4L1kTRR3npW52_9e3RCASFu1JrMP92MPVmtaUcM2vBr43ULI3vBDiHS5VOX6BslnOkMU12CUDxAWoxo_qUWmtiMwZIOMwnDbFo3BhhPYIgl1jP5tW-7pZwrKSgHk2RXY7N3_M6_UKfKGUwUr9klD52VsGrhviAnTi";

		window.onSpotifyWebPlaybackSDKReady = () => {
			const spotifyPlayer = window.Spotify;

			this.player = new spotifyPlayer.Player({
				name: 'My Web Player',
				getOAuthToken: async cb => {
					const res = await fetch('http://localhost:3000/token', { credentials: 'include' });
					if (!res.ok) throw new Error('Not authenticated');
					let data = await res.json();
					this.token = data.token;

					cb(this.token);
				},
				volume: 0.5
			});

			this.player.addListener('ready', ({ device_id }) => {
				this.deviceId = device_id;
				console.log('Device is ready with ID:', device_id);
			});

			this.player.addListener('player_state_changed', state => {
				if (!state) return;
				console.log('Now playing:', state.track_window.current_track?.name);
			});

			this.player.addListener('authentication_error', ({ message }) => {
				console.error('Spotify Player authentication_error:', message);
			  });

			this.player.connect();
		};
    }

    async PlayTrack(trackID)
    {
        if (!this.deviceId) {
			console.warn('Device not ready yet.');
			return;
		}

		const trackUri = trackID;

		const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${this.token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uris: [trackUri]
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Playback failed:', errorData);
		} else {
			console.log('Playback started!');
		}
	}
}