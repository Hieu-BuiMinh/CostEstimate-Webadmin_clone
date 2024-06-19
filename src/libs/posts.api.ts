export async function getPosts() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
		method: 'GET',
	})
	const result = await response.json()
	return result
}
