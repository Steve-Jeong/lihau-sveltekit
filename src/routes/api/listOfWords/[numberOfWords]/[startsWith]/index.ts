import data from '$lib/data';
export function get({ request, params }) {
  // console.log(params)
  const numberOfWords = Number(params.numberOfWords);
  const startsWith = params.startsWith;
  const result = data.filter(
    (word) => word.startsWith(startsWith)
  ).slice(0, numberOfWords)

  return {
    body: result
  }
}