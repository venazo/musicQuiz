<script>
	import MusicPlayer from "$lib/MusicPlayer";
	import { onMount } from "svelte";

	let music_Player;

	onMount(() => { 
		music_Player = new MusicPlayer();
		music_Player.Init();
	});

	function Play()
	{
		music_Player.PlayTrack("spotify:track:4JGKZS7h4Qa16gOU3oNETV")	
	}
</script>

<button onclick={Play}>
	Play
</button>
