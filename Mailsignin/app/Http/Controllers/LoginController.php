<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Userdetails;

use Illuminate\Http\Request;

class LoginController extends Controller
{


    public function getCountryData(){
        $data = DB::table('countries')->get();
        return $data;
    }


    public function getStateData($country_id) {
        $data = DB::table('states')->where('country_id', $country_id)->get();
        return $data;
    }


    public function addData(Request $request){
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',  
            'email' => 'required',  
            'country_id' => 'required',  
            'state_id' => 'required',  
        ]);
        
        $user = new Userdetails();
        $user ->firstname = $request->firstname;
        $user ->lastname = $request->lastname;
        $user ->email = $request->email;
        $user ->country_id = $request->country_id;
        $user ->state_id = $request->state_id;

        if ($user->save()) {
            return response()->json(['message' => 'Data added successfully'], 200);
        } else {
            return response()->json(['message' => 'Oops, something went wrong'], 500);
        }
    }
}
