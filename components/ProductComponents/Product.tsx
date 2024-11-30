import {
  PlusIcon,
  MoreVertical,
  ChevronDown,
  Trash2,
  X,
  Upload,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// CreateProductModal component
const CreateProductModal = ({
  isOpen,
  onClose,
  onSaveProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: any) => void;
}) => {
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
                  <img
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
                      className="focus:ring-green-500 focus:border-green-500  block w-full text-center border-gray-300 rounded-none sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewSize({
                          ...newSize,
                          quantity: newSize.quantity + 1,
                        })
                      }
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
};

 const Product=() =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [products, setProducts] = useState([
    // ... (other products)
    {
      id: 1,
      name: "Black Tee",
      category: "Fashion",
      subCategory: "Men's Wear",
      type: "Shein",
      price: "N2,500",
      dateAdded: "31st July, 2023 11:27 AM",
      status: "Active",
      image: "/placeholder.svg?height=50&width=50",
      description: "Plain Black Round Neck Tee",
      quantity: 100,
      sizes: [
        { name: "Small", quantity: 20 },
        { name: "Medium", quantity: 20 },
        { name: "Large", quantity: 20 },
        { name: "Extra Large", quantity: 20 },
        { name: "Extra Extra Large", quantity: 20 },
      ],
    },
    {
      id: 2,
      name: "Black Tee",
      category: "Fashion",
      subCategory: "Men's Wear",
      type: "Shein",
      price: "N2,500",
      dateAdded: "31st July, 2023 11:27 AM",
      status: "Active",
      image: "/placeholder.svg?height=50&width=50",
      description: "Plain Black Round Neck Tee",
      quantity: 100,
      sizes: [
        { name: "Small", quantity: 20 },
        { name: "Medium", quantity: 20 },
        { name: "Large", quantity: 20 },
        { name: "Extra Large", quantity: 20 },
        { name: "Extra Extra Large", quantity: 20 },
      ],
    },
    {
      id: 3,
      name: "Black Tee",
      category: "Fashion",
      subCategory: "Men's Wear",
      type: "Shein",
      price: "N2,500",
      dateAdded: "31st July, 2023 11:27 AM",
      status: "Inactive",
      image: "/placeholder.svg?height=50&width=50",
      description: "Plain Black Round Neck Tee",
      quantity: 100,
      sizes: [
        { name: "Small", quantity: 20 },
        { name: "Medium", quantity: 20 },
        { name: "Large", quantity: 20 },
        { name: "Extra Large", quantity: 20 },
        { name: "Extra Extra Large", quantity: 20 },
      ],
    },
    {
      id: 4,
      name: "Black Tee",
      category: "Fashion",
      subCategory: "Men's Wear",
      type: "Shein",
      price: "N2,500",
      dateAdded: "31st July, 2023 11:27 AM",
      status: "Inactive",
      image: "/placeholder.svg?height=50&width=50",
      description: "Plain Black Round Neck Tee",
      quantity: 100,
      sizes: [
        { name: "Small", quantity: 20 },
        { name: "Medium", quantity: 20 },
        { name: "Large", quantity: 20 },
        { name: "Extra Large", quantity: 20 },
        { name: "Extra Extra Large", quantity: 20 },
      ],
    },
    {
      id: 5,
      name: "Black Tee",
      category: "Fashion",
      subCategory: "Men's Wear",
      type: "Shein",
      price: "N2,500",
      dateAdded: "31st July, 2023 11:27 AM",
      status: "Active",
      image: "/placeholder.svg?height=50&width=50",
      description: "Plain Black Round Neck Tee",
      quantity: 100,
      sizes: [
        { name: "Small", quantity: 20 },
        { name: "Medium", quantity: 20 },
        { name: "Large", quantity: 20 },
        { name: "Extra Large", quantity: 20 },
        { name: "Extra Extra Large", quantity: 20 },
      ],
    },
  ]);

  const handleSaveProduct = (newProduct: any) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Product</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Package Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold">18</div>
          <div className="text-gray-500 text-sm uppercase">Package Type</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold">46</div>
          <div className="text-gray-500 text-sm uppercase">Active</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold">52</div>
          <div className="text-gray-500 text-sm uppercase">Inactive</div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-6 text-left font-medium">Product</th>
              <th className="py-3 px-6 text-left font-medium">Category</th>
              <th className="py-3 px-6 text-left font-medium">Sub Category</th>
              <th className="py-3 px-6 text-left font-medium">Type</th>
              <th className="py-3 px-6 text-left font-medium">Price</th>
              <th className="py-3 px-6 text-left font-medium">Date Added</th>
              <th className="py-3 px-6 text-left font-medium">Status</th>
              <th className="py-3 px-6 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product:any) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedProduct(product)}
              >
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 mr-2 object-cover rounded-lg"
                    />
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="font-medium text-green-500">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="font-medium text-green-500">
                    {product.subCategory}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {product.type}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {product.dateAdded}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(product.id);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {dropdownOpen === product.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(product.id);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                          {/* Add more dropdown options here */}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-700">1 - 10 of 25</span>
        <div className="flex">
          <button className="px-3 py-1 rounded-l-md bg-green-500 text-white font-medium">
            1
          </button>
          {[2, 3, 4].map((page) => (
            <button
              key={page}
              className="px-3 py-1 bg-gray-200 text-gray-700 font-medium"
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 rounded-r-md bg-green-500 text-white font-medium">
            Next
          </button>
        </div>
      </div>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveProduct={handleSaveProduct}
      />

      {/* Sliding Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
          selectedProduct ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        {selectedProduct && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">View Match</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.category}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sub Category
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.subCategory}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Type
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.type}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex space-x-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <Image
                      key={index}
                      src={selectedProduct.image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.description}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.price}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.quantity}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <ul className="mt-1 text-sm text-gray-900">
                  {selectedProduct.sizes.map((size, index) => (
                    <li
                      key={index}
                    >{`${size.name} - ${size.quantity} pieces`}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Added
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.dateAdded}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.status}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product
