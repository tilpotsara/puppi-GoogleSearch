import dbo from './conn';

export default function baseHelper<T>(COLNAME: string) {
  const insertOne = (data: T) =>
    dbo.getDb().collection(COLNAME).insertOne(data);
  const getAll = () =>
    dbo.getDb().collection(COLNAME).find({}).sort({ timeStamp: -1 }).toArray();
  const get = (query, projection) =>
    dbo.getDb().collection(COLNAME).findOne(query, projection);
  return { insertOne, getAll, get };
}
