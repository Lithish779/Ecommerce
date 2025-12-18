import { useContext } from "react";
import CartContext from "../context/CartContext";
import toast from "react-hot-toast";

function ProductCard({ p, product }) {
  const item = p || product || {};
  const { addItem } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(item);

    toast("Added to cart", {
      style: {
        background: "#111",
        color: "#fff",
        padding: "14px 18px",
        borderRadius: "9999px",
        fontSize: "13px",
        fontWeight: "500",
        letterSpacing: "0.3px",
        border: "1px solid rgba(255,255,255,0.15)",
      },
    });
  };

  return (
    <div className="cursor-pointer group">

      {/* IMAGE */}
      <div className="relative overflow-hidden bg-[#f4f4f4] aspect-[4/5]">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="absolute px-6 py-2 text-xs font-medium text-white transition-all duration-300 -translate-x-1/2 bg-black rounded-full opacity-0 cursor-pointer bottom-4 left-1/2 group-hover:opacity-100 hover:bg-gray-900 curser-pointer"
        >
          ADD TO CART
        </button>
      </div>

      {/* INFO */}
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-black">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500">
          {item.brand || "Brand"}
        </p>

        <p className="mt-1 text-sm font-medium text-black">
          ₹ {item.price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
