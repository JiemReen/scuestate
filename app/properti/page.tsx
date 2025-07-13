'use client';

import { Suspense } from 'react';
import DetailPropertiServer from './DetailPropertiServer';

export default function PropertiPageWrapper() {
  return (
    <Suspense fallback={<p style={{ padding: '2rem' }}>Memuat data properti...</p>}>
      <DetailPropertiServer />
    </Suspense>
  );
}
