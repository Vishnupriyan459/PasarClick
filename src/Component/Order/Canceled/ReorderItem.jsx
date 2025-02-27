import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../Redux/CartSlice";
import { FiPlus, FiMinus, FiCheck } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import ProductPrice from "../../ProductPrice";

const ReorderItem = ({ isOpen, onRequestClose, products }) => {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors.items);
  const [subtotal, setSubtotal] = useState();
  const [quantities, setQuantities] = useState(
    products.reduce(
      (acc, product) => ({
        ...acc,
        [product.productId]: product.quantity || 1,
      }),
      {}
    )
  );
 

  const [addedProducts, setAddedProducts] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    // Find the vendor and product
    const vendor = vendors.find((v) =>
      v.products.some((p) => p.productId === productId)
    );
    const vendorProduct = vendor?.products.find(
      (p) => p.productId === productId
    );

    if (!vendorProduct) {
      console.error(`Product with ID ${productId} not found in any vendor.`);
      return;
    }
    

    if (newQuantity > 0 && newQuantity <= vendorProduct.quantity) {
      // Update quantities state safely
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.productId];
    dispatch(
      addProductToCart({
        ...product,
        quantity,
      })
    );

    // Mark product as added
    setAddedProducts((prev) => ({
      ...prev,
      [product.productId]: true,
    }));

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };
  // console.log(vendors, products);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root")}
      contentLabel="Reorder Modal"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[80%] max-w-4xl h-auto max-h-[90vh] overflow-auto relative"
    >
      {showSuccessMessage && (
        <div className="absolute top-4 right-4 bg-green-100 max-tablet:text-[0.6rem] tablet:text-[1rem] text-green-800 max-tablet:px-2 max-tablet:py-1 tablet:px-4 tablet:py-2 rounded-full flex items-center gap-2">
          <FiCheck className="text-green-600" />
          Product added to cart!
        </div>
      )}

      <div className="space-y-4">
        <h2 className="font-[600] max-tablet:text-[0.6rem] tablet:text-[0.9rem] laptop:text-[1.2rem]">
          Do you want to add to cart the order you canceled?
        </h2>

        <div className="w-full bg-[#ffffff] rounded-xl border-2">
          <table className="w-[90%] mx-auto">
            <thead>
              <tr className="text-center border-b-2 font-[400] max-tablet:text-[9px] max-table:leading-[20px] max-laptop:text-[14px] max-laptop:leading-[18px] laptop:text-[20px] laptop:leading-[26px]">
                <th className="py-4">Thumb</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                const quantity = quantities[item.productId];
                const vendor = vendors.find((v) =>
                  v.products.some((p) => p.productId === item.productId)
                );
                const vendorProduct = vendor?.products.find(
                  (p) => p.productId === item.productId
                );
                const availableQuantity = vendorProduct?.quantity || 0;

                const isAdded = addedProducts[item.productId];

                return (
                  <tr
                    key={item.productId}
                    className="text-center font-[300] max-tablet:text-[8px] max-table:leading-[10px] max-laptop:text-[10px] max-laptop:leading-[16px] laptop:text-[18px] laptop:leading-[23px]"
                  >
                    <td>
                      <img
                        src={item.productImg}
                        alt={item.productName}
                        className="max-tablet:w-[30px] max-tablet:h-[30px] max-laptop:w-[60px] max-laptop:h-[60px] laptop:w-[80px] laptop:h-[80px] mx-auto"
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td>
                      <ProductPrice
                        price={item.price}
                        currency={item.Currency}
                      />
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <div
                          className="bg-[#F2EBD9] tablet:p-2 rounded-xl border-[1px] border-[#364A15] cursor-pointer"
                          onClick={() =>
                            quantities[item.productId] > 1 &&
                            handleQuantityChange(
                              item.productId,
                              quantities[item.productId] - 1
                            )
                          }
                        >
                          <FiMinus />
                        </div>
                        <input
                          type="number"
                          value={quantity}
                          min="1"
                          max={availableQuantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.productId,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="max-tablet:w-[30px] tablet:w-[50px] text-center"
                        />
                        <div
                          className="bg-[#F2EBD9] tablet:p-2 rounded-xl border-[1px] border-[#364A15] cursor-pointer"
                          onClick={() =>
                            quantities[item.productId] < availableQuantity &&
                            handleQuantityChange(
                              item.productId,
                              quantities[item.productId] + 1
                            )
                          }
                        >
                          <FiPlus />
                        </div>
                      </div>
                      {availableQuantity < quantities[item.productId] && (
                        <p className="text-red-500 text-xs mt-1">
                          Only {availableQuantity} available
                        </p>
                      )}
                    </td>
                    <td>
                      <ProductPrice
                        price={(item.price * quantity).toFixed(2)}
                        currency={item.Currency}
                      />
                      
                    </td>
                    <td >
                      {isAdded ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <FiCheck className="w-5 h-5" />
                          <span>Added</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={availableQuantity < quantity}
                          className="bg-[#DEF9EC]  tablet:p-2 max-tablet:rounded-lg  tablet:rounded-3xl border-[1px] border-[#364A15] disabled:opacity-50 text-[0.20rem] tablet:text-[1rem]"
                        >
                          Add to Cart
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 max-tablet:text-[0.3rem] tablet:text-[0.6rem] laptop:text-[1rem]">
  <button
    onClick={onRequestClose}
    className="bg-[#DEF9EC] px-4 py-2 rounded-3xl border-[1px] border-[#364A15]  "
  >
    Close
  </button>
  <button
    onClick={() => {
      products.forEach((item) => handleAddToCart(item));
    }}
    className="bg-[#DEF9EC] px-4 py-2 rounded-3xl border-[1px] border-[#364A15]"
  >
    Add All to Cart
  </button>
</div>

      </div>
    </Modal>
  );
};

export default ReorderItem;
