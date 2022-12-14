import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import "../components.css"
function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("project", portfolioOwnerId).then((res) => {
      if (!Array.isArray(res.data)) {
        console.log("res.data is not array");
        return;
      }

      setProjects(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <Card className="project-mvp">
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projects.map((project) => (
          <Project
            key={project.projId}
            project={project}
            isEditable={isEditable}
            setProjects={setProjects}
          />
        ))}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
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

export default Projects;
