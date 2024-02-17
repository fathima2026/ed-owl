import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const FooterComponent = () => {
  return (
    <MDBFooter color='white' bgColor='dark' className='text-center text-lg-start'>
    <section className='d-flex justify-content-center justify-content-lg-between p-3 border-bottom'>
      <div className='me-5 d-none d-lg-block mt-2'>
        <span style={{fontSize:'20px',paddingTop:'15px'}}>Get connected with us on social networks:</span>
      </div>

      <div>
      <MDBBtn outline color="#55acee" floating className='m-2' href='#!' role='button'style={{ backgroundColor: '#55acee' }}>
          <MDBIcon fab icon="facebook-f" />
      </MDBBtn>
      <MDBBtn outline color="#55acee" floating className='m-2' href='#!' role='button'style={{ backgroundColor: '#55acee' }}>
      <MDBIcon fab icon='twitter' />
    </MDBBtn>

    <MDBBtn outline color="#dd4b39" floating className='m-2' href='#!' role='button' style={{ backgroundColor: '#dd4b39' }}>
      <MDBIcon fab icon='google' />
    </MDBBtn>
    <MDBBtn outline color="#ac2bac" floating className='m-2' href='#!' role='button' style={{ backgroundColor: '#ac2bac' }}>
      <MDBIcon fab icon='instagram' />
    </MDBBtn>

    <MDBBtn outline color="#0082ca" floating className='m-2' href='#!' role='button'style={{ backgroundColor: '#0082ca' }}>
      <MDBIcon fab icon='linkedin-in' />
    </MDBBtn>

    <MDBBtn outline color="light" floating className='m-2' href='#!' role='button'style={{ backgroundColor: '#333333' }}>
      <MDBIcon fab icon='github' />
    </MDBBtn>
      </div>
    </section>

    <section>
      <MDBContainer className='text-center text-md-start mt-5' style={{marginLeft:'80px'}}>
        <MDBRow className='mt-3'>
          <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>
              <MDBIcon icon="gem" className="me-3" />
              ED OWL
            </h6>
            <p>
            The project is led by Nurun Nahar, an Assistant Teaching Professor based at the University of Bolton’s Institute of Management and funded under the Jenkinson Scheme.


            </p>
          </MDBCol>
          <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
            <p>
              <a href='#!' className='text-reset'>
               Help
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                More Information
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Terms and Conditions
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
              Dashboard
              </a>
            </p>
          </MDBCol>

          <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
            <p>
              <MDBIcon icon="home" className="me-2" />
              University of Bolton, Deane Road, Bolton. BL3 5AB
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              Enquiries@bolton.ac.uk
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" /> +44 (0)1204 900 600
            </p>
            <p>
              <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
            </p>
          </MDBCol>
          <MDBCol style={{paddingLeft:'40px'}}>
          <div className='ratio ratio-16x9'>
          <iframe
            className='shadow-1-strong rounded'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.0795543649256!2d-2.438796523841153!3d53.5741967723562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba7add9a0139b%3A0x26e04dfac5ed4688!2sUniversity%20of%20Bolton!5e0!3m2!1sen!2sbd!4v1703538014283!5m2!1sen!2sbd'
            title='YouTube video'
            allowFullScreen
            data-gtm-yt-inspected-2340190_699='true'
            id='388567449'
          ></iframe>
        </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      © 2021 Copyright:
      <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
        MDBootstrap.com
      </a>
    </div>
  </MDBFooter>
);
  
}

export default FooterComponent