import React, { useMemo, useState } from "react";
import { useProduct } from "../context/productContext";
import { useAuth } from "../context/AuthContext";

export default function WishProduct({ product }) {
  const { id, title, price, images, category } = product;

  const { user } = useAuth();
  const { addCart, dispatch, carts } = useProduct();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  // ✅ Check if product already exists in cart
  const isInCart = useMemo(() => {
    return carts.some((cart) => cart.products?.some((p) => p.id === id));
  }, [carts, id]);

  async function handleAddToCart() {
    if (!user?.id) {
      alert("Please login to add products to your cart.");
      return;
    }

    // ✅ Prevent duplicate add
    if (isInCart) return;

    setLoading(true);
    try {
      await addCart({
        userId: user.id,
        products: [{ id: product.id, quantity: 1 }],
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add cart:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleRemove() {
    dispatch({ type: "wish/deleted", payload: id });
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <img
        src={images?.[0]}
        alt={title}
        className="w-full sm:w-32 h-32 flex-shrink-0 rounded-md object-cover mx-auto sm:mx-0"
      />
      <div className="flex-1 w-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">{title}</p>
            <p className="text-sm text-slate-500">{category}</p>
          </div>
          <button
            onClick={handleRemove}
            className="text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-lg font-bold text-slate-900">${price}</p>

          {/* ✅ Dynamic Button */}
          <button
            onClick={handleAddToCart}
            disabled={loading || added || isInCart}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium w-full sm:w-auto
              ${
                isInCart
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : loading
                  ? "bg-blue-600 text-white opacity-90"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }
            `}
          >
            <span className="material-symbols-outlined text-base">
              {isInCart ? "check" : "add_shopping_cart"}
            </span>
            {isInCart
              ? "Already in Cart"
              : loading
              ? "Adding..."
              : added
              ? "Added ✅"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
