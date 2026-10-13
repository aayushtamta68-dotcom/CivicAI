import api from "./api";
import API_ENDPOINTS from "../constants/apiEndpoints";

const complaintService = {

  createComplaint(formData) {
    return api.post(
      API_ENDPOINTS.COMPLAINTS.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },


  getMyComplaints() {
    return api.get(
      API_ENDPOINTS.COMPLAINTS.MY_COMPLAINTS
    );
  },


  getComplaintDetails(id) {
    return api.get(
      API_ENDPOINTS.COMPLAINTS.DETAILS(id)
    );
  },

};


export default complaintService;