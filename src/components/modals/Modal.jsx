import { useState, useEffect } from "react";
import { getAllData } from "../../api/MemberApi.js";

const Modal = ({
  onClose,
  handleSubmit,
  onChange,
  value1,
  value2,
  value3,
  value4,
}) => {
  const [options, setOptions] = useState([]);
 
  useEffect(() => {
    getAllData('membership').then((res) => {
      setOptions(res)
    })
  }, [])
  // console.log('abvc', options)


  function handleGetId(value){
    console.log(value)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Member</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={value1}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              value={value2}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="membershipId"
              className="block text-sm font-medium text-gray-700"
            >
              Membership
            </label>
            <select
              name="membershipId"
              value={value3}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a membership</option>
              {options.map((item) => (
                <option key={item.id} value={item.id}>{item.type}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="join_date"
              className="block text-sm font-medium text-gray-700"
            >
              Join Date
            </label>
            <input
              type="date"
              name="join_date"
              value={value4}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
