import { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useProduct } from "../context/productContext";
import Spinner from "../components/Spinner";

export default function CartPage() {
  const { carts, isLoading, dispatch, error } = useProduct();
  console.log(carts);

  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    if (carts.length > 0) {
      // 🟢 جمع كل الـ products من كل cart
      const allProducts = carts.flatMap((cart) => cart.products);
      setLocalCart(allProducts);
    }
  }, [carts]);

  const subtotal = localCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = localCart.reduce((acc, item) => acc + item.quantity, 0);

  const handleIncrease = (id) => {
    setLocalCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setLocalCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setLocalCart((prev) => prev.filter((item) => item.id !== id));
    dispatch({ type: "carts/deleted", payload: id });
  };

  return (
    <>
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
            Your Cart
          </h1>

          {isLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
              {/* cart items */}
              {error ? (
                <Massage message={error} />
              ) : (
                <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm h-fit">
                  {localCart.length === 0 && (
                    <p className="p-4 text-gray-500">Your cart is empty.</p>
                  )}

                  {localCart.map((product) => (
                    <CartProduct
                      key={product.id}
                      product={product}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              )}

              {/* order summary */}
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                      </p>
                      <p className="font-medium">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium">Free</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                      <p className="text-lg font-bold">Total</p>
                      <p className="text-lg font-bold">
                        ${subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  disabled={totalItems === 0}
                >
                  {totalItems === 0
                    ? "Your cart is empty"
                    : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
