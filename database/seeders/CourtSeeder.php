<?php

namespace Database\Seeders;

use App\Models\Court;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courts = [
            [
                'name' => 'Basketball Court A',
                'description' => 'Full-size indoor basketball court with professional equipment',
            ],
            [
                'name' => 'Tennis Court 1',
                'description' => 'Outdoor tennis court with hard surface',
            ],
            [
                'name' => 'Football Field',
                'description' => 'Standard football field with artificial turf',
            ],
            [
                'name' => 'Volleyball Court',
                'description' => 'Indoor volleyball court with professional net',
            ],
            [
                'name' => 'Badminton Court',
                'description' => 'Indoor badminton court with 3 playing areas',
            ],
        ];

        foreach ($courts as $court) {
            Court::updateOrCreate(
                ['name' => $court['name']],
                $court
            );
        }
    }
}
