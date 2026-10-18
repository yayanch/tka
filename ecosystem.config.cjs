module.exports = {
  apps: [
    {
      name: 'tka-tjkt',
      script: 'server.ts',
      interpreter: './node_modules/.bin/tsx',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
