import { getConnectToken } from "@/lib/pluggyClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const connect_token = await getConnectToken();
        return NextResponse.json({
            ok: true,
            accessToken: connect_token,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { ok: false, error: err.message || 'Erro inesperado' },
            { status: 500 }
        );
    }
}