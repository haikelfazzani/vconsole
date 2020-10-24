export async function savePaste ({ code, filename, expire_date, format }) {
  try {
    let response = await fetch(process.env.REACT_APP_PASTE_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        code: code || "print('hello')",
        filename: (filename || "reacto.js"),
        expire_date: expire_date || "1D",
        format: format || "javascript"
      })
    });


    response = await response.text();
    return response;
  } catch (error) {
    return null;
  }
}