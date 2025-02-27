import React, { useState } from "react";
import VendorReview from "../Vendor/VendorReview";

const Detail = ({ vendor }) => {
  const [info, setInfo] = useState("Description");
  const [infoContent, setInfoContent] = useState(vendor?.productDetails || "");

  const handleInfoChange = (type) => {
    setInfo(type);
    if (vendor) {
      switch (type) {
        case "Description":
          setInfoContent(vendor.productDetails || "No description available.");
          break;
        case "AdditionalInfo":
          setInfoContent(
            <div className="flex justify-around">
              <img src={vendor.VendorBanner} alt="" />
              <div className="mt-[2rem] space-y-4">
                <div>
                  <span className="font-bold">Phone Number</span>: {vendor.additionalInfo?.phoneNumber || "N/A"}
                </div>
                <div>
                  <span className="font-bold">Address:</span> {vendor.additionalInfo?.address}
                </div>
                <div>
                  <span className="font-bold">Vendor Owner Name:</span> {vendor.additionalInfo?.vendorOwnerName || "N/A"}
                </div>
              </div>
            </div>
          );
          break;
        case "Review":
          setInfoContent(<VendorReview review={vendor.reviews || []} />);
          break;
        default:
          setInfoContent("No content available.");
      }
    }
  };

  return (
    <div>
      <div className="w-[40%] flex justify-between mx-[6rem] px-2">
        <div
          onClick={() => handleInfoChange("Description")}
          className={`${info === "Description" ? "font-bold" : ""}`}
        >
          Description
        </div>
        <div
          onClick={() => handleInfoChange("AdditionalInfo")}
          className={`${info === "AdditionalInfo" ? "font-bold" : ""}`}
        >
          Additional Info
        </div>
        <div
          onClick={() => handleInfoChange("Review")}
          className={`${info === "Review" ? "font-bold" : ""}`}
        >
          Review ({vendor?.reviews?.length || 0})
        </div>
      </div>
      <div className="mx-[4rem] my-[1rem]">{infoContent}</div>
    </div>
  );
};

export default Detail;
