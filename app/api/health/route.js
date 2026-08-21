import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db/mongoose';

export async function GET() {
  try {
    // Attempt to connect to the database
    await connectToDatabase();
    
    // Check Mongoose connection state
    const readyState = mongoose.connection.readyState;
    
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (readyState === 1) {
      return NextResponse.json(
        { status: 'ok', database: 'connected' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: 'error', database: 'unavailable', state: readyState },
        { status: 503 }
      );
    }
  } catch (error) {
    // We do NOT expose the raw error message (which might contain the URI) to the client.
    console.error('Health check failed:', error.message || 'Unknown database error');
    
    return NextResponse.json(
      { status: 'error', database: 'unavailable' },
      { status: 503 }
    );
  }
}
