<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Watchlist;
use App\Models\Movie;
class WatchlistController extends Controller
{

    public function watchlist($username){
        try {
            if (!is_string($username)) {
                return response()->json(['message' => 'Invalid username format'], 400);
            }
            // Receber username -> buscar lista de ids dos filmes com esse username na watchlist
            $user = User::where('username', $username)->first();

            if ($user) {
                $userId = $user->user_id;
                //Consulta para obter os movie_ids associados ao username na tabela watchlist
                $movieIds = Watchlist::where('user_id',  $userId)->pluck('movie_id');

                //Consulta para obter os detalhes dos filmes usando os movie_ids obtidos
                $movies = Movie::whereIn('movie_id', $movieIds)->get();

                return response()->json($movies);
            } else {
                return response()->json(['error' => "user doesnt exist"], 404);
            }
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
}
    public function add(Request $request){
        try {
            $request->validate([
                'username' => ['required','string'],
                'movie_id' => ['required','numeric']]);

            $dados =  $request->all();
            //get user id atraves do username, depois criar na tabela watchlist

            $user = new User();
            $userId = $user->findByUsername($dados['username'])->user_id;
            Watchlist::create([
                'user_id' => $userId,
                'movie_id' => $dados['movie_id']
            ]);

            return response()->json(Watchlist::where('user_id',$userId));
            
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function remove(Request $request){
        try {
            $request->validate([
                'username' => ['required','string'],
                'movie_id' => ['required','numeric']]);
            $dados =  $request->all();
            //get user id atraves do username, depois criar na tabela watchlist

            $user = new User();
            $userId = $user->findByUsername($dados['username'])->user_id;
            Watchlist::where('user_id', $userId)->where('movie_id', $dados['movie_id'])->delete();

            

            return response()->json();
            
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function isMovieInWatchlist($username,$movie_id){
        try {
            if (!is_string($username) || !is_numeric($movie_id)) {
                return response()->json(['message' => 'Invalid username or movie_id format'], 400);
            }
            $user = new User();
            $user_id = $user->findByUsername($username)->user_id;
            $item = Watchlist::where('user_id', $user_id)->where('movie_id', $movie_id)->first();
            if($item !== null){
                return response()->json(true);
            }else{
                return response()->json(false);
            }

        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
