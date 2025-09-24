import React from "react";
import ProductsGrid from "../components/ProductGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductSlider from "../components/ProductSlider";
import { useProduct } from "../context/productContext";
import Spinner from "../components/Spinner";
import Massage  from '../components/Massage'
// import "./ProductPage.css"; // عشان نحط شوية CSS بسيط (للصور والهوفر)

const ProductPage = () => {
  const { products, error, isLoading } = useProduct();
  return (
    <>
      <Header />
      <main className="px-10 lg:px-20 xl:px-30 py-10 flex-1 mt-20">
        <div className=" mx-auto">
          {/* فلتر */}
          <div className="flex items-center justify-between pb-6">
            <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
          </div>
          {/* <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex gap-3 flex-wrap">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-200 bg-white px-4">
                <p className="text-slate-700 text-sm font-medium">Size</p>
                <span className="material-symbols-outlined text-slate-500 text-xl">
                  expand_more
                </span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-200 bg-white px-4">
                <p className="text-slate-700 text-sm font-medium">Color</p>
                <span className="material-symbols-outlined text-slate-500 text-xl">
                  expand_more
                </span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-200 bg-white px-4">
                <p className="text-slate-700 text-sm font-medium">Price</p>
                <span className="material-symbols-outlined text-slate-500 text-xl">
                  expand_more
                </span>
              </button>
            </div>

            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-200 bg-white px-4">
              <p className="text-slate-700 text-sm font-medium">Sort by</p>
              <span className="material-symbols-outlined text-slate-500 text-xl">
                expand_more
              </span>
            </button>
          </div> */}

        
          {error ? (
            <Massage massage={error} />
          ) : (
            <div>
              {isLoading ? <Spinner /> : <ProductSlider products={products} />}
            </div>
          )}
          {/* <ProductsGrid/> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
