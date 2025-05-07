import React from 'react';

const CancellationDetails = ({ order }) => {
    const { reason, Canceldate, refundLink, comments,id,Receiver_name } = order.order;

    return (
        <div className='max-tablet:space-y-3 tablet:space-y-4 max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]'>
            <h2>Cancellation Details</h2>
            {/* <h3 className="font-[600]">Order ID: <span className="font-[400] text-green-500">{DeliveredID}</span></h3> */}
            {/* <p className="font-[600]">Receiver: <span className="font-[400]">{Receiver_name}</span></p> */}
            <p><span className="font-[600]">Reason:</span> {reason ? `You canceled this order due to ${reason}.` : 'No reason provided.'}</p>
            <p className="font-[600]">Cancellation Date: <span className="font-[400]">{Canceldate}</span></p>
            {refundLink && (
                <p>
                    Refund has been initiated. <a href={refundLink}>Track Refund Status</a>
                </p>
            )}
            {comments && <p>Comments: {comments}</p>}
        </div>
    );
};

export default CancellationDetails;