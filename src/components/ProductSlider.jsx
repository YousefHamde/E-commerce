import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

export default function ProductSlider({ products = [] }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;

  // pagination logic
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = products.slice(start, end);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    if (page < totalPages - 1 ) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <div className=" mx-auto my-8">
      {/* Grid of items */}
      <ProductGrid>
        {currentData.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductGrid>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="px-3 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          ◀
        </button>
        <span>
          {end > products.length ? products.length : end} / {products.length}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages - 1}
          className="px-3 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
