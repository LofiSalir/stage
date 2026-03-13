<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Printers
            [
                'name' => 'HP LaserJet Pro M404n',
                'description' => 'High-performance monochrome laser printer for business. Fast 40ppm printing.',
                'price' => 299.99,
                'original_price' => 349.99,
                'category' => 'printers',
                'badge' => 'Best Seller',
                'brand' => 'HP',
                'type' => 'Laser',
                'image' => 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
                'stock' => 50,
            ],
            [
                'name' => 'Canon imageCLASS MF644Cdw',
                'description' => 'All-in-one color laser printer with wireless connectivity and touch screen.',
                'price' => 449.99,
                'original_price' => 529.99,
                'category' => 'printers',
                'badge' => 'New',
                'brand' => 'Canon',
                'type' => 'Color Laser',
                'image' => 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop',
                'stock' => 30,
            ],
            [
                'name' => 'Epson EcoTank ET-4760',
                'description' => 'Wireless all-in-one supertank printer with up to 2 years of ink included.',
                'price' => 379.99,
                'original_price' => 449.99,
                'category' => 'printers',
                'badge' => 'Eco-Friendly',
                'brand' => 'Epson',
                'type' => 'Inktank',
                'image' => 'https://images.unsplash.com/photo-1542395567-5a7ce68a137e?w=400&h=300&fit=crop',
                'stock' => 25,
            ],
            [
                'name' => 'Brother HL-L2350DW',
                'description' => 'Compact monochrome laser printer with duplex printing. Home office favorite.',
                'price' => 169.99,
                'category' => 'printers',
                'brand' => 'Brother',
                'type' => 'Laser',
                'image' => 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop',
                'stock' => 100,
            ],
            [
                'name' => 'HP OfficeJet Pro 9015e',
                'description' => 'Pro-quality color inkjet printer with smart tasks and HP+ features.',
                'price' => 269.99,
                'category' => 'printers',
                'brand' => 'HP',
                'type' => 'Inkjet',
                'image' => 'https://images.unsplash.com/photo-1612815148464-996603f26111?w=400&h=300&fit=crop',
                'stock' => 40,
            ],
            [
                'name' => 'Canon PIXMA TR8620a',
                'description' => 'Work-from-home all-in-one printer with ADF and memory card slot.',
                'price' => 199.99,
                'category' => 'printers',
                'brand' => 'Canon',
                'type' => 'Inkjet',
                'image' => 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop',
                'stock' => 35,
            ],
            // Accessories
            [
                'name' => 'Premium USB 2.0 Printer Cable',
                'description' => 'Gold-plated 6ft USB-A to USB-B cable for reliable data transfer.',
                'price' => 14.99,
                'original_price' => 19.99,
                'category' => 'accessories',
                'badge' => 'Essential',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                'stock' => 200,
            ],
            [
                'name' => 'Adjustable Printer Stand',
                'description' => 'Space-saving steel stand with wheels and extra storage shelf.',
                'price' => 54.99,
                'category' => 'accessories',
                'image' => 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=300&fit=crop',
                'stock' => 15,
            ],
            [
                'name' => 'Wireless USB Print Server',
                'description' => 'Upgrade your wired printer to wireless. Easy setup for all brands.',
                'price' => 64.99,
                'category' => 'accessories',
                'badge' => 'Tech Upgrade',
                'image' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
                'stock' => 10,
            ],
            [
                'name' => 'HP Laser Maintenance Kit',
                'description' => 'Includes fuser and rollers for LaserJet M404 series.',
                'price' => 129.99,
                'category' => 'accessories',
                'brand' => 'HP',
                'image' => 'https://plus.unsplash.com/premium_photo-1678116348162-edb43b9542a2?w=400&h=300&fit=crop',
                'stock' => 5,
            ],
            // Paper
            [
                'name' => 'HP Bright White Inkjet Paper',
                'description' => '500 sheets, 24 lb. Optimized for color documents and reports.',
                'price' => 18.99,
                'original_price' => 24.99,
                'category' => 'paper',
                'badge' => 'Best Value',
                'image' => 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop',
                'stock' => 500,
            ],
            [
                'name' => 'Canon Glossy Photo Paper',
                'description' => '50 sheets, 4x6. Laboratory-quality glossy finish for vibrant photos.',
                'price' => 15.99,
                'category' => 'paper',
                'image' => 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=400&h=300&fit=crop',
                'stock' => 150,
            ],
            [
                'name' => 'Epson Premium Presentation Matte',
                'description' => '50 sheets, 8.5x11. Heavyweight paper for professional displays.',
                'price' => 21.49,
                'category' => 'paper',
                'image' => 'https://images.unsplash.com/photo-1568702846914-96b305d2uj96?w=400&h=300&fit=crop',
                'stock' => 80,
            ],
            [
                'name' => 'Multipurpose Office Paper Case',
                'description' => '5000 sheets (10 reams). Professional grade for high-volume copying.',
                'price' => 69.99,
                'original_price' => 89.99,
                'category' => 'paper',
                'badge' => 'Bulk Save',
                'image' => 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop',
                'stock' => 20,
            ],
            [
                'name' => 'Hammermill Cardstock',
                'description' => '250 sheets, 80 lb. Ideal for covers, cards, and brochures.',
                'price' => 24.99,
                'category' => 'paper',
                'image' => 'https://images.unsplash.com/photo-1583120613271-9ec3f7e52a92?w=400&h=300&fit=crop',
                'stock' => 60,
            ],
            // Ink
            [
                'name' => 'HP 58A Black Toner Cartridge',
                'description' => 'Standard yield LaserJet toner. Prints approx. 3,000 pages.',
                'price' => 119.99,
                'category' => 'ink',
                'brand' => 'HP',
                'badge' => 'Genuine',
                'image' => 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop',
                'stock' => 20,
            ],
            [
                'name' => 'Canon 054 Color Toner Set',
                'description' => 'Full set (CMY) for imageCLASS LF644Cdw series.',
                'price' => 229.99,
                'original_price' => 289.99,
                'category' => 'ink',
                'brand' => 'Canon',
                'badge' => 'Sale',
                'image' => 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
                'stock' => 10,
            ],
            [
                'name' => 'Epson 502 Ink Bottle Set',
                'description' => 'High-capacity EcoTank refill bottles. CMYK set.',
                'price' => 52.99,
                'category' => 'ink',
                'brand' => 'Epson',
                'image' => 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop',
                'stock' => 45,
            ],
            [
                'name' => 'Brother TN-760 High Yield Toner',
                'description' => 'Black toner for HL-L2350DW. Prints approx. 3,000 pages.',
                'price' => 79.99,
                'category' => 'ink',
                'brand' => 'Brother',
                'image' => 'https://images.unsplash.com/photo-1542395567-5a7ce68a137e?w=400&h=300&fit=crop',
                'stock' => 30,
            ],
            [
                'name' => 'HP 962XL High Yield Ink Combo',
                'description' => 'High-yield black and original color ink cartridges.',
                'price' => 134.99,
                'category' => 'ink',
                'brand' => 'HP',
                'image' => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop',
                'stock' => 15,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
