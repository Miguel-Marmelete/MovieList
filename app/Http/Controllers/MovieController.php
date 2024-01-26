<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function getAllMovies(){
        
        try {
           return response()->json(Movie::all());
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function getMovieById($movie_id)
    {
        try {
            // Verifies is movie_id is numeric
            if (!is_numeric($movie_id)) {

                return response()->json(['message' => 'Invalid movie_id format'], 400);
            }
            return response()->json(Movie::find($movie_id));
            
        } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function getMovieByTitle($movie_title){
        try {
            if (!is_string($movie_title)) {
                return response()->json(['message' => 'Invalid movie_title format'], 400);
            }
            $movies = Movie::where('title', 'LIKE', '%' . $movie_title . '%')->get();
    
            if ($movies->isNotEmpty()) {
                return response()->json($movies);
            } else {
                return response()->json(['message' => 'Nenhum filme encontrado'], 404);
            }
            
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {
            $request->validate([
            'movie_title' => 'required',
            'movie_rating' => ['required','numeric','min:0','max:10'],
            'movie_description' => 'required',
            'movie_poster_path' => 'required',]);

            
            $dados = $request->all();
            $movie = new Movie();
            $movie->store($dados['movie_title'],$dados['movie_rating'],$dados['movie_description'],$dados['movie_poster_path']);
            
            return response()->json(['message' => 'Filme adicionado com sucesso']);
        }catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        
    }

    public function delete(Request $request){
        try {
            $request->validate(['movie_id' => ['required','numeric']]);
    
            Movie::destroy($request->input('movie_id'));
            
            return response()->json(['message' => 'Filme Removido com Sucesso']);
        }catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        
    }
    
}
