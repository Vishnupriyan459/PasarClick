import { image } from "d3";
import { React, useState, useEffect, useRef } from "react";
import { IoLogoPaypal } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AddCardModal } from "../Profile/Modal";
import { MdDelete } from "react-icons/md";
import { PlusIcon } from "lucide-react";

// const CreditDebitPayment = () => {
//     const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
//     const [cards, setCards] = useState([
//       { id: 1, cardType: "Master Card", last4: "119" },
//       { id: 2, cardType: "Visa", last4: "234" },
//     ]);
//     const [ispaymentEditing, setIspaymentEditing] = useState(false);
//     const [selectedCardId, setSelectedCardId] = useState(null); // Track selected card
//     const containerRef = useRef(null);
  
//     const handleRemove = (cardId) => {
//       setCards(cards.filter((card) => card.id !== cardId));
//     };
  
//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (
//           containerRef.current &&
//           !containerRef.current.contains(event.target)
//         ) {
//           setIspaymentEditing(false); // Close edit mode when clicking outside
//         }
//       };
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);
  
//     const handleAddCard = (cardData) => {
//       console.log("New card:", cardData);
//     };
  
//     return (
//       <>
//         <div className="mb-8">
//           <div className="flex justify-between mb-4">
//             <h3 className="text-lg font-semibold">Your payment</h3>
//             <button
//               className="text-green-600 text-sm"
//               onClick={() => setIspaymentEditing(!ispaymentEditing)}
//             >
//               {ispaymentEditing ? "Done" : "Edit"}
//             </button>
//           </div>
  
//           <div ref={containerRef} className="grid grid-cols-2 gap-3">
//             {cards.map((card) => (
//               <div
//                 key={card.id}
//                 onClick={() => setSelectedCardId(card.id)} // Select card
//                 className={`bg-[#D2F4D6] rounded-lg p-2 cursor-pointer ${
//                   selectedCardId === card.id ? "border-2 border-green-600" : ""
//                 }`}
//               >
//                 <div>{card.cardType}</div>
//                 <div className="flex items-center gap-2">
//                   <img src="Asset/profile/card.svg" alt="Card Icon" />
//                   <span className="text-gray-600">
//                     •••• •••• •••• {card.last4}
//                   </span>
//                   {ispaymentEditing && (
//                     <MdDelete
//                       className="text-gray-500 ml-auto text-[2rem] cursor-pointer"
//                       onClick={() => handleRemove(card.id)}
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
  
//             <button
//               onClick={() => setIsAddCardModalOpen(true)}
//               className="flex items-center gap-2 text-gray-600"
//             >
//               <PlusIcon size={20} />
//               <span>Add new card</span>
//             </button>
//           </div>
//         </div>
//         <AddCardModal
//           isOpen={isAddCardModalOpen}
//           onClose={() => setIsAddCardModalOpen(false)}
//           onAddCard={handleAddCard}
//         />
//       </>
//     );
//   };
const CreditDebitPayment = () => {
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const [cards, setCards] = useState([
      { id: 1, cardType: "Master Card", last4: "119" },
      { id: 2, cardType: "Visa", last4: "234" },
    ]);
    const [ispaymentEditing, setIspaymentEditing] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const containerRef = useRef(null);
  
    const handleRemove = (cardId) => {
      setCards(cards.filter((card) => card.id !== cardId));
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setIspaymentEditing(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    // Function to handle adding a new card
    const handleAddCard = (cardData) => {
      const newCard = {
        id: cards.length + 1, // Generate a unique ID
        cardType: cardData.cardType,
        last4: cardData.last4,
      };
  
      setCards([...cards, newCard]); // Add the new card to the list
      setSelectedCardId(newCard.id); // Automatically select the newly added card
      setIsAddCardModalOpen(false); // Close the modal
    };
  
    return (
      <>
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Your payment</h3>
            <button
              className="text-green-600 text-sm"
              onClick={() => setIspaymentEditing(!ispaymentEditing)}
            >
              {ispaymentEditing ? "Done" : "Edit"}
            </button>
          </div>
  
          <div ref={containerRef} className="grid tablet:grid-cols-2 gap-3">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`bg-[#D2F4D6] rounded-lg p-2 cursor-pointer ${
                  selectedCardId === card.id ? "border-2 border-green-600" : ""
                }`}
              >
                <div>{card.cardType}</div>
                <div className="flex items-center gap-2">
                  <img src="Asset/profile/card.svg" alt="Card Icon" />
                  <span className="text-gray-600">
                    •••• •••• •••• {card.last4}
                  </span>
                  {ispaymentEditing && (
                    <MdDelete
                      className="text-gray-500 ml-auto text-[2rem] cursor-pointer"
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
  
        <AddCardModal
          isOpen={isAddCardModalOpen}
          onClose={() => setIsAddCardModalOpen(false)}
          onAddCard={handleAddCard}
        />
      </>
    );
  };
  
  

const PayPalPayment = () => {
  return (
    <>
      <div className="p-4 border rounded-lg shadow-md">
        <div className="flex gap-1 items-center ">
        <input
          type="checkbox"
          name="Receive pickup notice on SMS/Email"
          id="emailupdate"
          value={"Receive pickup notice on SMS/Email"}
        />
        <label htmlFor="emailupdate">Receive pickup notice on SMS/Email</label>
        </div>
        <button className="mt-3 bg-[#FFC43A] text-[#253B80] px-4 py-3 w-full rounded-full flex gap-2 justify-center items-center">
          <img src="/Asset/paypal.png" alt="" className="w-6" />{" "}
          <div className="font-bold text-5">Proceed to PayPal</div>
        </button>
      </div>
      <p>
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described our{" "}
        <Link to="/Home/PrivacyPolicy" className="text-[#253B80]">
          privacy policy
        </Link>
        .
      </p>
    </>
  );
};

const NetBankingPayment = () => {
  const img = {
    image: "/asset/QRCode.png",
  };
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-green-800 mb-3">Net Banking</h3>
      <p>
        Scan the QR code or import the provided information to complete the
        payment.
      </p>
      <h3>Payment QR code</h3>
      <div className="flex justify-center">
        <img src={img.image} alt="" />
      </div>
      <div>
        <div>Payment information</div>
        <div>Company name : Pasar Click</div>
        <div>Account number : 983475021</div>
      </div>

      <input
        type="checkbox"
        name="Receive pickup notice on SMS/Email"
        id="emailupdate"
        value={"Receive pickup notice on SMS/Email"}
      />
      <label htmlFor="emailupdate">Receive pickup notice on SMS/Email</label>
    </div>
  );
};

export { CreditDebitPayment, PayPalPayment, NetBankingPayment };
