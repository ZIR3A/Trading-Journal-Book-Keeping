import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db/mongoose';
import { Trade } from '@/lib/models/Trade';

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    
    // Explicitly prevent changing ownership
    delete body.userId;
    delete body._id;

    await connectToDatabase();

    // Must match both ID and authenticated userId to prevent IDOR
    const updatedTrade = await Trade.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedTrade) {
      return NextResponse.json({ success: false, message: 'Trade not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedTrade });
  } catch (error) {
    console.error('PATCH /api/trades/[id] error:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await connectToDatabase();

    // Must match both ID and authenticated userId to prevent IDOR
    const deletedTrade = await Trade.findOneAndDelete({ _id: id, userId: session.user.id });

    if (!deletedTrade) {
      return NextResponse.json({ success: false, message: 'Trade not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Trade deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/trades/[id] error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
