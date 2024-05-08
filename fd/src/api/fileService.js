import conf from "../config/config.js";
import axios from "axios";

export async function APIService(formData, url, method = "POST", headers = {}) {
  try {

     const accessToken = localStorage.getItem("accessToken");

    const response = await axios(`${conf.backendUrl}/${url}`, {
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: formData,
    });

    // if (!response.ok) {
    //     throw new Error(`API call failed with status ${response.status}`);
    // }

    // console.log(response);

    const data = await response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}
