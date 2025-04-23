import Papa from 'papaparse';
import rawGCsv from '../regulation/regulation-g.csv?raw';
import rawHCsv from '../regulation/regulation-h.csv?raw';
import rawICsv from '../regulation/regulation-i.csv?raw';
interface CardRow {
    set: string;
    number: string;
    name: string;
  }
  

export function loadCsvAsMapSync(csvFiles: Map<string, string>): Map<string, string> {
    const result = new Map<string, string>();

    for (const [rawCsv, label] of csvFiles.entries()) {
      const parsed = Papa.parse<CardRow>(rawCsv, {
          header: true,
          skipEmptyLines: true,
      });
  
      for (const row of parsed.data) {
        if (row.set && row.number) {
          const key = `${row.set}:${row.number}`;
          result.set(key, label);
        }
      }
  }
  
    return result;
}

const rawRegulations: Map<string, string> = new Map<string, string>([
  [rawGCsv, 'G'],
  [rawHCsv, 'H'],
  [rawICsv, 'I']
]);

export const Regulations: Map<string, string> = loadCsvAsMapSync(rawRegulations);
