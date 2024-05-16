import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Spotify from './Spotify';
import Search from './Search';
import Library from './Library';
import Home from './Home';

const AppRouter = () => {
  return (
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Spotify />}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="search" element={<Search/>}></Route>
            <Route path="lib" element={<Library/>}></Route>
        </Route>
      </Routes>
  );
};

export default AppRouter;