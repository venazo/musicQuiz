<svelte:head>
  <title>Add Songs - MusicQuiz</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>
<script>
	let title = "";
	let artist = "";
	let year = "";
	let trackID = "";

	async function save() {
		const track = { title, artist, year, trackID };

		const res = await fetch('http://localhost:3000/serialize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(track)
		});

		if (res.ok) {
			title = "";
			artist = "";
			year = "";
			trackID = "";
			alert("Saved!");
		} else {
			alert("Error saving!");
		}
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
		gap: 0.25rem;
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

	@media (max-width: 600px) {
		.at {
			margin-bottom: 2rem;
		}
	}
</style>



<div class="container">
	<div class="input-group">
		<a class="at" href="./">MusicQuiz</a>
	</div>
	<div class="input-group">
	<input placeholder="Title..." bind:value={title} /><br />
	<input placeholder="Artist..." bind:value={artist} /><br />
	<input placeholder="Year..." bind:value={year} /><br />
	<input placeholder="Track ID..." bind:value={trackID} /><br />

	<button on:click={save}>Save</button>
	</div>
</div>
