export default function CartProduct({
  product,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const { id, title, price, thumbnail, quantity } = product;
  

  return (
    <div className="p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-gray-200">
      {/* left side */}
      <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
        <img
          src={thumbnail || "https://via.placeholder.com/100"}
          alt={title}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="text-center sm:text-left flex-1">
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {title}
          </p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            ${price}
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 text-gray-700">
          <button
            onClick={() => onDecrease(id)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <input
            className="w-12 sm:w-10 rounded-md border-gray-300 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min="1"
            type="number"
            value={quantity}
            readOnly
          />
          <button
            onClick={() => onIncrease(id)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="text-sm font-medium text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
