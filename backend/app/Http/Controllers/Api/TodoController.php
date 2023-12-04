<?php

namespace App\Http\Controllers\Api;

use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\TodoResource;
use App\Http\Resources\TodoCollection;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new TodoCollection(Todo::paginate());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        return new TodoResource(Todo::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return new TodoResource($todo);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $todo->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
    }
}
