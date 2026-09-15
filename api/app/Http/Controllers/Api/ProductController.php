<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(): JsonResponse
    {
        $products = Product::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'reference' => 'required|string|max:255|unique:products,reference',
            'category' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'price' => 'nullable|numeric|min:0',
            'rental_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'condition' => 'nullable|in:New,Used,Refurbished',
            'sale_available' => 'boolean',
            'rental_available' => 'boolean',
            'installation_required' => 'boolean',
            'maintenance_required' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('products', 'public');
        }

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Produit créé avec succès.',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(
        Request $request,
        Product $product
    ): JsonResponse {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'reference' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                'unique:products,reference,' . $product->id,
            ],
            'category' => 'sometimes|required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'price' => 'nullable|numeric|min:0',
            'rental_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'condition' => 'nullable|in:New,Used,Refurbished',
            'sale_available' => 'boolean',
            'rental_available' => 'boolean',
            'installation_required' => 'boolean',
            'maintenance_required' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('products', 'public');
        }

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Produit modifié avec succès.',
            'data' => $product->fresh(),
        ]);
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé avec succès.',
        ]);
    }
}