import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProduct } from "../context/productContext";
import { useParams } from "react-router";
import SectionHeader from "../components/SectionHeader";
import ReviewList from "../components/ReviewList";

const ProductDetails = () => {
  const { id } = useParams();
  const { currentProduct, getProduct, isLoading } = useProduct();

  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  if (!currentProduct) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  const {
    images = [],
    reviews = [],
    title = "",
    category = "",
    dimensions: { width = 0, height = 0, depth = 0 } = {},
    price = 0,
    discountPercentage = 0,
    description = "",
    tags = [],
    brand = "",
    meta: { barcode = "", qrCode = "" } = {},
  } = currentProduct || {};

  return (
    <>
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <p className="hover:text-slate-700">category</p>
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
            <span className="text-slate-900 font-medium">{category}</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 pt-6 mx-auto px-4">
            {/* Images Section (30%) */}
            <div className="images basis-full lg:basis-1/3">
              {/* big image */}
              <div className="relative rounded-lg overflow-hidden mb-4 shadow group">
                <img
                  alt="Calvin Klein CK One"
                  src={images?.[0]}
                  className="w-full h-[300px] sm:h-[400px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-xs sm:text-sm font-semibold text-slate-800 px-3 py-1 rounded-md shadow">
                  discount : {discountPercentage} %
                </span>
              </div>

              {/* small images */}
              {images.length === 3 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden shadow group">
                    <img
                      alt="Calvin Klein CK One 1"
                      src={images?.[1]}
                      className="w-full h-[180px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow group">
                    <img
                      alt="Calvin Klein CK One 2"
                      src={images?.[2]}
                      className="w-full h-[180px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Details Section (70%) */}
            <div className="section basis-full lg:basis-2/3 space-y-4">
              <h3 className="text-2xl  font-bold text-slate-900">{title}</h3>

              {/* Rating */}
              <div className="flex items-center text-yellow-500 text-xl sm:text-2xl">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(currentProduct.rating)
                        ? "text-yellow-500"
                        : "text-slate-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-slate-600 ml-2">
                {currentProduct.rating?.toFixed(1)} / 5
              </p>

              {/* Dimensions */}
              <div className="text-sm sm:text-base text-slate-700 space-y-1 flex justify-between my-5">
                <p>
                  <b>Width:</b> <span>{width} cm</span>
                </p>
                <p>
                  <b>Height:</b> <span>{height} cm</span>
                </p>
                <p>
                  <b>Depth:</b> <span>{depth} cm</span>
                </p>
              </div>

              {/* Price */}
              <div className="text-lg sm:text-xl flex justify-between mb-10">
                <p>
                  <b>Price:</b>{" "}
                  <span className="text-green-600">
                    ${(price - (price * discountPercentage) / 100).toFixed(2)}
                  </span>
                </p>
                <s className="text-slate-400">${price}</s>
              </div>

              <hr className="mb-8" />

              {/* Description */}
              <div className="text-sm sm:text-base text-slate-700 space-y-2">
                <p>
                  <b>Description:</b> {description}
                </p>
                <div className="space-y-1 flex justify-between my-5">
                  <p>
                    <b>Tags:</b> {tags?.[0]} - {tags?.[1]}
                  </p>
                  <p>
                    <b>Brand:</b> {brand}
                  </p>
                </div>
              </div>

              <hr className="mb-8" />

              {/* Barcode */}
              <div className="flex items-center gap-4  justify-between">
                <img
                  src={qrCode}
                  alt="Calvin Klein CK One"
                  className="w-20 h-20"
                />
                <p>
                  <b>Barcode:</b> {barcode}
                </p>
              </div>

              <hr className="mb-8" />

              {/* Buttons */}
              <div className="flex items-end  text-end">
                <a
                  href="/product/6"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>

          <hr className="my-20" />

          <SectionHeader
            header="Customer Reviews and Rating"
            text="Reviews and RatingSee what our customers are saying about this product!"
          >
            <ReviewList reviews={reviews} />
          </SectionHeader>

          {/* Reviews Section */}
          {/* <div className="mt-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Customer Reviews
              </h2>
              <p className="text-slate-600">⭐ 4.5 based on 125 reviews</p>
            </div> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
