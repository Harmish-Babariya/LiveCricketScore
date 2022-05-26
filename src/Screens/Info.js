import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';
import "../Css/Info.css"

function Info(props) {

    const [allMatchData, setAllMatchData] = useState([]);

    useEffect(async () => {
        await fetch('api/values/LiveLine')
            .then(res => res.json())
            .then(res => {
                setAllMatchData(res)
                // console.log("allMAtchData array :- ",allMatchData);
                // console.log((allMatchData[0].jsondata));
            }).catch(err => console.log(err.message))

        // console.log(allMatchData[0].jsondata.TeamABanner);
    }, [])

    return (
         <Container>
        <div>
            <Match_Score_Sec_Header />
            {allMatchData && allMatchData.filter((obj) => {
                // console.log("obj ",obj.jsondata.MatchId);
                console.log("obj", obj);
                return Number(obj.MatchId) === 7786
            }).map((obj, index) => {
                let title;
                if(obj.jsondata.title){
                    title = JSON.parse(obj.jsondata).jsondata.title.split('\n')[10].substring(7)
                    console.log("objvsvsvvvfvs :- ", title);
                }

                return (
                    <Row>
                        <Col xm={12} md={8} >
                            <div>
                                <div className='d-flex'>
                                    <p className='info__title'>Match :- </p>
                                    <p>{obj.TeamA} vs {obj.TeamB}</p>
                                </div>
                                <div className='d-flex'>
                                    <p className='info__title'>Date :- </p>
                                    <p>{obj.MatchDate}</p>
                                </div>
                                <div className='d-flex'>
                                    <p className='info__title'>Toss :- </p>
                                    {title? <p>{title}</p> : <p>Not Due</p>}
                                </div>
                                <div className='d-flex'>
                                    <p className='info__title'>Time :- </p>
                                    <p>{obj.Matchtime.split('at ')[1]}</p>
                                </div>
                                <div className='d-flex'>
                                    <p className='info__title'>Venue :- </p>
                                    <p>{obj.venue}</p>
                                </div>
                            </div>
                        </Col>
                        <Col xm={12} md={4} >
                            <p>Advertisement</p>
                        </Col>
                    </Row>
                )
            })}
        </div>
           </Container> 
    );
}

export default Info;