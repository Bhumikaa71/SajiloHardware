"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import { User } from "lucide-react";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

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

const orders: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Pushit sir",
    date: "2026-04-20",
    status: "processing",
    products: [
      {
        name: "Cordless Drill Machine",
        image: "/images/2.jpg",
        price: 129.99,
        quantity: 1,
      },
      {
        name: "Claw Hammer",
        image: "/images/1.jpg",
        price: 19.99,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD-1002",
    customerName: "Sahitya SIr",
    date: "2026-04-19",
    status: "shipped",
    products: [
      {
        name: "Electric Screwdriver Set",
        image: "/images/3.jpg",
        price: 49.99,
        quantity: 1,
      },
      {
        name: "Adjustable Wrench",
        image: "/images/4.jpg",
        price: 24.99,
        quantity: 1,
      },
    ],
  },
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
    id: "ORD-1004",
    customerName: "Birendra Sir",
    date: "2026-04-17",
    status: "pending",
    products: [
      {
        name: "Toolbox Kit",
        image: "/images/7.jpg",
        price: 89.99,
        quantity: 1,
      },
      {
        name: "Measuring Tape",
        image: "/images/8.jpg",
        price: 9.99,
        quantity: 2,
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
    id: "ORD-1006",
    customerName: "Sara Maam",
    date: "2026-04-15",
    status: "processing",
    products: [
      {
        name: "Power Drill Bits Set",
        image: "/images/11.jpg",
        price: 34.99,
        quantity: 1,
      },
      {
        name: "Rubber Mallet",
        image: "/images/12.jpg",
        price: 15.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-1007",
    customerName: "Baroon Sir",
    date: "2026-04-14",
    status: "shipped",
    products: [
      {
        name: "Impact Driver",
        image: "/images/13.jpg",
        price: 99.99,
        quantity: 1,
      },
      {
        name: "Hex Key Set",
        image: "/images/14.jpg",
        price: 18.99,
        quantity: 2,
      },
    ],
  },
];

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function VendorOrders() {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="min-h-screen flex flex-col bg-white max-w-7xl mx-auto px-10 py-10">
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[var(--texts-dark)]">
                Vendor Orders
              </h1>
              <p className="text-sm text-[var(--texts-secondary)]">
                View list of orders.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {orders.map((order) => {
                const totalAmount = order.products.reduce(
                  (sum, p) => sum + p.price * p.quantity,
                  0,
                );

                return (
                  <div
                    key={order.id}
                    className="bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4"
                  >
                    {/* Top Section */}
                    <div className="flex items-center gap-4">
                      {/* User Icon */}
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>

                      <div className="flex-1">
                        <h2 className="font-semibold text-[var(--texts-dark)]">
                          {order.id}
                        </h2>
                        <p className="text-xs text-[var(--texts-secondary)]">
                          Order ID: {order.id}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Middle Info */}
                    <div className="text-sm text-[var(--texts-secondary)] space-y-1">
                      <p>
                        <span className="font-medium text-[var(--texts-dark)]">
                          Customer:
                        </span>{" "}
                        {order.customerName}
                      </p>

                      <p>
                        <span className="font-medium text-[var(--texts-dark)]">
                          Date:
                        </span>{" "}
                        {new Date(order.date).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="font-medium text-[var(--texts-dark)]">
                          Amount:
                        </span>{" "}
                        Rs.{totalAmount}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 text-xs rounded-lg border text-[var(--texts-secondary)] hover:bg-gray-50"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal */}
            {selectedOrder && (
              <div
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-black/40 text-primarys backdrop-blur-sm flex items-center justify-center z-50"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-full max-w-2xl rounded-xl p-6 relative"
                >
                  {/* Close */}
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>

                  <h2 className="text-xl font-semibold mb-4">
                    Order Details - {selectedOrder.id}
                  </h2>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 mb-4 border-b pb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border">
                      <User className="w-7 h-7 text-gray-500" />
                    </div>

                    <div>
                      <p className="font-semibold">
                        {selectedOrder.customerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedOrder.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        Status: {selectedOrder.status}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4">
                    {selectedOrder.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 border rounded-lg p-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
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

                  {/* Total */}
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

            {/* Empty State */}
            {orders.length === 0 && (
              <div className="text-center mt-10 text-[var(--texts-secondary)]">
                No orders assigned.
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default VendorOrders;
