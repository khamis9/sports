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
        // Create or update admin user
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'points' => 0,
                'level' => 1,
            ]
        );

        // Create or update regular users for demo
        User::updateOrCreate(
            ['email' => 'john@example.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'points' => 250,
                'level' => 3,
                'total_matches' => 10,
                'wins' => 7,
                'losses' => 3,
            ]
        );

        User::updateOrCreate(
            ['email' => 'jane@example.com'],
            [
                'name' => 'Jane Smith',
                'password' => Hash::make('password'),
                'points' => 180,
                'level' => 2,
                'total_matches' => 8,
                'wins' => 5,
                'losses' => 3,
            ]
        );

        User::updateOrCreate(
            ['email' => 'mike@example.com'],
            [
                'name' => 'Mike Johnson',
                'password' => Hash::make('password'),
                'points' => 320,
                'level' => 4,
                'total_matches' => 15,
                'wins' => 10,
                'losses' => 5,
            ]
        );
    }
}
