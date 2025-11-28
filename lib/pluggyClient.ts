const url = 'https://api.pluggy.ai/auth'

type PluggyApiKeyResponse = {
  apiKey: string;
};

export async function getPluggyApiKey(): Promise<string> {
    const clientId = process.env.PLUGGY_CLIENT_ID;
    const clientSecret = process.env.PLUGGY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error(
            'Missing Client ID or Client Secret!'
        );
    }

    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            clientId: '14500512-786b-4073-b93d-ffea7d2ecdb5',
            clientSecret: '602c17a9-fcdb-4869-8e10-487d05f70ad9'
        })
    };
    const res = await fetch(url, options)

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao obter apiKey da Pluggy: ${res.status} - ${text}`)
    }

    const data = (await res.json()) as PluggyApiKeyResponse;
    return data.apiKey
} 