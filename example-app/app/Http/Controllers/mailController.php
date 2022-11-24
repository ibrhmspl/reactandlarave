<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use Illuminate\Support\Facades\Hash;
use App\Models\Tmp_worker;

class mailController extends Controller
{
    public function send(Request $request)
    {
        $email = $request->email;
        $key = Hash::make($email);
        $array=[
            'url' => 'http://localhost:3000/Auth?key='.$key,
        ];
        $tmp_worker = new Tmp_worker([
            'key' => $key,
            'store_id' => $request->store_id,
        ]);
        $tmp_worker->save();
        mail::send('hosgeldin',$array, function($message) use($email){
            $message->subject('hoşgeldin');
            $message->to($email);
        });
    }
}
