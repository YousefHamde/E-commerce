import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-slate-100">
      <div className="max-w-screen-xl mx-auto px-10 py-12">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-0.5 ">
              <span className="material-symbols-outlined text-3xl text-slate-800">
                store
              </span>
              Fashion Hub
            </h2>
            <p className="text-slate-500 text-sm max-w-xs">
              Your one-stop shop for the latest trends and timeless classics.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link
              to="/"
              className="text-slate-600 hover:text-slate-900 text-sm"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-slate-600 hover:text-slate-900 text-sm"
            >
              Contact
            </Link>
            <Link
              to="/products"
              className="text-slate-600 hover:text-slate-900 text-sm"
            >
              product
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© 2025 Yousef Hamdy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
