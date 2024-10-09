import { useState, useEffect } from "react";
import {
  getAllTrainers,
  addTrainer,
  deleteTrainer,
  updateTrainer,
} from "../../api/TrainerApi.js";
import Data from "../molecules/Data.jsx";
import LeftSide from "../organism/LeftSide.jsx";
import TrainerModal from "../modals/TrainerModal.jsx";

const TrainerDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  // add member
  const [data, setData] = useState({
    name: "",
    speciality: "",
  });

  const fetchTrainers = async () => {
    try {
      const data = await getAllTrainers();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers", error);
    }
  };
  console.log(trainers);

  useEffect(() => {
    fetchTrainers();
  }, []);

  function handleOpenForm() {
    setOpenForm(!openForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await updateTrainer(editProductId, data);
        fetchTrainers();
        setOpenForm(false);
        setData({ name: "", speciality: "" });
        setIsEditing(false);
        setEditProductId(null);
      } catch (error) {
        console.error("Error updating trainer", error);
      }
    } else {
      try {
        const newTrainer = await addTrainer(data);
        fetchTrainers();
        setOpenForm(false);
        setData({ name: "", speciality: "" });
      } catch (error) {
        console.error("Error adding trainer", error);
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
  const handleDeleteTrainer = async (id) => {
    try {
      await deleteTrainer(id);
      fetchTrainers();
    } catch (error) {
      console.error("Error deleting trainer", error);
    }
  };

  // update
  const handleUpdateTrainer = async (id) => {
    setOpenForm(true);
    setIsEditing(true);
    setEditProductId(id);
  };

  return (
    <div className="w-full h-screen flex bg-[#ededf9]">
      <LeftSide
        member="/UTS_YafiAllamJunaedi_FE/member"
        trainer="/UTS_YafiAllamJunaedi_FE/trainer"
        session="/UTS_YafiAllamJunaedi_FE/session"
        room="/UTS_YafiAllamJunaedi_FE/room"
      />
      <div className="w-4/5 h-full flex flex-col p-12">
        <p className="font-bold text-3xl text-[#313b65]">Trainer Management</p>
        <div className="w-full flex gap-x-7 mt-10">
          <div className="w-52 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              TOTAL TRAINERS
            </p>
            <p className="ml-3 text-white text-sm font-thin">3</p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              TOTAL SESSIONS
            </p>
            <p className="ml-3 text-white text-sm font-thin">15</p>
          </div>
          <div className="w-56 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              SESSIONS ATTENDED
            </p>
            <p className="ml-3 text-white text-sm font-thin">4/15</p>
          </div>
        </div>
        <div className="w-full h-full mt-10">
          <div className="w-full flex justify-between">
            <p className="text-[#313b65] font-bold text-xl mb-5">
              Recent Trainers
            </p>
            <div
              className="px-2 h-10 flex items-center border-2 justify-center border-[#313b65] cursor-pointer"
              onClick={handleOpenForm}
            >
              <p className="font-semibold mr-3">Add Trainer</p>
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
            <TrainerModal
              onClose={() => setOpenForm(false)}
              onChange={handleOnChange}
              value1={data.name}
              value2={data.speciality}
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
                <p className="font-semibold text-xl">Speciality</p>
              </div>
              <div className="w-3/5">
                <p className="font-semibold text-xl text-end mr-16">Action</p>
              </div>
            </div>
            <div className="w-full border-[#313b65] border-t-0 border-r-0 border-b-2 border-l-0 mt-2"></div>
            {trainers.map((item, index) => (
              <Data
                key={index}
                name={item.name}
                age={item.speciality}
                edit={() => handleUpdateTrainer(item.id)}
                remove={() => handleDeleteTrainer(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
