module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    instance: {
      dbName: 'DB',
    },
    autoStart: false,
  },
};