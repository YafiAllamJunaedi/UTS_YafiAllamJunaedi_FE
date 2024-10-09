import { useState, useEffect } from "react";
import {
  getAllMembers,
  addMember,
  deleteMember,
  updateMember,
} from "../../api/MemberApi.js";
import Data from "../molecules/Data.jsx";
import LeftSide from "../organism/LeftSide.jsx";
import Modal from "../modals/Modal.jsx";

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  // add member
  const [data, setData] = useState({
    name: "",
    age: "",
    MembershipId: "",
    join_date: "",
  });
  console.log(data)

  const fetchMembers = async () => {
    try {
      const data = await getAllMembers();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };
  // console.log(members);

  useEffect(() => {
    fetchMembers();
  }, []);

  function handleOpenForm() {
    setOpenForm(!openForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMember(editProductId, data);
        // fetchMembers();
        // setOpenForm(false);
        // setData({ name: "", age: "", join_date: "", membershipId: "" });
        // setIsEditing(false);
        // setEditProductId(null);
      } else {
        await addMember(data);
        console.log(data)
      }
      fetchMembers();
      setOpenForm(false);
      setData({ name: "", age: "", MembershipId: "", join_date: "" });
      setIsEditing(false);
      setEditProductId(null);
      // try {
      //   const newMember = await addMember(data);
      //   fetchMembers();
      //   setOpenForm(false);
      //   setData({ name: "", age: "", join_date: "", membershipId: "" });
      // } catch (error) {
      //   console.error("Error adding member", error);
      // }
    } catch (error) {
      console.error("Error handling member:", error);
    }
  };

  function handleOnChange(e) {
    const newData= {...data}
    newData[e.target.name]=e.target.value
    setData({...newData,MembershipId:parseInt(newData.MembershipId)})
    // const { name, value } = e.target;
    // setData((prevItem) => ({
    //   ...prevItem,
    //   [name]: value,
    // }));
  }

  // delete
  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member", error);
    }
  };

  // update
  const handleUpdateMember = async (id) => {
    setOpenForm(true);
    setIsEditing(true);
    setEditProductId(id);
  };

  return (
    <div className="w-full min-h-screen flex bg-[#ededf9]">
      <LeftSide
        room="/UTS_YafiAllamJunaedi_FE/room"
        member="/UTS_YafiAllamJunaedi_FE/member"
        trainer="/UTS_YafiAllamJunaedi_FE/trainer"
        session="/UTS_YafiAllamJunaedi_FE/session"
      />
      <div className="w-4/5 h-full flex flex-col p-12">
        <p className="font-bold text-3xl text-[#313b65]">Member Management</p>
        <div className="w-full flex gap-x-7 mt-10">
          <div className="w-56 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              TOTAL MEMBERS
            </p>
            <p className="ml-3 text-white text-sm font-thin">{members.length}</p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">GROWTH</p>
            <p className="ml-3 text-white text-sm font-thin">1 </p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">TARGET</p>
            <p className="ml-3 text-white text-sm font-thin">{members.length}/20</p>
          </div>
        </div>
        <div className="w-full h-full mt-10">
          <div className="w-full flex justify-between">
            <p className="text-[#313b65] font-bold text-xl mb-5">
              Recent Members
            </p>
            <div
              className="px-2 h-10 flex items-center border-2 justify-center border-[#313b65] cursor-pointer"
              onClick={handleOpenForm}
            >
              <p className="font-semibold mr-3">Add Member</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
          {openForm && (
            <Modal
              onClose={() => setOpenForm(false)}
              onChange={handleOnChange}
              value1={data.name}
              value2={data.age}
              value3={data.MembershipId}
              value4={data.join_date}
              handleSubmit={handleSubmit}
            />
          )}
          {/* name, age, join_date */}
          <div className="w-full mt-8">
            <div className="w-full flex">
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Name</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Age</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Membership</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Join Date</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Action</p>
              </div>
            </div>
            <div className="w-full border-[#313b65] border-t-0 border-r-0 border-b-2 border-l-0 mt-2"></div>
            {members.map((item, index) => (
              <Data
                key={index}
                name={item.name}
                type={item.Membership?.type || "No membership"}
                age={item.age}
                join_date={item.join_date}
                edit={() => handleUpdateMember(item.id)}
                remove={() => handleDeleteMember(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
