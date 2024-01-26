<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\WatchlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/signUp', [AuthController::class,'signUp']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/movie/add', [WatchlistController::class,'add']);
Route::post('/movie/remove', [WatchlistController::class,'remove']);
Route::post('/store', [MovieController::class,'store']);
Route::post('/delete', [MovieController::class,'delete']);

Route::get('/getAllMovies', [MovieController::class,'getAllMovies']);
Route::get('/watchlist/{username}', [UserController::class,'watchlist']);
Route::get('/movie/id/{movie_id}', [MovieController::class,'getMovieById']);
Route::get('/movie/title/{movie_title}', [MovieController::class,'getMovieByTitle']);
Route::get('/{username}/watchlist/hasitem/{movie_id}', [WatchlistController::class,'isMovieInWatchlist']);
Route::get('/role/{username}', [UserController::class,'isUserAdmin']);
