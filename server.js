const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB = process.env;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB COnnection successful');
  });

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`App running on the port ${port}...`);
});
