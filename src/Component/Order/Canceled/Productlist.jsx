import React, { useState } from 'react';
import { TfiReload } from 'react-icons/tfi';

const ProductList = ({ order }) => {
    const [showAll, setShowAll] = useState(false);
    const productsToShow = showAll ? order.order.Product_detail : order.order.Product_detail.slice(0, 2);
    const remainingProducts = order.order.Product_detail.length - 2;

    return (
        <div className="space-y-3 mt-1">
            {productsToShow.map((product, index) => (
                <div key={index} className="flex max-tablet:gap-3 tablet:gap-5">
                    <div className="max-tablet:w-[60px] max-table:h-[60px] tablet:w-[80px] tablet:h-[80px]  laptop:w-[106px] laptop:h-[106px] max-tablet:rounded-xl tablet:rounded-3xl">
                        <img
                            src={product.productImg}
                            alt={`product${index}`}
                            className="w-full h-full cover"
                        />
                    </div>
                    <div className="max-tablet:space-y-2 tablet:space-y-4">
                        <div className='font-[400] max-tablet:text-[12px] max-tablet:leading-[18px] tablet:text-[15px] tablet:leading-[22px] laptop:text-[20px] laptop:leading-[26px] '>{product.productName}</div>
                        <div className="flex max-tablet:gap-1 tablet:gap-3">
                            <div className="max-tablet:w-[50px] max-tablet:h-[15px] tablet:w-[90px] tablet:h-[30px] laptop:w-[130px] laptop:h-[36px] max-tablet:text-[5px] tablet:text-[8px] tablet:leading-[10px] laptop:text-[12px] laptop:leading-[15px] rounded-full flex justify-center items-center gap-1 bg-[#F2EBD9] text-[#364A15]">
                                <TfiReload />
                                Buy Again
                            </div>
                            <div className="max-tablet:w-[50px] max-tablet:h-[15px] tablet:w-[90px] tablet:h-[30px] laptop:w-[130px] laptop:h-[36px] max-tablet:text-[5px] tablet:text-[8px] tablet:leading-[10px] laptop:text-[12px] laptop:leading-[15px] rounded-full flex justify-center items-center gap-1 bg-[#D2F4D6] text-[#364A15]">
                                View the item
                            </div>
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