import { useContext } from "react";
import CartContext from "../context/CartContext";

function ProductCard({ p }) {
  const { addItem } = useContext(CartContext);

  return (
    <div className="p-4 transition bg-white border rounded-lg shadow-sm hover:shadow-lg">
      <img src={p.image} alt={p.name} className="object-cover w-full h-40 rounded" />
      <h2 className="mt-2 font-semibold">{p.name}</h2>
      <p className="mt-1 font-bold text-blue-600">₹{p.price}</p>
      {/* <button
        onClick={() => addItem(p)}
        className="w-full py-2 mt-3 text-white bg-purple-600 rounded hover:bg-purple-700"
      >
        Add to cart
      </button> */}
      <button
  onClick={() => addItem(p)}
  className="w-full mt-3 py-3 bg-black text-white rounded-lg font-medium shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
>
  Add to Cart
</button>


    </div>
  );
}
export default ProductCard;
