import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const productContext = createContext();
const BASE_URL = "https://dummyjson.com";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "products/loaded":
      return { ...state, products: action.payload.products, isLoading: false };
    case "product/loaded":
      return { ...state, isLoading: false, currentProduct: action.payload };
    case "carts/loaded":
      return { ...state, isLoading: false, carts: action.payload.carts };

    case "carts/added": {
      const exists = state.carts.some((cart) =>
        cart.products?.some(
          (product) => product.id === action.payload.products?.[0]?.id
        )
      );

      if (exists) {
        console.warn("⚠️ Product already in cart");
        return state; // مفيش تغيير
      }

      return {
        ...state,
        isLoading: false,
        carts: [...state.carts, action.payload],
      };
    }

    case "wish/loaded":
      return {
        ...state,
        isLoading: false,
        wishList: [...state.wishList, action.payload], // نضيف cart جديد
      };

    case "carts/deleted":
      return {
        ...state,
        isLoading: false,
        carts: state.carts.map((cart) => ({
          ...cart,
          products: cart.products.filter(
            (product) => product.id !== action.payload
          ),
        })),
      };

    case "wish/deleted":
      return {
        ...state,
        isLoading: false,
        wishList: state.wishList.filter((cart) => cart.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

const initialState = {
  products: [],
  carts: [],
  wishList: [],
  isLoading: false,
  currentProduct: {},
  error: "",
};

function ProductProvider({ children }) {
  const [
    { products, isLoading, error, currentProduct, carts, wishList },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchProducts() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        dispatch({ type: "products/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading data",
        });
      }
    }
    fetchProducts();
  }, []);

  // get single product
  const getProduct = useCallback(
    async function getProduct(id) {
      if (Number(id) === currentProduct.id) return;
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        const data = await res.json();
        dispatch({ type: "product/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading product",
        });
      }
    },
    [currentProduct.id]
  );

  // get user carts
  const getUserCartsById = useCallback(async function getUserCartsById(userId) {
    console.log("Fetching carts for userId:", userId);
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
      const data = await response.json();
      dispatch({ type: "carts/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `there was an error loading carts`,
      });
      console.error(err);
    }
  }, []);

  // add new cart
  const addCart = useCallback(async function addCart(newCart) {
    // dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/carts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: newCart.userId,
          products: newCart.products,
        }),
      });

      const data = await res.json();

      dispatch({ type: "carts/added", payload: data });

      return data;
    } catch {
      dispatch({ type: "rejected", payload: "Failed to add cart" });
    }
  }, []);

  // delete cart
  const deleteCart = useCallback(async function deleteCart(cartId) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/carts/${cartId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch({ type: "carts/deleted", payload: cartId });
      return data;
    } catch {
      dispatch({ type: "rejected", payload: "Failed to delete cart" });
    }
  }, []);

  const addProductWish = useCallback(
    async function addProductWish(id) {
      if (Number(id) === currentProduct.id) return;
      // dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        const data = await res.json();
        dispatch({ type: "wish/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading product",
        });
      }
    },
    [currentProduct.id]
  );

  return (
    <productContext.Provider
      value={{
        products,
        currentProduct,
        carts,
        isLoading,
        error,
        getProduct,
        getUserCartsById,
        addCart,
        deleteCart,
        dispatch,
        addProductWish,
        wishList,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

function useProduct() {
  const context = useContext(productContext);
  if (context === undefined)
    throw new Error("useProduct must be used within a ProductProvider");
  return context;
}

export { ProductProvider, useProduct };
