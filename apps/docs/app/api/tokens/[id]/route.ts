import { NextRequest, NextResponse } from 'next/server';
import { decompressFromEncodedURIComponent } from 'lz-string';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  // For now, the "id" is actually the compressed token string
  // In the future, this could be a database lookup

  try {
    const json = decompressFromEncodedURIComponent(id);
    if (!json) {
      return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 });
    }

    const data = JSON.parse(json);
    const tokens = data.tokens || data;

    return NextResponse.json({
      success: true,
      tokens,
      name: tokens.name,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to decode tokens' },
      { status: 400 }
    );
  }
}
