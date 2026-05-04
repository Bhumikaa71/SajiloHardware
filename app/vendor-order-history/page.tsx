"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useMemo, useState } from "react";
import { User, AlertCircle, Loader2 } from "lucide-react";
import { useGetVendorOrdersHistoryQuery } from "@/services/vendorApi";

// --- Interfaces ---
interface OrderItem {
  productName: string;
  image: string[];
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  createdAt: string;
  status: "completed" | "cancelled";
  grandTotal: number;
  items: OrderItem[];
  dateOnly: string;
}

function VendorOrderHistory() {
  const { data: response, isLoading, isError, error } = useGetVendorOrdersHistoryQuery();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<"completed" | "cancelled">("completed");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedDate, setSelectedDate] = useState("");

  const orders = useMemo(() => {
    if (!response?.data) return [];
    return response.data.map((order: any) => ({
      ...order,
      dateOnly: new Date(order.createdAt).toISOString().split("T")[0],
    }));
  }, [response]);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order: any) => order.status === filter)
      .filter((order: any) => (selectedDate ? order.dateOnly === selectedDate : true))
      .sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [orders, filter, selectedDate, sortOrder]);

  // --- Rendering States ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primarys)]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <AlertCircle className="mr-2" /> Failed to load orders. Please try again.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-10 py-10">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Vendor Orders History</h1>
            <p className="text-sm text-gray-500">Manage your past orders and view details.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {(["completed", "cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-xs rounded-lg border capitalize ${filter === status
                    ? status === "completed" ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"
                    : "bg-white hover:bg-gray-50"
                  }`}
              >
                {status}
              </button>
            ))}

          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: any) => (
                <div key={order._id} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-semibold text-lg">{order.orderNumber}</h2>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${order.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="text-gray-500">Customer:</span> {order.customerName}</p>
                    <p className="text-sm font-semibold">Total: Rs. {order.grandTotal.toLocaleString()}</p>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="w-full py-2 text-sm border rounded-lg hover:bg-gray-50"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">
                No orders found for the selected criteria.
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {selectedOrder && (
          <div onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl relative">
              <h2 className="text-lg font-semibold mb-4">Order #{selectedOrder.orderNumber}</h2>
              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-2 border rounded-lg">
                    <img src={item.image[0]} className="w-16 h-16 rounded object-cover bg-gray-100" alt={item.productName} />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold">Rs. {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>Rs. {selectedOrder.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default VendorOrderHistory;