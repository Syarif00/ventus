import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FormAddEvent = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [start_registration, setStart_registration] = useState("");
  const [end_registration, setEnd_registration] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [link_registration, setLink_registration] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(
          `https://ventus.up.railway.app/api/dashboard/${id}`
        );
        setTitle(response.data.title);
        setDesc(response.data.desc);
        setDate(response.data.date);
        setTime(response.data.time);
        setStart_registration(response.data.start_registration);
        setEnd_registration(response.data.end_registration);
        setLocation(response.data.location);
        setPrice(response.data.price);
        setLink_registration(response.data.link_registration);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getEventById();
  }, [id]);

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://ventus.up.railway.app/api/dashboard/${id}`, {
        title: title,
        desc: desc,
        image: image,
        date: date,
        time: time,
        start_registration: start_registration,
        end_registration: end_registration,
        location: location,
        price: price,
        link_registration: link_registration,
      });
      navigate("/dashboard/events");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <h1> Edit Event</h1>
      <div className="">
        <Form className="mt-3" onSubmit={updateEvent}>
          <p className="text-danger text-center"> {msg} </p>
          <Form.Group className="mb-2 was-validated">
            <Form.Label>Title</Form.Label>
            <Form.Group className="mb-3 was-validated">
              <Form.Control
                type="text"
                placeholder="Enter your Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Label className="mb-2">Description</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter your Desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="mb-2"
            />

            <Form.Label className="mb-2">Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter your Password"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mb-2"
            />
            <Row>
              <Col>
                <Form.Label>date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your Password"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter your Password"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mb-2"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>start_registration</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your Password"
                  required
                  value={start_registration}
                  className="mb-2"
                  onChange={(e) => setStart_registration(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>end_registration</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your Password"
                  required
                  value={end_registration}
                  className="mb-2"
                  onChange={(e) => setEnd_registration(e.target.value)}
                />
              </Col>
            </Row>
            <Form.Label>location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Jakarta / Online"
              required
              value={location}
              className="mb-2"
              onChange={(e) => setLocation(e.target.value)}
            />
            <Row>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="price"
                  placeholder="Enter your Password"
                  required
                  value={price}
                  className="mb-2"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Link Registrasi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Password"
                  required
                  value={link_registration}
                  className="mb-2"
                  onChange={(e) => setLink_registration(e.target.value)}
                />
              </Col>
            </Row>

            <Button variant="dark" type="submit" className="button btn  mt-3">
              Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default FormAddEvent;
