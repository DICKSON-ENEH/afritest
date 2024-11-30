// [storeId].tsx page

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

export default function StoreDetails({
  params,
}: {
  params: { storeId: string };
}) {
  const [activeTab, setActiveTab] = useState("store-details");
  const [activeSubTab, setActiveSubTab] = useState("owner-information");
  const router = useRouter();

  const tabs = [
    { id: "store-details", label: "Store Details" },
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "reviews", label: "Reviews" },
  ];

  const subTabs = [
    { id: "owner-information", label: "Owner information" },
    { id: "business-profile", label: "Business profile" },
    { id: "business-documents", label: "Business documents" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-black"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-100"></div>
          <h1 className="text-xl font-semibold">Prince Ebeano</h1>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Active
          </span>
        </div>
      </div>

      <div className="border-b">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-green-500 text-green-500"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "store-details" && (
        <div>
          <div className="border-b">
            <nav className="flex">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-4 py-2 font-medium ${
                    activeSubTab === tab.id
                      ? "border-b-2 border-green-500 text-green-500"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeSubTab === "owner-information" && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-semibold">
                  Owner&apos;s Information
                </h2>
                <button className="flex items-center gap-2 text-sm text-green-500 hover:text-green-600">
                  <Pencil className="w-4 h-4" />
                  Edit Information
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">First Name</label>
                    <p className="font-medium">Akinyemi</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Email Address
                    </label>
                    <p className="font-medium">akinrahman@gmail.com</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Last Name</label>
                    <p className="font-medium">Abdulrahman</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Phone Number
                    </label>
                    <p className="font-medium">+23480000000</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "business-profile" && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Business Profile</h2>
              <p className="text-gray-500">
                Business profile information will be displayed here
              </p>
            </div>
          )}

          {activeSubTab === "business-documents" && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Business Documents</h2>
              <p className="text-gray-500">
                Business documents will be displayed here
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Orders</h2>
          <p className="text-gray-500">
            Order information will be displayed here
          </p>
        </div>
      )}

      {activeTab === "products" && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <p className="text-gray-500">
            Product information will be displayed here
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Reviews</h2>
          <p className="text-gray-500">
            Review information will be displayed here
          </p>
        </div>
      )}
    </div>
  );
}
