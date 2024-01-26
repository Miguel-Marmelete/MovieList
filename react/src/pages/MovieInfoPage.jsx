import React from "react";
import MovieInfo from "../components/MovieInfo";
import handleSearchOutsideHome from "../scripts/handleSearchOutsideHome";
function MovieInfoPage() {
  handleSearchOutsideHome();
  return <MovieInfo></MovieInfo>;
}

export default MovieInfoPage;
