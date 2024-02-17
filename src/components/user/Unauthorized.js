import { Link, useNavigate } from "react-router-dom"
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn,
    MDBContainer
  } from 'mdb-react-ui-kit';
const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const goGames = () => navigate('/games');

    return (
        // <div className="container" style={{height:'700px', backgroundColor:'white'}}>
        //     <div className="container" style={{height:'300px', backgroundColor:'#fde05c'}}>
        //     <h1>Unauthorized</h1>
        //     <br />
        //     <p>You do not have access to the requested page.</p>
        //     <div className="flexGrow">
        //         <button onClick={goBack}>Go Back</button>
        //     </div>
        //     </div>
           
        // </div>
       
        <MDBContainer breakpoint="md" fluid className="w-75 " style={{marginTop:'',height:'700px'}}>
              <MDBCard className="border-3"shadow='0' border='warning' background='white' alignment='center'  style={{marginTop:'200px'}}>
        <MDBCardHeader>Warning</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle>Unauthorized</MDBCardTitle>
          <MDBCardText>You do not have access to the requested page</MDBCardText>
          <MDBBtn color='warning' onClick={goBack}>Go Back</MDBBtn>
          <MDBCardText>Lets play some games till then!</MDBCardText>
          <MDBBtn color='success' onClick={goGames}>Yes!</MDBBtn>
          
        </MDBCardBody>
       
      </MDBCard>
        </MDBContainer>
      
    )
}

export default Unauthorized