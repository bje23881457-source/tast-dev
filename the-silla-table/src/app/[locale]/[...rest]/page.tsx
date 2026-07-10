import { notFound } from 'next/navigation';

// Catch-all so unmatched paths under a locale render the localized (branded) not-found
// page inside the locale layout, instead of falling through to the global default.
export default function CatchAllNotFound() {
  notFound();
}
