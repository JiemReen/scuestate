import React from 'react';
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailProperti(props: Props) {
  const { id } = props.params;

  const res = await fetch(`https://687134f07ca4d06b34b9b681.mockapi.io/properties/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Gagal mengambil properti dengan ID:', id);
    throw new Error('Gagal mengambil detail properti');
  }

  const data: {
    title: string;
    image: string;
    location: string;
    type: string;
    area: number;
    price: number;
    description: string;
  } = await res.json();

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
