import type { FullConfig, Reporter, Suite, TestCase, TestResult } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

function iso() { return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'); }
function stamp() { return new Date().toISOString().slice(0,10).replace(/-/g,''); }

export default class ManifestReporter implements Reporter {
  private records: any[] = [];
  private startTime = iso();
  onTestEnd(test: TestCase, result: TestResult) {
    this.records.push({
      title: test.title,
      file: test.location.file,
      line: test.location.line,
      status: result.status,
      startTime: (result as any).startTime?.toISOString?.() ?? this.startTime,
      durationMs: result.duration,
      errors: (result as any).errors?.map((e: any) => e.message) ?? [],
      attachments: result.attachments?.map(a => a.name) ?? []
    });
  }
  onEnd() {
    const outDir = 'test-results';
    fs.mkdirSync(outDir, { recursive: true });
    const out = path.join(outDir, `test-manifest_${stamp()}.json`);
    fs.writeFileSync(out, JSON.stringify({
      generatedAt: iso(),
      records: this.records
    }, null, 2));
    // eslint-disable-next-line no-console
    console.log(`Manifest written: ${out}`);
  }
}
