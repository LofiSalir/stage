import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const SidebarContent = () => (
        <>
            <div className="flex items-center justify-center h-20 border-b border-slate-800 shrink-0">
                <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition-colors">
                    <i className="fa-solid fa-print text-blue-500"></i>
                    PrintPro
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 scrollbar-thin scrollbar-thumb-slate-700">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">Menu Principal</div>
                
                <Link 
                    href={route('dashboard')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${route().current('dashboard') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                    <i className="fa-solid fa-gauge w-5 text-center text-lg"></i>
                    <span>Aperçu</span>
                </Link>

                {user.is_admin && (
                    <>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-4">Gestion</div>
                        
                        <Link 
                            href={route('admin.products.index')} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${route().current('admin.products.*') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <i className="fa-solid fa-box-open w-5 text-center text-lg"></i>
                            <span>Produits</span>
                        </Link>

                        <Link 
                            href={route('admin.orders.index')} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${route().current('admin.orders.*') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <i className="fa-solid fa-cart-shopping w-5 text-center text-lg"></i>
                            <span>Commandes</span>
                        </Link>
                    </>
                )}
            </div>

            <div className="p-4 border-t border-slate-800 shrink-0">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition-colors text-left group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-blue-500/50 transition-shadow">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h4 className="text-sm font-semibold truncate text-white">{user.name}</h4>
                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                            <i className="fa-solid fa-chevron-up text-slate-500 text-xs transition-transform group-hover:-translate-y-1"></i>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="top" width="48">
                        <Dropdown.Link href={route('profile.edit')}>Profil & Paramètres</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 hover:text-red-700">Déconnexion</Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 text-white shadow-2xl z-20">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar overlay */}
            {showingNavigationDropdown && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div 
                        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
                        onClick={() => setShowingNavigationDropdown(false)}
                    ></div>
                    <aside className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out">
                        <div className="absolute top-0 right-0 -mr-12 pt-4">
                            <button
                                type="button"
                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-slate-800/50 text-white"
                                onClick={() => setShowingNavigationDropdown(false)}
                            >
                                <span className="sr-only">Fermer la barre latérale</span>
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden w-full relative">
                {/* Mobile Top Bar */}
                <header className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 shadow-sm z-30 sticky top-0">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setShowingNavigationDropdown(true)} 
                            className="text-slate-500 hover:text-blue-600 focus:outline-none p-2 rounded-md hover:bg-slate-100 transition-colors"
                        >
                            <i className="fa-solid fa-bars text-xl"></i>
                        </button>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
                        <i className="fa-solid fa-print text-blue-600"></i>
                        PrintPro
                    </Link>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {user.name.charAt(0)}
                    </div>
                </header>

                {/* Page Header (Desktop) */}
                {header && (
                    <header className="bg-white/80 backdrop-blur-md shadow-sm z-10 sticky top-0 border-b border-slate-200 hidden md:flex items-center justify-between px-8 py-4 transition-all">
                        <div className="flex-1">
                            {header}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <a 
                                href="/" 
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa-solid fa-store"></i>
                                <span>Voir la boutique</span>
                            </a>
                        </div>
                    </header>
                )}

                {/* Main Content Wrapper */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto pb-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
