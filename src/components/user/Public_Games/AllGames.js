import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function AllGames() {
  return (

    <MDBContainer style={{marginTop:'30px',marginBottom:'30px'}}>  <MDBRow className='row-cols-1 row-cols-md-2 g-4'>
    <MDBCol>
      <MDBCard>
        <MDBCardImage
          src='/Image/bowling.png'
          alt='...'
          position='top'
        />
        <MDBCardBody>
          <MDBCardTitle>Bowling</MDBCardTitle>
          <MDBCardText>
            Try out this interactive 3D Bowling game, powered by spline!<br></br>
            <a target='_blank' href="https://my.spline.design/splinebowling-21feee9f567a1871db29f4c927ccdd1c/" class="btn btn-primary">Play</a>          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    {/* <MDBCol>
      <MDBCard>
        <MDBCardImage
          src='https://mdbootstrap.com/img/new/standard/city/042.webp'
          alt='...'
          position='top'
        />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            This is a longer card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol>
      <MDBCard>
        <MDBCardImage
          src='https://mdbootstrap.com/img/new/standard/city/043.webp'
          alt='...'
          position='top'
        />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            This is a longer card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol>
      <MDBCard>
        <MDBCardImage
          src='https://mdbootstrap.com/img/new/standard/city/044.webp'
          alt='...'
          position='top'
        />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            This is a longer card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol> */}
  </MDBRow></MDBContainer>
  
  );
}
