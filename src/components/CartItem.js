const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
        <div className="flex-1 mx-4">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-gray-700">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
          <button
            className="p-2 bg-gray-200"
            onClick={() => onUpdateQuantity(item, item.quantity - 1)}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="p-2 bg-gray-200"
            onClick={() => onUpdateQuantity(item, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="p-2 bg-red-500 text-white rounded ml-4"
          onClick={() => onRemove(item)}
        >
          Remove
        </button>
      </div>
    );
  };
  
  export default CartItem;
  