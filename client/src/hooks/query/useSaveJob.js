import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { getItem, storeItem } from "src/utils";

export const useSaveJob = () => {
  const queryClient = useQueryClient();
  const { mutate, status, isSuccess } = useMutation({
    mutationKey: ["save_job_mutation"],
    mutationFn: async (
      job = {
        id: 0,
        title: "",
        content: "",
        createdAt: "",
      }
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const oldData = getItem(queryKeys.SAVED_JOBS) ?? [];
      const payload = [...oldData.filter((el) => el.id !== job.id), job];
      storeItem(queryKeys.SAVED_JOBS, JSON.stringify(payload));
      queryClient.invalidateQueries({ queryKey: [queryKeys.SAVED_JOBS] });
      return true;
    },
  });

  return {
    mutate,
    status,
    isSuccess,
  };
};
