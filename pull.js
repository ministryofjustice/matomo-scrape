const main = require('./main');

// Run
main()
.then(() => {
  // console.log('All done');
  process.exit(0);
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});
