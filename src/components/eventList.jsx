import React, { useState, useEffect } from "react";
import { Table, Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFreeEvents, setShowFreeEvents] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const eventsPerPage = 5;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const response = await axios.get(
      "https://ventus.up.railway.app/api/dashboard"
    );
    setEvents(response.data);
  };

  const deleteEvent = async (id) => {
    const result = await Swal.fire({
      title: "Anda yakin ingin menghapus event ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      await axios.delete(`https://ventus.up.railway.app/api/dashboard/${id}`, {
        withCredentials: true,
      });
      getEvents();
    }
  };

  const filteredEvents = showFreeEvents
    ? events.filter((event) => event.price === 0)
    : events;

  const searchedEvents = filteredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = searchedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterToggle = () => {
    setShowFreeEvents(!showFreeEvents);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Container fluid>
      <h1> Events</h1>
      <p className="fs-4">List of events</p>
      <Row>
        <Col>
          <Link className="btn btn-success btn-md" to="/dashboard/events/add">
            {" "}
            Add Event
          </Link>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Check
        type="checkbox"
        id="filterCheckbox"
        label="Show Free Events"
        checked={showFreeEvents}
        onChange={handleFilterToggle}
        className="mb-3 mt-3"
      />

      <Table responsive>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Event</th>
            <th scope="col">Price</th>
            <th scope="col">Created By</th>
            <th className="text-center" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event, index) => (
            <tr key={event.id_event}>
              <td>{index + 1}</td>
              <td>{event.title}</td>
              <td>{event.price}</td>
              <td></td>
              <td className="text-center">
                <Link
                  to={`/dashboard/events/edit/${event.id_event}`}
                  className="btn"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEvent(event.id_event)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default EventList;
