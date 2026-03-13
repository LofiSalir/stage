<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

// Test database connection
try {
    DB::connection()->getPdo();
    $databaseName = DB::connection()->getDatabaseName();
    $driverName = DB::connection()->getDriverName();
    
    echo "=======================================\n";
    echo "🎉 Laravel Application Test - SUCCESS!\n";
    echo "=======================================\n\n";
    echo "✅ Database Connected Successfully!\n";
    echo "📦 Database Name: " . $databaseName . "\n";
    echo "🔧 Database Driver: " . $driverName . "\n";
    echo "🌐 Server: 127.0.0.1:3307 (MariaDB)\n\n";
    echo "=======================================\n";
    echo "📋 Application Info:\n";
    echo "=======================================\n";
    echo "App Name: " . config('app.name') . "\n";
    echo "App Env: " . config('app.env') . "\n";
    echo "App Debug: " . (config('app.debug') ? 'true' : 'false') . "\n";
    echo "App URL: " . config('app.url') . "\n\n";
    echo "=======================================\n";
    echo "✅ Laravel is running perfectly with MariaDB!\n";
    echo "=======================================\n";
    
} catch (Exception $e) {
    echo "❌ Database Connection Failed!\n";
    echo "Error: " . $e->getMessage() . "\n";
}
