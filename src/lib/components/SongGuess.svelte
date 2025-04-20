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

<div class="Song">
    <input bind:value={guess} maxlength={maxGuesslength} /><br>
    <button onclick={Guess}>Guess</button>
    <button onclick={Play}>Play</button>
    <text id="guessOutput">{bestGuess}</text>
</div>

<style>
    div
    {
        width: 100%;
        height: 100%;
    }
</style>
