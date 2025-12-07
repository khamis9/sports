<?php

namespace Database\Seeders;

use App\Models\Challenge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $challenges = [
            [
                'title' => 'Play 2 times this week',
                'description' => 'Book and complete 2 court sessions within the current week',
                'points_reward' => 20,
            ],
            [
                'title' => 'Win 1 match this week',
                'description' => 'Win at least 1 match and report the result this week',
                'points_reward' => 20,
            ],
            [
                'title' => 'Book 3 different courts',
                'description' => 'Make bookings for 3 different types of courts',
                'points_reward' => 30,
            ],
            [
                'title' => 'Weekend Warrior',
                'description' => 'Play on both Saturday and Sunday',
                'points_reward' => 25,
            ],
            [
                'title' => 'Early Bird',
                'description' => 'Book a morning slot (before 10 AM) 3 times',
                'points_reward' => 15,
            ],
        ];

        foreach ($challenges as $challenge) {
            Challenge::updateOrCreate(
                ['title' => $challenge['title']],
                $challenge
            );
        }
    }
}
