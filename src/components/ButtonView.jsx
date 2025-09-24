import React from "react";
import { Link } from "react-router";

export default function ButtonView() {
  return (
    <>
      {/* Right side: button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
        text-blue-900 border border-blue-900 rounded-full hover:bg-blue-900 
        hover:text-white transition-colors"
      >
        View More
        <span className="text-lg">→</span>
      </Link>
    </>
  );
}
