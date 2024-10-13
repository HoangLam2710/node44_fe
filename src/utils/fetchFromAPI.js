import axios from "axios";

export const BASE_URL = "http://localhost:3001";

let apiCallCount = 0;

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    // token: localStorage.getItem("LOGIN_USER"),
  },
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  ...options,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.requiredAuth) {
      const token = localStorage.getItem("LOGIN_USER");
      if (token) {
        config.headers["token"] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const extendToken = async () => {
  const { data } = await axiosInstance.post(
    `/auth/extend-token`,
    {},
    { withCredentials: true },
  );

  localStorage.setItem("LOGIN_USER", data.data);

  return data.data;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (apiCallCount < 10) {
      apiCallCount++;
      const originalRequest = error.config;
      if (error.response.status === 401) {
        try {
          const data = await extendToken();
          originalRequest.headers["token"] = data;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error("Extend token failed", error);
        }
      }
    } else {
      console.log("API call limit reached");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const fetchFromAPI = async (url) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${url}`);
  return data;
};

export const getListVideo = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/videos/get-videos`);
  return data;
};

export const getType = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/videos/get-type`, {
    requiredAuth: true,
  });
  return data;
};

export const getVideoById = async (typeId) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/videos/get-video-type-by-id/${typeId}`,
  );
  return data;
};

export const registerAPI = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/register`,
    payload,
  );
  return data;
};

export const loginAPI = async (payload) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/auth/login`, payload, {
    withCredentials: true,
  });
  return data;
};

export const loginAsyncKeyAPI = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/login-async-key`,
    payload,
    {
      withCredentials: true,
    },
  );
  return data;
};

export const loginFacebookAPI = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/login-face`,
    payload,
  );
  return data;
};

export const forgotPasswordAPI = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/forgot-password`,
    payload,
  );
  return data;
};

export const resetPasswordAPI = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/reset-password`,
    payload,
  );
  return data;
};
