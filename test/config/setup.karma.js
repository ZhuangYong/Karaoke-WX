let context = require.context('../', true, /\.test\.(jsx|js)$/);
context.keys().forEach(context);
// module.exports = context;
