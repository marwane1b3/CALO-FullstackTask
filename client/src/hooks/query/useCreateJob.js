import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createJob } from "src/services/apis";

export const useCreateJob = () => {
  const [newJob, setNewJob] = useState(null);
  const clearState = () => {
    setNewJob(null);
  };
  useEffect(() => {
    return () => clearState();
  }, []);
  const { mutate, isPending, status } = useMutation({
    mutationKey: ["CREATE_NEW_JOB"],
    mutationFn: async ({ title, content }) => createJob({ title, content }),
    onSuccess: (data) => {
      if (data.content) {
        setNewJob(data.content);
      }
    },
  });

  return {
    newJob,
    status,
    isPending,
    mutate,
  };
};
