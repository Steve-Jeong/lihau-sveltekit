import data from '$lib/data';

export function get({ request, url }) {
  console.log(url.searchParams);
  const numberOfWords = Number(url.searchParams.get("numberOfWords"));
  const startsWith = url.searchParams.get("startsWith");
  const result = data.filter(
    (word) => word.startsWith(startsWith)
  ).slice(0, numberOfWords)

  return {
    body: result
  }
}

export async function post({ request }) {
  const res = await request.json(); 
  console.log(res);
  const {numberOfWords, startsWith} = res;
  const result = data.filter(
    (word) => word.startsWith(startsWith)
  ).slice(0, numberOfWords)

  return {
    body: result
  }
}
