import { headers } from 'next/headers';
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

export default async function DetailPropertiServer() {
  const headersList = headers();
  const url = headersList.get('x-url') || '';
  const urlObj = new URL(url, 'http://localhost');
  const id = urlObj.searchParams.get('id');

  if (!id) {
    return <p style={{ padding: '2rem', color: 'red' }}>ID properti tidak ditemukan di URL</p>;
  }

  const res = await fetch(`https://687134f07ca4d06b34b9b681.mockapi.io/properties/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <p style={{ padding: '2rem', color: 'red' }}>Gagal mengambil detail properti</p>;
  }

  const data: Property = await res.json();

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
