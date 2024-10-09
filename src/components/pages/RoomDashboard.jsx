import { useState, useEffect } from "react";
import {
  getAllRooms,
  addRoom,
  deleteRoom,
  updateRoom,
} from "../../api/RoomApi.js";
import Data from "../molecules/Data.jsx";
import LeftSide from "../organism/LeftSide.jsx";
import RoomModal from "../modals/RoomModal.jsx";

const RoomDashboard = () => {
  const [room, setRoom] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  // add member
  const [data, setData] = useState({
    room_name: "",
  });

  const fetchRoom = async () => {
    try {
      const data = await getAllRooms();
      setRoom(data);
    } catch (error) {
      console.error("Error fetching Room", error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  function handleOpenForm() {
    setOpenForm(!openForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await updateRoom(editProductId, data);
        fetchRoom();
        setOpenForm(false);
        setData({ room_name: "" });
        setIsEditing(false);
        setEditProductId(null);
      } catch (error) {
        console.error("Error updating room", error);
      }
    } else {
      try {
        const newRoom = await addRoom(data);
        fetchRoom();
        setOpenForm(false);
        setData({ room_name: "" });
      } catch (error) {
        console.error("Error adding room", error);
      }
    }
  };

  function handleOnChange(e) {
    const { name, value } = e.target;
    setData((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  // delete
  const handleDeleteRoom = async (id) => {
    try {
      await deleteRoom(id);
      fetchRoom();
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  // update
  const handleUpdateRoom = async (id) => {
    setOpenForm(true);
    setIsEditing(true);
    setEditProductId(id);
  };

  return (
    <div className="w-full h-screen flex bg-[#ededf9]">
      <LeftSide
        member="/UTS_YafiAllamJunaedi_FE/member"
        trainer="/UTS_YafiAllamJunaedi_FE/trainer"
        session="/UTS_YafiAllamJunaedi_FE/workoutsession"
        room="/UTS_YafiAllamJunaedi_FE/room"
      />
      <div className="w-4/5 h-full flex flex-col p-12">
        <p className="font-bold text-3xl text-[#313b65]">Room Management</p>
        <div className="w-full flex gap-x-7 mt-10">
          <div className="w-56 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              TOTAL ROOM
            </p>
            <p className="ml-3 text-white text-sm font-thin">2</p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              TOTAL CAPACITY
            </p>
            <p className="ml-3 text-white text-sm font-thin">30</p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              AVAILABLE ROOM
            </p>
            <p className="ml-3 text-white text-sm font-thin">2/2</p>
          </div>
        </div>
        <div className="w-full h-full mt-10">
          <div className="w-full flex justify-between">
            <p className="text-[#313b65] font-bold text-xl mb-5">Recent Room</p>
            <div
              className="px-2 h-10 flex items-center border-2 justify-center border-[#313b65] cursor-pointer"
              onClick={handleOpenForm}
            >
              <p className="font-semibold mr-3">Add Room</p>
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
            <RoomModal
              onClose={() => setOpenForm(false)}
              handleSubmit={handleSubmit}
              onChange={handleOnChange}
              value={data.room_name}
            />
          )}
          <div className="w-full mt-8">
            <div className="w-full flex">
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Room Name</p>
              </div>
              <div className="w-4/5 text-end">
                <p className="font-semibold text-xl mr-14">Action</p>
              </div>
            </div>
            <div className="w-full border-[#313b65] border-t-0 border-r-0 border-b-2 border-l-0 mt-2"></div>
            {room.map((item, index) => (
              <Data
                key={index}
                name={item.room_name}
                edit={() => handleUpdateRoom(item.id)}
                remove={() => handleDeleteRoom(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDashboard;
