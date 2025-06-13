// src/App.tsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import SequenceForm from './components/SequenceForm';
import { AlignmentView } from './components/AlignmentView';
import { alignSequences, AlignmentResult } from './utils/align';
import { COLOR_MAP } from './constants/colorMap';

const App: React.FC = () => {
  const [result, setResult] = useState<AlignmentResult | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (seqA: string, seqB: string) => {
    if (!seqA || !seqB) {
      enqueueSnackbar('Обе последовательности должны быть заполнены', { variant: 'warning' });
      return;
    }
    const res = alignSequences(seqA.trim(), seqB.trim());
    setResult(res);
    enqueueSnackbar(`Выравнивание завершено. Score: ${res.score}`, { variant: 'success' });
  };

  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      px: 2,
    }}>
      <Typography variant="h4" component="h1" gutterBottom
        sx={{
          color: 'rgb(8, 78, 181)',
          p: 2, textAlign: 'center'
        }} >
        Выравнивания аминокислотных последовательностей
      </Typography>
      <SequenceForm onSubmit={onSubmit} />
      {result && <AlignmentView alignedA={result.alignedA} alignedB={result.alignedB} colorMap={COLOR_MAP} />}
    </Container>
  );
};

export default App;
