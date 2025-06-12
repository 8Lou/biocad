// Needleman–Wunsch
export interface AlignmentResult {
  alignedA: string;
  alignedB: string;
  score: number;
}

export function alignSequences(seqA: string, seqB: string): AlignmentResult {
  const m = seqA.length;
  const n = seqB.length;
  const gap = -1, match = 1, mismatch = -1;

  // инициализируем матрицу очков
  const dp: number[][] = Array(m+1)
    .fill(0)
    .map(() => Array(n+1).fill(0));

  for (let i = 1; i <= m; i++) dp[i][0] = i * gap;
  for (let j = 1; j <= n; j++) dp[0][j] = j * gap;

  // заполняем
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const scoreDiag =
        dp[i-1][j-1] + (seqA[i-1] === seqB[j-1] ? match : mismatch);
      const scoreUp = dp[i-1][j] + gap;
      const scoreLeft = dp[i][j-1] + gap;
      dp[i][j] = Math.max(scoreDiag, scoreUp, scoreLeft);
    }
  }

  // бэктрек
  let i = m, j = n;
  let a = '', b = '';
  while (i > 0 || j > 0) {
    const cur = dp[i][j];
    if (i > 0 && j > 0 &&
        cur === dp[i-1][j-1] + (seqA[i-1] === seqB[j-1] ? match : mismatch)) {
      a = seqA[i-1] + a;
      b = seqB[j-1] + b;
      i--; j--;
    } else if (i > 0 && cur === dp[i-1][j] + gap) {
      a = seqA[i-1] + a;
      b = '-' + b;
      i--;
    } else {
      a = '-' + a;
      b = seqB[j-1] + b;
      j--;
    }
  }

  return { alignedA: a, alignedB: b, score: dp[m][n] };
}
