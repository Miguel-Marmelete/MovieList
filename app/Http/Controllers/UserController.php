<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Watchlist;
use App\Models\Movie;
use App\Models\User;
class UserController extends Controller
{
    
    public function watchlist($username){
        try {
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
    public function isUserAdmin($username){
        try{
            $user = User::where('username',$username)->first();
            if($user){
                if($user->role == 'admin'){
                    return response()->json(true);
                }else{
                    return response()->json(false);
                }
                
            }else{
               return response()->json(['error' => 'User not found'], 404); 
            }
            
        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

}
