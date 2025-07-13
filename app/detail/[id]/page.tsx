// app/detail/[id]/page.tsx

import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import {
  Box,
  Typography,
  Container,
  Grid,
  Chip,
  Paper,
} from '@mui/material';

type Params = {
  id: string;
};

// ✅ HARUS pakai nama fungsi: Page agar dikenali Next.js App Router
export default async function Page({
  params,
}: {
  params: Params;
}) {
  const res = await fetch(
    https://687134f07ca4d06b34b9b681.mockapi.io/properties/${params.id},
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) return notFound();

  const property = await res.json();

  return (
    <Box sx={{ my: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={3}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box
                component="img"
                src={
                  property.image ||
                  'https://via.placeholder.com/800x600?text=No+Image'
                }
                alt={property.title}
                sx={{
                  width: '100%',
                  height: { xs: 300, md: '100%' },
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} md={5} sx={{ p: { xs: 2, md: 4 } }}>
              <Chip
                label={property.type === 'sale' ? 'Dijual' : 'Disewa'}
                color="primary"
                sx={{ mb: 2 }}
              />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {property.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {property.location}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                fontWeight="bold"
                sx={{ my: 2 }}
              >
                Rp {property.price?.toLocaleString('id-ID') ?? 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                {property.description ?? '-'}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  pt: 2,
                  borderTop: '1px solid #eee',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBed size={20} />
                  <Typography>{property.beds ?? 0} KT</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBath size={20} />
                  <Typography>{property.baths ?? 0} KM</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaRulerCombined size={20} />
                  <Typography>{property.area ?? 0} m²</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}