import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  Spinner,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { useGetJobs } from "src/hooks/query/useGetJobs";
import "./Home.css";
import { formatDate, getItem } from "src/utils";
import { queryKeys } from "src/hooks/constants";
import { useSaveJob } from "src/hooks/query/useSaveJob";
import { AlertComponnent } from "src/components/Alert";
import { useRemoveJob } from "src/hooks/query/useRemoveJob";

export const HomeScreen = () => {
  const { isLoading, data, isFetching, isError, error, refetch } = useGetJobs();

  const existingData = useMemo(() => {
    return getItem(queryKeys.GET_JOBS) ?? [];
  }, []);
  const [job, setJob] = useState({
    title: "",
    content: "",
    createdAt: "",
    id: 0,
  });
  const { mutate, status } = useSaveJob();
  const [showDetails, setShowDetails] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutate: mutateDelete, status: statusDelete } = useRemoveJob();
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    content: "",
    title: "",
    createdAt: "",
  });
  const handleCheckDetails = (
    job = { title: "", content: "", createdAt: "", id: 0 }
  ) => {
    setJob(job);
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const handleRemoveFromList = () => {
    mutateDelete({ id: selectedItem.id });
  };
  const handleSaveJob = useCallback(() => {
    mutate({ ...job });
  }, [job, mutate]);

  const handleSwitchStatus = useCallback(() => {
    if (status === "success") {
      handleCloseDetails();
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    }
  }, [status]);
  useEffect(() => {
    if (status === "success") {
      handleSwitchStatus();
    }
  }, [status, handleSwitchStatus]);

  const handleSwitchDeleteStatus = useCallback(() => {
    if (statusDelete === "success") {
      setTimeout(() => {
        setConfirmDelete(false);
        refetch();
      }, 2500);
    }
  }, [statusDelete, refetch]);
  useEffect(() => {
    if (statusDelete === "success") {
      handleSwitchDeleteStatus();
    }
  }, [statusDelete, handleSwitchDeleteStatus]);

  console.log({ statusDelete });
  const currentData = useMemo(() => {
    if (data && data.length > 0 && !isFetching && !isLoading) {
      return data;
    }
    if (existingData?.length > 0 && !data) {
      return existingData;
    }
    return [];
  }, [existingData, data, isFetching, isLoading]);

  if (isLoading || isFetching) {
    return (
      <Container
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </Container>
    );
  }
  if (error && isError && existingData?.length === 0) {
    return (
      <Container
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <div>
          <p className="text-danger">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        </div>
        <Button className="btn btn-primary" onClick={refetch}>
          Refresh
        </Button>
      </Container>
    );
  }
  return (
    <Container>
      <AlertComponnent
        visible={showAlert}
        message={`Job with id ${job.id} Saved Successfully`}
      />

      <Modal
        show={confirmDelete}
        size="lg"
        onHide={() => {
          setConfirmDelete(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {"Are you sure you want to remove this Job From your list ?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{"Confirm removal"}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            style={{
              minWidth: 150,
              minHeight: 50,
            }}
            onClick={handleRemoveFromList}
          >
            {statusDelete === "pending" ? <Spinner /> : "Delete"}
          </Button>

          <Button
            style={{
              minWidth: 150,
              minHeight: 50,
            }}
            className="btn btn-secondary"
            onClick={() => {
              setConfirmDelete(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDetails}
        size="lg"
        onHide={handleCloseDetails}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {job.title.toUpperCase()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{"Job Details".toLowerCase()}</h4>
          <p>{job.content}</p>
          <p>{formatDate(job.createdAt)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            style={{
              minWidth: 150,
              minHeight: 50,
            }}
            onClick={handleSaveJob}
          >
            {status === "pending" ? <Spinner /> : "Save for Later"}
          </Button>

          <Button
            style={{
              minWidth: 150,
              minHeight: 50,
            }}
            className="btn btn-secondary"
            onClick={handleCloseDetails}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {currentData && currentData?.length > 0 && (
        <Container>
          <Row>
            {currentData.map((item, index) => (
              <Col
                key={index}
                style={{
                  padding: 15,
                }}
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Card className="card-hover">
                  <Card.Body>
                    <Card.Title
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{item.title}</div>
                      <Button
                        onClick={() => {
                          setConfirmDelete(true);
                          setSelectedItem(item);
                        }}
                        className="btn btn-danger rounded-circle"
                        style={{
                          width: 25,
                          height: 25,
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        x
                      </Button>
                    </Card.Title>
                    <Card.Text>{item.content}</Card.Text>
                    <Card.Footer
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <small className="text-muted">
                        {formatDate(item.createdAt)}
                      </small>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          handleCheckDetails(item);
                        }}
                      >
                        Details
                      </Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};
