import { useContext, useState, useEffect } from "react";
import CartContext from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [isSaving, setIsSaving] = useState(false);

  // CLEAN ONLY REQUIRED FIELDS
  const cleanAddress = (addr) => ({
    fullName: addr.fullName || "",
    phone: addr.phone || "",
    street: addr.street || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.pincode || "",
  });

  const [address, setAddress] = useState(
    cleanAddress({})
  );

  const getTotal = () =>
    cart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

  // -----------------------
  // LOAD SAVED ADDRESS
  // -----------------------
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:4001/api/address/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.address) {
          const cleaned = cleanAddress(data.address);
          setAddress(cleaned);
          localStorage.setItem("saved_address", JSON.stringify(cleaned));
        } else {
          const local = localStorage.getItem("saved_address");
          if (local) setAddress(cleanAddress(JSON.parse(local)));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // -----------------------
  // HANDLE INPUT CHANGE
  // -----------------------
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // -----------------------
  // USE SAVED ADDRESS BUTTON
  // -----------------------
  const handleUseSaved = () => {
    const saved = localStorage.getItem("saved_address");
    if (saved) {
      const cleaned = cleanAddress(JSON.parse(saved));
      setAddress(cleaned);
    } else {
      alert("No saved address found.");
    }
  };

  // -----------------------
  // SAVE ADDRESS
  // -----------------------
  const handleSaveAddress = async () => {
    if (!userId) {
      alert("Please login to save address.");
      return;
    }

    const required = ["fullName", "phone", "street", "city", "state", "pincode"];
    for (let f of required) {
      if (!address[f] || address[f].trim() === "") {
        alert(`Please fill ${f}`);
        return;
      }
    }

    setIsSaving(true);

    try {
      const res = await fetch("http://localhost:4001/api/address/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, address }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("saved_address", JSON.stringify(address));
        alert("Address saved successfully!");
      } else {
        alert("Failed to save address");
      }
    } catch (err) {
      console.error(err);
    }

    setIsSaving(false);
  };

  // -----------------------
  // PLACE ORDER
  // -----------------------
  const handlePlaceOrder = () => {
    const required = ["fullName", "phone", "street", "city", "state", "pincode"];

    for (let f of required) {
      if (!address[f] || address[f].trim() === "") {
        alert("Please fill delivery address before placing order");
        return;
      }
    }

    const order = {
      orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      items: cart,
      total: getTotal(),
      address,
      date: new Date().toISOString(),
    };

    clearCart();
    navigate("/order-success", { state: order });
  };

  // -----------------------
  // CART EMPTY PAGE
  // -----------------------
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl p-6 mx-auto text-center">
        <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
        <Link
          className="px-4 py-2 text-white bg-purple-600 rounded"
          to="/"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
  <div className="min-h-screen p-10 bg-[#f7f5ff]"> 
    {/* Very light lavender background */}

    {/* HEADER */}
    <div className="max-w-6xl mx-auto mb-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Complete your delivery details to proceed
      </p>
    </div>

    <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">

      {/* ADDRESS FORM CARD */}
      <div className="space-y-8 md:col-span-2">

        <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-[#e5dbff] rounded-2xl p-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#4b2bb3] flex items-center gap-2">
              📦 Delivery Address
            </h2>

            <button
              onClick={handleUseSaved}
              className="px-4 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-50"
            >
              Use Saved Address
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <input
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-purple-300"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-purple-300"
            />

            <input
              name="street"
              placeholder="Street / Area"
              value={address.street}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-purple-300"
            />

            <input
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-purple-300"
            />

            <input
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-purple-300"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* SAVE ADDRESS BUTTON */}
          <button
            onClick={handleSaveAddress}
            className="mt-7 w-full py-3 bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-semibold rounded-xl shadow-md cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Address"}
          </button>
        </div>

      </div>

      {/* ORDER SUMMARY CARD */}
      <div className="bg-white/90 backdrop-blur-lg shadow-xl border border-[#e5dbff] rounded-2xl p-8 h-fit">

        <h2 className="text-2xl font-semibold text-[#4b2bb3] mb-4 flex items-center gap-2">
          🧾 Order Summary
        </h2>

        <div className="pr-2 space-y-3 overflow-y-auto max-h-64">

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between py-2 text-gray-700 border-b border-gray-200"
            >
              <span className="truncate">{item.name} × {item.quantity}</span>
              <span className="font-semibold text-gray-900">
                ₹ {item.price * item.quantity}
              </span>
            </div>
          ))}

        </div>

        <div className="pt-4 mt-5 border-t border-gray-300">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Total:</span>
            <span>₹ {getTotal()}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 mt-6 text-lg font-semibold text-white bg-green-600 shadow-md cursor-pointer hover:bg-green-700 rounded-xl"
        >
          Place Order
        </button>

      </div>
    </div>
  </div>
);

}
