import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

// import HomePage from "./pages/HomePage";
// import ProductDetails from "./pages/ProductDetails";
// import NotFound from "./pages/NotFound";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/CartPage";
// import WishPage from "./pages/WishPage";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";

const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishPage = lazy(() => import("./pages/WishPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));

import SpinnerFullPage from "./components/SpinnerFullPage";

import { ProductProvider } from "./context/productContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Suspense fallback={<SpinnerFullPage/>}>
          <BrowserRouter>
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden group/design-root">
              <div className="layout-container flex h-full grow flex-col">
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductPage />} />
                  <Route
                    path="cart"
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="wishPage"
                    element={
                      <ProtectedRoute>
                        <WishPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="productDetails/:id"
                    element={<ProductDetails />}
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </Suspense>
      </ProductProvider>
    </AuthProvider>
  );
}
