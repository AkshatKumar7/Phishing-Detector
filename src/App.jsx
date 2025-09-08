import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Logo upload states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState(null);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-primary">
            🔒 Detect Phishing
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => setActiveTab("home")}>Home</Nav.Link>
              <Nav.Link onClick={() => setActiveTab("url")}>URL Check</Nav.Link>
              <Nav.Link onClick={() => setActiveTab("logo")}>Logo Check</Nav.Link>
              <Nav.Link onClick={() => setActiveTab("history")}>History</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="flex-grow-1 py-5" style={{ marginTop: "5rem" }}>
        {/* Home */}
        {activeTab === "home" && (
          <div className="text-center">
            <h1 className="display-4 fw-bold text-primary mb-3">
              Stay Ahead of Phishing Threats
            </h1>
            <p className="lead text-muted mb-4">
              An online tool to detect phishing websites and fake logos. Protect
              yourself and your organization with instant checks.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setActiveTab("url")}
              >
                Try URL Check
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => setActiveTab("logo")}
              >
                Try Logo Check
              </Button>
            </div>
          </div>
        )}

        {/* URL Check */}
        {activeTab === "url" && (
          <Card className="shadow p-4">
            <Card.Body>
              <h2 className="fw-bold text-primary mb-3">
                Phishing URL Detection
              </h2>
              <p className="text-muted mb-4">
                Paste a URL below and our system will analyze it for phishing
                indicators.
              </p>
              <Form className="d-flex gap-3">
                <Form.Control type="text" placeholder="https://example.com" />
                <Button variant="primary">Analyze</Button>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Logo Check */}
        {activeTab === "logo" && (
          <Card className="shadow p-4">
            <Card.Body>
              <h2 className="fw-bold text-primary mb-3">
                Logo Authenticity Check
              </h2>
              <p className="text-muted mb-4">
                Upload a logo to verify if it’s genuine or a fraudulent copy.
              </p>
              <Row>
                <Col md={6} className="mb-3">
                  {/* Drag & Drop Zone */}
                  <div
                    className={`border border-2 rounded-3 d-flex flex-column justify-content-center align-items-center py-5 w-100 ${
                      isDragging
                        ? "border-primary bg-light"
                        : "border-dashed text-muted"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith("image/")) {
                        setUploadedLogo(URL.createObjectURL(file));
                      }
                    }}
                  >
                    <span className="fs-1 mb-2">📂</span>
                    <p className="text-center mb-0">
                      Drag & drop logo here <br /> or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="d-none"
                      id="logoUpload"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.startsWith("image/")) {
                          setUploadedLogo(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <label
                      htmlFor="logoUpload"
                      className="btn btn-outline-primary mt-3"
                    >
                      Browse
                    </label>
                  </div>
                </Col>

                {/* Preview Section */}
                <Col md={6}>
                  <Card className="bg-light border-0 shadow-sm h-100">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <h5 className="fw-bold text-secondary mb-3">Preview</h5>
                      {uploadedLogo ? (
                        <img
                          src={uploadedLogo}
                          alt="Uploaded logo"
                          className="img-fluid rounded shadow-sm"
                          style={{ maxHeight: "200px" }}
                        />
                      ) : (
                        <p className="text-muted">No logo uploaded yet.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button variant="primary" size="lg">
                  Check Logo
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* History */}
        {activeTab === "history" && (
          <Card className="shadow p-4">
            <Card.Body>
              <h2 className="fw-bold text-primary mb-3">History</h2>
              <p className="text-muted mb-3">
                Track your previous phishing checks here.
              </p>
              <div className="p-4 bg-light rounded">No history yet.</div>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-white text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Detect Phishing · Protecting users
          worldwide 🌍
        </small>
      </footer>
    </div>
  );
}
