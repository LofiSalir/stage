<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all orders with customer details and purchased items. Order by newest first.
        $orders = Order::with(['user', 'items.product'])->latest()->get();

        return inertia('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order->update([
            'status' => $request->status
        ]);

        // If status is changed to processing (accepted), send email if customer has email
        if ($request->status === 'processing' && $order->customer_email) {
            \Illuminate\Support\Facades\Mail::to($order->customer_email)->send(new \App\Mail\OrderStatusUpdated($order));
        }

        return redirect()->back()->with('success', 'Statut de la commande mis à jour.');
    }
}
