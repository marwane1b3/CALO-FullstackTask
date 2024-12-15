import React from "react";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./HeaderLayout.css";
import { useGetSavedJobs } from "src/hooks/query/useGetSavedJobs";

export const HeaderLayout = () => {
  const location = useLocation();

  const isActive = (path = "") => location.pathname === path;
  const isIntroPage = Boolean(location.pathname === "/");

  const { data } = useGetSavedJobs();
  console.log({ savedJobs: data });
  return (
    <div className="app-container d-flex flex-column">
      <Navbar expand="lg" className="navbar-black" fixed="top">
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              className={`btn btn-link custom-link fw-bold ${
                isActive("/") ? "text-primary active-link" : "text-secondary"
              }`}
            >
              ProWork
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "white",
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-4">
              <Link
                to="/home"
                className={`btn btn-link custom-link fw-bold ${
                  isActive("/home")
                    ? "text-primary active-link"
                    : "text-secondary"
                }`}
              >
                Home Jobs
              </Link>
              <Link
                to="/new"
                className={`btn btn-link custom-link fw-bold ${
                  isActive("/new")
                    ? "text-primary active-link"
                    : "text-secondary"
                }`}
              >
                Create New Job
              </Link>

              <Link
                to="/saved"
                style={{ position: "relative" }}
                className={`btn btn-link custom-link fw-bold ${
                  isActive("/saved")
                    ? "text-primary active-link"
                    : "text-secondary"
                }`}
              >
                Saved Jobs
                {data && data.length > 0 && (
                  <Badge
                    style={{ position: "absolute", top: 0, right: -10 }}
                    bg="danger"
                  >
                    {data.length}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          display: "flex",
        }}
        className={
          isIntroPage
            ? "overflow-hidden"
            : "flex-grow-1 overflow-auto mt-5 pt-3"
        }
      >
        <Outlet />
      </div>
    </div>
  );
};
