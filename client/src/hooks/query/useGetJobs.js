import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { getJobs } from "src/services/apis";

export const useGetJobs = () => {
  return useQuery({
    queryKey: [queryKeys.GET_JOBS],
    queryFn: getJobs,
  });
};
