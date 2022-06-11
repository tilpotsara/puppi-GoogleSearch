/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import './SearchResults.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ScrapeQuery,
  SearchResult,
} from '../../../../common/models/ScraperResult';
import { toast } from 'react-toastify';
import { Button, Table, Form, Spinner } from 'react-bootstrap';
const axiosInstance = axios.create({
  baseURL: 'http://localhost/',
  timeout: 15000,
});

function SearchResults() {
  const [queries, setQueries] = useState<ScrapeQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>('');

  const searchQuery = () => {
    if (searchText && searchText.trim().length > 0) {
      setLoading(true);
      const search: ScrapeQuery = {
        query: searchText,
      };
      axiosInstance
        .get('search', {
          params: {
            q: searchText,
          },
        })
        .then((res) => {
          toast.success('Query finished');
          search.results = res.data.results as SearchResult[];
          setQueries([search].concat(queries));
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false));
    }
  };
  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    setLoading(true);
    axiosInstance
      .get('all')
      .then((res) => {
        setQueries(res.data as ScrapeQuery[]);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div>
        <Form validated>
          <Form.Group className="mb-3">
            <Form.Label>New Query</Form.Label>
            <Form.Control
              required
              onInput={(e: any) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search here..."
            />
          </Form.Group>
          <Button variant="primary" disabled={loading} onClick={searchQuery}>
            Run
          </Button>
        </Form>
      </div>
      <Spinner
        as="span"
        hidden={!loading}
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <h1>Results</h1>
      <Table striped bordered hover data-testid="searchResults-table">
        <tbody>
          <tr>
            <th>Query</th>
            <th>Headline</th>
            <th>Link</th>
          </tr>
          {queries.map((query) =>
            query.results?.map((q, ind) => (
              <tr key={`res-${ind}`}>
                <td>{query.query}</td>
                <td>{q.headline}</td>
                <td>
                  <a href={q.href} target="_blank" rel="noreferrer">
                    Link
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SearchResults;
