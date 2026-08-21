import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    // Authentication Identity
    provider: {
      type: String,
      required: true,
      trim: true,
      enum: ['google'], // Extendable later if more providers are added
    },
    providerAccountId: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    // Application Profile
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    avatar: {
      type: String, // URL reference
      trim: true,
    },

    // Onboarding State
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Compound index for fast OAuth lookups
UserSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Prevent hot-reload recompilation errors in Next.js
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
