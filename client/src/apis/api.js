import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-43-202-64-101.ap-northeast-2.compute.amazonaws.com:8080",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

const getAuthorizedApi = () => {
  const token = localStorage.getItem("accessToken");

  const authorizedApi = axios.create({
    baseURL:
      "http://ec2-43-202-64-101.ap-northeast-2.compute.amazonaws.com:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return authorizedApi;
};

export const getHelloApi = async () => {
  try {
    const response = await api.get("/hello");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const res = await api.post("/api/login", data);
    const accessToken = res.headers["authorization"];
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signupApi = async (data) => {
  try {
    const res = await api.post("/api/member", data);
    return res;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const duplicateEmailApi = async ({ data }) => {
  try {
    const response = await api.post("/api/check-duplicate/email", { data });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const duplicateNicknameApi = async (data) => {
  try {
    const response = await api.post("/api/check-duplicate/nickname", data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getAuthCodeApi = async (data) => {
  try {
    const response = await api.post("/api/email/send-verification", data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const sendAuthCodeApi = async (data) => {
  try {
    const response = await api.post("/api/email/verify-code", data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const leaveMemberApi = async () => {
  try {
    const response = await api.delete("/api/member", {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const findPwdApi = async (data) => {
  try {
    const response = await api.post("/api/email/send-new-password", data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};