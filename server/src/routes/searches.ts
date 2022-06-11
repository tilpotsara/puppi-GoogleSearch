/* eslint-disable node/no-unpublished-import */
import { Request, Response, Router } from 'express';
import StatusCode from '../../../common/types/StatusCodes';
import scrape from '../utils/Scraper';
import dbHelper from '../db/dbHelper';
const GoogleSearchMod = require('../utils/GoogleSearchMod.js');
const ScrapeRoutes = Router();
const colRef = dbHelper('googleResults');

ScrapeRoutes.route('/all').get((req: Request, res: Response) => {
  colRef
    .getAll()
    .then((results) => res.json(results))
    .catch((err) => {
      console.log(err);
      res.send({ err: err });
    });
});

ScrapeRoutes.route('/search').get(async (req: Request, res: Response) => {
  const searchQ = req.query.q.toString();
  if (!searchQ) {
    res.status(StatusCode.BAD_REQUEST);
    res.send('Enter query');
  } else {
    let searchResults: any = await colRef.get(
      { query: { $eq: searchQ } },
      { _id: 0, query: 0, timeStamp: 0 }
    );
    if (!searchResults) {
      try {
        searchResults = {
          query: searchQ,
          timeStamp: new Date(),
          results: await scrape(searchQ, GoogleSearchMod),
        };
        if (searchResults.results && searchResults.results.length > 0) {
          colRef.insertOne(searchResults);
        }
      } catch (e) {
        console.error(e);
        searchResults = [e];
      }
    }
    res.json(searchResults);
  }
});

export default ScrapeRoutes;
