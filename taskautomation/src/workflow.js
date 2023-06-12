import {Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomePage() {
    return (

        <Container>
            <Row className="justify-content-center align-items-center" style={{height: '100vh'}}>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Workflows</Card.Title>
                            <Card.Text>
                                Record your income to track your budget
                            </Card.Text>
                            <Link to="/workflows" className="btn btn-primary">Go to Workflows</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Row>
        </Container>
)
    ;
}

export default HomePage