import { NextRequest, NextResponse } from 'next/server';
import { getPluggyApiKey } from '@/lib/pluggyClient';

export async function GET(req: NextRequest) {
  try {
    const apiKey = await getPluggyApiKey();
    return NextResponse.json({
      ok: true,
      apiKeyPreview: apiKey,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message || 'Erro inesperado' },
      { status: 500 }
    );
  }
}
