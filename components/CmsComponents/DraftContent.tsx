import { useSaveDraftMutation } from "../../redux/services/cms";
import React, { FormEvent, useState } from "react";
import { HiOutlineDotsVertical, HiPlus, HiX } from "react-icons/hi";

interface DraftItem {
  title: string;
  description: string;
  author: string;
  dateCreated: string;
}

const DraftContent: React.FC = () => {
  const [saveDraft, { isLoading }] = useSaveDraftMutation();
  const [drafts, setDrafts] = useState<DraftItem[]>([
    {
      title: "Get Connected Faster",
      description: "Get your deliveries at the ...",
      author: "Moses Jacob",
      dateCreated: "1st July, 2023 02:54PM",
    },
    {
      title: "Improve User Experience",
      description: "Enhance the user interface for ...",
      author: "Sarah Smith",
      dateCreated: "2nd July, 2023 10:30AM",
    },
    {
      title: "Optimize Performance",
      description: "Implement caching strategies to ...",
      author: "John Doe",
      dateCreated: "3rd July, 2023 03:15PM",
    },
  ]);

  const [showDropdown, setShowDropdown] = useState<boolean[]>(
    Array(drafts.length).fill(false)
  );
  const [showPopup, setShowPopup] = useState(false);
  const [newDraft, setNewDraft] = useState<DraftItem>({
    title: "",
    description: "",
    author: "",
    dateCreated: "",
  });

  const toggleDropdown = (index: number) => {
    const newShowDropdown = [...showDropdown];
    newShowDropdown[index] = !newShowDropdown[index];
    setShowDropdown(newShowDropdown);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewDraft({
      title: "",
      description: "",
      author: "",
      dateCreated: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const updatedDraft = { ...newDraft, dateCreated: currentDate };

    saveDraft(updatedDraft)
      .unwrap()
      .then(() => {
        handleClosePopup();
      });

    setShowDropdown((prev) => [...prev, false]);
  };

  return (
    <div className="mt-7  p-6 ">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleOpenPopup}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <HiPlus className="w-5 h-5" />
          <span>Add New Draft</span>
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Date Created</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drafts.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-green-600">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {item.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.author}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {item.dateCreated}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="relative">
                    <HiOutlineDotsVertical
                      className="cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-700 mx-auto"
                      onClick={() => toggleDropdown(index)}
                    />
                    {showDropdown[index] && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            Edit
                          </button>
                          <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                            Delete
                          </button>
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Draft</h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-600 hover:text-gray-800"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newDraft.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newDraft.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={newDraft.author}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftContent;
