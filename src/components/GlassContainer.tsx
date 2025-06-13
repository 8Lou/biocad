// src/components/GlassContainer.tsx
import { styled, alpha } from '@mui/material/styles'
import Container from '@mui/material/Container'

export const GlassContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 1)}`,
  boxShadow: '0 4px 30px rgba(51, 78, 82, 0.3)',
  borderRadius: theme.shape.borderRadius,
}))
