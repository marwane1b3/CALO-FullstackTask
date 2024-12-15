import { Row, Col, Container } from "react-bootstrap";
import "./styles.css";
import { Link } from "react-router-dom";
export const VerticalStack = () => {
  return (
    <Container style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <Row className="g-3">
        <Link to="/new" className="link">
          <Col xs={12} sm={4} className="action-item create-job">
            Create a job!
          </Col>
        </Link>
      </Row>
      <Row className="g-3">
        <Link to="/search" className="link">
          <Col xs={12} sm={4} className="action-item search-job">
            Search for a job
          </Col>
        </Link>
      </Row>

      <Row className="g-3">
        <Link to="/home" className="link">
          <Col xs={12} sm={4} className="action-item recent-jobs">
            See recent Jobs
          </Col>
        </Link>
      </Row>
    </Container>
  );
};
