<script>
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