<svelte:head>
  <title>Add Songs - MusicQuiz</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</svelte:head>

<script>
    import TrackForm from "$lib/components/TrackForm.svelte";
    import {onMount } from "svelte"
    import { CheckIfLoggedIn } from '$lib/CheckIfLoggedIn';

    onMount(() => { 
        CheckIfLoggedIn();
    });
</script>

<TrackForm />
