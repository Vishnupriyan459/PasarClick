import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart, updateQuantity } from "../../Redux/CartSlice";
import ProductPrice from "../ProductPrice";
import { FaPersonBiking } from "react-icons/fa6";
import { fetchOrders } from "../../Redux/OrderSlice";
import { MdDelete } from "react-icons/md";
import { AddCardModal, AddAddressModal } from "./Modal";

import {
  HomeIcon,
  MapPinIcon,
  PlusIcon,
  ChevronRightIcon,
  PhoneIcon,
  TruckIcon,
} from "lucide-react";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const Profile = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [showMore, setShowMore] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Jhene lee",
    phone: "+60(000) 0000 0000",
    email: "jhenelee1955@gmail.com",
  });
  const handleShowMore = () => {
    setShowMore(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // const handleSave = () => {
  //   const { fullName, phone, email } = profile;

  //   // Firebase Email Update
  //   // const user = firebase.auth().currentUser;
  //   // if (user && user.email !== email) {
  //   //   user.updateEmail(email)
  //   //     .then(() => {
  //   //       console.log("Email updated successfully");
  //   //     })
  //   //     .catch((error) => {
  //   //       console.error("Error updating email:", error);
  //   //     });
  //   // }

  //   // You can save this profile data back to Firebase or any other backend
  //   // For example: saveProfileChanges({ fullName, phone, email });

  //   // Switch back to non-editing mode
  //   setIsEditing(false);
  // };
  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access"); // assuming token is stored as 'access'
        const response = await fetch(`${API_URL}/customers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setProfile({
            fullName: data.full_name,
            email: data.email,
            phone: data.contact_number,
          });
  
          // Optionally set the profile image if you're planning to use it
          // setProfilePicture(data.profile_picture);
        } else {
          console.error("Failed to fetch profile:", data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfile();
  }, []);
  
  // Access cart data using useSelector
  const cartData = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.order.items);

  const deliveryPerson = "vivek";
  const area = "amaptuher";

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Tuah Khmer",
      address:
        "Dno. 12-34-12, XYC Apartments, DOOR Colony, Hyderabad, Telangana",
    },
    {
      id: 2,
      name: "John Doe",
      address: "123 Main Street, City Center, Mumbai, Maharashtra",
    },
    {
      id: 3,
      name: "John Doe",
      address: "123 Main Street, City Center, Mumbai, Maharashtra",
    },
  ]);

  const [cards, setCards] = useState([
    { id: 1, cardType: "Master Card", last4: "119" },
    { id: 2, cardType: "Visa", last4: "234" },
  ]);
  const [isProfileEditing, setIsprofileEditing] = useState(false);
  const [ispaymentEditing, setIspaymentEditing] = useState(false);
  const containerRef = useRef(null);
  const handleRemove = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));

    // Call API to remove card (pseudo code)
    // apiCallToRemoveCard(cardId).then(response => {
    //   console.log('Card removed successfully:', response);
    // }).catch(error => {
    //   console.error('Error removing card:', error);
    // });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIspaymentEditing(false); // Close the edit mode when clicking outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleRemoveAddress = (addressId) => {
    // Remove address from the state
    setAddresses(addresses.filter((address) => address.id !== addressId));
  };
  const handleEditAddress = (addressId) => {
    // Find the address by ID and set the profile state to edit it
    const addressToEdit = addresses.find((addr) => addr.id === addressId);
    if (addressToEdit) {
      setIsAddAddressModalOpen(true);
    }
  };
  const handleAddCard = (cardData) => {
    // Add your card handling logic here
    console.log("New card:", cardData);
  };

  const handleAddAddress = (addressData) => {
    // Add your address handling logic here
    console.log("New address:", addressData);
  };

  return (
    <div className="bg-profile w-full text-[#364A15]">
      <div className="Lmobile:max-w-[95vw] tablet:max-w-[90vw] mx-auto p-6">
        {/* Profile Section */}
        <div className="flex gap-6 mb-8 max-tablet:flex-col">
          <div className="bg-[#D2F4D6] rounded-lg  relative tablet:w-[339px] bg-[#E5FAE6]">
            <img
              src="Asset/profile/profile.png"
              alt="Profile"
              className="cover rounded w-full"
            />
            <div className="absolute bottom-0 left-0 right-0">
              <div className="relative bg-[#FFEDED5E] backdrop-blur-sm px-3 py-5 rounded-t-3xl">
                <div>
                  <h1>{profile.fullName}</h1>
                  <p>{profile.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h1>Your Profile</h1>
              <button
                onClick={() => setIsprofileEditing(!isProfileEditing)}
                className="flex justify-between items-center rounded-lg px-[18px] py-[5px] bg-[#D2F4D6]"
              >
                {isProfileEditing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm laptop:w-[515px] space-y-3 shadow-sm border-[2px] rounded-[20px]">
              <div className="tablet:flex tablet:gap-7 items-center">
                <label className="text-sm text-gray-600">Full name:</label>
                <input
                  value={profile.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  disabled={!isProfileEditing}
                  className="border-2 border-[#D4D4D4] rounded-[10px] p-2"
                />
              </div>
              <div className="tablet:flex tablet:gap-7 items-center">
                <label className="text-sm text-gray-600">Mobile no:</label>
                <input
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={!isProfileEditing}
                  className="border-2 border-[#D4D4D4] rounded-[10px] p-2"
                />
                {isProfileEditing && (
                  <LiaCheckDoubleSolid className="text-[20px] text-[#364A15] text-opacity-70" />
                )}
              </div>
              <div className="tablet:flex tablet:gap-7 items-center">
                <label className="text-sm text-gray-600">Email:</label>
                <input
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={!isProfileEditing}
                  className="border-2 border-[#D4D4D4] rounded-[10px] p-2  tablet:ml-8"
                />
                {isProfileEditing && (
                  <LiaCheckDoubleSolid className="text-[20px] text-[#364A15] text-opacity-70" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* collab */}
        <div className="flex gap-9 max-laptop:flex-col">
          <div className="">
            {/* Address Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Your address</h3>
              <div className="grid max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4 p-4 rounded-lg drop-shadow-xl border-[1px] bg-white laptop:w-[515px]">
                {addresses.map((addr, index) => (
                  <div
                    key={addr.id}
                    className={`border-[1px] border-[#364A15] rounded-lg p-4 ${
                      index % 2 !== 0 ? "bg-white" : "bg-[#D2F4D6]"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="text-green-600 text-[5rem] w-[32px]" />
                      <div>
                        <h4 className="font-semibold">{addr.name}</h4>
                        <p className="text-sm text-gray-600">{addr.address}</p>
                        <div className="mt-2 flex gap-2">
                          <button
                            className="text-sm text-gray-600"
                            onClick={() => handleEditAddress(addr.id)}
                          >
                            Edit
                          </button>
                          <span className="text-gray-400">|</span>
                          <button
                            className="text-sm text-gray-600"
                            onClick={() => handleRemoveAddress(addr.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center">
                  <button
                    onClick={() => setIsAddAddressModalOpen(true)}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <PlusIcon size={20} />
                    <span>Add address</span>
                  </button>
                </div>
              </div>
            </div>
            <AddAddressModal
              isOpen={isAddAddressModalOpen}
              onClose={() => setIsAddAddressModalOpen(false)}
              onAddAddress={handleAddAddress}
            />

            {/* Payment Section */}

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
          </div>
          <AddCardModal
            isOpen={isAddCardModalOpen}
            onClose={() => setIsAddCardModalOpen(false)}
            onAddCard={handleAddCard}
          />

          <div className="flex gap-6 flex-col Llaptop:flex-row">
            {/* Cart Section */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Your cart</h3>
                {/* <button className="text-gray-600 flex items-center gap-2 ">
                  <PlusIcon size={20} />
                  Edit items
                </button> */}
              </div>
              <div className="space-y-4 bg-white p-6 border-2   rounded-lg h-auto">
                {cartData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <img
                        src={item.productImg}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg"
                      />
                      <p className="text-gray-600">x {item.quantity}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                    </div>

                    <ProductPrice
                      price={item.price}
                      currency={"inr"}
                      className="font-medium"
                    />
                  </div>
                ))}

                {!cartData.length ? (
                  <>
                    <div>"Your cart is empty"</div>
                    <Link
                      to="/Home/Shop"
                      className="text-gray-600 p-3 flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-lg"
                    >
                      <PlusIcon size={20} />
                      Add items
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/Home/cart"
                    className="text-gray-600 p-3 flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-lg"
                  >
                    <PlusIcon size={20} />
                    Edit items
                  </Link>
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Your orders</h3>
                <Link className="text-green-600 text-sm" to={"/Home/orders"}>
                  See all
                </Link>
              </div>
              <div className="space-y-4">
                {order
                  .slice(0, 3)
                  .sort((a, b) => (a.Status === "Delivery" ? -1 : 1))
                  .map((order, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-lg shadow-sm p-4 border-[1px]  ${
                        order.Status === "Delivery"
                          ? "border-[#1AC84B]"
                          : "border-[#364A15] border-opacity-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <TruckIcon className="text-gray-600 w-5 h-5"  />
                          <div>
                            <p className="text-sm text-gray-600">
                              Delivering ID
                            </p>
                            <p className="font-medium">#{order.DeliveredID}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.Status === "Delivery"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.Status}
                        </span>
                      </div>

                      {order.Status === "Delivery" && (
                        <>
                          <div className="space-y-3 mb-4">
                            <div>
                              <h4 className="font-medium">{order.location}</h4>
                              <p className="text-sm text-gray-600">
                                {order.shipping_address}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <img
                                src="Asset/profile/Deliveryperson.png"
                                alt="Delivery Person"
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Delivery person
                                </p>
                                <p className="font-medium">{deliveryPerson}</p>
                                <p className="text-sm text-gray-600">{area}</p>
                              </div>
                            </div>
                            <button className="w-10 h-10 bg-[#D2F4D6] rounded-full flex items-center justify-center ">
                              <PhoneIcon className="w-full h-full bg-[#4ECB71] p-3 text-white rounded-full" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
