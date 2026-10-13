import api from "./api";
import API_ENDPOINTS from "../constants/apiEndpoints";

const authService = {

  login(data) {
    return api.post(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  },


  register(data) {
    return api.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
  },


  verifyOTP(data) {
    return api.post(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      data
    );
  },

};


export default authService;