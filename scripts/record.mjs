import 'zx/globals';

cd(__dirname);
cd('../__fixtures__');

await $`npm init -y`;

const {JEST_VERSION} = process.env;
if (JEST_VERSION) {
  await $`npm install --save-dev jest@${JEST_VERSION}`;
} else {
  await $`npm install --save-dev jest`;
}

await $`npx jest --reporters ./dump-reporter.js || true`;
