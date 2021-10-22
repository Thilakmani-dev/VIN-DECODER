import {useState} from 'react';
import axios from 'axios';
import './LoginPage.css';
import { Container, Button, Row,Col, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { setUserSession } from '../utils/common';
const LoginPage = (props) =>{
    const [user,setUser] = useState('');
    const [password,setpassword] = useState('');
    const [error,setError] = useState('');
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let formattedData = {
            user:user,
            password:password
        }
        try{
          let res = await axios.post('/users',formattedData);
          if(res.data.authenticated){
            setUserSession(res.data.userName)
            // sessionStorage.setItem("CurrentUser",JSON.stringify(res));
              //let's replace the route to home screen using usehistory;
              props.history.push('/home')
              setError('')
          }
          else if(!res.data.authenticated){
            setError("User Not Authorized!")
          }
          else{
            setError('Something Went Wrong!, Try Again.....')
          }
          setUser('');
          setpassword('');
          console.log(res);
        }
        catch(err){
          console.log(err);
          setError('Server is not running');
        }
    }
    return (
      <Container>
        <h2>LOGIN PAGE</h2>
        <h3>Test account - User Name: test, Password : test</h3>
        <form onSubmit={handleOnSubmit} className="container">
        <div className="form-group row">
          <Form.Control className="input" type="text" placeholder="User Name" value={user || ''} onChange={(e)=>setUser(e.target.value)}/>
        </div>
        <div className="form-group row">
          <Form.Control className="input" type="password" placeholder="Password" value={password || ''} onChange={(e)=>setpassword(e.target.value)}/>
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <div className="form-group row">
          <Button type="submit">
            Log In
          </Button>
        </div>
      </form>
      </Container>
    )
}
export default LoginPage;