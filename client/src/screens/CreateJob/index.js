import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap/esm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertComponnent } from "src/components/Alert";
import { useCreateJob } from "src/hooks/query/useCreateJob";

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { mutate, status, newJob } = useCreateJob();
  const onSubmit = (data) => {
    console.log("Form submitted:");
    mutate({ title: data?.title, content: data?.content });
  };

  const handleSwitchStatus = useCallback(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/home");
    }, 2500);
  }, [navigate, showAlert]);

  useEffect(() => {
    if (status === "success") {
      handleSwitchStatus();
    }
  }, [status, handleSwitchStatus]);

  return (
    <>
      <div className="container mt-1">
        <AlertComponnent
          visible={showAlert}
          message={`Job with id ${newJob?.id} Created Successfully`}
        />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4 text-center">Add new Job</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border p-4 rounded shadow-sm bg-light"
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Enter title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message:
                        "Please enter a valid title min 3 charatcters ..",
                    },
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
                  rows="4"
                  className={`form-control ${
                    errors.content ? "is-invalid" : ""
                  }`}
                  placeholder="Enter content"
                  {...register("content", {
                    required: "Content is required",
                    minLength: {
                      value: 3,
                      message: "Enter a vslid description please",
                    },
                  })}
                ></textarea>
                {errors.content && (
                  <div className="invalid-feedback">
                    {errors.content.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {status === "pending" ? <Spinner /> : "Create Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
