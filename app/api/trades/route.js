import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db/mongoose';
import { Trade } from '@/lib/models/Trade';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const trades = await Trade.find({ userId: session.user.id })
      .sort({ tradeDate: -1 })
      .lean();

    return NextResponse.json({ success: true, data: trades });
  } catch (error) {
    console.error('GET /api/trades error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await connectToDatabase();

    // Ensure numeric fields are actually numbers and positive
    const entryPrice = parseFloat(body.entryPrice);
    const riskPercentage = parseFloat(body.riskPercentage);
    const riskRewardRatio = parseFloat(body.riskRewardRatio);

    if (isNaN(entryPrice) || entryPrice <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid entry price' }, { status: 400 });
    }
    if (isNaN(riskPercentage) || riskPercentage <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid risk percentage' }, { status: 400 });
    }
    if (isNaN(riskRewardRatio) || riskRewardRatio <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid Risk/Reward ratio' }, { status: 400 });
    }

    const trade = new Trade({
      ...body,
      userId: session.user.id,
      entryPrice,
      riskPercentage,
      riskRewardRatio,
    });

    await trade.save();

    return NextResponse.json({ success: true, data: trade }, { status: 201 });
  } catch (error) {
    console.error('POST /api/trades error:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
