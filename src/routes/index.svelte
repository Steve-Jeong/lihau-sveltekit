<script>
  let data = [];
  let value = "a";
  let count = 1;
  let promiseData;

  async function fetchDataDynamicRoute() {
    // Option 1. Using Dynamic Routes
    // GET /api/listOfWords/5/ab
    //
    // /api/listOfWords/[numberOfWords]/[startsWith]/index.ts
    // /api/listOfWords/[numberOfWords]/[startsWith].ts
    const response = await fetch(`/api/listOfWords/${count}/${value}`, {})
    return await response.json();
  }

  async function fetchDataQueryStrings() {
    // Option 2. Using Query Strings
    // GET /api/listOfWords?numberOfWords=1&startWith=ab
    //
    // /api/listOfWords.ts
    // /api/listOfWords/index.ts
    const query = new URLSearchParams();
    if (count) {
      query.set("numberOfWords", String(count));
    }
    if (value) {
      query.set("startsWith", value);
    }
    const response = await fetch(`/api/listOfWords?${query.toString()}`)

    return await response.json();
  }

  async function fetchDataPostMethod() {
    // Option 3. Using POST request
    // Send request data through separate request body
    // POST /api/listOfWords
    const response = await fetch(`/api/listOfWords`, {
      method: 'POST',
      // headers: {
      //   'Content-Type' : 'application/json'
      // },
      body: JSON.stringify({
        numberOfWords : count,
        startsWith : value,
      })
    })

    return await response.json();
  }

  async function fetchDataForm() {
    // Optin 4. Using Form
    const response = await fetch(`/api/form`)

    return await response.json();
  }
</script>

<div class='dynamicRoute'>
  <h3>Using Dynamic Route Parameter</h3>
  <label>
    Start with
    <input name="first_char" bind:value />
  </label>
  
  <label>
    Number of words:
    <input name="count" type="number" bind:value={count} />
  </label>
  <button
    on:click={() => {
      promiseData = fetchDataDynamicRoute();
    }}>Fetch words</button
  >
</div>

<div class='queryStrings'>
  <h3>Using Query Strings</h3>
  <label>
    Start with
    <input name="first_char" bind:value />
  </label>
  
  <label>
    Number of words:
    <input name="count" type="number" bind:value={count} />
  </label>
  <button
    on:click={() => {
      promiseData = fetchDataQueryStrings();
    }}>Fetch words</button
  >
</div>

<div class='postMethod'>
  <h3>Using Post Method</h3>
  <label>
    Start with
    <input name="first_char" bind:value />
  </label>
  
  <label>
    Number of words:
    <input name="count" type="number" bind:value={count} />
  </label>
  <button
    on:click={() => {
      promiseData = fetchDataPostMethod();
    }}>Fetch words</button
  >
</div>

<div class='formMethod'>
  <h3>Using Form</h3>
  <form 
    action="/api/form" 
    method="POST" 
    >
    <label>
      Start with
      <input name="startsWith" bind:value />
    </label>
    
    <label>
      Number of words:
      <input 
        name="numberOfWords" 
        type="number" 
        bind:value={count} 
        max={20}
      />
    </label>
    
    <button type='submit'>Fetch words</button>
  </form>
</div>

{#if promiseData}
  {#await promiseData}
    Loading ...
  {:then data}
    <ul>
      {#each data as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/await}
{/if}

<hr />
value : {value}<br />
count : {count}<br />

<style>
  div {
    padding : 3px;
    margin-top : 10px;
    border : 1px solid red
  }

</style>