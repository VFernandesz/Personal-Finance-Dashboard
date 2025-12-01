// app/api/open-finance/register-item/route.ts
import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { itemId, userId, institution } = await req.json();

    if (!itemId || !userId) {
      return NextResponse.json(
        { ok: false, error: 'itemId e userId são obrigatórios' },
        { status: 400 }
      );
    }

    // aqui você pode validar se o userId existe na tabela Usuario etc.
    // por enquanto, assumo que existe.

    const conexao = await prisma.conexaoOpenFinance.upsert({
      where: {
        // se você tiver uma constraint única tipo (usuarioId, itemId) ou (itemId)
        id: `${userId}-${itemId}`, // exemplo se você usar um id composto; ajuste pro seu schema real
      },
      update: {
        ativo: true,
        instituicao: institution || 'Nubank',
      },
      create: {
        id: `${userId}-${itemId}`, // ou deixa o @default(cuid()) e guarda itemId em outro campo
        usuarioId: userId,
        provedor: 'PLUGGY',
        itemId: itemId,
        instituicao: institution || 'Nubank',
        ativo: true,
      },
    });

    return NextResponse.json({ ok: true, conexao });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message || 'Erro ao registrar item' },
      { status: 500 }
    );
  }
}
