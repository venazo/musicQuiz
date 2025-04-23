<svelte:head>
  <title>Play - MusicQuiz</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</svelte:head>
<script>
    import { onMount } from "svelte";


    let {mode = "title", musicPlayer} = $props();

    let guess = $state("");
    let bestGuess = $state("");

    let trackID = 'spotify:track:'
    let guessable = '';
    let guesses = 3;
    let maxGuesslength = $state(20);

    onMount( async () =>
    {
        let songList;

        const res = await fetch('http://localhost:3000/deserialize', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            songList = data
        });

        let index = Math.floor(Math.random() * songList.length);
        let randomSong = songList[index];

        trackID += randomSong["trackID"];
        console.log(randomSong);
        guessable = randomSong[mode];

        if(mode == "year")
        {
            maxGuesslength = 4;
        }
    });



    function Guess()
    {
        const songWords = guessable.split(" ");
        const guessWords = guess.split(" ");
        const bestGuessWords = bestGuess.split(" ");

        let pos = [];

        for (let i = 0; i < songWords.length; i++) 
        {
            for(let j = 0; j < guessWords.length; j++) 
            {
                if(songWords[i] == guessWords[j])
                {
                    pos.push(i);
                }
            }
        }

        let double = false;
        for(let i = 0; i < pos.length; i++)
        {
            for(let j = 0; j < bestGuessWords.length; j++)
            {
                if(bestGuessWords[j] == songWords[pos[i]])
                {
                    double = true;
                    break;
                }
            }
            if(double == false)
            {
                bestGuess += " ";
                bestGuess += songWords[pos[i]];
            }
            else
            {
                double = false;
            }
        }

        if(bestGuess == guessable)
        {
            
        }
    }

    function Play()
    {
        musicPlayer.PlayTrack(trackID);
    }
</script>

<style>
    :global(body) {
		margin: 0;
		padding: 0;
		font-family: Tahoma, Geneva, Verdana, sans-serif;
		background-color: #121212;
		color: #ffffff;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		text-align: center;
		width: 90%;
		max-width: 600px;
	}

	.at {
		color: #A67527;
		font-size: clamp(2.5rem, 10vw, 6rem);
		margin-bottom: 4rem;
		font-family: Tahoma, Verdana;
		text-decoration: none;
		font-weight: bold;
		display: block;
	}

	input {
		padding: 1rem;
		width: 60%;
		max-width: 400px;
		border-radius: 25px;
		border: 2px solid #2e2e2e;
		background-color: #1e1e1e;
		color: white;
		font-size: clamp(1rem, 2vw, 2rem);
		font-family: Tahoma, Verdana;
		outline: none;
		transition: border-color 0.3s ease;
	}

	input:hover {
    	border-color: #D5D5D5;
        }

	.input-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	button {
    	font-family: Tahoma, Verdana;
        font-weight: bold;
    	padding: 1rem 2rem;
		border-radius: 25px;
		border: 2px solid #2e2e2e;
		background-color: #1e1e1e;
		color: white;
		font-size: clamp(1rem, 2vw, 2rem);
		outline: none;
		transition: border-color 0.3s ease;
        text-decoration: none;
		display: inline-block;
        width: clamp(120px, 30vw, 250px);
    }

	button:hover {
    	border-color: #D5D5D5;
	}

    i {
        margin-right: 0.5rem;
    }

	@media (max-width: 600px) {
		.at {
			margin-bottom: 2rem;
		}
	}
</style>

<div class="Song">
    <div>
        <a class="at" href="./">MusicQuiz</a>
    </div>
    <div class="input-group">
        <input placeholder="Guess..." bind:value={guess} maxlength={maxGuesslength} /><br>
        <button onclick={Play}><i class="fas fa-play"></i>Start</button>
        <button onclick={Guess}>Guess</button>
    </div>
    <text id="guessOutput">{bestGuess}</text>
</div>