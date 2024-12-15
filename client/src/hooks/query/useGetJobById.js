import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { getJobById } from "src/services/apis";

export const useGetJobById = ({ id }) => {
  return useQuery({
    queryKey: [queryKeys.JOB_BY_ID],
    queryFn: () => getJobById({ id }),
  });
};
