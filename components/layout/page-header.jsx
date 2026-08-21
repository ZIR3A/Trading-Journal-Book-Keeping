export function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-display font-semibold text-primary">{title}</h1>
        {description && (
          <p className="text-secondary-text mt-2 text-sm">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
