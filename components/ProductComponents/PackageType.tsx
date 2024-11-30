"use client";

import React, { useState } from "react";
import { FC } from "react";
import { PlusIcon, MoreVertical, X, Check, AlertTriangle } from "lucide-react";

const packageTypes = [
  {
    category: "Fashion",
    subCategory: "Men's Wear",
    type: "Shein",
    dateAdded: "19th July, 2023 12:30 PM",
    dateModified: "19th July, 2023 12:30 PM",
    status: "Active",
  },
  {
    category: "Fashion",
    subCategory: "Men's Wear",
    type: "Shein",
    dateAdded: "19th July, 2023 12:30 PM",
    dateModified: "19th July, 2023 12:30 PM",
    status: "Inactive",
  },
  {
    category: "Fashion",
    subCategory: "Men's Wear",
    type: "Shein",
    dateAdded: "19th July, 2023 12:30 PM",
    dateModified: "19th July, 2023 12:30 PM",
    status: "Active",
  },
  {
    category: "Fashion",
    subCategory: "Men's Wear",
    type: "Shein",
    dateAdded: "19th July, 2023 12:30 PM",
    dateModified: "19th July, 2023 12:30 PM",
    status: "Inactive",
  },
  {
    category: "Fashion",
    subCategory: "Men's Wear",
    type: "Shein",
    dateAdded: "19th July, 2023 12:30 PM",
    dateModified: "19th July, 2023 12:30 PM",
    status: "Active",
  },
  {
    category: "Fashion",
    subCategory: "Men's Wear",
    type: "Shein",
    dateAdded: "19th July, 2023 12:30 PM",
    dateModified: "19th July, 2023 12:30 PM",
    status: "Inactive",
  },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    category: string;
    subCategory: string;
    type: string;
  }) => void;
}

const Modal=({ isOpen, onClose, onSave }: ModalProps)=> {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [packageType, setPackageType] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ category, subCategory, type: packageType });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Package Type</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          Kindly input the details of the package type you are creating.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select category</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Garden">Home & Garden</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Sub Category
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select category</option>
            <option value="Men Wear">Men Wear</option>
            <option value="Women Wear">Women Wear</option>
            <option value="Children Wear">Children Wear</option>
            <option value="Footware">Footware</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Type
          </label>
          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select vendor</option>
            <option value="Shein">Shein</option>
            <option value="Zara">Zara</option>
            <option value="H&M">H&M</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Package Type
          </button>
        </div>
      </div>
    </div>
  );
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-500 rounded-full p-2 mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">Package Type Action</h2>
          <p className="text-gray-600 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="bg-red-100 rounded-full p-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">
            Are you sure you want to delete this package type?
          </h2>
        </div>
        <p className="text-gray-600 text-center mb-6">
          By clicking on &quot;Delete Package Type&quot;, you acknowledge that
          you have verified you want to take off the package type from the
          system. Action cannot be undone. If you are not sure, please cancel.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Package Type
          </button>
        </div>
      </div>
    </div>
  );
}

interface DropdownProps {
  onEdit: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
}

function Dropdown({ onEdit, onDeactivate, onDelete }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-500"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit Package Type
            </button>
            <button
              onClick={() => {
                onDeactivate();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Deactivate
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PackageType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [packageTypeToDelete, setPackageTypeToDelete] = useState<number | null>(
    null
  );
  const [packageTypesList, setPackageTypesList] = useState(packageTypes);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSavePackageType = (newPackageType: any) => {
    const today = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setPackageTypesList([
      ...packageTypesList,
      {
        ...newPackageType,
        dateAdded: today,
        dateModified: today,
        status: "Active",
      },
    ]);
    setIsModalOpen(false);
    setSuccessMessage("Package Type has been created successfully.");
    setIsSuccessModalOpen(true);
  };

  const handleEdit = (index: number) => {
    // Implement edit functionality
    console.log(`Editing package type at index ${index}`);
  };

  const handleDeactivate = (index: number) => {
    setPackageTypesList(
      packageTypesList.map((packageType, i) =>
        i === index ? { ...packageType, status: "Inactive" } : packageType
      )
    );
    setSuccessMessage("Package Type has been deactivated successfully.");
    setIsSuccessModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setPackageTypeToDelete(index);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (packageTypeToDelete !== null) {
      setPackageTypesList(
        packageTypesList.filter((_, i) => i !== packageTypeToDelete)
      );
      setIsConfirmDeleteModalOpen(false);
      setPackageTypeToDelete(null);
      setSuccessMessage("You have deleted the package type successfully.");
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Package Type</h1>
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

      <div className="overflow-x-auto bg-white rounded-lg ">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-6 text-left font-medium">Category</th>
              <th className="py-3 px-6 text-left font-medium">Sub Category</th>
              <th className="py-3 px-6 text-left font-medium">Type</th>
              <th className="py-3 px-6 text-left font-medium">Date Added</th>
              <th className="py-3 px-6 text-left font-medium">Date Modified</th>
              <th className="py-3 px-6 text-left font-medium">Status</th>
              <th className="py-3 px-6 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {packageTypesList.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-6 text-sm">
                  <span className="font-medium text-green-500">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="font-medium text-green-500">
                    {item.subCategory}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">{item.type}</td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {item.dateAdded}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {item.dateModified}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  <Dropdown
                    onEdit={() => handleEdit(index)}
                    onDeactivate={() => handleDeactivate(index)}
                    onDelete={() => handleDelete(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="text-sm text-gray-700 mb-4 sm:mb-0">1 - 10 of 25</div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                page === 1
                  ? "z-10 bg-green-50 border-green-500 text-green-600"
                  : "bg-white  border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePackageType}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
