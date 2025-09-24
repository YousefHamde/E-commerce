import { memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated , logout} = useAuth();

  function handleLogout() {
    logout();
  }


  return (
    <header className=" fixed top-0 left-0 w-full z-50 bg-white flex items-center justify-between border-b border-slate-200 px-6 py-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 text-slate-900">
        <span className="material-symbols-outlined text-3xl text-slate-800">
          store
        </span>
        <h2 className="text-xl font-bold tracking-tight">Fashion Hub</h2>
      </Link>

      {/* Navbar (hidden on small screens) */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } absolute left-0 top-16 w-full bg-white px-6 py-4 shadow-md sm:static sm:block sm:w-auto sm:bg-transparent sm:p-0 sm:shadow-none`}
      >
        <ul className="flex flex-col gap-4 text-sm font-medium text-slate-700 sm:flex-row sm:items-center sm:gap-8">
          <li>
            <NavLink to="/" className="hover:text-slate-900">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="hover:text-slate-900">
              Product
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className="hover:text-slate-900">
              Contact
            </NavLink>
          </li>
          {isOpen && (
            <li>
              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className="rounded-md h-10 py-2 px-4 bg-[var(--primary-color)] text-white text-sm font-bold hover:bg-blue-600 transition-colors  "
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors "
                >
                  Logout
                </button>
              )}
            </li>
          )}
        </ul>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/wishPage"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <span className="material-symbols-outlined">favorite_border</span>
          </NavLink>
          <NavLink
            to="/cart"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </NavLink>
        </div>

        {/* Avatar */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="hidden h-10 w-10 rounded-full overflow-hidden sm:block">
              <img
                src="https://i.pravatar.cc/100?u=zz"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout} // 🔹 حط هنا الفنكشن بتاعة تسجيل الخروج من الـ AuthContext
              className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors hidden sm:block"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden rounded-md h-10 py-2 px-4 bg-[var(--primary-color)] text-white text-sm font-bold hover:bg-blue-600 transition-colors sm:block"
          >
            Login
          </Link>
        )}

        {/* Hamburger (mobile only) */}
        <button
          className="sm:hidden flex h-10 w-10 items-center justify-center rounded-md border border-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>
    </header>
  );
}

export default memo(Header)