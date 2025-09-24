import { useEffect, useState } from "react";

export default function PromoSection() {
  const [topDeal, setTopDeal] = useState(null);

  useEffect(() => {
    async function fetchTopDeal() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      // اجيب المنتج بأعلى خصم

      const best = data.products.reduce((max, p) =>
        p.discountPercentage > max.discountPercentage ? p : max
      );
      setTopDeal(best);
    }
    fetchTopDeal();
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto my-15 rounded-md overflow-hidden shadow-md ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Image */}
        <div className="bg-white flex items-center justify-center p-8">
          {topDeal && (
            <img
              src={topDeal.thumbnail}
              alt={topDeal.title}
              className="w-[250px] object-contain"
            />
          )}
        </div>

        {/* Right Side - Text */}
        <div className="bg-[#1079da] text-white flex flex-col items-start justify-center p-10 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Biggest Discount Today!
          </h2>
          {topDeal ? (
            <>
              <p className="text-sm md:text-base text-gray-200">
                Save up to{" "}
                <span className="font-bold text-yellow-400">
                  {topDeal.discountPercentage}%
                </span>{" "}
                on {topDeal.title}. Don’t miss this offer!
              </p>
              <button className="bg-[#FEF6E4] text-[#0a2d4d] px-5 py-2 rounded-md font-medium hover:bg-white transition">
                Explore Deal
              </button>
            </>
          ) : (
            <p className="text-gray-300">Loading deal...</p>
          )}
        </div>
      </div>
    </div>
  );
}
