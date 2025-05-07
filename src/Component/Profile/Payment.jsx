import React from 'react'

const Payment = () => {
  return (
    <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Your payment</h3>
                <button
                  className="text-green-600 text-sm"
                  onClick={() => setIspaymentEditing(!ispaymentEditing)} // Toggle edit mode
                >
                  {ispaymentEditing ? "Done" : "Edit"}
                </button>
              </div>

              <div
                ref={containerRef}
                className="space-y-4 border-2 rounded-lg p-7"
              >
                {cards.map((card) => (
                  <div key={card.id} className="bg-[#D2F4D6] rounded-lg p-6">
                    <div>{card.cardType}</div>
                    <div className="flex items-center gap-2">
                      <img src="Asset/profile/card.svg" alt="" />
                      <span className="text-gray-600">
                        •••• •••• •••• {card.last4}
                      </span>
                      {/* Show "Remove" button only if in edit mode */}
                      {ispaymentEditing && (
                        <MdDelete
                          className="text-gray-500 ml-auto  text-[2rem] cursor-pointer"
                          onClick={() => handleRemove(card.id)}
                        />
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setIsAddCardModalOpen(true)}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <PlusIcon size={20} />
                  <span>Add new card</span>
                </button>
              </div>
            </div>
  )
}

export default Payment