import React from "react";
import { useState } from "react";
import { Container, Row, Col, Navbar, Nav, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "../features/authSlice";
import Swal from "sweetalert2";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    Swal.fire({
      title: "Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
      }
    });
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          {/* Navbar */}
          <Col xs={12}>
            <Navbar expand="md" className="justify-content-between">
              <Navbar.Brand href="/dashboard" className="fw-bold fs-1">
                Dashboard
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="navbar-nav"
                onClick={handleSidebarToggle}
              />
              <Navbar.Collapse id="navbar-nav">
                <Nav>
                  {isSidebarOpen && (
                    <ListGroup className="mt-2">
                      {/* Sidebar content */}
                      <ListGroup.Item action href="/dashboard/events">
                        Events
                      </ListGroup.Item>
                      {user && user.role === "admin" && (
                        <div>
                          <ListGroup.Item action href="/dashboard/users">
                            Users
                          </ListGroup.Item>
                        </div>
                      )}
                      <ListGroup.Item action onClick={logout}>
                        Logout
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          {/* Navbar */}

          {/* Sidebar */}
          <Col
            xs={12}
            md={3}
            lg={2}
            className={`sidebar ${
              isSidebarOpen ? "open" : ""
            } d-none d-md-block`}
          >
            <ListGroup className="mt-2">
              {/* Sidebar content */}
              <ListGroup.Item action href="/dashboard/events">
                Events
              </ListGroup.Item>
              {user && user.role === "admin" && (
                <div>
                  <ListGroup.Item action href="/dashboard/users">
                    Users
                  </ListGroup.Item>
                </div>
              )}
              <ListGroup.Item action onClick={logout}>
                Logout
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {/* Sidebar */}

          {/* Main content */}
          <Col xs={12} md={9} lg={10} className="main-content mt-3">
            <Container fluid>
              <main>{children}</main>
              {/* Content goes here */}
            </Container>
          </Col>
          {/* Main content */}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
