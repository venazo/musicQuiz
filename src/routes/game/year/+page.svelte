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

    onDestroy(() => {
        if (music_Player)
            music_Player.Stop();
    });
</script>

<SongGuess mode="Year" musicPlayer={music_Player} />
