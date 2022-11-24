<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainCategories extends Model
{
    use HasFactory;
    protected $fillable = ['name'];


    public function getSubcategories()
    {
        return $this->hasMany(Subcategories::class,'sub_category_id','id');
    }
}

