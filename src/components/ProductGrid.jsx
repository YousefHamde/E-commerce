

export default function ProductsGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 my-8  mx-auto justify-items-center">
      {children}
    </div>
  );
}
