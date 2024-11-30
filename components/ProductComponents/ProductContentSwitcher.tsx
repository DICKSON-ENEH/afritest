import { useEffect, useState } from "react";
import PackageCategory from "./PackageCategory";
import PackageSubCategory from "./PackageSubCategory";
// import PackageType from "./PackageType";
import Product from "./Product";
import PackageType from "./PackageType";

interface ContentSection {
  title: string;
  content: JSX.Element;
}

const contentSections: ContentSection[] = [
  {
    title: "Package Category",
    content: (
      <div>
        <PackageCategory />
      </div>
    ),
  },
  {
    title: "Package Sub Category",
    content: (
      <div>
        <PackageSubCategory />
      </div>
    ),
  },
  {
    title: "Package Type",
    content: (
      <div>
        <div>
          <PackageType />
        </div>
      </div>
    ),
  },
  {
    title: "Product",
    content: (
      <div>
        <div>
          <Product />
        </div>
        ,
      </div>
    ),
  },
];

const ProductContentSwitcher = () => {
  const [activeSection, setActiveSection] = useState<string>(
    contentSections[0].title
  );
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  const handleButtonClick = (title: string) => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveSection(title);
      setFadeIn(true);
    }, 200);
  };

  const activeContent = contentSections.find(
    (section) => section.title === activeSection
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
      clearTimeout(timeout);
    }, 200);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex mb-4">
        {contentSections.map((el) => (
          <button
            key={el.title}
            className={`px-4 py-2 mr-2 rounded-md text-gray-700 hover:bg-[#f0fcf6] hover:text-green-500 font-semibold ${
              activeSection === el.title ? "bg-[#f0fcf6] text-green-500" : ""
            }`}
            onClick={() => handleButtonClick(el.title)}
          >
            {el.title}
          </button>
        ))}
      </div>
      <div
        className={`flex-grow transition-opacity duration-200 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeContent?.content}
      </div>
    </div>
  );
};

export default ProductContentSwitcher;
