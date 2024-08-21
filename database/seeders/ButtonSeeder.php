<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ButtonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('buttons')->insert([
            [
                'title' => 'Google',
                'link' => 'https://google.com',
                'color' => 'blue',
            ],
            [
                'title' => 'Youtube',
                'link' => 'https://youtube.com',
                'color' => 'red',
            ]
        ]
    );
    }
}
