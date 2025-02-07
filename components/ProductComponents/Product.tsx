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
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAddProductMutation, useDeleteProductMutation, useGetAllSubPackageCategoryQuery, useGetPackageCategoryQuery, useGetProductsQuery, useGetSingleProductQuery } from "../../redux/services/productsApi";
import { useGetVendorsQuery } from "../../redux/services/vendorApi";
import { toast } from "react-toastify";

import moment from "moment"
import { BiSolidEditAlt } from "react-icons/bi";
import { EditProduct } from "./EditProduct";
// CreateProductModal component
const CreateProductModal = ({
  isOpen,
  onClose,
  // onSaveProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  // onSaveProduct: (product: any) => void;
}) => {
  const [quality, setQuality] = useState(1);
  // console.log(quality)
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  const [sizes, setSizes] = useState<
    Array<{ title: string; quantity: number }>
  >([]);

  const {data} = useGetPackageCategoryQuery()
  const {data:subs} = useGetAllSubPackageCategoryQuery()
  const {data:vendors} = useGetVendorsQuery()

  const [productDetails, setProductDetails] = useState({
    pacakage_category: '',
    pacakage_sub_category: '',
    vendor: " ",
    pacakage_type: 'Shein', 
    product_name: '',
    // product_cash_back: 10, 
    product_img: [],
    product_link: "",
    product_cash_back:"",
    product_description: '',
    product_price: "",
    product_qty: quality,
    product_size:sizes
  });
    const [loading, setLoading]= useState(false)

  console.log(productDetails)



  const [productImages, setProductImages] = useState<any>([]);
  // const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  // const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState({ title: '', quantity: 0, notifyAt: 0 });

const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProductDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, id } = e.target;
    if (files && files.length > 0) {
      const uploadedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const localFilePath = URL.createObjectURL(file);
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'ml_default');
  
          const { secure_url } = await fetch(
            'https://api.cloudinary.com/v1_1/dvtisceko/image/upload',
            {
              method: 'POST',
              body: formData,
            }
          ).then(async (res) => await res.json());
  
          return {
            localPath: localFilePath,
            cloudinaryUrl: secure_url
          };
        })
      );
  
     
      setProductDetails((prev:any) => ({
        ...prev,
        product_img: [...prev.product_img, ...uploadedImages.map(img => img.cloudinaryUrl)]
      }));
  

      setProductImages((prev:any) => [...prev, ...uploadedImages.map(img => img.localPath)]);
    }
  };
