import { storeItem } from "src/utils";
import axiosInstance, { endpoints } from "../axios";
import { queryKeys } from "src/hooks/constants";

export const getJobs = async () => {
  try {
    const { data = [] } = await axiosInstance.get(endpoints.getJobs);
    storeItem(queryKeys.GET_JOBS, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error?.message ? error.message : error;
  }
};

export const getJobById = async ({ id }) => {
  try {
    const { data = { id: 0, createdAt: "", content: "", title: "" } } =
      await axiosInstance.get(endpoints.getJobById(id));
    return data;
  } catch (error) {
    console.log({ error });

    let message =
      error?.response && error?.response?.data && error.response.data.message
        ? error.response.data.message
        : error?.message
        ? error.message
        : JSON.stringify(error);
    throw message;
  }
};

export const createJob = async ({ title, content }) => {
  try {
    const { data } = await axiosInstance.post(endpoints.getJobs, {
      title,
      content,
    });
    return data;
  } catch (error) {
    let message =
      error?.response && error?.response?.data && error.response.data.message
        ? error.response.data.message
        : error?.message
        ? error.message
        : JSON.stringify(error);
    throw message;
  }
};

export const deleteJob = async ({ id }) => {
  try {
    const { data } = await axiosInstance.delete(endpoints.deleteJobById(id));
    return data;
  } catch (error) {
    let message =
      error?.response && error?.response?.data && error.response.data.message
        ? error.response.data.message
        : error?.message
        ? error.message
        : JSON.stringify(error);
    throw message;
  }
};

export const searchJob = async ({ query }) => {
  try {
    const { data } = await axiosInstance.get(endpoints.searchJobs(query));
    return data;
  } catch (error) {
    let message =
      error?.response && error?.response?.data && error.response.data.message
        ? error.response.data.message
        : error?.message
        ? error.message
        : JSON.stringify(error);
    throw message;
  }
};
