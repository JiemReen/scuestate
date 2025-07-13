'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import SearchFilterBar from '@/components/SearchFilterBar';
import type { Property } from '@/types/Property';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
} from '@mui/material';
import Grid from '@mui/material/Grid'; // ✅ Perbaikan penting: impor Grid langsung

export default function KelolaPropertiPage() {
  const { loggedIn, role } = useAuth();
  const router = useRouter();

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);

  useEffect(() => {
    if (!loggedIn || role !== 'admin') {
      router.replace('/');
    } else {
      fetch('https://687134f07ca4d06b34b9b681.mockapi.io/properties')
        .then((res) => res.json())
        .then((data) => {
          setAllProperties(data);
          setFiltered(data);
        });
    }
  }, [loggedIn, role]);

  const handleSearch = ({
    searchTerm,
    location,
    property,
    sort,
  }: {
    searchTerm: string;
    location: string;
    property: string;
    sort: 'asc' | 'desc' | '';
  }) => {
    let result = [...allProperties];

    if (searchTerm) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      result = result.filter(
        (item) => item.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (property) {
      result = result.filter(
        (item) => item.property.toLowerCase() === property.toLowerCase()
      );
    }

    if (sort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus properti ini?')) return;
    await fetch(`https://687134f07ca4d06b34b9b681.mockapi.io/properties/${id}`, {
      method: 'DELETE',
    });
    setFiltered((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Kelola Properti
      </Typography>

      <SearchFilterBar onSearch={handleSearch} />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filtered.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.location} — {item.property} — Rp {item.price.toLocaleString('id-ID')}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/admin/crud/edit/${item.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
