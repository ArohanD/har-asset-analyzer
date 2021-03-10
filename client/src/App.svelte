<script lang="ts">
  let step = 1;
  let url = "http://www.example.com";
  let iterations = 3;
  console.log(url);
  const advanceStep = () => {
    step += 1;
	console.log(url, iterations)
    // fetch('/test', {});
  };

  $: if(step == 2) {
	  fetch('/getAssets?' + new URLSearchParams({
		  url: url
	  }))
  }
</script>

<main>
  <h1>Har Asset Analyzer</h1>

  <h2>Step {step}</h2>

  {#if step === 1}
    <p>Enter a url to get started</p>
    <input type="text" bind:value={url} />
	<button on:click={advanceStep}>Gather Assets</button>
  {/if}

  {#if step === 2}
    <p>How many times would you like to run the test?</p>
    <input type="number" bind:value={iterations} min="1" max="50"/>
	<button on:click={advanceStep}>Set Iterations</button>
  {/if}

</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
