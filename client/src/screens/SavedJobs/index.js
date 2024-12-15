import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap/";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "src/hooks/constants";
import { useGetSavedJobs } from "src/hooks/query/useGetSavedJobs";
import { formatDate, getItem, storeItem } from "src/utils";
const SavedJobs = () => {
  const { data, isLoading, isFetching } = useGetSavedJobs();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    content: "",
    title: "",
    createdAt: "",
  });
  const handleDetails = (
    job = { id: 0, content: "", title: "", createdAt: "" }
  ) => {
    navigate(`/job/${job.id}`);
  };

  const queryClient = useQueryClient();
  const handleRemoveFromList = () => {
    const list = getItem(queryKeys.SAVED_JOBS) ?? [];
    list.length > 0 &&
      storeItem(
        queryKeys.SAVED_JOBS,
        JSON.stringify(list.filter((el) => el.id !== selectedItem.id))
      );
    queryClient.invalidateQueries({ queryKey: [queryKeys.SAVED_JOBS] });
    setConfirmDelete(!confirmDelete);
  };
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
  return (
    <div
      style={{ marginBlock: 15, width: "100%", paddingInline: 15, flexGrow: 1 }}
    >
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
            {"Delete"}
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
      <Row
        style={{
          flexDirection: "row",
        }}
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <Col
              key={index}
              style={{
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              md={12}
            >
              <Card className="card-hover  col-9 col-lg-6">
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Title>{item.title}</Card.Title>
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
                  </div>
                  <Card.Text>{item.content}</Card.Text>
                  <Card.Footer className="d-flex justify-content-between align-items-center flex-row">
                    <small className="text-muted">
                      {formatDate(item.createdAt)}
                    </small>
                    <Button
                      onClick={() => {
                        handleDetails(item);
                      }}
                      className="btn btn-primary"
                    >
                      Details
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default SavedJobs;
