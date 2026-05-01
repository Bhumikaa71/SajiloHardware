"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useMemo, useState } from "react";
import { User, Loader2, X } from "lucide-react";
import { useGetVendorActiveOrdersQuery, useGetVendorOrdersHistoryQuery } from "@/services/vendorApi";

// --- Types ---
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;

interface Product {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  products: Product[];
  grandTotal: number;
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function VendorOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data: response, isLoading, isError } = useGetVendorActiveOrdersQuery();

  // --- Data Transformation ---
  const orders: Order[] = useMemo(() => {
    if (!response?.data) return [];

    return response.data.map((item: any) => ({
      id: item.orderNumber || "N/A",
      customerName: item.customerName || "Unknown",
      date: item.createdAt || new Date().toISOString(),
      status: item.status || "pending",
      grandTotal: item.grandTotal || 0,
      // Safely map products, fallback to empty array if missing
      products: Array.isArray(item.items) 
        ? item.items.map((prod: any) => ({
            name: prod.productName || "Product",
            // Check for image array or string
            image: (Array.isArray(prod.image) ? prod.image[0] : prod.image) || "/placeholder.jpg",
            price: prod.price || 0,
            quantity: prod.quantity || 0,
          }))
        : [],
    }));
  }, [response]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="min-h-screen flex flex-col bg-white max-w-7xl mx-auto px-10 py-10">
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[var(--texts-dark)]">Vendor Orders</h1>
              <p className="text-sm text-[var(--texts-secondary)]">View list of active orders.</p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-[var(--texts-dark)]">{order.id}</h2>
                      <p className="text-xs text-[var(--texts-secondary)]">Order ID: {order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status] || 'bg-gray-100'}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="text-sm text-[var(--texts-secondary)] space-y-1">
                    <p><span className="font-medium text-[var(--texts-dark)]">Customer:</span> {order.customerName}</p>
                    <p><span className="font-medium text-[var(--texts-dark)]">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                    <p><span className="font-medium text-[var(--texts-dark)]">Amount:</span> Rs.{order.grandTotal.toLocaleString()}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 text-xs rounded-lg border text-[var(--texts-secondary)] hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal */}
            {selectedOrder && (
              <div
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-black/40 text-primarys backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-full max-w-2xl rounded-xl p-6 relative max-h-[90vh] overflow-y-auto"
                >
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h2 className="text-xl font-semibold mb-4">Order Details - {selectedOrder.id}</h2>

                  {/* Products Section with Fallback */}
                  <div className="space-y-4">
                    {selectedOrder.products && selectedOrder.products.length > 0 ? (
                      selectedOrder.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 border rounded-lg p-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded bg-gray-50"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg' }}
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                          </div>
                          <div className="font-semibold">Rs.{product.price.toLocaleString()}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No product details found for this order.</p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t text-right font-bold text-lg">
                    Total: Rs. {selectedOrder.grandTotal.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {orders.length === 0 && !isLoading && (
              <div className="text-center mt-10 text-[var(--texts-secondary)]">No active orders assigned.</div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default VendorOrders;