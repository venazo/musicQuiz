<script>
    import { json } from "@sveltejs/kit";

	let trackID = "";

	function onKeyPressed(event)
	{
		if(event.key == "Enter")
		{
			save();
		}
	}

	async function save() {
		const res = await fetch('http://localhost:3000/add-song', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({ id: trackID })
		});

		let data = await res.json();

		if (data.success) {
			trackID = "";
		}

		console.log(data.message);
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
		gap: 0.25rem;
	}

	button {
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

	button:hover {
		transform: scale(1.05);
        box-shadow: 0 6px 25px #a27020;
	}

	@media (max-width: 600px) {
		.at {
			margin-bottom: 2rem;
		}
	}
</style>



<div class="container">
	<div class="input-group">
		<a class="at" href="./"><i class="fas fa-music"></i>MusicQuiz</a>
		<input placeholder="Spotfiy TrackID..." bind:value={trackID} onkeypress={onKeyPressed} /><br />

		<button onclick={save}>Save</button>
	</div>
</div>
