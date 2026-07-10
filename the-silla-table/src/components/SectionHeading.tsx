import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'text-center sm:flex-col sm:items-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-serif text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-3 text-lg leading-7 text-ink-700">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
