import { Bank } from "@/types/Bank/Bank";

const url = 'https://api.pluggy.ai/auth'

// lib/pluggyClient.ts (por exemplo)

const PLUGGY_BASE_URL = 'https://api.pluggy.ai';

// cache em memória
let cachedApiKey: string | null = null;
let cachedApiKeyExpiresAt: number | null = null;

// 100 minutos em ms (2h - margem de segurança)
const API_KEY_TTL_MS = 100 * 60 * 1000;

export async function getPluggyApiKey(): Promise<string> {
  const now = Date.now();

  // Se temos apiKey em cache e ainda está válido, retorna
  if (cachedApiKey && cachedApiKeyExpiresAt && now < cachedApiKeyExpiresAt) {
    return cachedApiKey;
  }

  const clientId = process.env.PLUGGY_CLIENT_ID;
  const clientSecret = process.env.PLUGGY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Client ID or Client Secret!');
  }

  const res = await fetch(`${PLUGGY_BASE_URL}/auth`, {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ clientId, clientSecret }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ao obter apiKey da Pluggy: ${res.status} - ${text}`);
  }

  const data = (await res.json()) as { apiKey: string };

  cachedApiKey = data.apiKey;
  cachedApiKeyExpiresAt = now + API_KEY_TTL_MS;

  return cachedApiKey;
}


export async function getConnectToken(itemId?: string) {
  const apiKey = await getPluggyApiKey();
  const url = 'https://api.pluggy.ai/connect_token';

  const body: any = {};

  if (itemId) {
    body.updateItem = itemId;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Erro ao gerar Connect Token: ${res.status} - ${text} `)
  }

  const data = await res.json();
  return data as { accessToken: string };


}

export async function getConnectors(): Promise<Bank[]> {
  const apiKey = await getPluggyApiKey();

  const url = 'https://api.pluggy.ai/connectors?countries=BR&isOpenFinance=true';

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey,
      accept: 'application/json',
      'content-type': 'application/json'
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ao buscar connectors: ${res.status} - ${text}`);
  }

  const data = await res.json();

  return data.results;
}