<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
            'points' => 0,
            'level' => 1,
        ]);

        // Create some regular users for demo
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'points' => 250,
            'level' => 3,
            'total_matches' => 10,
            'wins' => 7,
            'losses' => 3,
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'points' => 180,
            'level' => 2,
            'total_matches' => 8,
            'wins' => 5,
            'losses' => 3,
        ]);

        User::create([
            'name' => 'Mike Johnson',
            'email' => 'mike@example.com',
            'password' => Hash::make('password'),
            'points' => 320,
            'level' => 4,
            'total_matches' => 15,
            'wins' => 10,
            'losses' => 5,
        ]);
    }
}
