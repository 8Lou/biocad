// src/components/AlignmentView.tsx
import React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

interface Props {
  alignedA: string
  alignedB: string
  colorMap: Record<string, string> 
}

const Line = styled('pre')({
  margin: 0,
  padding: 0,
  whiteSpace: 'pre-wrap',      // переносить
  wordBreak: 'break-all',      // в любом месте
  fontFamily: 'monospace',
})

export const AlignmentView: React.FC<Props> = ({ alignedA, alignedB, colorMap }) => {
  const charsA = alignedA.split('')
  const charsB = alignedB.split('')

  return (
    <Box     sx={{
      borderRadius: 1,
      p: 3,
      maxWidth: '100%',
      overflowX: 'auto',
      backgroundColor: 'rgba(189, 211, 244, 0.5)',
    }}>
      <Line>
        {charsA.map((ch, i) => (
          <span
            key={i}
            style={{
              backgroundColor: colorMap[ch] || 'transparent',
              display: 'inline-block',
              width: '1ch',
            }}
          >
            {ch}
          </span>
        ))}
      </Line>
      <Line>
        {charsB.map((ch, i) => {
          const different = ch !== charsA[i]
          return (
            <span
              key={i}
              style={{
                backgroundColor: different ? colorMap[ch] || '#fcc' : 'transparent',
                display: 'inline-block',
                width: '1ch',
              }}
            >
              {ch}
            </span>
          )
        })}
      </Line>
    </Box>
  )
}
