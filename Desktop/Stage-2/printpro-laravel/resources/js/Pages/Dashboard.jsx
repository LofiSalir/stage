import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Aperçu" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                    Bienvenue, {user.name} 👋
                </h2>
                <p className="text-slate-500 mt-1">Voici un résumé de votre espace sur PrintPro.</p>
            </div>

            {user.is_admin ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Admin Cards */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Gestion des Produits</p>
                            <h3 className="text-xl font-bold text-slate-800">Catalogue</h3>
                            <Link href={route('admin.products.index')} className="text-blue-600 text-sm font-medium mt-2 inline-block hover:underline">
                                Gérer les produits &rarr;
                            </Link>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-box-open text-2xl"></i>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Suivi des Ventes</p>
                            <h3 className="text-xl font-bold text-slate-800">Commandes</h3>
                            <Link href={route('admin.orders.index')} className="text-indigo-600 text-sm font-medium mt-2 inline-block hover:underline">
                                Voir les commandes &rarr;
                            </Link>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-cart-shopping text-2xl"></i>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white overflow-hidden shadow-sm flex flex-col items-center justify-center sm:rounded-2xl border border-slate-100 p-12 text-center max-w-2xl mx-auto mt-12">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-6">
                        <i className="fa-solid fa-check text-4xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Vous êtes connecté</h3>
                    <p className="text-slate-500 mb-8 text-lg">Votre compte est actif. Vous pouvez maintenant retourner à la boutique pour effectuer vos achats.</p>
                    <a href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                        <i className="fa-solid fa-store"></i>
                        Retour à la Boutique
                    </a>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
