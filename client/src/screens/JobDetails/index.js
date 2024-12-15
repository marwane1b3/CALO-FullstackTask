import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetJobById } from "src/hooks/query/useGetJobById";
import { formatDate } from "src/utils";

const JobDetails = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const handleSoonFeature = () => {
    setShow(true);
  };
  const { data, isFetching, isLoading, isError, error } = useGetJobById({
    id: params?.id ? params.id : 0,
  });

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

  if (error && isError) {
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
      </Container>
    );
  }
  return (
    <div
      style={{ marginBlock: 15, width: "100%", paddingInline: 15, flexGrow: 1 }}
    >
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>Feature in progress</Modal.Header>
        <Modal.Body>{"NEXT TIME MAYBE ..."}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShow(false);
            }}
            className="btn btn-primary"
          >
            Close me
          </Button>
        </Modal.Footer>
      </Modal>
      <Row
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {data && (
          <Col
            style={{
              padding: 15,
              width: "80%",
            }}
            md={12}
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{data?.title}</h5>
                <p className="card-text">{data?.content}</p>
                <p className="card-text">{formatDate(data?.createdAt)}</p>
                <div
                  className="card-footer d-flex justify-content-center align-items-center"
                  style={{
                    gap: 15,
                  }}
                >
                  <Button
                    className="btn btn-primary"
                    onClick={handleSoonFeature}
                  >
                    Apply First
                  </Button>
                  <Button
                    className="btn btn-secondary"
                    onClick={handleSoonFeature}
                  >
                    Contact Owner
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default JobDetails;
