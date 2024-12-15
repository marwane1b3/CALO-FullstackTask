import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { getItem } from "src/utils";

export const useGetSavedJobs = () => {
  return useQuery({
    queryKey: [queryKeys.SAVED_JOBS],
    queryFn: () => getItem(queryKeys.SAVED_JOBS),
  });
};
