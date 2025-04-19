<script>
    import SongGuess from "$lib/components/SongGuess.svelte";
    import { onMount } from 'svelte';
	import MusicPlayer from "$lib/MusicPlayer";

	onMount(() => {});
</script>

<SongGuess guessable="Dreams" maxGuesses={3} maxGuesslength={20} trackID='spotify:track:4JGKZS7h4Qa16gOU3oNETV' musicPlayer={music_Player} />
