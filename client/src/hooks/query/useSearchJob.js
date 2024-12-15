import { useQuery } from "@tanstack/react-query";
import { searchJob } from "src/services/apis";

export const useSearchJob = ({ query }) => {
  return useQuery({
    queryKey: ["search_job_query", query],
    queryFn: () => searchJob({ query }),
    enabled: !!query,
  });
};
