import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://ec2-43-202-64-101.ap-northeast-2.compute.amazonaws.com:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthorizedApi = () => {
  const token = localStorage.getItem("token");

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
    const response = await axiosApi.get("/hello");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const res = await axiosApi.post("/api/login", data);
    return res;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signupApi = async (data) => {
  try {
    const res = await axiosApi.post("/api/member", data);
    return res;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const duplicateEmailApi = async (data) => {
  try {
    const response = await axiosApi.get("/api/check-duplicate/email", data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const duplicateNicknameApi = async (data) => {
  try {
    const response = await axiosApi.get("/api/check-duplicate/nickname", data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
