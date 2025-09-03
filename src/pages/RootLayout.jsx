import { Outlet, useLocation } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

const RootLayout = () => {
  const location = useLocation();
   const hideLayout =
     location.pathname === "/SignUp" || location.pathname === "/login"; 
     
  return (
    <Container>
      {!hideLayout && <Header />}
      <Row>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: hideLayout ? null : 8, offset: hideLayout ? null : 2 }}
        >
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default RootLayout;
