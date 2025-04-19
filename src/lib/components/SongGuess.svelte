<script>

    let guess = $state("");
    let bestGuess = $state("");

    let {guessable, maxGuesslength, trackID, musicPlayer} = $props();

    function Guess()
    {
        const songWords = guessable.split(" ");
        const guessWords = guess.split(" ");

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

        bestGuess = "";

        for(let i = 0; i < pos.length; i++)
        {
            bestGuess += songWords[pos[i]];
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
