import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Filter from './components/Filter';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import  AuthProvider  from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
