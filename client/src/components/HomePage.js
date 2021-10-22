import { useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal'
import { getUser, removeUserSession } from '../utils/common';
// import { Table,Th,Tr,Td,Ul,Li } from './Components';
import { connect } from 'react-redux';
import { addData } from '../redux/actions';
import {Container,Button,Table,ListGroup,Row,Col,Form,Navbar,Nav,NavDropdown,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const HomePage = (props) => {
  //example vin number - 19UUB1F53FA830092
    console.log(props);
    const [vinNumber,setvinNumber] = useState('');
    const [result,setResult] = useState([]);
    const [vinDetails, setvinDetails] = useState({
      "Manufacture":"-",
      "Make":"-",
      "Model":"-",
      "Year":"-",
    })
    const [isModalopen,setIsModalOpen] = useState(false);
    const [selectedVin,setSelectedVin] = useState('');
    const [selectedManufacture, setSelectedManufacture] = useState("");
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [loading, setloading] = useState(false);
    const searchVinDetails = (e) => {
        e.preventDefault();
        setloading(true);
        console.log('api call to fetch vin details');
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vinNumber}/?format=json`).then(res=>{console.log(res);setloading(false);setResult(res);setTableValues(res)}).catch((err)=>console.log(err));
    }
    const handleLogout = (e) => {
        removeUserSession();
        props.history.replace('/login')
    }
    const handleSet = (val) => {
      setIsModalOpen(true);
      setSelectedVin(val.id);
      setSelectedManufacture(val.Manufacture);
      setSelectedMake(val.Make);
      setSelectedModel(val.Model);
      setSelectedYear(val.Year);
    }
    const setTableValues = (result) => {
        let tempobject = {
            "Manufacture":result.data.Results[7].Value,
            "Make":result.data.Results[6].Value,
            "Model":result.data.Results[8].Value,
            "Year":result.data.Results[9].Value,
        }
        let tempSetObject = {
          ...tempobject,
          id:result.data.SearchCriteria,
          key:props.requests.length+1
        }
        setvinDetails(tempobject)
        props.addData(tempSetObject);
    }
    // let authorized = props.location.state.authorized;
    // if(!authorized){
    //     return <Redirect to="/login" />
    // }
    return (
      <>
      <Navbar bg="dark" variant="dark"  className="justify-content-around px-5">
      <Navbar.Brand href="#home">VIN DECODER</Navbar.Brand>
      <Nav>
        <NavDropdown title="Profile" id="basic-nav-dropdown">
          <NavDropdown.Item>{getUser().toUpperCase()}</NavDropdown.Item>
          <NavDropdown.Item><Button onClick={handleLogout}>Logout</Button></NavDropdown.Item>
        </NavDropdown>
        </Nav>
        </Navbar>
        <Container> 
          <Modal 
          isOpen={isModalopen}
          onRequestClose = {()=>setIsModalOpen(false)}
          style={{
            overlay:{background:'grey'},
            content:{color:'blue'}
          }}>
          <h2>VIN DETAIILS FOR VIN NUMBER - {selectedVin}</h2>
          <Table striped bordered hover className="my-1"> 
                <thead>
                    <tr>
                    <th>Manufacturer Name</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{selectedManufacture}</td>
                    <td>{selectedMake}</td>
                    <td>{selectedModel}</td>
                    <td>{selectedYear}</td>
                </tr>
                </tbody>
            </Table>
            <Row className="justify-content-center"><Col sm="6" md="4"><Button onClick={()=>setIsModalOpen(false)}>Close</Button></Col></Row>
      </Modal>
      <Row><h1>Welcome to Vin Decoder Application</h1></Row>
        <form onSubmit={searchVinDetails}>
          <Row>
            <Col sm="10"><Form.Control type="text" value={vinNumber} onChange={(e)=>{setvinNumber(e.target.value)}} placeholder="Enter VIN to search"/></Col>
            <Col sm="2"><Button type="submit">Find</Button></Col>
          </Row>
          {
            loading ? <Row className="justify-content-center"><Col sm="3"><Spinner animation="border" /></Col></Row> : null
          }
        </form>
        <Table striped bordered hover className="my-1"> 
                <thead>
                    <tr>
                    <th>Manufacturer Name</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
              <td>{vinDetails.Manufacture}</td>
              <td>{vinDetails.Make}</td>
              <td>{vinDetails.Model}</td>
              <td>{vinDetails.Year}</td>
                </tr>
                </tbody>
            </Table>
            <br/>
            <p>Example VIN Numbers - 19UUB1F53FA830092</p>
            <h3>Recent Searches</h3>
            <div style={{width:'400px',padding:'20px',margin:'20px auto'}}>
            <ListGroup>
              {
                props.requests.map((val,index)=>(<ListGroup.Item key={index}><a style={{textDecoration:'none'}} onClick={(e)=>{handleSet(val)}}>{val.id}</a></ListGroup.Item>))
              }
            </ListGroup>
            </div>
        <footer>Application Developed By Thilak Mani B</footer>
    </Container></>)
}
const mapStateToProps = (state) => {
  return {
    requests:state.requests && state.requests.allRequests
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData:(request)=>{dispatch(addData(request))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);