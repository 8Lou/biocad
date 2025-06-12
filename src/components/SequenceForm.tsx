// src/components/SequenceForm.tsx
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface FormValues {
  seqA: string
  seqB: string
}

interface Props {
  onSubmit: (seqA: string, seqB: string) => void
}

const SequenceForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: { seqA: '', seqB: '' },
    mode: 'onChange',        // валидация
    reValidateMode: 'onChange',
  })

  // сравнить длины полей
  const valA = watch('seqA')
  const valB = watch('seqB')

  // регистронезависимо
  const seqPattern = /^[ARNDCEQGHILKMFPSTWYV-]+$/i

  const onSubmitForm = (data: FormValues) => {
    // лишние пробелы по краям
    onSubmit(data.seqA.trim(), data.seqB.trim())
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{ mb: 4 }}
      noValidate
    >
      <Controller
        name="seqA"
        control={control}
        rules={{
          required: 'Sequence A обязательно',
          pattern: {
            value: seqPattern,
            message:
              'Допустимы только буквы A,R,N,D,C,E,Q,G,H,I,L,K,M,F,P,S,T,W,Y,V и “-”',
          },
          validate: (value) =>
            valB.length > 0 && value.length !== valB.length
              ? 'Длина Sequence A должна совпадать с Sequence B'
              : true,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Sequence A"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            error={!!errors.seqA}
            helperText={errors.seqA?.message}
          />
        )}
      />

      <Controller
        name="seqB"
        control={control}
        rules={{
          required: 'Sequence B обязательно',
          pattern: {
            value: seqPattern,
            message:
              'Допустимы только буквы A,R,N,D,C,E,Q,G,H,I,L,K,M,F,P,S,T,W,Y,V и “-”',
          },
          validate: (value) =>
            valA.length > 0 && value.length !== valA.length
              ? 'Длина Sequence B должна совпадать с Sequence A'
              : true,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Sequence B"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            error={!!errors.seqB}
            helperText={errors.seqB?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!isValid}
      >
        Align
      </Button>
    </Box>
  )
}

export default SequenceForm
