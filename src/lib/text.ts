/**
 * Impede "viúva" (palavra sozinha na última linha): substitui o último espaço
 * por um espaço inquebrável ( ), colando as duas últimas palavras.
 * Complementa o `text-wrap: pretty/balance` da CSS nos casos de borda,
 * em qualquer largura de tela.
 */
export const noWidow = (s: string): string =>
  s.replace(/\s+(\S+)\s*$/, " $1");
