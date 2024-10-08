import Data from "../molecules/Data.jsx";
import LeftSide from "../organism/LeftSide.jsx";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex bg-[#ededf9]">
      {/* LEFT SIDE */}
      <LeftSide />

      {/* MAIN */}
      <div className="w-3/5 h-full flex flex-col p-12">
        <p className="font-bold text-3xl text-[#313b65]">Business Dashboard</p>
        <div className="w-full flex gap-x-7 mt-10">
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">MEMBERS</p>
            <p className="ml-3 text-white text-sm font-thin">4</p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">TRAINER</p>
            <p className="ml-3 text-white text-sm font-thin">1 </p>
          </div>
          <div className="w-1/5 bg-[#5b5ae6] p-3 rounded-lg">
            <p className="ml-3 text-white text-base font-semibold">SESSIONS</p>
            <p className="ml-3 text-white text-sm font-thin">100</p>
          </div>
        </div>

        <div className="w-full h-full mt-10">
          <p className="text-[#313b65] font-bold text-xl mb-5">
            Recent Members
          </p>

          <div className="w-full flex">
            {/* <Data
            title="ID"
            data1="1"
            data2="2"
            data3="3"
            data4="4"
            data5="5"
            />
            <Data
            title="NAME"
            data1="Allam"
            data2="Faiz"
            data3="Reza"
            data4="Danis"
            data5="Cisna"
            />
            <Data
            title="AGE"
            data1="17"
            data2="18"
            data3="19"
            data4="20"
            data5="16"
            />
            <Data
            title="JOIN DATE"
            data1="1"
            data2="18"
            data3="19"
            data4="20"
            data5="16"
            /> */}
          </div>
        </div>
      </div>
      <div className="w-1/5 bg-green-400 text-center">KANAN</div>
    </div>
  );
};

export default Dashboard;
