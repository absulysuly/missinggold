import { spawn } from 'node:child_process';

const url = process.env.BASE_URL || 'http://localhost:3000';
const pages = ['/', '/payments/checkout', '/campaigns/new', '/admin'].map(p => url + p);

const run = (page) =>
  new Promise((resolve, reject) => {
    const child = spawn('npx', ['@lhci/cli', 'autorun', '--collect.url=' + page, '--collect.numberOfRuns=1'], { stdio: 'inherit', shell: true });
    child.on('exit', code => code === 0 ? resolve() : reject(new Error('lhci failed')));
  });

for (const p of pages) {
  // eslint-disable-next-line no-await-in-loop
  await run(p);
}
