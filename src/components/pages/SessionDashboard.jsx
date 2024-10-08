import { useState, useEffect } from "react";
import {
  getAllWorkoutSessions,
  addWorkoutSession,
  deleteWorkoutSession,
  updateWorkoutSession,
} from "../../api/WorkoutSessionApi.js";
import Data from "../molecules/Data.jsx";
import LeftSide from "../organism/LeftSide.jsx";
import SessionModal from "../modals/SessionModal.jsx";

const SessionDashboard = () => {
  const [workoutSessions, setWorkoutSessions] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  // add member
  const [data, setData] = useState({
    date: "",
  });

  const fetchWorkoutSession = async () => {
    try {
      const data = await getAllWorkoutSessions();
      setWorkoutSessions(data);
    } catch (error) {
      console.error("Error fetching workout sessions", error);
    }
  };

  useEffect(() => {
    fetchWorkoutSession();
  }, []);

  function handleOpenForm() {
    setOpenForm(!openForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await updateWorkoutSession(editProductId, data);
        fetchWorkoutSession();
        setOpenForm(false);
        setData({ date: "" });
        setIsEditing(false);
        setEditProductId(null);
      } catch (error) {
        console.error("Error updating workout session", error);
      }
    } else {
      try {
        const newWorkoutSession = await addWorkoutSession(data);
        fetchWorkoutSession();
        setOpenForm(false);
        setData({ date: "" });
      } catch (error) {
        console.error("Error adding workout session", error);
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
  const handleDeleteWorkoutSession = async (id) => {
    try {
      await deleteWorkoutSession(id);
      fetchWorkoutSession();
    } catch (error) {
      console.error("Error deleting workoutsession", error);
    }
  };

  // update
  const handleUpdateWorkoutSession = async (id) => {
    setOpenForm(true);
    setIsEditing(true);
    setEditProductId(id);
  };

  return (
    <div className="w-full h-screen flex bg-[#ededf9]">
      <LeftSide
        member="/member"
        trainer="/trainer"
        session="/workoutsession"
        room="/room"
      />
      <div className="w-4/5 h-full flex flex-col p-12">
        <p className="font-bold text-3xl text-[#313b65]">
          WorkoutSession Management
        </p>
        <div className="w-full flex gap-x-7 mt-10">
          <div className="w-56 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">
              TOTAL SESSIONS
            </p>
            <p className="ml-3 text-white text-sm font-thin">4</p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">GROWTH</p>
            <p className="ml-3 text-white text-sm font-thin">1 </p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">TARGET</p>
            <p className="ml-3 text-white text-sm font-thin">4/20</p>
          </div>
        </div>
        <div className="w-full h-full mt-10">
          <div className="w-full flex justify-between">
            <p className="text-[#313b65] font-bold text-xl mb-5">
              Recent WorkoutSession
            </p>
            <div
              className="px-2 h-10 flex items-center border-2 justify-center border-[#313b65] cursor-pointer"
              onClick={handleOpenForm}
            >
              <p className="font-semibold mr-3">Add WorkoutSession</p>
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
            <SessionModal
              onClose={() => setOpenForm(false)}
              handleSubmit={handleSubmit}
              onChange={handleOnChange}
              value={data.date}
            />
          )}
          {/* name, age, join_date */}
          <div className="w-full mt-8">
            <div className="w-full flex">
              <div className="w-1/5 text-center">
                <p className="font-semibold text-xl">Date</p>
              </div>
              <div className="w-4/5 text-end">
                <p className="font-semibold text-xl mr-14">Action</p>
              </div>
            </div>
            <div className="w-full border-[#313b65] border-t-0 border-r-0 border-b-2 border-l-0 mt-2"></div>
            {workoutSessions.map((item, index) => (
              <Data
                key={index}
                name={item.date}
                edit={() => handleUpdateWorkoutSession(item.id)}
                remove={() => handleDeleteWorkoutSession(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDashboard;
