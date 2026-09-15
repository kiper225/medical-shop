<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'reference',
        'category',
        'brand',
        'image',
        'price',
        'rental_price',
        'stock',
        'condition',
        'sale_available',
        'rental_available',
        'installation_required',
        'maintenance_required',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rental_price' => 'decimal:2',
        'stock' => 'integer',
        'sale_available' => 'boolean',
        'rental_available' => 'boolean',
        'installation_required' => 'boolean',
        'maintenance_required' => 'boolean',
    ];
}
