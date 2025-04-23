<svelte:head>
  <title>Game - MusicQuiz</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</svelte:head>

<script>
    import SongGuess from "$lib/components/SongGuess.svelte";
    import { onMount } from 'svelte';
	import MusicPlayer from "$lib/MusicPlayer";
    import { CheckIfLoggedIn } from '$lib/CheckIfLoggedIn';
    import { onDestroy } from "svelte";

    let music_Player;

    onMount(() => { 
        CheckIfLoggedIn();

        music_Player = new MusicPlayer();
        music_Player.Init();
    });

    function Href(page)
    {
        window.location.assign("./game/" + page);
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
        box-shadow: 0 6px 25px #3b3b3b;
	}

    div {
        display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
        text-align: center;
        width: 90%;
        max-width: 600px;
        position: relative;
        z-index: 1;
		gap: 1rem;
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

    .title {
        background-color: #1e1e1e;
    }

    .artist {
        background-color: #1e1e1e;
    }

    .year {
        background-color: #1e1e1e;
    }
</style>

<div>
    <a class="at" href="./"><i class="fas fa-music"></i>MusicQuiz</a>
    <button class="title" onclick={Href("title")}>Title</button>    
    <button class="artist" onclick={Href("artist")}>Artist</button>
    <button class="year" onclick={Href("year")}>Year</button>
</div>



