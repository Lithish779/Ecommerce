import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API } from "../pages/api.jsx";
import CartContext from "../context/CartContext.jsx";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const { addItem } = useContext(CartContext);

  // Format Slug → Name
  const formattedName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Category Metadata
  const categoryInfo = {
    hair: {
      title: "Hair Care Essentials",
      description:
        "Explore shampoos, conditioners, oils & treatments for strong, healthy, beautiful hair.",
      banner:
        "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?auto=format&fit=crop&w=1400&q=80",
    },
    skin: {
      title: "Skin Care Essentials",
      description:
        "Moisturizers, serums, sunscreens, cleansers — everything you need for glowing skin.",
      banner:
        "https://images.unsplash.com/photo-1500839458577-5d1c1e1bf4b2?auto=format&fit=crop&w=1400&q=80",
    },
    makeup: {
      title: "Makeup Collection",
      description:
        "High-quality foundations, lipsticks, palettes, and more from top brands.",
      banner:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    },
    fragrance: {
      title: "Fragrance Selection",
      description: "Perfumes, mists, and long-lasting scents selected for you.",
      banner:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    },
    men: {
      title: "Men's Grooming",
      description:
        "Beard oils, shaving kits, perfumes, and grooming essentials for men.",
      banner:
        "https://images.unsplash.com/photo-1578932750294-f5075e85da06?auto=format&fit=crop&w=1400&q=80",
    },
    wellness: {
      title: "Wellness Products",
      description:
        "Health supplements, hygiene essentials, detox products & more for complete wellness.",
      banner:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07d?auto=format&fit=crop&w=1400&q=80",
    },
  };

  const info = categoryInfo[slug] || {
    title: formattedName,
    description: `Showing products for ${formattedName}`,
    banner: null,
  };

  // Fetch category products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(`/products?category=${slug}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">

      {/* Banner */}
      {info.banner && (
        <img
          src={info.banner}
          alt={info.title}
          className="object-cover w-full h-64 mb-10 shadow rounded-xl"
        />
      )}

      <h1 className="text-4xl font-bold">{info.title}</h1>
      <p className="mt-2 text-gray-600">{info.description}</p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 mt-10 md:grid-cols-4">

        {products.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}

        {products.map((item) => (
          <div key={item._id} className="group">

            {/* Product Image */}
            <div className="w-full overflow-hidden bg-white aspect-square rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Brand */}
            <p className="mt-3 text-xs font-semibold tracking-wide text-gray-500">
              {item.brand || "FENTY BEAUTY"}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="font-semibold">{item.rating || "4.3"}</span>
              <span className="text-yellow-500">★</span>
              <span className="text-gray-500">
                ({item.reviews || "50"})
              </span>
            </div>

            {/* Name */}
            <h3 className="mt-1 text-sm font-medium leading-tight text-gray-900 line-clamp-2">
              {item.name}
            </h3>

            {/* Price */}
            <p className="mt-1 text-base font-bold text-gray-900">
              ₹{item.price}
            </p>

            {/* Sub-info Pills */}
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                Get for ₹{Math.floor(item.price * 0.9)}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                Free gifts
              </span>
            </div>

            {/* Add to Bag */}
            <button
              className="w-full py-2 mt-4 text-sm font-medium text-white transition-all duration-200 bg-black rounded-full cursor-pointer group-hover:bg-gray-900 active:scale-95"
              onClick={() => {
                addItem(item);
                toast.success("Added to Bag!");
              }}
            >
              Add to Bag
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
