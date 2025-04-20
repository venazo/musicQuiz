<script>
    import SongGuess from "$lib/components/SongGuess.svelte";
    import { onMount } from 'svelte';
	import MusicPlayer from "$lib/MusicPlayer";

    let music_Player;

    onMount(() => { 
        music_Player = new MusicPlayer();
        music_Player.Init();
    });
</script>

<SongGuess mode="title" musicPlayer={music_Player} />
