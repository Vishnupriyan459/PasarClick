import React, { useRef } from "react";
import './scroll.css';
const PrivacyPolicy = () => {
  const faqData = [
    { id: "clause1", title: "Clause 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. \n Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. \nConsectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem." },
    { id: "clause2", title: "Clause 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. \n Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. \nConsectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Viverra condimentum eget purus in. Consectetur eget id..." },
    { id: "clause3", title: "Clause 3", content: "Ipsum viverra pretium tellus neque. Ullamcorper suspendisse... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. \n Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. \nConsectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem." },
    { id: "clause4", title: "Clause 4", content: "Aenean leo pharetra in sit semper et. Amet quam placerat sem... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. \n Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. \nConsectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem." },
    { id: "clause5", title: "Clause 5", content: "Consectetur adipiscing elit. Viverra condimentum eget purus in Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. \n Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. \nConsectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem." },
    { id: "clause6", title: "Clause 6", content: "Ullamcorper suspendisse aenean leo pharetra in sit semper et... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. \n Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. \nConsectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem." },
  ];

  const refs = useRef(faqData.reduce((acc, item) => {
    acc[item.id] = React.createRef();
    return acc;
  }, {}));

  const handleScroll = (id) => {
    refs.current[id].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-FAQ bg-cover min-h-screen w-full">
      <div className="w-[90%] mx-auto py-4">
        <h1 className="font-[700] text-[#364A15] text-[14px] tablet:text-[25px] laptop:text-[27px] max-tablet:text-center">Privacy Policy</h1>

        <div className="flex">
          {/* Fixed Sidebar */}
          <div className="w-1/3 h-screen p-4 border-r overflow-y-auto max-tablet:hidden">
            <h2 className="font-semibold text-xl mb-2">Clauses</h2>
            <ul className="space-y-2">
              {faqData.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScroll(item.id)}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Scrollable Content */}
          <div
            className="flex-1 p-4 border-x-1 overflow-y-auto max-h-screen custom-scrollbar"
            style={{ height: "100vh" }}
          >
            {faqData.map((item) => (
              <div
                id={item.id}
                key={item.id}
                ref={refs.current[item.id]}
                className="mb-6 space-y-2"
              >
                <h3 className="font-[700] text-[#364A15] text-[14px] tablet:text-[25px] laptop:text-[27px] max-tablet:text-center">{item.title}</h3>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
