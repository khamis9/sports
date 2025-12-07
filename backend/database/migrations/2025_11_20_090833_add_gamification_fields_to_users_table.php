<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('points')->default(0);
            $table->integer('level')->default(1);
            $table->integer('total_matches')->default(0);
            $table->integer('wins')->default(0);
            $table->integer('losses')->default(0);
            $table->boolean('is_admin')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['points', 'level', 'total_matches', 'wins', 'losses', 'is_admin']);
        });
    }
};
