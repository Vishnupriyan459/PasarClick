import React, { useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../../Redux/CartSlice";

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ProductList = ({ order }) => {
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const productsToShow = showAll ? order.items : order.items.slice(0, 2);
    const remainingProducts = order.items.length - 2;
    const cartData = useSelector((state) => state.cart.items);

    const handleBuyAgain = (product) => {
        const existingItem = cartData.find(item => item.productId === product.id);
        
        if (existingItem) {
            dispatch(
                updateQuantity({
                    productId: product.id,
                    vendorId: order.vendor_id,
                    quantity: existingItem.quantity + 1,
                    productName: product.name,
                    price: product.price,
                    productImg: product.image
                })
            );
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'Item quantity updated in cart',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            dispatch(
                addToCart({
                    productId: product.id,
                    vendorId: order.vendor_id,
                    quantity: 1,
                    productName: product.name,
                    price: product.price,
                    productImg: product.image
                })
            );
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'Item added to cart successfully',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="space-y-3 mt-1">
            {productsToShow.map((product, index) => (
                <div key={index} className="flex max-tablet:gap-3 tablet:gap-5">
                    <div className="max-tablet:w-[106px] max-table:h-[106px] tablet:w-[80px] tablet:h-[80px]  laptop:w-[106px] laptop:h-[106px] max-tablet:rounded-xl tablet:rounded-3xl">
                        <img
                            src={product.image}
                            alt={`product${index}`}
                            className="w-full h-full cover"
                        />
                    </div>
                    <div className="max-tablet:space-y-2 tablet:space-y-4">
                        <div className='font-[400] max-tablet:text-[12px] max-tablet:leading-[18px] tablet:text-[15px] tablet:leading-[22px] laptop:text-[20px] laptop:leading-[26px] '>{product.name}</div>
                        <div className="flex max-tablet:gap-1 tablet:gap-3">
                            <div 
                                className="max-tablet:w-[50px] max-tablet:h-[15px] tablet:w-[90px] tablet:h-[30px] laptop:w-[130px] laptop:h-[36px] max-tablet:text-[5px] tablet:text-[8px] tablet:leading-[10px] laptop:text-[12px] laptop:leading-[15px] rounded-full flex justify-center items-center gap-1 bg-[#F2EBD9] text-[#364A15] cursor-pointer hover:bg-[#e5d9bd]"
                                onClick={() => handleBuyAgain(product)}
                            >
                                <TfiReload />
                                Buy Again
                            </div>
                            <Link to={`/home/Shop/${order.vendor_id}/${product.id}`} className="max-tablet:w-[50px] max-tablet:h-[15px] tablet:w-[90px] tablet:h-[30px] laptop:w-[130px] laptop:h-[36px] max-tablet:text-[5px] tablet:text-[8px] tablet:leading-[10px] laptop:text-[12px] laptop:leading-[15px] rounded-full flex justify-center items-center gap-1 bg-[#D2F4D6] text-[#364A15]">
                                View the item
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            {remainingProducts > 0 && (
                <div className="text-right text-[7px] tablet:text-[10px] laptop:text-[12px] ">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className=""
                    >
                        {showAll ? 'Show Less' : ` +${remainingProducts} More`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;