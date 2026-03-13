import React from "react";
import { Head, Link, router } from "@inertiajs/react";

// Checkout Component
function Checkout({ cart, onBack, onUpdateQuantity, onRemove, totalPrice }) {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        card: '',
        expiry: '',
        cvv: ''
    });
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [processing, setProcessing] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post('/checkout', {
            ...formData,
            total: totalPrice,
            cart: cart
        }, {
            onSuccess: () => {
                setProcessing(false);
                setIsSubmitted(true);
            },
            onError: (errors) => {
                setProcessing(false);
                console.error(errors);
                alert("Failed to process order. Please check the form data.");
            }
        });
    };

    if (isSubmitted) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto' }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: '64px', color: '#10b981', marginBottom: '20px' }}></i>
                    <h2 style={{ fontSize: '28px', color: '#1e293b', marginBottom: '10px' }}>Commande Confirmée !</h2>
                    <p style={{ color: '#64748b', marginBottom: '30px' }}>Merci pour votre achat, {formData.name}. Votre commande a été passée avec succès.</p>
                    <button className="btn btn-primary" onClick={onBack}>Retour à la Boutique</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: '30px' }}>
                <i className="fa-solid fa-arrow-left"></i> Retour à la Boutique
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '25px', display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-truck-fast" style={{ marginRight: '10px', color: '#2563eb' }}></i>
                        Informations de Livraison
                    </h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label>Nom Complet</label>
                            <input type="text" name="name" required placeholder="Jean Dupont" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        </div>
                        <div className="form-group">
                            <label>Adresse Email</label>
                            <input type="email" name="email" required placeholder="jean@exemple.com" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        </div>
                        <div className="form-group">
                            <label>Adresse de Livraison</label>
                            <input type="text" name="address" required placeholder="123 Rue de l'Impression" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Ville</label>
                                <input type="text" name="city" required placeholder="Paris" value={formData.city} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                            </div>
                            <div className="form-group">
                                <label>Code Postal</label>
                                <input type="text" name="zip" required placeholder="75001" value={formData.zip} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '-5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-credit-card" style={{ color: '#2563eb' }}></i>
                            Informations de Paiement
                        </h3>
                        <div className="form-group">
                            <label>Numéro de Carte</label>
                            <input type="text" name="card" required placeholder="**** **** **** ****" maxLength="19" value={formData.card} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', letterSpacing: '2px' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <i className="fa-regular fa-calendar" style={{ color: '#2563eb' }}></i>
                                    Date d'Expiration (MM/AA)
                                </label>
                                <input type="text" name="expiry" required placeholder="MM/YY" maxLength="5" value={formData.expiry} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', letterSpacing: '2px' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <i className="fa-solid fa-lock" style={{ color: '#2563eb' }}></i>
                                    CVV
                                </label>
                                <input type="text" name="cvv" required placeholder="123" maxLength="4" value={formData.cvv} onChange={handleInputChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', letterSpacing: '4px' }} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '20px', padding: '15px' }} disabled={processing}>
                            <i className="fa-solid fa-check-circle"></i> {processing ? 'Traitement...' : `Passer la commande (${totalPrice.toFixed(2)} MAD)`}
                        </button>
                    </form>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '20px', color: '#1e293b', marginBottom: '20px' }}>Résumé de la Commande</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid #f1f5f9' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '14px', color: '#1e293b', margin: 0 }}>{item.name}</h4>
                                        <div style={{ fontSize: '13px', color: '#2563eb', fontWeight: 'bold' }}>{parseFloat(item.price).toFixed(2)} MAD</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Qté: {item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#1e293b', paddingTop: '15px' }}>
                            <span>Total</span>
                            <span>{totalPrice.toFixed(2)} MAD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Welcome({ auth, initialProducts }) {
    const [cart, setCart] = React.useState([]);
    const [currentCategory, setCurrentCategory] = React.useState("printers");
    const [cartOpen, setCartOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [toast, setToast] = React.useState(null);
    const [view, setView] = React.useState('shop'); // 'shop' or 'checkout'

    // Group products by category
    const productsByCategory = initialProducts.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {});

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const addToCart = (productId) => {
        const product = initialProducts.find((p) => p.id === productId);
        if (!product) return;

        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        showToast(`${product.name} ajouté au panier !`);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, change) => {
        setCart(
            cart
                .map((item) => {
                    if (item.id === productId) {
                        const newQuantity = item.quantity + change;
                        return newQuantity > 0
                            ? { ...item, quantity: newQuantity }
                            : null;
                    }
                    return item;
                })
                .filter(Boolean),
        );
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const handleProceedToCheckout = () => {
        if (cart.length === 0) {
            showToast("Votre panier est vide !");
            return;
        }
        setCartOpen(false);
        setView('checkout');
        window.scrollTo(0, 0);
    };

    return (
        <div className="app">
            <Head title="Boutique" />
            
            {/* Navigation */}
            <nav className="navbar">
                <div className="container">
                    <div className="nav-brand">
                        <Link href="/" onClick={() => setView('shop')}>
                            <i className="fa-solid fa-print"></i>
                            <span>PrintPro</span>
                        </Link>
                    </div>
                    <ul className="nav-menu">
                        <li>
                            <Link href="/" className={`nav-link ${view === 'shop' ? 'active' : ''}`} onClick={() => setView('shop')}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <a href="#products" className="nav-link" onClick={() => setView('shop')}>
                                Produits
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="nav-link" onClick={() => setView('shop')}>
                                À Propos
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="nav-link" onClick={() => setView('shop')}>
                                Contact
                            </a>
                        </li>
                        {auth.user ? (
                            <>
                                <li>
                                    <Link href={route('dashboard')} className="nav-link">
                                        Tableau de Bord
                                    </Link>
                                </li>
                                {auth.user.is_admin && (
                                    <>
                                        <li>
                                            <Link href={route('admin.products.index')} className="nav-link">
                                                Produits Admin
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('admin.orders.index')} className="nav-link">
                                                Commandes Admin
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={route('login')} className="nav-link">
                                        Connexion
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="nav-actions">
                        <button
                            className="cart-btn"
                            onClick={() => setCartOpen(!cartOpen)}
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="cart-count">{totalItems}</span>
                        </button>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
                <ul className="mobile-nav-menu">
                    <li><Link href="/" onClick={() => { setMobileMenuOpen(false); setView('shop'); }} className="mobile-nav-link">Accueil</Link></li>
                    <li><a href="#products" onClick={() => { setMobileMenuOpen(false); setView('shop'); }} className="mobile-nav-link">Produits</a></li>
                    <li><a href="#about" onClick={() => { setMobileMenuOpen(false); setView('shop'); }} className="mobile-nav-link">À Propos</a></li>
                    <li><a href="#contact" onClick={() => { setMobileMenuOpen(false); setView('shop'); }} className="mobile-nav-link">Contact</a></li>
                    {auth.user ? (
                        <>
                            <li><Link href={route('dashboard')} className="mobile-nav-link">Tableau de Bord</Link></li>
                            {auth.user.is_admin && (
                                <>
                                    <li><Link href={route('admin.products.index')} className="mobile-nav-link">Produits Admin</Link></li>
                                    <li><Link href={route('admin.orders.index')} className="mobile-nav-link">Commandes Admin</Link></li>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <li><Link href={route('login')} className="mobile-nav-link">Connexion</Link></li>
                        </>
                    )}
                </ul>
            </div>

            {view === 'shop' ? (
                <>
                {/* Hero Section */}
                <section className="hero" id="home">
                    <div className="hero-overlay"></div>
                    <div className="container">
                        <div className="hero-content">
                            <span className="hero-badge" style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '50px', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', marginBottom: '24px', fontWeight: '600', fontSize: '14px' }}>Qualité Premium</span>
                            <h1 className="hero-title" style={{ fontSize: '64px', fontWeight: '800', color: 'white', lineHeight: '1.1', marginBottom: '24px' }}>
                                Solutions d'Impression<br/>Professionnelles pour Tous
                            </h1>
                            <p className="hero-subtitle" style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>
                                Découvrez notre large gamme d'imprimantes, encres, papiers et accessoires.
                                Des produits de qualité à des prix imbattables.
                            </p>
                            <div className="hero-actions" style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
                                <a href="#products" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }}>
                                    <i className="fa-solid fa-lock"></i>
                                    Acheter Maintenant
                                </a>
                                <a href="#about" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', border: '2px solid white', color: 'white', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }}>
                                    <i className="fa-solid fa-circle-info"></i>
                                    En Savoir Plus
                                </a>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '60px' }}>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', lineHeight: '1' }}>500+</div>
                                    <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Produits</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', lineHeight: '1' }}>10K+</div>
                                    <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Clients Satisfaits</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', lineHeight: '1' }}>98%</div>
                                    <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>de Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="about" id="about" style={{ padding: '80px 0', background: '#f8fafc' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                            <div>
                                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>À PROPOS DE NOUS</span>
                                <h2 className="section-title" style={{ marginTop: '8px', marginBottom: '24px' }}>Votre Partenaire d'Impression de Confiance</h2>
                                <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '20px', lineHeight: '1.6' }}>
                                    Chez PrintPro, nous sommes spécialisés dans la fourniture de solutions d'impression de haute qualité pour les entreprises et les particuliers depuis 2015. Notre engagement envers l'excellence et la satisfaction du client a fait de nous un fournisseur leader d'imprimantes et de fournitures d'impression.
                                </p>
                                <p style={{ color: '#64748b', marginBottom: '32px', lineHeight: '1.6' }}>
                                    Nous nous associons à des marques renommées pour vous offrir les meilleurs produits à des prix compétitifs. Notre équipe compétente est toujours prête à vous aider à trouver la solution d'impression parfaite pour vos besoins.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: '20px' }}></i>
                                        <span style={{ color: '#334155', fontWeight: '500', fontSize: '14px' }}>Revendeur Agréé</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="fa-solid fa-truck-fast" style={{ color: '#10b981', fontSize: '20px' }}></i>
                                        <span style={{ color: '#334155', fontWeight: '500', fontSize: '14px' }}>Livraison Rapide</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="fa-solid fa-headset" style={{ color: '#10b981', fontSize: '20px' }}></i>
                                        <span style={{ color: '#334155', fontWeight: '500', fontSize: '14px' }}>Assistance 24/7</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="fa-solid fa-rotate-left" style={{ color: '#10b981', fontSize: '20px' }}></i>
                                        <span style={{ color: '#334155', fontWeight: '500', fontSize: '14px' }}>Retours Faciles</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <img src="/images/interlink-logo.png" alt="Interlink Distribution Logo" style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%', display: 'block', backgroundColor: 'white', padding: '20px' }} />
                                <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#3b82f6', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                                    Depuis 2015
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="products" id="products" style={{ padding: '80px 0', background: 'white' }}>
                    <div className="container">
                        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="section-subtitle" style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>NOS PRODUITS</span>
                            <h2 className="section-title" style={{ marginTop: '8px', marginBottom: '16px' }}>Parcourez Notre Catalogue</h2>
                            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Tout ce dont vous avez besoin pour vos impressions, des imprimantes de haute qualité aux fournitures premium.</p>
                        </div>

                        {/* Product Tabs */}
                        <div className="product-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
                            {Object.keys(productsByCategory).map(category => {
                                const icons = {
                                    printers: "fa-print",
                                    accessories: "fa-plug",
                                    paper: "fa-sheet-plastic",
                                    ink: "fa-fill-drip"
                                };
                                const categoryDisplayNames = {
                                    printers: "Imprimantes",
                                    accessories: "Accessoires",
                                    paper: "Papier",
                                    ink: "Encre"
                                };
                                return (
                                    <button
                                        key={category}
                                        className={`tab-btn ${currentCategory === category ? "active" : ""}`}
                                        onClick={() => setCurrentCategory(category)}
                                        style={{ 
                                            display: 'flex', alignItems: 'center', gap: '8px', 
                                            padding: '12px 24px', borderRadius: '50px',
                                            border: currentCategory === category ? 'none' : '1px solid #e2e8f0',
                                            backgroundColor: currentCategory === category ? '#3b82f6' : 'white',
                                            color: currentCategory === category ? 'white' : '#64748b',
                                            fontWeight: '500', transition: 'all 0.2s', cursor: 'pointer'
                                        }}
                                    >
                                        <i className={`fa-solid ${icons[category] || 'fa-box'}`}></i>
                                        <span>{categoryDisplayNames[category] || category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Product Grid */}
                        <div className="product-grid">
                            {productsByCategory[currentCategory]?.map((product) => (
                                <div className="product-card" key={product.id}>
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} />
                                        {product.badge && <span className="product-badge">{product.badge}</span>}
                                    </div>
                                    <div className="product-info">
                                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#3b82f6', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                                            {currentCategory.toUpperCase()}
                                        </span>
                                        <h3 className="product-title">{product.name}</h3>
                                        <div className="product-footer" style={{ marginTop: '16px' }}>
                                            <div className="product-price">
                                                {parseFloat(product.price).toFixed(2)} MAD
                                                {product.original_price && (
                                                    <span>{parseFloat(product.original_price).toFixed(2)} MAD</span>
                                                )}
                                            </div>
                                            <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>
                                                <i className="fa-solid fa-cart-plus"></i> Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="contact" id="contact" style={{ padding: '80px 0', background: '#f8fafc' }}>
                    <div className="container">
                        <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <span className="section-subtitle" style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>ENTRER EN CONTACT</span>
                            <h2 className="section-title" style={{ marginTop: '8px', marginBottom: '16px' }}>Contactez-nous</h2>
                            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Des questions ? Nous serions ravis de vous entendre. Envoyez-nous un message et nous vous répondrons dès que possible.</p>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fa-solid fa-location-dot" style={{ color: 'white', fontSize: '20px' }}></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Rendez-nous Visite</h3>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>123 Rue de l'Impression, Bureau 100<br/>Quartier des Affaires, NY 10001</p>
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fa-solid fa-phone" style={{ color: 'white', fontSize: '20px' }}></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Appelez-nous</h3>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fa-solid fa-envelope" style={{ color: 'white', fontSize: '20px' }}></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Envoyez-nous un Email</h3>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>info@printpro.com</p>
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fa-solid fa-clock" style={{ color: 'white', fontSize: '20px' }}></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Horaires</h3>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>Lun-Ven : 9h - 19h<br/>Sam-Dim : 10h - 17h</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Votre Nom</label>
                                        <input type="text" placeholder="Jean Dupont" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Adresse Email</label>
                                        <input type="email" placeholder="jean@exemple.com" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Sujet</label>
                                        <input type="text" placeholder="Comment pouvons-nous vous aider ?" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Message</label>
                                        <textarea rows="4" placeholder="Votre message ici..." style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', resize: 'vertical' }}></textarea>
                                    </div>
                                    <button type="button" style={{ marginTop: '10px', padding: '16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
                                        <i className="fa-solid fa-paper-plane"></i> Envoyer le Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="footer" style={{ background: '#0f172a', color: 'white', padding: '60px 0 20px' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <i className="fa-solid fa-print" style={{ color: '#3b82f6', fontSize: '24px' }}></i>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>PrintPro</h3>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                                    Votre destination de choix pour les imprimantes et les fournitures d'impression. Des produits de qualité, un service exceptionnel.
                                </p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <a href="#" style={{ width: '36px', height: '36px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', transition: 'all 0.2s' }}><i className="fa-brands fa-facebook-f"></i></a>
                                    <a href="#" style={{ width: '36px', height: '36px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', transition: 'all 0.2s' }}><i className="fa-brands fa-twitter"></i></a>
                                    <a href="#" style={{ width: '36px', height: '36px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', transition: 'all 0.2s' }}><i className="fa-brands fa-instagram"></i></a>
                                    <a href="#" style={{ width: '36px', height: '36px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', transition: 'all 0.2s' }}><i className="fa-brands fa-linkedin-in"></i></a>
                                </div>
                            </div>
                            
                            <div>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>Liens Rapides</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <li><a href="#home" style={{ color: '#94a3b8', fontSize: '14px' }}>Accueil</a></li>
                                    <li><a href="#products" style={{ color: '#94a3b8', fontSize: '14px' }}>Produits</a></li>
                                    <li><a href="#about" style={{ color: '#94a3b8', fontSize: '14px' }}>À Propos</a></li>
                                    <li><a href="#contact" style={{ color: '#94a3b8', fontSize: '14px' }}>Contact</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>Produits</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Imprimantes</a></li>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Accessoires</a></li>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Papier</a></li>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Encre</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>Service Client</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Informations de Livraison</a></li>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Retours</a></li>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>FAQ</a></li>
                                    <li><a href="#" style={{ color: '#94a3b8', fontSize: '14px' }}>Politique de Confidentialité</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                            &copy; {new Date().getFullYear()} PrintPro. Tous droits réservés.
                        </div>
                    </div>
                </footer>
                </>
            ) : (
                <Checkout 
                    cart={cart} 
                    onBack={() => setView('shop')} 
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    totalPrice={totalPrice}
                />
            )}

            {/* Shopping Cart Sidebar */}
            <aside className={`cart-sidebar ${cartOpen ? "active" : ""}`}>
                <div className="cart-header">
                    <h3 style={{ margin: 0 }}><i className="fa-solid fa-cart-shopping"></i> Votre Panier</h3>
                    <button className="cart-close" onClick={() => setCartOpen(false)}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
                <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                            <i className="fa-solid fa-shopping-basket" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                            <p>Votre panier est vide</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div className="cart-item" key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #f1f5f9' }}>
                                <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>{item.name}</h4>
                                    <p style={{ fontWeight: 'bold', color: '#2563eb', margin: '0 0 10px 0' }}>{parseFloat(item.price).toFixed(2)} MAD</p>
                                    <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px 8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>-</button>
                                        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px 8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444' }}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="cart-footer" style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
                    <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                        <span>Total :</span>
                        <span>{totalPrice.toFixed(2)} MAD</span>
                    </div>
                    <button className="btn btn-primary btn-full" onClick={handleProceedToCheckout} style={{ width: '100%' }}>
                        Commander
                    </button>
                </div>
            </aside>
            <div className={`cart-overlay ${cartOpen ? "active" : ""}`} onClick={() => setCartOpen(false)}></div>

            {toast && (
                <div className="toast active">
                    <i className="fa-solid fa-check-circle"></i>
                    <span className="toast-message">{toast}</span>
                </div>
            )}
        </div>
    );
}
