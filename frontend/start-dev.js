const concurrently = require('concurrently');

concurrently(
  [
    { command: 'npm start', name: 'frontend', prefixColor: 'blue' },
    { command: 'python ../backend/app.py', name: 'backend', prefixColor: 'green' },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
  }
);
