// Writes the one-line warning label for humans to /output/entry.txt.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LABEL = 'WARNING: Unit retains every embarrassing thing it has ever said, for automatic playback at 3 A.M.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LABEL);
