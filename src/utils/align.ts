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

  // 1) Инициализация матрицы
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  // штрафуем начальные разрывы, иначе "semi-global"
  for (let i = 1; i <= m; i++) dp[i][0] = i * gap;
  for (let j = 1; j <= n; j++) dp[0][j] = j * gap;

  // 2) Заполнение DP
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const scoreDiag =
        dp[i - 1][j - 1] + (seqA[i - 1] === seqB[j - 1] ? match : mismatch);
      const scoreUp   = dp[i - 1][j] + gap;
      const scoreLeft = dp[i][j - 1] + gap;
      dp[i][j] = Math.max(scoreDiag, scoreUp, scoreLeft);
    }
  }

  // 3) Бэктрек – чёткие проверки i>0 и j>0
  let i = m, j = n;
  let a = '', b = '';
  while (i > 0 || j > 0) {
    const cur = dp[i][j];

    // диагональ
    if (i > 0 && j > 0 &&
        cur === dp[i - 1][j - 1] +
               (seqA[i - 1] === seqB[j - 1] ? match : mismatch)) {
      a = seqA[i - 1] + a;
      b = seqB[j - 1] + b;
      i--; j--;
      continue;
    }
    // вверх (gap в B)
    if (i > 0 && cur === dp[i - 1][j] + gap) {
      a = seqA[i - 1] + a;
      b = '-'        + b;
      i--;
      continue;
    }
    // влево (gap в A)
    if (j > 0 && cur === dp[i][j - 1] + gap) {
      a = '-'        + a;
      b = seqB[j - 1] + b;
      j--;
      continue;
    }
    break;
  }

  return { alignedA: a, alignedB: b, score: dp[m][n] };
}
