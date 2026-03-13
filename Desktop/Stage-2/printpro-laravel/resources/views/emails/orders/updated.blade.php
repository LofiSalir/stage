<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8fafc; padding: 20px; text-align: center; border-bottom: 2px solid #e2e8f0; }
        .content { padding: 20px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Mise à jour de votre commande</h2>
        </div>
        <div class="content">
            <p>Bonjour {{ $order->customer_name ?? 'Client' }},</p>
            <p>Nous avons le plaisir de vous informer que votre commande <strong>#{{ $order->id }}</strong> a été acceptée et est maintenant <strong>en cours de traitement</strong>.</p>
            
            <p>Nous préparons actuellement vos articles pour l'expédition. Vous recevrez une autre notification une fois que votre commande sera expédiée.</p>

            <h3>Détails de la commande :</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                @foreach($order->items as $item)
                    <tr style="border-bottom: 1px solid #edf2f7;">
                        <td style="padding: 10px 0; width: 60px;">
                            @if($item->product && $item->product->image)
                                <img src="{{ $item->product->image }}" alt="{{ $item->product->name }}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                            @else
                                <div style="width: 50px; height: 50px; background-color: #f1f5f9; border-radius: 8px; text-align: center; line-height: 50px; color: #cbd5e1;">Logo</div>
                            @endif
                        </td>
                        <td style="padding: 10px; vertical-align: middle;">
                            <span style="font-weight: bold; color: #1e293b;">{{ $item->product ? $item->product->name : 'Produit inconnu' }}</span><br>
                            <span style="font-size: 13px; color: #64748b;">Quantité : {{ $item->quantity }}</span>
                        </td>
                        <td style="padding: 10px; text-align: right; vertical-align: middle; font-weight: bold; color: #1e293b;">
                            {{ number_format($item->price * $item->quantity, 2) }} MAD
                        </td>
                    </tr>
                @endforeach
            </table>
            <div style="margin-top: 20px; text-align: right; border-top: 2px solid #e2e8f0; padding-top: 10px;">
                <p style="font-size: 18px; font-weight: bold; color: #2563eb;">Total : {{ number_format($order->total, 2) }} MAD</p>
            </div>

            <p style="text-align: center; margin-top: 30px;">
                <a href="{{ url('/') }}" class="button" style="color: white !important;">Visiter notre boutique</a>
            </p>
        </div>
        <div class="footer">
            <p>Merci de faire vos achats chez PrintPro !</p>
        </div>
    </div>
</body>
</html>
