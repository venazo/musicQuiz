<script>
	import { onMount } from "svelte";

	let { mode = "title", musicPlayer } = $props();

	let guess = "";
	let bestGuessArray = [];
	let guessesLeft = 3;
	let isCorrect = false;
	let showNext = false;

	let trackID = 'spotify:track:';
	let guessable = '';
	let songWords = [];

	let allSongs = [];
	let currentIndex = -1;

	async function loadRandomSong() {
		if (allSongs.length === 0) {
			const res = await fetch('http://localhost:3000/deserialize');
			const data = await res.json();
			allSongs = data;
		}

		currentIndex = Math.floor(Math.random() * allSongs.length);
		const randomSong = allSongs[currentIndex];
		trackID = 'spotify:track:' + randomSong["trackID"];
		guessable = randomSong[mode];
		songWords = guessable.split(" ");
		bestGuessArray = Array(songWords.length).fill("_");
		guessesLeft = 3;
		isCorrect = false;
		showNext = false;

		console.log("Loaded song:", guessable);
	}

	onMount(() => {
		loadRandomSong();
	});

	function normalize(word) {
		return word.toLowerCase();
	}

	function Guess() {
		if (isCorrect || guessesLeft === 0) return;

		const guessWords = guess.trim().split(" ").map(normalize);

		songWords.forEach((word, i) => {
			if (guessWords.includes(normalize(word))) {
				bestGuessArray[i] = word;
			}
		});

		if (bestGuessArray.join(" ") === songWords.join(" ")) {
			isCorrect = true;
			showNext = true;
		} else {
			guessesLeft--;
			if (guessesLeft === 0) {
				showNext = true;
			}
		}

		guess = "";
	}

	function Play() {
		musicPlayer.PlayTrack(trackID);
	}

	function nextSong() {
		loadRandomSong();
	}
</script>

<div class="Song">
	<div>
		<a class="at" href="./">MusicQuiz</a>
	</div>
	<div class="input-group">
		<input placeholder="Guess..." bind:value={guess} maxlength={50} /><br>
		<button on:click={Play}><i class="fas fa-play"></i>Start</button>
		<button on:click={Guess} disabled={isCorrect || guessesLeft === 0}>Guess</button>
	</div>

	<h3>
		{#each bestGuessArray as word}
			<span style="margin: 0 0.3em">{word}</span>
		{/each}
	</h3>

	<p>Guesses left: {guessesLeft}</p>

	{#if isCorrect}
		<p style="color: lightgreen; font-size: 2rem;">✔️ Correct!</p>
	{/if}

	{#if showNext}
		<button on:click={nextSong}>Next Song</button>
	{/if}
</div>
