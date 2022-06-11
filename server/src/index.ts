require('dotenv').config();
import express from 'express';
import cors from 'cors';
import ScrapeRoutes from './routes/searches';
import bodyParser from 'body-parser';
// @ts-ignore
import dbo from './db/conn.ts';
import path from 'path';
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ScrapeRoutes);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../client/build')));

const serverInstance = app.listen(process.env.PORT, () => {
  dbo.connectToServer((err) => {
    if (err) {
      //Mongo-connection issue logic
    }
  });
  console.log(`Server is running on port: ${process.env.PORT}`);
});

async function stopServer() {
  await dbo.disconnect();
  return new Promise<void>((resolve, reject) => {
    serverInstance.close((err: Error) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = { server: app, stopServer };
