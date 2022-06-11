import { Db, MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URL, {
  retryReads: true,
  retryWrites: true,
});
let database: Db;
export default {
  connectToServer: (callback: (err: any) => void) => {
    client.connect((err: any) => {
      if (!err) {
        console.log('Successfully connected to MongoDB.');
        database = client.db(process.env.DBNAME);
      } else {
        console.error(err);
        return callback(err);
      }
    });
  },

  disconnect: async () => await client.close(),

  getDb: () => {
    return database;
  },
};
