<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function getAllMovies(){
        return response()->json(Movie::all());
    }
    public function getMovieById($movie_id)
    {
        try {
            
            $movie = Movie::where('movie_id', $movie_id)->first();
        
    
            return response()->json($movie);
            
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
    public function getMovieByTitle($movie_title){
        try {
            $movies = Movie::where('title', 'LIKE', '%' . $movie_title . '%')->get();
    
            if ($movies->isNotEmpty()) {
                return response()->json($movies);
            } else {
                return response()->json(['message' => 'Nenhum filme encontrado'], 404);
            }
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {
            $dados = $request->all();
            $movie = new Movie();
            $movie->store($dados['movie_title'],$dados['movie_rating'],$dados['movie_description'],$dados['movie_poster_path']);
            
            return response()->json(['message' => 'Filme adicionado com sucesso']);
        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    public function delete(Request $request){
        try {
            $dados = $request->all();
            Movie::destroy((int)$dados['movie_id']);
            
            return response()->json(['message' => 'Filme Removido com Sucesso']);
        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
    
}
