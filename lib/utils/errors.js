export function normalizeError(error) {
  if (!error) return 'An unexpected error occurred.';

  // If it's a string, just return it
  if (typeof error === 'string') return error;

  // Handle standard JS errors
  if (error instanceof Error) {
    // Hide fetch/network errors from user
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Unable to connect to the server. Please check your connection and try again.';
    }
    return error.message;
  }

  // Fallback
  return 'An unexpected error occurred. Please try again.';
}
