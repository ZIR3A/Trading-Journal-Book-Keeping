export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-display font-semibold tracking-tight text-primary">
            Trading Journal
          </h2>
          <p className="mt-2 text-sm text-secondary-text">
            Log in to record and analyze your trades.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
