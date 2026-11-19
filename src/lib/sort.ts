export type SortStep = { values: number[]; active: number };

export function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** With trace=true it also yields on comparisons that don't swap (used by the Lab race). */
export function* insertionSort(input: number[], trace = false): Generator<SortStep> {
  const a = [...input];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        yield { values: [...a], active: j - 1 };
        j--;
      } else {
        if (trace) yield { values: [...a], active: j - 1 };
        break;
      }
    }
  }
  yield { values: [...a], active: -1 };
}

export function* bubbleSort(input: number[]): Generator<SortStep> {
  const a = [...input];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      yield { values: [...a], active: j };
    }
  }
}

export function* selectionSort(input: number[]): Generator<SortStep> {
  const a = [...input];
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) min = j;
      yield { values: [...a], active: j };
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      yield { values: [...a], active: i };
    }
  }
}