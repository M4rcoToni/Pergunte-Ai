const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;
export async function fetchDataOpenAi(prompt: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });
    const data = await response.json();
    if (data && data.choices && data.choices.length > 0) {
      const response = data.choices[0].text;
      return response;
    } else {
      console.log('Erro', 'Não foi possível.');
    }
  } catch (error) {
    console.log(error);
  }
}
