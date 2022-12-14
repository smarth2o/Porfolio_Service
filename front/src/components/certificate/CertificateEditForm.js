import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertiEditForm({ currentcertificate, setIsEditing, setCertificates }) {
  const [certiForm, setCertiForm] = useState({
    certiId: currentcertificate.certiId,
    certiTitle: currentcertificate.certiTitle,
    certiDetail: currentcertificate.certiDetail,
    certiDate: new Date(currentcertificate.certiDate),
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setCertiForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleDataChange = (date) => {
    setCertiForm((prev) => ({
      ...prev,
      certiDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = currentcertificate.id;
    try {
      await Api.put(`certi/${currentcertificate.certiId}`, {
        id,
        ...certiForm,
      });
      const certi = {
        id: id,
        certiId: certiForm.certiId,
        certiTitle: certiForm.certiTitle,
        certiDetail: certiForm.certiDetail,
        certiDate: certiForm.certiDate.toISOString().split("T")[0],
      };
      setCertificates((prev) => {
        return prev.map((el) => {
          if (el.certiId === certi.certiId) return certi;
          else return el;
        });
      });
      setIsEditing((prev) => !prev);
    } catch (err) {
      console.log("편집에 실패하였습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateEditTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="자격증 이름"
          name="certiTitle"
          value={certiForm.certiTitle}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group controlId="certificateEditDetail" className="mb-3">
        <Form.Control
          type="detail"
          placeholder="세부사항"
          name="certiDetail"
          value={certiForm.certiDetail}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={certiForm.certiDate}
            onChange={handleDataChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
            className="edit-cancel-btn"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertiEditForm;
