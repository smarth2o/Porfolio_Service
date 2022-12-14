import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";
import "../components.css"
function Awards({ portfolioOwnerId, isEditable }) {
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("award", portfolioOwnerId).then((res) => {
      if (!Array.isArray(res.data)) {
        console.log("res.data is not array");
        return;
      }
      setAwards(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <Card className="award-mvp">
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.awardId}
            award={award}
            setAwards={setAwards}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button variant="outline-success" onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
