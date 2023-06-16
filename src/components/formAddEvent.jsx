import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://ventus.up.railway.app/dashboard", {
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
      },{
        withCredentials: true,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menambahkan Event",
      }).then(() => {
        navigate("/dashboard/events");
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Gagal membuat event",
          text: error.response.data.message,
        });
      }
    }
  };

  return (
    <div>
      <h1> Add Event</h1>
      <div className="">
        <Form className="mt-3" onSubmit={handleSubmit}>
          <p className="text-danger text-center"> {msg} </p>

          <Form.Group className="mb-4 was-validated">
            <Form.Label>title</Form.Label>
            <Form.Group className="mb-2 was-validated">
              <Form.Control
                type="text"
                placeholder="Enter your Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Label>desc</Form.Label>

            <Form.Control
              type="text"
              placeholder="Deskripsi"
              value={desc}
              className="mb-2"
              required
              onChange={(e) => setDesc(e.target.value)}
            />

            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter your Password"
              value={image}
              required
              className="mb-2"
              onChange={(e) => setImage(e.target.value)}
            />

            <Row>
              <Col>
                <Form.Label>Tanggal Acara</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your Password"
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>time</Form.Label>
                <Form.Control
                  type="time"
                  required
                  placeholder="Enter your Password"
                  value={time}
                  className="mb-2"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Awal Pendaftaran</Form.Label>
                <Form.Control
                  type="date"
                  required
                  className="mb-2"
                  placeholder="Enter your Password"
                  value={start_registration}
                  onChange={(e) => setStart_registration(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Akhir Pendaftaran</Form.Label>
                <Form.Control
                  type="date"
                  required
                  className="mb-2"
                  placeholder="Enter your Password"
                  value={end_registration}
                  onChange={(e) => setEnd_registration(e.target.value)}
                />
              </Col>
            </Row>
            <Form.Label>location</Form.Label>
            <Form.Control
              type="text"
              required
              className="mb-2"
              placeholder="Ex. Jakarta/Online"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Row>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  required
                  className="mb-2"
                  placeholder="Ex. 0 / 100000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Link Registrasi</Form.Label>
                <Form.Control
                  type="text"
                  required
                  className="mb-2"
                  placeholder="Enter your Password"
                  value={link_registration}
                  onChange={(e) => setLink_registration(e.target.value)}
                />
              </Col>
            </Row>

            <Button variant="dark" type="submit" className="button btn  mt-3">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default FormAddEvent;
