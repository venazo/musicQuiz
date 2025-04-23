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
        font-family: Tahoma, Verdana, sans-serif;
        background: linear-gradient(145deg, #121212, #414141);
        color: #ffffff;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

	.container {
        text-align: center;
        width: 90%;
        max-width: 600px;
        position: relative;
        z-index: 1;
    }

	.at {
        color: #e29924;
        font-size: clamp(2.5rem, 10vw, 6rem);
        margin-bottom: 3rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-decoration: none;
        transition: transform 0.3s ease;
    }

    .at:hover {
        transform: scale(1.01);
    }

    .at i {
        font-size: 1.2em;
        color: #e29924;
        margin-right: 0.75rem;
    }
	

	input {
		padding: 1rem 2rem;
		width: clamp(150px, 35vw, 300px);
		border-radius: 30px;
		border: none;
		background-color: #1e1e1e;
		color: white;
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-family: Tahoma, Verdana;
		outline: none;
		transition: transform 0.2s ease, box-shadow 0.3s ease;
		gap: 0.5rem;
        backdrop-filter: blur(8px);
		justify-content: center;
		display: inline-flex;
        align-items: center;
	}

	input:hover {
    	transform: scale(1.05);
        box-shadow: 0 6px 25px #3b3b3b;
        }

	.input-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.guess {
    	font-family: Tahoma, Verdana;
        font-weight: bold;
        padding: 1rem 2rem;
        border-radius: 30px;
        border: none;
        background: #e29924;
        color: #fff;
        font-size: clamp(1rem, 2vw, 1.5rem);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        backdrop-filter: blur(8px);
        transition: transform 0.2s ease, box-shadow 0.3s ease;
        width: clamp(150px, 35vw, 300px);
    }

	.guess:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px #a27020;
	}

    .button {
    	font-family: Tahoma, Verdana;
        font-weight: bold;
        padding: 1rem 2rem;
        border-radius: 30px;
        border: none;
        background: #1e1e1e;
        color: #fff;
        font-size: clamp(1rem, 2vw, 1.5rem);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        backdrop-filter: blur(8px);
        transition: transform 0.2s ease, box-shadow 0.3s ease;
        width: clamp(150px, 35vw, 300px);
    }

	.button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px #3b3b3b;
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
        <a class="at" href="./"><i class="fas fa-music"></i>MusicQuiz</a>
    </div>
    <div class="input-group">
        <input placeholder="Guess the Song..." bind:value={guess} maxlength={maxGuesslength} /><br>
        <button class="button" onclick={Play}><i class="fas fa-play"></i>Start</button>
        <button class="guess" onclick={Guess}>Guess</button>
    </div>
    <text id="guessOutput">{bestGuess}</text>
</div>