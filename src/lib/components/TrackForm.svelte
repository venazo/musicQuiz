<!--<script>
	let title = "";
	let artist = "";
	let year = "";
	let trackID = "";

	async function save() {
		const track = { title, artist, year, trackID };

		const res = await fetch('/save-track', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(track)
		});

		if (res.ok) {
			// Clear input fields
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

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
	body{
		background-color: #001113;
	}
	div{
		margin: auto
	}
	input{
		background-color: #ECECED
		border: 3px solid #C4DBDC;
		border-radius: 10px;
	}
</style>
</head>

<body>
<div>
	<label for="title">Title:</label><br>
    <input bind:value={title}><br>
    <label for="artist">Artist:</label><br>
    <input bind:value={artist}><br>
    <label for="year">Year:</label><br>
    <input bind:value={year}><br>
    <label for="trackID">TrackID:</label><br>
    <input bind:value={trackID}><br>

	<button on:click={save}>Save</button><br />
</div>
</body>
-->