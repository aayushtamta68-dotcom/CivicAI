const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verify-otp",
  },

  COMPLAINTS: {
    CREATE: "/complaints",
    MY_COMPLAINTS: "/complaints/my",
    DETAILS: (id) => `/complaints/${id}`,
  },

  DASHBOARD: {
    EMPLOYEE: "/dashboard",
    CITIZEN: "/dashboard/citizen",
  },

  EMPLOYEE: {
    COMPLAINTS: "/employees/complaints",
    DETAILS: (id) => `/employees/complaints/${id}`,
    UPDATE: (id) => `/employees/complaints/${id}`,
  },

  DEPARTMENTS: {
    GET_ALL: "/departments",
  },
};

export default API_ENDPOINTS;