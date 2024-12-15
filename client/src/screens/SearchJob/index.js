import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useDebounce } from "src/hooks/custom/useDebounce";
import { useSearchJob } from "src/hooks/query/useSearchJob";
const SearchJob = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearch = useDebounce(searchQuery, 500);
  console.log({ debounceSearch });
  const { data: results, error } = useSearchJob({ query: debounceSearch });
  return (
    <Container fluid className="p-4 bg-light">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="mb-4 text-center">Find Your Dream Job</h1>
          <InputGroup className="mb-3">
            <FormControl
              value={searchQuery}
              placeholder="Search for jobs..."
              aria-label="Search for jobs"
              aria-describedby="search-button"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button variant="primary" id="search-button">
              <i className="bi bi-search"></i> Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      {error && <p className="text-danger">{error}</p>}
      <ListGroup style={{ gap: 15 }}>
        {results &&
          results?.length > 0 &&
          results.concat(results, results, results).map((job) => (
            <ListGroup.Item key={job.id}>
              <h5>{job.title}</h5>
              <p>{job.content}</p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
};

export default SearchJob;
