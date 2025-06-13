// src/App.tsx
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import SequenceForm from './components/SequenceForm';
import { AlignmentView } from './components/AlignmentView';
import { alignSequences, AlignmentResult } from './utils/align';
import { COLOR_MAP } from './constants/colorMap';
import { CssBaseline, GlobalStyles } from '@mui/material';
import bg from './assets/fon.png';
import { GlassContainer } from './components/GlassContainer';

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
    <>
      <CssBaseline />
      <GlobalStyles styles={{
        'html, body': {
          height: '100%',
          margin: 0,
        },
        'body': {
          background: `linear-gradient(rgba(255, 255, 255, 0.48), rgba(255, 255, 255, 0.38)), url(${bg}) center/cover no-repeat`
        }
      }} />
      <GlassContainer maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom color="primary"
          sx={{
            p: 2, textAlign: 'center'
          }} >
          Выравнивания аминокислотных последовательностей
        </Typography>
        <SequenceForm onSubmit={onSubmit} />
        {result && <AlignmentView alignedA={result.alignedA} alignedB={result.alignedB} colorMap={COLOR_MAP} />}
      </GlassContainer>
    </>
  );
};

export default App;
