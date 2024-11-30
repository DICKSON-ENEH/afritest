import { useState } from "react";
import { X, ChevronDown, Upload, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function CreateProductModal({
  isOpen,
  onClose,
  onSaveProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: any) => void;
}) {
  const [quality, setQuality] = useState(100);
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  const [sizes, setSizes] = useState<
    Array<{ title: string; quantity: number; notifyAt: number }>
  >([]);
  const [newSize, setNewSize] = useState({
    title: "",
    quantity: 20,
    notifyAt: 15,
  });
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState({
    category: "Fashion",
    subCategory: "Men wear",
    type: "Shein",
    name: "",
    description: "",
    price: "",
  });

  if (!isOpen) return null;

  const openAddSizeModal = () => {
    setIsAddSizeModalOpen(true);
  };

  const closeAddSizeModal = () => {
    setIsAddSizeModalOpen(false);
    setNewSize({ title: "", quantity: 20, notifyAt: 15 });
  };

  const handleSaveSize = () => {
    setSizes([...sizes, newSize]);
    closeAddSizeModal();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = () => {
    const newProduct = {
      ...productDetails,
      quality,
      sizes,
      image: productImage,
      dateAdded: new Date().toLocaleString(),
      status: "Active",
    };
    onSaveProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Create Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <p className="text-sm text-gray-600 mb-6">
            Kindly input the details of the product you are uploading.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={productDetails.category}
                  onChange={handleInputChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option>Fashion</option>
                  <option>Electronics</option>
                  <option>Travel</option>
                  <option>Telecom</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Sub Category
              </label>
              <div className="relative">
                <select
                  name="subCategory"
                  value={productDetails.subCategory}
                  onChange={handleInputChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option>Men wear</option>
                  <option>Women wear</option>
                  <option>Children wear</option>
                  <option>Footwear</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Type
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={productDetails.type}
                  onChange={handleInputChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option>Shein</option>
                  <option>Nike</option>
                  <option>Adidas</option>
                  <option>Puma</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={productDetails.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Black Tee"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <label className="cursor-pointer p-2 border border-gray-300 rounded-md">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </label>
                {productImage ? (
                  <Image
                    src={productImage}
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={productDetails.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={3}
                placeholder="Plain Black Round Neck Tee"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Price
              </label>
              <input
                type="text"
                name="price"
                value={productDetails.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="₦ 2,500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuality(Math.max(0, quality - 1))}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value) || 0)}
                  className="focus:ring-green-500 focus:border-green-500 block w-full text-center border-gray-300 rounded-none sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setQuality(quality + 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <button
                type="button"
                onClick={openAddSizeModal}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                + Add Size
              </button>
              {sizes.map((size, index) => (
                <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
                  {size.title} - Quantity: {size.quantity}, Notify at:{" "}
                  {size.notifyAt}
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className="flex justify-end space-x-3 px-6 py-3 bg-gray-50 rounded-b-lg">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSaveProduct}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Product
          </button>
        </div>
      </div>

      {/* Add Size Modal */}
      {isAddSizeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Add Size</h2>
              <button
                onClick={closeAddSizeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Add new sizes for the product you are uploading
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newSize.title}
                    onChange={(e) =>
                      setNewSize({ ...newSize, title: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Small"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() =>
                        setNewSize({
                          ...newSize,
                          quantity: Math.max(0, newSize.quantity - 1),
                        })
                      }
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      value={newSize.quantity}
                      onChange={(e) =>
                        setNewSize({
                          ...newSize,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      className="focus:ring-green-500 focus:border-green-500 block w-full text-center border-gray-300 rounded-none sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewSize({
                          ...newSize,
                          quantity: newSize.quantity + 1,
                        })
                      }
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium  text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notify me at
                  </label>
                  <input
                    type="number"
                    value={newSize.notifyAt}
                    onChange={(e) =>
                      setNewSize({
                        ...newSize,
                        notifyAt: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="15"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 px-6 py-3 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={closeAddSizeModal}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSize}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save Size
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
