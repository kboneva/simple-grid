<?php

namespace App\Http\Controllers;

use App\Models\Button;
use Illuminate\Http\Request;

class ButtonController extends Controller
{
    public function index() {
        return Button::all();
    }

    public function store(Request $request) {
        if (Button::count() >= 9) {
            return response()->json(['error' => 'Maximum of 9 buttons allowed'], 400);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'color' => 'nullable|string',
            'link' => 'nullable|string|url'
        ]);

        $button = Button::create($validated);
        return response()->json($button, 201);
    }

    public function show($id) {
        return Button::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $button = Button::findOrFail($id);
        $button->update($request->all());
        return response()->json($button, 200);
    }

    public function destroy($id) {
        Button::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
