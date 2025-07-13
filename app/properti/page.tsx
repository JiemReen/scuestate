// app/properti/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

type Property = {
  title: string;
  image: string;
  location: string;
  type: string;
  area: number;
  price: number;
  description: string;
};

export default function DetailProperti() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [data, setData] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID properti tidak ditemukan di URL');
      return;
    }

    fetch(`https://687134f07ca4d06b34b9b681.mockapi.io/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil properti');
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p style={{ padding: '2rem', color: 'red' }}>Error: {error}</p>;
  }

  if (!data) {
    return <p style={{ padding: '2rem' }}>Memuat data properti...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{data.title}</h1>
      <Image
        src={data.image || 'https://via.placeholder.com/600x400?text=No+Image'}
        alt={data.title}
        width={600}
        height={400}
        style={{ width: '100%', maxWidth: 600, height: 'auto' }}
      />
      <p><strong>Lokasi:</strong> {data.location}</p>
      <p><strong>Tipe:</strong> {data.type}</p>
      <p><strong>Luas:</strong> {data.area} m²</p>
      <p><strong>Harga:</strong> Rp {data.price.toLocaleString('id-ID')}</p>
      <p>{data.description}</p>
    </div>
  );
}
