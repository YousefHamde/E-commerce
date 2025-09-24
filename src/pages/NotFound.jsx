import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      {/* Not Found Content */}
      <main className="flex flex-1 justify-center items-center px-40 py-20">
        <div className="flex flex-col items-center gap-8 max-w-[960px]">
          {/* Illustration */}
          <div
            className="bg-center bg-contain bg-no-repeat aspect-video rounded-lg w-full max-w-sm"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB37K-ptHmKXU76oxgDSDJc_rvgH_r6Lbh-ausIKEje2oUM4tJHxYZRqbRqqefcvLFbnbYtygpjhjD3w2jDCbFFys2UA9b-iH_cz1_X2DTGLNhugnHILtJK0jfZ3cAOvVQgWntJsfjzNNex6bFK3GU100SPqRXTfkHtWT0eZqOOheAvJxFp5-UNu787f8SvbAwc-aMvoe8APZZA-5wbZFx_yAnUoKquh1GHs8C66gh64fgxF56g8nDrC707kihCU36fewX6_6c4h1c")',
            }}
          ></div>

          {/* Text */}
          <div className="flex flex-col items-center gap-4 text-center max-w-lg">
            <h1 className="text-3xl font-bold text-slate-900">
              Oops! Page Not Found
            </h1>
            <p className="text-base text-slate-600">
              It seems like the link you followed is broken or the page has been
              moved. Don't worry, we'll help you find your way back.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/" className="rounded-md h-10 py-2 px-4 bg-[var(--primary-color)] text-white text-sm font-bold hover:bg-blue-600 transition-colors">
              Return to Homepage
            </Link>
            <Link to="/products" className="rounded-md h-10 py-2 px-4 bg-slate-100 text-slate-900 text-sm font-bold hover:bg-slate-200 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
