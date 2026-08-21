import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db/mongoose';
import { User } from '@/lib/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar || '',
        profileCompleted: user.profileCompleted,
        onboardingCompleted: user.onboardingCompleted,
      },
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Extract only allowlisted fields
    const { name, phone, avatar } = body;

    // Server-side validation
    const errors = {};
    const trimmedName = name?.trim();
    if (!trimmedName) {
      errors.name = 'Name is required.';
    } else if (trimmedName.length < 2 || trimmedName.length > 100) {
      errors.name = 'Name must be between 2 and 100 characters.';
    }

    const trimmedPhone = phone?.trim() || '';
    if (trimmedPhone && trimmedPhone.length > 20) {
      errors.phone = 'Phone number is too long.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Please correct the highlighted fields.',
        errors,
      }, { status: 400 });
    }

    await connectToDatabase();
    
    const updateData = {
      name: trimmedName,
      phone: trimmedPhone,
      profileCompleted: true,
      onboardingCompleted: true,
    };

    if (avatar !== undefined) {
      updateData.avatar = avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || '',
        avatar: updatedUser.avatar || '',
        profileCompleted: updatedUser.profileCompleted,
        onboardingCompleted: updatedUser.onboardingCompleted,
      },
    });
  } catch (error) {
    console.error('Profile PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
