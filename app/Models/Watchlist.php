<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    use HasFactory;
    
    protected $table = 'watchlist';
    protected $primaryKey = ['user_id', 'movie_id'];
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = ['user_id','movie_id' ];
    
    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id', 'movie_id');
    }
}
