import React, { useState, useEffect } from "react";
import VendorReview from "../Vendor/VendorReview";

const Detail = ({ vendor }) => {
  const [info, setInfo] = useState("Description");
  const [infoContent, setInfoContent] = useState("");

  useEffect(() => {
    if (vendor) {
      setInfoContent(vendor.productDetails || "No description available.");
    }
  }, [vendor]); // Runs when vendor changes

  const handleInfoChange = (type) => {
    setInfo(type);
    if (vendor) {
      switch (type) {
        case "Description":
          setInfoContent(vendor.productDetails || "No description available.");
          break;
        case "AdditionalInfo":
          setInfoContent(
            <div className="flex justify-around flex-col tablet:flex-row">
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
    <div className="w-[90%] mx-auto">
      <div className="max-tablet:px-7 tablet:w-[50%] laptop:w-[40%] flex justify-between gap-4 tablet:mx-[6rem] px-2">
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
          
         <span className="hidden tablet:inline">Additional</span> Info
        </div>
        <div
          onClick={() => handleInfoChange("Review")}
          className={`${info === "Review" ? "font-bold" : ""}`}
        >
          Review ({vendor?.reviews?.length || 0})
        </div>
      </div>
      <div className="mx-[1rem] tablet:mx-[4rem] my-[1rem]">{infoContent}</div>
    </div>
  );
};

export default Detail;
