import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

// Dummy data (replace with API later)
const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 12000,
    image_url: "/shoe.png",
  },
  {
    id: 2,
    name: "Adidas Running Shoes",
    price: 10000,
    image_url: "/shoe2.png",
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">Product not found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain w-full h-auto"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

        <p className="text-xl text-gray-600 mt-4">Rs. {product.price}</p>

        <p className="mt-6 text-gray-500">
          This is a high-quality product with premium design and comfort.
        </p>

        {/* Add to Cart */}
        <button className="mt-8 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-primarys transition">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
