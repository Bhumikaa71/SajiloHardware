"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import { User } from "lucide-react";

type OrderStatus = "delivered" | "cancelled";

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
}

/* ✅ ONLY HISTORY ORDERS */
const orders: Order[] = [
  {
    id: "ORD-1003",
    customerName: "Bhumika Maam",
    date: "2026-04-18",
    status: "delivered",
    products: [
      {
        name: "Circular Saw",
        image: "/images/5.jpg",
        price: 149.99,
        quantity: 1,
      },
      {
        name: "Safety Gloves",
        image: "/images/6.jpg",
        price: 14.99,
        quantity: 3,
      },
    ],
  },
  {
    id: "ORD-1005",
    customerName: "Aarohi Lamichhane",
    date: "2026-04-16",
    status: "cancelled",
    products: [
      {
        name: "Angle Grinder",
        image: "/images/9.jpg",
        price: 79.99,
        quantity: 1,
      },
      {
        name: "Protective Goggles",
        image: "/images/10.jpg",
        price: 12.99,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD-1008",
    customerName: "Ravi Sharma",
    date: "2026-04-12",
    status: "delivered",
    products: [
      { name: "Hand Drill", image: "/images/2.jpg", price: 99.99, quantity: 1 },
    ],
  },
];

function VendorOrderHistory() {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const [filter, setFilter] = React.useState<"delivered" | "cancelled">(
    "delivered",
  );

  const [sortOrder, setSortOrder] = React.useState<"newest" | "oldest">(
    "newest",
  );

  /* 📅 CALENDAR FILTER */
  const [selectedDate, setSelectedDate] = React.useState("");

  const filteredOrders = orders
    .filter((order) => order.status === filter)
    .filter((order) => (selectedDate ? order.date === selectedDate : true))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const statusStyles: Record<OrderStatus, string> = {
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <>
      <Navbar />

      <div className="bg-white text-primarys">
        <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-10 py-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Vendor Orders History</h1>
            <p className="text-sm text-gray-500">
              Completed and cancelled orders
            </p>
          </div>

          {/* 🔘 FILTER + SORT + 📅 CALENDAR */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-primarys">
            <button
              onClick={() => setFilter("delivered")}
              className={`px-4 py-2 text-xs rounded-lg border ${
                filter === "delivered"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : ""
              }`}
            >
              Completed
            </button>

            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 text-xs rounded-lg border ${
                filter === "cancelled"
                  ? "bg-red-100 text-red-700 border-red-300"
                  : ""
              }`}
            >
              Cancelled
            </button>

            <button
              onClick={() =>
                setSortOrder((prev) =>
                  prev === "newest" ? "oldest" : "newest",
                )
              }
              className="px-4 py-2 text-xs rounded-lg border bg-gray-50"
            >
              Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
            </button>

            {/* 📅 CALENDAR INPUT */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 text-xs border rounded-lg"
            />

            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="text-xs text-red-500 underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Cards Grid (UNCHANGED UI) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => {
              const totalAmount = order.products.reduce(
                (sum, p) => sum + p.price * p.quantity,
                0,
              );

              return (
                <div
                  key={order.id}
                  className="bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4"
                >
                  {/* Top */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>

                    <div className="flex-1">
                      <h2 className="font-semibold">{order.id}</h2>
                      <p className="text-xs text-gray-500">
                        Order ID: {order.id}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs capitalize ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium text-black">Customer:</span>{" "}
                      {order.customerName}
                    </p>

                    <p>
                      <span className="font-medium text-black">Date:</span>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>

                    <p>
                      <span className="font-medium text-black">Amount:</span>{" "}
                      Rs.{totalAmount}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 text-xs rounded-lg border hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal (UNCHANGED) */}
          {selectedOrder && (
            <div
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-2xl rounded-xl p-6 relative"
              >
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-3 right-3 text-gray-500"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">
                  Order Details - {selectedOrder.id}
                </h2>

                <div className="space-y-4">
                  {selectedOrder.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border rounded-lg p-3"
                    >
                      <img
                        src={product.image}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Qty: {product.quantity}
                        </p>
                      </div>

                      <div className="font-semibold">Rs.{product.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right font-semibold">
                  Total: Rs.
                  {selectedOrder.products.reduce(
                    (sum, p) => sum + p.price * p.quantity,
                    0,
                  )}
                </div>
              </div>
            </div>
          )}

          {filteredOrders.length === 0 && (
            <div className="text-center mt-10 text-gray-500">
              No history found for selected filter/date.
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default VendorOrderHistory;
