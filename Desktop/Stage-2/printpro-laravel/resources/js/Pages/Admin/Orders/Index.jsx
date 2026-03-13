import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ auth, orders }) {
    const handleStatusUpdate = (orderId, newStatus) => {
        router.put(route('admin.orders.update', orderId), { status: newStatus }, {
            preserveScroll: true,
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'En attente';
            case 'processing': return 'En traitement';
            case 'completed': return 'Terminée';
            case 'cancelled': return 'Annulée';
            default: return status;
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-slate-800">Commandes Clients</h2>}>
            <Head title="Commandes" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-slate-500">Gérez et consultez toutes les commandes passées sur la boutique.</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <i className="fa-solid fa-box-open text-2xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Aucune commande</h3>
                        <p className="text-slate-500">Les commandes des clients apparaîtront ici.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Order Header */}
                                <div className="bg-slate-50 border-b border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-slate-800">Commande #{order.id}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            <i className="fa-regular fa-calendar"></i>
                                            {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                                year: 'numeric', month: 'long', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 mb-1">Montant Total</p>
                                        <p className="text-2xl font-black text-blue-600">{parseFloat(order.total).toFixed(2)} MAD</p>
                                        <div className="mt-3 flex gap-2 justify-end">
                                            {order.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'processing')}
                                                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition"
                                                >
                                                    Accepter (En cours)
                                                </button>
                                            )}
                                            {order.status === 'processing' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'completed')}
                                                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition"
                                                >
                                                    Marquer comme Terminée
                                                </button>
                                            )}
                                            {order.status !== 'cancelled' && order.status !== 'completed' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                                                    className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-red-600 hover:text-white transition"
                                                >
                                                    Annuler
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Client Info */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
                                            <i className="fa-solid fa-user text-slate-400"></i> Informations Client
                                        </h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Nom:</span>
                                                <span className="font-semibold text-slate-800">{order.customer_name || (order.user ? order.user.name : 'Client')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Email:</span>
                                                <span className="font-semibold text-slate-800">{order.customer_email || (order.user ? order.user.email : 'Non fourni')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Méthode de paiement:</span>
                                                <span className="font-semibold text-slate-800">{order.payment_method === 'card' ? 'Carte Bancaire' : (order.payment_method || 'Standard')}</span>
                                            </div>
                                            <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                <span className="text-slate-500 block mb-1 text-xs uppercase font-semibold">Adresse de livraison:</span>
                                                <span className="font-medium text-slate-800 block">
                                                    {order.address || order.shipping_address}<br/>
                                                    {order.city} {order.zip}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products List */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
                                            <i className="fa-solid fa-box text-slate-400"></i> Articles Commandés ({order.items.length})
                                        </h4>
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex items-center gap-4 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                                        {item.product && item.product.image ? (
                                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <i className="fa-solid fa-image text-slate-300"></i>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-slate-800 text-sm truncate" title={item.product ? item.product.name : 'Produit inconnu'}>
                                                            {item.product ? item.product.name : 'Produit inconnu'}
                                                        </h5>
                                                        <p className="text-xs text-slate-500">{item.quantity} × {parseFloat(item.price).toFixed(2)} MAD</p>
                                                    </div>
                                                    <div className="font-bold text-slate-800 text-sm text-right shrink-0">
                                                        {(item.quantity * item.price).toFixed(2)} <span className="text-[10px] text-slate-400">MAD</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
