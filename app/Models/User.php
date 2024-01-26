<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'user_id'; // Chave primária
    public $incrementing = true; // Defina como falso se a chave primária não for autoincrementável
    public $timestamps = false;
    
    protected $fillable = ['user_id','username', 'password', 'role'];
    // Adicione outros campos conforme necessário

    // Relacionamento com a tabela watchlist
    public function watchlist()
    {
        return $this->hasMany(Watchlist::class, 'username', 'username');
    }
    public function checkIfUserExists($username){
        try{
            $existingUser = User::where('username', $username)->first();

            if ($existingUser) {
                // Nome de utilizador já existe, retornar uma resposta de erro
                //return response()->json(['message' => 'O nome de utilizador já está em uso. Escolha outro.'], 500);
                return true;
            }
            return false;
        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
            
    }
    public function store($username,$password,$token){
            
        $adminToken = 'admin';
        $role = "normal";
        try{
            if($token == $adminToken){$role = 'admin';} 

            return ($this->create([
                    'username' => $username,
                    'password' => $password,
                    'role' => $role,
            ]));

        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
            
    }
    public function findByUsername($username)
    {
        return $this->where('username', $username)->first();
    }
}