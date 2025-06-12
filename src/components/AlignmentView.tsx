// src/components/AlignmentView.tsx
import React, { useEffect, useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { COLOR_MAP } from '../constants/colorMap';

type Props = { seq1: string; seq2: string };

export function AlignmentView({ seq1, seq2 }: Props) {
  const [copyMsg, setCopyMsg] = useState(false);
  useEffect(() => {
    // При выделении текста – копируем в буфер
    const handler = (e: MouseEvent) => {
      const sel = window.getSelection();
      if (sel && sel.toString().length > 0) {
        navigator.clipboard.writeText(sel.toString());
        setCopyMsg(true);
        setTimeout(() => setCopyMsg(false), 1000);
      }
    };
    document.addEventListener('mouseup', handler);
    return () => document.removeEventListener('mouseup', handler);
  }, []);

  // Функция рендера одной строки
  const renderLine = (s: string, compare?: string) => (
    <Box
      sx={{
        display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', fontFamily: 'monospace'
      }}
    >
      {Array.from(s).map((char, i) => {
        const bg = compare
          ? (char !== compare[i] ? '#ffcdd2' : 'transparent')
          : COLOR_MAP[char] || 'transparent';
        return (
          <Box key={i}
            component="span"
            sx={{
              backgroundColor: bg,
              width: { xs: '1ch', sm: 'auto' },
              display: 'inline-block',
              textAlign: 'center'
            }}
          >
            {char}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ mt: 2 }}>
      {renderLine(seq1)}
      {renderLine(seq2, seq1)}
      <Snackbar open={copyMsg} message="Скопировано в буфер" autoHideDuration={1000} />
    </Box>
  );
}
