const compilers = {
 
}

export default async function RunnerService(language, source) {
  if(!language || !source) return;
  const response = await fetch(compilers[language], {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      backtrace: false,
      channel: "stable",
      code: source,
      crateType: "bin",
      edition: "2021",
      mode: "debug",
      tests: false,
    })
  });

  const result = await response.json();
  return result.stdout + '\n' + result.stderr
}