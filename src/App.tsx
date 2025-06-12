// src/App.tsx
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { SequenceForm } from './components/SequenceForm';
import { AlignmentView } from './components/AlignmentView';

function App() {
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>Выравнивание аминокислотных последовательностей</Typography>
      <SequenceForm onSubmit={(s1, s2) => { setSeq1(s1); setSeq2(s2); }} />
      {seq1 && seq2 && <AlignmentView seq1={seq1} seq2={seq2} />}
    </Container>
  );
}

export default App;
