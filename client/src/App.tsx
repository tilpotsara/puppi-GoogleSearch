import * as React from 'react';
import './App.scss';
import DefaultLayout from './layouts/DefaultLayout';
import SearchResults from './pages/SearchResults';
import Info from './pages/Info';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={SearchResults()} />
          <Route path="/info" element={Info()} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
