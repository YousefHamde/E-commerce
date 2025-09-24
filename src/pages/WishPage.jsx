import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useProduct} from "../context/productContext"
import WishProduct from "../components/WishProduct";
import Massage from "../components/Massage";
export default function WishPage() {
  const {wishList} = useProduct();
  console.log(wishList);
  return (
    <>
    <Header/>
    <main className="flex-1 px-10 py-12 mt-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Your Wishlist
        </h1>
        <p className="mt-2 text-slate-500">
          A collection of your favorite items. Ready to make them yours?
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8">
          {wishList.length > 0 ?(
            <>
            {wishList.map((product) => <WishProduct product={product} key={product.id}/>)}
            </>

          ):(<Massage massage="no product in wish" />)
          }

        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}
