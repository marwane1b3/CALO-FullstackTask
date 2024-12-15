import { useMutation } from "@tanstack/react-query";
import { deleteJob } from "src/services/apis";

export const useRemoveJob = () => {
  const { mutate, isPending, status } = useMutation({
    mutationKey: ["DELETE_JOB"],
    mutationFn: async ({ id }) => deleteJob({ id: id }),
  });

  return {
    status,
    isPending,
    mutate,
  };
};
