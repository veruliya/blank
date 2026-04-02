<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('employees')->controller(EmployeeController::class)->group(function () {
    Route::get('/', 'index')->name('employees.index');
    Route::get('show/{id}', 'show');
    Route::get('create', 'create');
    Route::post('store', 'store');
    Route::get('edit/{id}', 'edit');
    Route::put('update/{id}', 'update');
    Route::delete('delete', 'destroy');
});