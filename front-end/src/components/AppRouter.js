import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Spotify from './Spotify';
import Search from './Search';
import Library from './Library';
import Home from './Home';
import PlaylistSelected from './PlaylistSelected';
import SongSelected from './SongSelected';
import ArtistSelected from './ArtistSelected';
import AlbumSelected from './AlbumSelected';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Spotify />}>
        <Route index element={<Home />}></Route>
        <Route path="search" element={<Search />}></Route>
        <Route path="lib" element={<Library />}></Route>
        <Route path="lib/playlist" element={<PlaylistSelected />}></Route>
        <Route path="songview" element={<SongSelected />}></Route>
        <Route path="artistview" element={<ArtistSelected />}></Route>
        <Route path="albumview" element={<AlbumSelected />}></Route>
      </Route>
    </Routes>
  );
};
// <PlaylistSelected headerBackground={headerBackground}/>
export default AppRouter;