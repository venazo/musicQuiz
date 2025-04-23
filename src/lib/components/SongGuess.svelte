<script>
    import { onMount } from "svelte";

    let {mode = "title", musicPlayer} = $props();

    let guess = $state("");
    let bestGuess = $state([]);
    let bestGuessString = $state("");
    let won = $state(false);
    let lost = $state(false);

    let trackID = "";
    let guessable = '';
    let guesses = 3;
    let maxGuesslength = $state(20);

    onMount( async () => Init());

    async function Init() 
    {
        let songList;

        guess = "";
        bestGuess = [];
        bestGuessString = "";
        won = false;
        lost = false;
        trackID = "";
        guesses = 3;
        
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


        trackID = "spotify:track:" + randomSong["trackID"];
        guessable = randomSong[mode].split(" ");

        if(mode == "year")
        {
            maxGuesslength = 4;
        }

        bestGuessString = "";
        for(let i = 0; i < guessable.length; i++)
        {
            bestGuess.push(guessable[i].replace(/./g, "_"));
            if(i != 0) {
                bestGuessString += " ";
            }
            bestGuessString += bestGuess[i];
        }
    }

    function Guess()
    {
        const guessWords = guess.split(" ");

        for (let i = 0; i < guessable.length; i++) 
        {
            for(let j = 0; j < guessWords.length; j++) 
            {
                if(guessable[i].toLowerCase() == guessWords[j].toLocaleLowerCase())
                {
                    bestGuess[i] = guessable[i];
                }
            }
        }

        bestGuessString = "";
        for(let i = 0; i < bestGuess.length; i++)
        {
            if(i != 0) {
                bestGuessString += " "; 
            }

            bestGuessString += bestGuess[i];
        }

        guess = "";

        let identical = true
        for(let i = 0; i < guessable.length; i++)
        {
            if(bestGuess[i] != guessable[i])
                identical = false;
        }

        if(identical)
        {
            won = true;
        }
        guesses--;
        if(guesses == 0)
        {
            lost = true;
            bestGuessString = "";
            for(let i = 0; i < guessable.length; i++)
            {
                if(i != 0) {
                    bestGuessString += " "; 
                }

                bestGuessString += guessable[i];
            }
        }
    }

    function Play()
    {
        musicPlayer.PlayTrack(trackID);
    }

    function Next()
    {
        musicPlayer.Stop();
        Init();
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

    .lost {
    	font-family: Tahoma, Verdana;
        font-weight: bold;
        padding: 1rem 2rem;
        border-radius: 30px;
        border: none;
        background: #9a1c1c;
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

    .lost:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px #831a1a;
    }

    .won {
    	font-family: Tahoma, Verdana;
        font-weight: bold;
        padding: 1rem 2rem;
        border-radius: 30px;
        border: none;
        background: #2c9c18;
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

	.won:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px #288218;
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

    .GuessDisplay{
		display: flex;
		flex-direction: column;
    	font-family: Tahoma, Verdana;
        font-weight: bold;
        font-size: clamp(2rem, 4vw, 3rem);
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
        <text class="GuessDisplay">{bestGuessString}</text>
        <input placeholder="Guess the Song..." bind:value={guess} maxlength={maxGuesslength} /><br>
        <button class="button" onclick={Play}><i class="fas fa-play"></i>Start</button>
        {#if won}
            <button class="won" onclick={Next}>Next</button>
        {:else}
            {#if lost}
                <button class="lost" onclick={Next}>Next</button>
            {:else}
                <button class="guess" onclick={Guess}>Guess</button>
            {/if}
        {/if}
    </div>
</div>