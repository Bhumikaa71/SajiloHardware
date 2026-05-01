"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useGetCartProductsMutation } from "@/services/productApi";

export default function AddToCart() {
    const [cart, setCart] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    const [getCartProducts, { data, isLoading }] = useGetCartProductsMutation();

    const cartProducts = data?.data ?? [];

    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            const ids: string[] = stored ? JSON.parse(stored) : [];
            setCart(ids);
            if (ids.length > 0) {
                getCartProducts({ ids });
            }
        } catch {
            setCart([]);
        }
        setMounted(true);
    }, []);

    const removeFromCart = (id: string) => {
        setCart((prev) => {
            const updated = prev.filter((item) => item !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            if (updated.length > 0) {
                getCartProducts({ ids: updated });
            }
            return updated;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const handleSelect = (id: string) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleOrder = () => {
        if (!cartProducts.length) return;

        const selectedProducts = cartProducts.filter((item: any) =>
            selectedItems.includes(item._id)
        );

        if (selectedProducts.length === 0) {
            alert("Please select at least one product");
            return;
        }

        const baseUrl = window.location.origin;
        const phoneNumber = "9779845526696";

        const message = selectedProducts
            .map((item: any, index: number) => {
                const price = item.dp_price > 0 ? item.dp_price : item.op_price;
                return `🛒 Product ${index + 1}
                    Name: ${item.name}
                    Price: Rs. ${price}
                    🔗 Product Link: ${baseUrl}/product/${item.slug}
                    🖼️ Image: ${item.image?.[0] ?? ""}`;
            })
            .join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            "Order Details:\n\n" + message
        )}`;

        window.open(url, "_blank");
    };

    if (!mounted) {
        return (
            <div className="bg-gray-50 text-primarys min-h-screen flex flex-col">
                <Navbar />
                <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Cart</h1>
                    <p className="text-gray-600">Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 text-primarys min-h-screen flex flex-col">
            <Navbar />

            <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Cart</h1>
            
                {isLoading ? (
                    <p className="text-gray-500">Loading cart...</p>
                ) : cart.length === 0 || cartProducts.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty</p>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {cartProducts.map((item: any) => {
                                const id = item._id;
                                const price = item.dp_price > 0 ? item.dp_price : item.op_price;

                                return (
                                    <div
                                        key={id}
                                        className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl shadow"
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(id)}
                                                onChange={() => handleSelect(id)}
                                            />
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="flex items-center gap-3 flex-1"
                                            >
                                                <Image
                                                    src={item.image?.[0] ?? item.image_url}
                                                    alt={item.name}
                                                    width={70}
                                                    height={70}
                                                    className="rounded object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-sm sm:text-base truncate">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm">Rs. {price?.toLocaleString()}</p>
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="flex items-center justify-end w-full sm:w-auto">
                                            <button
                                                onClick={() => removeFromCart(id)}
                                                className="bg-primarys text-white px-3 py-2 rounded text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={clearCart}
                                className="w-full sm:w-auto bg-black text-white px-5 py-2 rounded"
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={handleOrder}
                                className="w-full sm:w-auto bg-green-600 text-white px-5 py-2 rounded"
                            >
                                Order Now (WhatsApp)
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}