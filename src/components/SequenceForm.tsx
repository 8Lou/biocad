// src/components/SequenceForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type FormValues = { seq1: string; seq2: string };

const VALID_CHARS = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

export function SequenceForm({ onSubmit }: { onSubmit: (s1: string, s2: string) => void }) {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { seq1: '', seq2: '' }
  });
  const s1 = watch('seq1'), s2 = watch('seq2');

  const sequencesEqualLength = s1.length === s2.length;

  return (
    <Box component="form" onSubmit={handleSubmit(data => onSubmit(data.seq1.toUpperCase(), data.seq2.toUpperCase()))} sx={{ mb: 2 }}>
      <Controller
        name="seq1" control={control}
        rules={{
          required: 'Обязательное поле',
          pattern: { value: VALID_CHARS, message: 'Недопустимые символы' }
        }}
        render={({ field }) =>
          <TextField {...field} label="Последовательность 1" fullWidth margin="normal"
            error={!!errors.seq1} helperText={errors.seq1?.message} />}
      />
      <Controller
        name="seq2" control={control}
        rules={{
          required: 'Обязательное поле',
          pattern: { value: VALID_CHARS, message: 'Недопустимые символы' },
          validate: value => value.length === s1.length || 'Длины должны совпадать'
        }}
        render={({ field }) =>
          <TextField {...field} label="Последовательность 2" fullWidth margin="normal"
            error={!!errors.seq2} helperText={errors.seq2?.message} />}
      />
      <Button type="submit" variant="contained" disabled={!sequencesEqualLength}>Выровнять</Button>
    </Box>
  );
}
