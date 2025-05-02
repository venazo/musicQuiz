<script>
    import { onMount } from "svelte";

    let {mode = "title", musicPlayer} = $props();

    let tendency = $state("");

    let guess = $state("");
    let bestGuess = $state([]);
    let bestGuessString = $state("");
    let won = $state(false);
    let lost = $state(false);

    let trackID = "";
    let guessable = '';
    let guesses = 3;
    let maxGuesslength = $state(35);

    onMount( async () => Init());

	function onKeyPressed(event)
	{
		if(event.key == "Enter")
		{
            if(!lost && !won ) 
			    Guess();
            else{
                Next();
            }
		}
	}

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
        
        const res = await fetch('http://localhost:3000/get-random-song', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json();
        let song = data.data;

        trackID = "spotify:track:" + song["TrackID"];
        guessable = song[mode].split(" ");

        if(mode == "Year")
        {
            guessable = guessable[0]
            maxGuesslength = 4;
            guess = 2000;
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

    function GuessYear()
    {
        let numGuess = Number(guess);
        let numGuessable = Number(guessable)

        if(numGuess >= (numGuessable - 1) && numGuess <= (numGuessable + 1))
        {
            guess = guessable;
            tendency = "";
            won = true;
            return;
        }

        if(numGuess < numGuessable)
        {
            tendency = "▲";
        }

        if(numGuess > numGuessable)
        {
            tendency = "▼";
        }

        guesses--;

        if(guesses == 0)
        {
            lost = true;
            guess = guessable;
            tendency = "";
            return;
        }
    }

    function Guess()
    {
        if(mode == "Year")
        {
            GuessYear();
            return;
        }

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

    text{
		display: inline-block;
		flex-direction: column;
    	font-family: Tahoma, Verdana;
        font-weight: bold;
        font-size: clamp(2rem, 4vw, 3rem);
    }

    text:hover{
        transform: scale(1.05);
    }

    .tendency {
        color:  #e29924;
    }

    .slider
    {
        appearance: none;
        width: 35vw;
        height: 1vh;
        padding: 1rem 2rem;
        background: #1e1e1e;
        opacity: 0.7;
    }

    .slider:hover{
        transform: scale(1.05);
        box-shadow: 0 6px 25px #3b3b3b;
        opacity: 1;
    }

    .slider::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 3vh;
        height: 3vh;
        background: #e29924;
        border: 0px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .slider::-moz-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 3vh;
        height: 3vh;
        background: #e29924;
        border: 0px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
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
        {#if mode == "Year"}
            <div>
                <text class="guessDisplay">{guess}</text>
                <text class= "tendency"> {tendency}</text>
            </div>

            {#if !won && !lost}
                <input type="range" class="slider" min="1920" max={new Date().getFullYear()} step="1" bind:value={guess}/>
            {/if}
        {:else}
            <text class="guessDisplay">{bestGuessString}</text>
            {#if !won && !lost}
                <input placeholder={"Guess the " + mode + "..."} bind:value={guess} onkeypress={onKeyPressed} maxlength={maxGuesslength} /><br>
            {/if}
        {/if}
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