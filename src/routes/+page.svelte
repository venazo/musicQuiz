<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home - MusicQuiz</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</svelte:head>

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

    .a1 {
        font-weight: bold;
        padding: 1rem 2rem;
        border-radius: 30px;
        border: none;
        background: #1e1e1e;
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

    .a1:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px #3b3b3b;
    }

    .button-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }


    @media (max-width: 600px) {
        .at {
            margin-bottom: 2rem;
        }
    }
</style>

<div class="container">
    <div class="button-group">
        <a class="at" href="./"><i class="fas fa-music"></i>MusicQuiz</a>
    </div>
    <div class="button-group">
        <a class="a1" href="/game"><i class="fas fa-play"></i>Play</a>
        <a class="a1" href="/track-form"><i class="fas fa-plus"></i>Add Songs</a>
    </div>
</div>
