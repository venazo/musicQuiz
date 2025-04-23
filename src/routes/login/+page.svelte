<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MusicQuiz</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</svelte:head>

<style>
    :global(body) {
		margin: 0;
		padding: 0;
		font-family: Tahoma, Geneva, Verdana, sans-serif;
		background-color: #121212;
		color: #ffffff;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		text-align: center;
		width: 90%;
        max-width: 600px
	}

	.at {
    	color: #A67527;
        font-size: clamp(2.5rem, 10vw, 6rem);
		margin-bottom: 4rem;
        font-family: Tahoma, Verdana;
        text-decoration: none;
        font-weight: bold;
        display: block
	}

    .a_login {
    	font-family: Tahoma, Verdana;
        font-weight: bold;
    	padding: 1rem 2rem;
		border-radius: 25px;
		border: 2px solid #2e2e2e;
		background-color: #1ED760;
		color: white;
		font-size: clamp(1rem, 2vw, 2rem);
		outline: none;
		transition: border-color 0.3s ease;
        text-decoration: none;
        display: inline-block;
        width: clamp(120px, 30vw, 250px);
    }
    
    .a_login:hover {
    	border-color: #01BE45;
        }

    .button-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      }

    i {
        margin-right: 0.5rem;
    }

      @media (max-width: 600px) {
      .at {
        margin-bottom: 2rem;
      }
    }

</style>


    <div class="container">
        <div class ="button-group">
            <a class="at" href="./">MusicQuiz</a>
        </div>
        <div class="button-group">
            <a class="a_login" href="http://localhost:3000/login"><i class="fab fa-spotify"></i>Login</a>
        </div>
    </div>






