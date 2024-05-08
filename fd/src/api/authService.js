// export {logoutUser, loginUser, changeUserPassword, getCurrentUser};
import axios from "axios";
import conf from "../config/config.js";

const baseUrl = conf.backendUrl;

export async function registerUser({ email, password, name }) {
  try {
    const response = await axios.post(`${baseUrl}/api/users/register`, {
      email,
      password,
      name
    });

    // console.log(response);

    if (response) {
      const { accessToken } = response.data.data;
      const userData = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      return userData;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(`${baseUrl}/api/users/login`, {
      email,
      password,
    });

    if (response) {
      const { accessToken } = response.data.data;
      const userData = response.data.data.user;

      localStorage.setItem("accessToken", accessToken);
      return userData;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${baseUrl}/api/users/logout`,
      {},
      { headers }
    );

    if (response) {
      localStorage.setItem("accessToken", null);
      return response;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${baseUrl}/api/users/current-user`,
      {},
      { headers }
    );

    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return null;
}
