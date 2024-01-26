<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Movie extends Model
{
    use HasFactory;

    protected $table = 'movies';
    protected $primaryKey = 'movie_id'; // Chave primária
    public $incrementing = true; // Defina como falso se a chave primária não for autoincrementável
    public $timestamps = false;
    
    protected $fillable = ['movie_id', 'title', 'rating','description', 'poster_path'];


    public function store($title,$rating,$description,$image_name){
            
      $poster_path = "/moviePosters/" . $image_name; 
        try{
             $this->create([
                    'title' => $title,
                    'rating' => $rating,
                    'description' => $description,
                    'poster_path' => $poster_path
            ]);

        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
            
    }

}
