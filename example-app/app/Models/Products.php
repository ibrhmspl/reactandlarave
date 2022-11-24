<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'sub_category_id',
    ];

    public function getSubCategory()
    {
        return $this->belongsTo(SubCategories::class, 'sub_category_id');
    }

    public function getStoreProducts()
    {
        return $this->hasMany(StroreProducts::class,'store_products_id');
    }

    public function getPhotos()
    {
        return $this->morphMany(Photos::class, 'imageable')->orderBy("type","asc");
    }
}


