async function post(url, data) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Origin': '*'
  }
  const response = await fetch(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(data)
  })
  return response
}

export { post }
