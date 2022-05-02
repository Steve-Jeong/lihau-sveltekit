import data from '$lib/data'

export async function post({request}) {
  const body = await request.formData();
  console.log(body)
  const bodyObject = Object.fromEntries(body);
  console.log(bodyObject)
  console.log(bodyObject.startsWith)
  console.log(bodyObject.numberOfWords)
  const bodyEntries = Object.entries(bodyObject)
  console.log(bodyEntries);

  const {numberOfWords, startsWith} = bodyObject;
  const result = data.filter(
    (word) => word.startsWith(startsWith)
  ).slice(0, numberOfWords)

  return {
    body: result
  }
}