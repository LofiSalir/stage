import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, product }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        original_price: product.original_price || '',
        category: product.category || '',
        brand: product.brand || '',
        type: product.type || '',
        image: product.image || '',
        badge: product.badge || '',
        stock: product.stock || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier le Produit</h2>}
        >
            <Head title="Modifier le Produit" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Nom" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="category" value="Catégorie" />
                                <select
                                    id="category"
                                    name="category"
                                    value={data.category}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) => setData('category', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Sélectionner une catégorie</option>
                                    <option value="printers">Imprimantes</option>
                                    <option value="accessories">Accessoires</option>
                                    <option value="paper">Papier</option>
                                    <option value="ink">Encre</option>
                                </select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Prix" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="original_price" value="Prix Initial" />
                                <TextInput
                                    id="original_price"
                                    type="number"
                                    step="0.01"
                                    name="original_price"
                                    value={data.original_price}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('original_price', e.target.value)}
                                />
                                <InputError message={errors.original_price} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />
                                <TextInput
                                    id="stock"
                                    type="number"
                                    name="stock"
                                    value={data.stock}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('stock', e.target.value)}
                                    required
                                />
                                <InputError message={errors.stock} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="URL de l'Image" />
                                <TextInput
                                    id="image"
                                    type="text"
                                    name="image"
                                    value={data.image}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('image', e.target.value)}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="col-span-2 flex items-center justify-end mt-4">
                                <Link
                                    href={route('admin.products.index')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Annuler
                                </Link>
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Mettre à Jour
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
