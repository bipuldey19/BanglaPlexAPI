module.exports = {
    apps: [
      {
        name: "banglaplex-api",
        script: "./server.js",
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };