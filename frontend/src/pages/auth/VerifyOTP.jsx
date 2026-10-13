import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../../services/authService";


function VerifyOTP() {

  const navigate = useNavigate();


  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);


  const email = localStorage.getItem(
    "otp_email"
  );



  async function handleVerify(e) {

    e.preventDefault();


    if (!otp.trim()) {

      toast.error(
        "Please enter OTP."
      );

      return;

    }



    try {

      setLoading(true);


      await authService.verifyOTP({

        email,

        otp

      });



      toast.success(
        "Registration completed successfully."
      );


      localStorage.removeItem(
        "otp_email"
      );


      navigate(
        "/login"
      );



    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "OTP verification failed."
      );


    } finally {

      setLoading(false);

    }

  }




  return (

    <div className="
      min-h-screen
      bg-[#EDECEC]
      flex
      items-center
      justify-center
      px-6
    ">


      <div className="
        w-full
        max-w-md
        bg-[#FEFEFE]
        border
        border-[#CCCCCC]
        rounded-2xl
        p-8
      ">



        <h1 className="
          text-3xl
          font-bold
          text-[#2F2F2F]
          text-center
        ">

          Verify OTP

        </h1>



        <p className="
          text-center
          text-[#666666]
          mt-3
          mb-8
        ">

          Enter the OTP sent to your email.

        </p>



        <form
          onSubmit={handleVerify}
          className="space-y-5"
        >



          <input

            type="text"

            maxLength="6"

            placeholder="Enter OTP"

            value={otp}

            onChange={(e) =>
              setOtp(e.target.value)
            }

            className="
              w-full
              text-center
              tracking-widest
              text-xl
              border
              border-[#CCCCCC]
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-[#B7C396]
            "

          />



          <button

            disabled={loading}

            className="
              w-full
              py-3
              rounded-xl
              bg-[#B7C396]
              text-[#2F2F2F]
              font-semibold
              hover:bg-[#E0E7D7]
              transition
            "

          >

            {
              loading
              ? "Verifying..."
              : "Verify OTP"
            }


          </button>



        </form>


      </div>


    </div>

  );

}


export default VerifyOTP;