import { Link, useNavigate } from "react-router";
import { useProduct } from "../context/productContext";
import { useAuth } from "../context/AuthContext";
import { memo, useState, useMemo } from "react";

function ProductCard({ product }) {
  const {
    id,
    title,
    price,
    images,
    rating,
    discountPercentage,
    category,
    stock,
  } = product;

  const { user, isAuthenticated } = useAuth();
  const { addCart, addProductWish, carts, wishList  } = useProduct();

  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate()
  // console.log(user.id);
  // ✅ check if product already exists in cart or wishlist
  const isInCart = useMemo(() => {
    return carts.some((cart) => cart.products?.some((p) => p.id === id));
  }, [carts, id]);

  const isInWishList = useMemo(() => {
    return wishList.some((p) => p.id === id);
  }, [wishList, id]);

  async function handleAddToCart() {
    if (!user?.id) {
      navigate("/login")
      // alert("Please login to add products to your cart.");
      return;
    }
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
      if (isInCart)
        // ✅ تحقق الأول، لو موجود اخرج علطول
        return;

    setAddingToCart(true);
    try {
      await addCart({
        userId: user.id,
        products: [{ id: product.id, quantity: 1 }],
      });
    } catch (err) {
      console.error("Failed to add cart:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleAddToWish() {
    if (!user?.id) {
      navigate("/login");
      // alert("Please login to add products to your wishlist.");
      return;
    }
    if (!isAuthenticated) {
       navigate("/login");
       return;
     }

    
    if (isInWishList) return;

    setAddingToWishlist(true);
    try {
      await addProductWish(id);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setAddingToWishlist(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 group bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-lg bg-gray-50">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
            -{discountPercentage}%
          </span>
        )}

        {/* Stock Status */}
        <span
          className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full shadow-md z-10 ${
            stock > 10
              ? "bg-green-100 text-green-800"
              : stock > 0
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stock > 10
            ? "In Stock"
            : stock > 0
            ? `Only ${stock} left`
            : "Out of Stock"}
        </span>

        {/* Product Image */}
        <div className="h-56 flex items-center justify-center p-4">
          <img
            src={
              imageError
                ? "https://via.placeholder.com/250x250?text=Product+Image"
                : images?.[0] || "https://via.placeholder.com/250"
            }
            alt={title}
            onError={() => setImageError(true)}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* 🟢 Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || stock === 0 || isInCart}
            className={`flex items-center justify-center gap-1 h-10 px-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
              isInCart
                ? "bg-green-600 text-white"
                : stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {addingToCart ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">
                  progress_activity
                </span>
                Adding...
              </>
            ) : isInCart ? (
              <>
                <span className="material-symbols-outlined text-base">
                  check
                </span>
                Cart Added
              </>
            ) : stock === 0 ? (
              "Out of Stock"
            ) : (
              <>
                <span className="material-symbols-outlined text-base">
                  shopping_cart
                </span>
                Add to Cart
              </>
            )}
          </button>

          {/* ❤️ Wishlist Button */}
          <button
            onClick={handleAddToWish}
            disabled={addingToWishlist || isInWishList}
            className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors duration-300 shadow-md ${
              isInWishList
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            {addingToWishlist && !isInWishList ? (
              <span className="material-symbols-outlined text-lg animate-spin">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-lg">
                {isInWishList ? "favorite" : "favorite_border"}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-1 flex flex-col gap-2">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
          {category}
        </span>

        <h3 className="text-gray-900 text-lg font-semibold line-clamp-2 leading-tight hover:text-blue-600 transition-colors h-14">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
            <span className="material-symbols-outlined text-amber-500 text-base">
              star
            </span>
            <span className="text-amber-700 text-sm font-bold ml-1">
              {rating}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {discountPercentage > 0 && (
              <span className="text-gray-400 text-sm line-through">
                ${(price + (price * discountPercentage) / 100).toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-gray-900">${price}</span>
          </div>
        </div>

        <Link
          className="flex items-center justify-between mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors pt-2 border-t border-gray-100"
          to={`/productDetails/${id}`}
        >
          <span>View Details</span>
          <span className="material-symbols-outlined text-base">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}

export default memo(ProductCard);
