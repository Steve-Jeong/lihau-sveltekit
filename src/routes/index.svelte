<script>
  let data=[];
  let value = 'ab';
  let count = 1;
  let promiseData;

  async function fetchData() {
    // /api/listOfWords/5/ab
    // /api/listOfWords/[numberOfWords]/[startsWith]/index.ts
    const response = await fetch(`/api/listOfWords/${count}/${value}`, {})
    return await response.json();
  };
</script>

<label>
  Start with
  <input name='first_char' bind:value />
</label>

<label> 
  Number of words: 
  <input name='count' type='number' bind:value={count} />
</label>

<button on:click={() => {
  promiseData = fetchData();
}}>Fetch the list of words!!</button>

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