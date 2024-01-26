<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Watchlist;
class WatchlistController extends Controller
{
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
