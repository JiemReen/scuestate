import { Suspense } from 'react';
import DetailPropertiServer from './DetailPropertiServer';

export default function DetailPropertiPage() {
  return (
    <Suspense fallback={<p style={{ padding: '2rem' }}>Memuat properti...</p>}>
      <DetailPropertiServer />
    </Suspense>
  );
}
