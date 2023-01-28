const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');
exports.handler = serverlessExpress({
    app,
    binarySettings: {
        isBinary: ({ headers }) => true,
        contentTypes: [],
        contentEncodings: []
    }
});