const [addProduct] = useAddProductMutation()
const {data:products} = useGetProductsQuery()
console.log(products)
const handleSaveCategory = async () => {
  try {
    // setLoading(true); 
  
    const response = await addProduct(productDetails).unwrap();
    console.log("Response from API:", response);
    if (response.status === true) {
      // console.log("Product saved successfully");
      // setLoading(false);



      toast.success(response?.data?.message)
      
    }
  } catch (error) {
    console.error("Error saving product:", error);
  }
};
// console.log(form)
  const openAddSizeModal = () => {
    setIsAddSizeModalOpen(true);
  };

  const closeAddSizeModal = () => {
    setIsAddSizeModalOpen(false);
  };

  const handleSaveSize = () => {
    setSizes((prev) => [...prev, newSize]);
    setNewSize({ title: '', quantity: 0, notifyAt: 0 });
    closeAddSizeModal();
  };


  useEffect(() => {
    setProductDetails(prevDetails => ({
      ...prevDetails,
      product_qty: quality,
    }));
  }, [quality]);

  // Update product_size whenever sizes changes
  useEffect(() => {
    setProductDetails(prevDetails => ({
      ...prevDetails,
      product_size: sizes,
    }));
  }, [sizes]);



  return (
    <form className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Create Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <p className="text-sm text-gray-600 mb-6">
            Kindly input the details of the product you are uploading.
          </p>
          <form className="space-y-4">
            {/* Package Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Category</label>
              <select
                name="pacakage_category"
                value={productDetails.pacakage_category}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="">Select a category</option>
                {data?.data?.packages?.map((pkg, index) => (
                  <option key={index} value={pkg._id}>{pkg.name}</option>
                ))}
              </select>
            </div>
            {/* Package Sub Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Sub Category</label>
              <select
                name="pacakage_sub_category"
                value={productDetails.pacakage_sub_category}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="">Select a sub category</option>

                {subs?.data?.sub_packages?.map((subPkg, index) => (
                  <option key={index} value={subPkg._id}>{subPkg.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
              <select
                name="vendor"
                value={productDetails.vendor}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="">Select a vendor</option>

                {vendors?.data.vendors?.map((vendors, index) => (
                  <option key={index} value={vendors._id}>{vendors.first_name + " " + vendors.last_name}</option>
                ))}
              </select>
            </div>
            {/* Package Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
              <select
                name="pacakage_type"
                value={productDetails.pacakage_type}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option>Shein</option>
                <option>Nike</option>
                <option>Adidas</option>
                <option>Puma</option>
              </select>
            </div>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="product_name"
                value={productDetails.product_name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Black Tee"
              />
            </div>
            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <div className="mt-1 flex items-center space-x-2">
                <label className="cursor-pointer p-2 border border-gray-300 rounded-md">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                    multiple
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </label>
                {productImages.length > 0 ? (
                  <div className="flex items-center space-x-2">
                    {productImages.map((image:any, index:any) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                )}
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="product_description"
                value={productDetails.product_description}
                //@ts-ignore
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={3}
                placeholder="Plain Black Round Neck Tee"
              ></textarea>
            </div>
            {/* Product Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
              <input
                type="text"
                name="product_price"
                value={productDetails.product_price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="₦ 2,500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cashback %</label>
              <input
                type="number"
                name="product_cash_back"
                value={productDetails.product_cash_back}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="10"
              /> 
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Link</label>
              <input
                type="text"
                name="product_link"
                value={productDetails.product_link}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="https://sample-url.com"
              />
            </div>
            {/* Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={(()=>{
                    setQuality(quality-1)
                  })}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                name="product_qty"

                  value={productDetails.product_qty}
               onChange={((e:any)=>{
                setQuality(e.target.value)
               })}
                  className="focus:ring-green-500 focus:border-green-500 block w-full text-center border-gray-300 rounded-none sm:text-sm"
                />
                <button
                  type="button"
                  onClick={(()=>{
                    setQuality(quality+1)
                  })}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <button
                type="button"
                onClick={openAddSizeModal}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                + Add Size
              </button>
              {sizes.map((size, index) => (
                <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
                  {size.title} - Quantity: {size.quantity},
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
            onClick={handleSaveCategory}
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
              <button onClick={closeAddSizeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">Add new sizes for the product you are uploading</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <input
                    type="text"
                    value={newSize.title}
                    onChange={(e) => setNewSize({ ...newSize, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Small"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => setNewSize({ ...newSize, quantity: Math.max(0, newSize.quantity - 1) })}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      value={newSize.quantity}
                      onChange={(e) => setNewSize({ ...newSize, quantity: parseInt(e.target.value) || 0 })}
                      className="focus:ring-green-500 focus:border-green-500 block w-full text-center border-gray-300 rounded-none sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setNewSize({ ...newSize, quantity: newSize.quantity + 1 })}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
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
               {
                loading?"Saving":"Save Product"
               }
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

 const Product=(id:any) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  console.log(selectedProduct, "selected")
  
  const {data:products} = useGetProductsQuery()
  const { data: singleProduct, error } = useGetSingleProductQuery({ selectedProduct }, {
    skip: !selectedProduct,
  });
  console.log(singleProduct, "single")
  // console.table(products)




  const [deleteproduct] = useDeleteProductMutation()
  const handleDeleteProduct = async (productId:any) => {
    try {
      await deleteproduct({ selectedProduct:productId }).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
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
            {products?.data?.products?.map((product:any) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={((e:any)=>{
                  e.stopPropagation()
                  setSelectedProduct(product._id)
                })}
              >
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center flex-col">
                    <img
                      src={product?.product_img[0]}
                      alt={product.product_name}
                      width={40}
                      height={40}
                      className="w-10 h-10 mr-2 object-cover rounded-lg"
                    />
                    <span className="font-medium text-gray-900">
                      {product.product_name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="font-medium text-green-500">
                    {product.pacakage_category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="font-medium text-green-500">
                    {product.pacakage_sub_category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {product.pacakage_type}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {product.product_price}
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
                        toggleDropdown(product._id);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {dropdownOpen === product._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                  setSelectedProduct(product._id)
                  setDropdownOpen(null);

                              handleDeleteProduct(product._id)
                              // handleDeleteProduct(product.id);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleDeleteProduct(product.id);
                  setSelectedProduct(product._id)


setIsEdit(true)
setDropdownOpen(null);

                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <BiSolidEditAlt />
                            {/* <Trash2 className="w-4 h-4 mr-2" /> */}
                            Edit
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

{
  isModalOpen &&       <CreateProductModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  
/>
}

{
  isEdit &&       <EditProduct
  selectedProduct={selectedProduct}
  isOpen={isEdit}
  onClose={() => setIsEdit(false)}
  
/>
}

      {/* Sliding Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
          selectedProduct ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        {singleProduct?.data?.products && (
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
                  {singleProduct?.data?.products?.pacakage_category}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sub Category
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.pacakage_sub_category}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Type
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.pacakage_type}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.product_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex space-x-2">
                  {singleProduct?.data?.products?.product_img.map((props:any, index:number) => (
                    <img
                      key={index}
                      src={props}
                      alt={`image ${index + 1}`}
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
                  {singleProduct?.data?.products?.product_description}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.product_price}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.product_qty}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <ul className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.product_size.map((size:any, index:any) => (
                    <li
                      key={index}
                    >{`${size?.size} - ${size?.quantity} pieces`}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Added
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {moment(singleProduct?.data?.products?.createdAt).format('MM/DD/YYYY')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {singleProduct?.data?.products?.status}
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
