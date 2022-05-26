import React from 'react';
import { Container } from 'react-bootstrap';

function Match_Score_Sec_Header(props) {
    return (
        <Container>
            <div className='d-flex home '>
                <a href="/match-score" className='mb-0 text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>ScoreBord</p>
                </a>
                <a href="/info" className='text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>Info</p>
                </a>
                <a href="#" className='text-normal text-decoration-none text-muted'>
                    <p className='Secondary_header'>States</p>
                </a>
            </div>
            <hr className='mt-0' />
        </Container>
    );
}

export default Match_Score_Sec_Header;