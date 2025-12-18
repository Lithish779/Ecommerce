import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../pages/api.jsx";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams(); // ex: bath-body
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Convert slug to readable title
  const formattedName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Category metadata (slug-safe)
  const categoryInfo = {
    hair: {
      title: "Hair Care Essentials",
      description:
        "Explore shampoos, conditioners, oils & treatments for strong, healthy hair.",
      banner:
        "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?auto=format&fit=crop&w=1400&q=80",
    },
    skin: {
      title: "Skin Care Essentials",
      description:
        "Moisturizers, serums, sunscreens, cleansers for glowing skin.",
      banner:
        "https://images.unsplash.com/photo-1500839458577-5d1c1e1bf4b2?auto=format&fit=crop&w=1400&q=80",
    },
    makeup: {
      title: "Makeup Collection",
      description:
        "Foundations, lipsticks, palettes, and more from top brands.",
      banner:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    },
    fragrance: {
      title: "Fragrance Selection",
      description: "Perfumes and long-lasting scents selected for you.",
      banner:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    },
    men: {
      title: "Men's Grooming",
      description:
        "Beard oils, shaving kits, perfumes, and grooming essentials.",
      banner:
        "https://images.unsplash.com/photo-1578932750294-f5075e85da06?auto=format&fit=crop&w=1400&q=80",
    },
    "bath-body": {
      title: "Bath & Body",
      description:
        "Body washes, scrubs, lotions, soaps and everyday self-care essentials.",
      banner:
        "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=1400&q=80",
    },
    "mom-baby": {
      title: "Mom & Baby Care",
      description:
        "Gentle, safe and nourishing products for mothers and babies.",
      banner:
        "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1400&q=80",
    },
  };

  const info = categoryInfo[slug] || {
    title: formattedName,
    description: `Showing products for ${formattedName}`,
    banner: null,
  };

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products?category=${slug}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
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
          className="object-cover w-full h-64 mb-10 rounded-xl"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-semibold tracking-tight">
        {info.title}
      </h1>
      <p className="max-w-2xl mt-2 text-gray-600">
        {info.description}
      </p>

      {/* Content */}
      <div className="grid grid-cols-2 gap-10 mt-12 md:grid-cols-3 lg:grid-cols-4">

        {loading && (
          <p className="text-gray-500 col-span-full">
            Loading products…
          </p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}

        {!loading &&
          products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))
        }

      </div>
    </div>
  );
}
