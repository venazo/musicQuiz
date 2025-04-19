<script>
	let isPlaying = false;

	function togglePlay() {
		isPlaying = !isPlaying;
	}
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: #121212; /* dark background */
		color: #ffffff;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		text-align: center;
		width: 100%;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 4rem;
	}

	input {
		padding: 1rem;
		width: 60%;
		max-width: 400px;
		border-radius: 25px;
		border: 2px solid #2e2e2e;
		background-color: #1e1e1e;
		color: white;
		font-size: 1rem;
		outline: none;
		transition: border-color 0.3s ease;
	}

	input:hover {
		border-color: #00bcd4; /* cool cyan on hover */
	}

	button {
		margin-top: 2rem;
		padding: 0.8rem 2rem;
		border: none;
		border-radius: 20px;
		background-color: #00bcd4;
		color: white;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #0097a7;
	}
</style>

<div class="container">
	<h1>MusicQuiz</h1>
	<input type="text" placeholder="Type your guess..." />
	<br />
	<button on:click={togglePlay}>
		{isPlaying ? 'Pause' : 'Play'}
	</button>
</div>
