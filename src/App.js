import React, { useState, useEffect } from 'react';
//Hooks that allow us to track states in a function//
import 'bootstrap/dist/css/bootstrap.min.css';
//Imports styling for bootstrap//
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchField from './components/SearchField';
import Favorites from './components/Favorites';


  //App with API from omdbapi.com//
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  //Functions that pull Movie information//
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMovieRequest = async () => {

  //API uses 'Search Value' to find any movie title typed in//
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=bcc89972`;

  const response = await fetch(url);
  const responseJson = await response.json();

  //returns value of movies searched in search field//

  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
};

  //Local array used to store movies//
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [getMovieRequest, searchValue]);


  return (
    <div className='container-fluid movie-app'>
       <div className='row d-flex align-items-center mt-4 mb-4'>
       <MovieListHeading heading='Movies' />
       <SearchField searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} favoriteComponent= {Favorites} />
      </div>
    </div>
  );
};

export default App;