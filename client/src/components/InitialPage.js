import { Container, Button, Row,Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
const InitialPage = (props) => {
    return (
        <Container>
            <h2>VIN DECODER APPLICATION</h2>
            <p>GO TO LOGIN PAGE TO USE THE APPLICATION</p>
            <Row className="justify-content-md-center"><Col sm="6" md="4"><Link to="/login"><Button>Log In</Button></Link></Col></Row>
        </Container>
    )
}

export default InitialPage