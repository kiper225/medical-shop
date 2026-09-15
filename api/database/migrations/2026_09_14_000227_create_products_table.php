<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('reference')->unique();

            $table->string('category');
            $table->string('brand')->nullable();

            $table->string('image')->nullable();

            $table->decimal('price', 15, 2)->nullable();
            $table->decimal('rental_price', 15, 2)->nullable();

            $table->unsignedInteger('stock')->default(0);

            $table->enum('condition', [
                'New',
                'Used',
                'Refurbished',
            ])->default('New');

            $table->boolean('sale_available')->default(true);
            $table->boolean('rental_available')->default(false);
            $table->boolean('installation_required')->default(false);
            $table->boolean('maintenance_required')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};