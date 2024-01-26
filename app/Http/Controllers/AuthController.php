<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
   
    public function signUp(Request $request)
    {
        //verificar se ja existe antes de criar
         
        try {
            $dados =  $request->all();
            $user = new User();

            if($user->checkIfUserExists($dados['username'])){
                return response()->json(['message' => 'O nome de utilizador já está em uso. Escolha outro.'], 500);
            }
            $user->store($dados['username'],$dados['password'],$dados['token']);

            return response()->json(['message' => 'User created successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    public function login(Request $request)
    {
        try {
            $dados = $request->all();

            $user = User::where('username', $dados['username'])->first();
            
            if ($user->username == $dados['username']) {
                if($user->password == $dados['password']){
                    return response()->json(['username' => ($user->username)]);
                }else{
                    return response()->json(['message' => 'Wrong password.'],401);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Username doesnt exist.'], 401);
        }
    }
}
