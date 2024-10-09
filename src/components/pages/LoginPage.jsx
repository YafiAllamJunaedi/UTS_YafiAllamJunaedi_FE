import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "./login_logo.webp"
const LoginPage = () => {
  const navigate = useNavigate();
  const password = "tes";
  const [inputPassword, setInputPassword] = useState("");
  
  function validatePassword() {
    inputPassword == password
      ? navigate("/UTS_YafiAllamJunaedi_FE/member")
      : alert("Wrong password");
  }
  return (
    <div className="w-full bg-black h-screen flex flex-col items-center">
      <img src={img} alt="" width="180px" />
      <div className="w-2/5 h-3/5 border-4 border-white rounded-md">
        <p className="text-white font-semibold text-2xl text-center mt-9">
          ADMIN ONLY
        </p>
        <div className="w-full h-56 flex flex-col ">
          <div className="w-full flex flex-col justify-center items-center mt-16 gap-y-10">
            <input
              type="email"
              className="w-72 border-2 border-t-0 border-l-0 border-r-0 border-slate-200 placeholder:text-white placeholder:text-opacity-70 bg-black focus:outline-none text-white p-1"
              placeholder="Email"
            />

            <input
              type="password"
              className="w-72 border-2 border-t-0 border-l-0 border-r-0 border-slate-200 placeholder:text-white placeholder:text-opacity-70 bg-black focus:outline-none text-white p-1"
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              value={inputPassword}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className={`w-2/5 bg-black text-white rounded-sm py-1  border-2 border-white`}
           onClick={validatePassword}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
