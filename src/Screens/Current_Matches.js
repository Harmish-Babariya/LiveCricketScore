import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import "../Css/Current_Matches.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

function Current_Matches(props) {
    const [data1, setData1] = useState([]);
    const [visible, setVisible] = useState(5);
    const [upcomming_match, setUpcomming_Match] = useState([])
    const [active, setActive] = useState(false);
    const { id } = useParams();

    let curr_date;
    let curr_month;
    let i = 0;
    console.log("id ;- ", id);

    useEffect(async () => {

        await axios.get('api/values/LiveLine').then(res => {
            console.log("res :- ", res.data);
            setData1(res.data)
            // console.log("res data :- ", res.data.AllMatch.length)
        })
    }, []);


    let local_date = new Date();
    console.log("date ::---- ", local_date);

    curr_date = Number(moment(local_date).format('DD'));
    console.log("Today's date is :- ", (curr_date)) // Output: 21

    curr_month = moment(local_date).format('MMM');
    console.log("Curr Month is :- ", curr_month);


    const getFormattedDate = (str) => {
        i += 1;                  //puspose to set that if i.val > 0 then today is atlist one match otherwise not.   & by val of i we can find out the total no of matches held on today 
        console.log("date :- ", (str.split('-')[0]));
        return str ? str.split(' ')[0] : ''
    }

    console.table(data1);

    return (
        <div>
            <Secondary_Header />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='justify-items-center'>
                            {data1 &&
                                data1
                                    .filter((obj) => { return Number(obj.Matchtime.split('-')[0]) === curr_date && obj.Matchtime.split('-')[1] === curr_month })
                                    .map((obj, index) => {
                                        // let match_id = obj.MatchId
                                        // console.log("match id :- ",match_id);
                                        // console.log("match id :- ",obj.Matchtime.split(' '));
                                        console.log("obj venus is :- ", obj.venue);
                                        return (
                                            <div key={index} className="CurrentMatch__Card">
                                                {/* {'/match-score/'+match_id} */}
                                                <Link to='/match-score' className='text-decoration-none text-muted'>
                                                    <div key={index}>
                                                        {<Card onClick={() => setActive(true)} className='mt-2 CurrentMatch__Card' style={{ boxShadow: "3px 6px 3px #ccc" }}>
                                                            <Container>
                                                                <Card.Text className='mb-1 mt-1'> {getFormattedDate(obj.Matchtime)} : {obj.Matchtime.split(' ')[2].split('-')[0]} </Card.Text>
                                                                <hr className='m-0' />
                                                                <Card.Body className='p-0 pt-2 pb-2'>
                                                                    {/* <div className='d-flex CurrMatch__name'> */}
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                                <div className='d-flex CurrMatch__team1 align-items-center'>
                                                                                    <img className='mb-2 CurrMatch__team1__img' variant="top" height="60px" src={`http://cricnet.co.in/ManagePlaying/TeamImages/thumb/${obj.TeamAImage}`} />
                                                                                    <Card.Title>{obj.TeamA}</Card.Title>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs={2}>                                                                           
                                                                                <div className=' align-items-center'>
                                                                                    <Card.Title>VS</Card.Title>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs={5}>
                                                                                <div className='d-flex align-items-center'>
                                                                                    <img variant="top" className='mb-2' height="60px" src={`http://cricnet.co.in/ManagePlaying/TeamImages/thumb/${obj.TeamBImage}`} />
                                                                                    <Card.Title>{obj.TeamB}</Card.Title>
                                                                                </div>                                                                            
                                                                            </Col>
                                                                        </Row>
                                                                    {/* </div> */}
                                                                    <hr className='m-0 mb-2' />
                                                                    <Card.Text>{obj.venue}</Card.Text>
                                                                </Card.Body>
                                                            </Container>
                                                        </Card>}
                                                    </div>
                                                </Link>
                                            </div>
                                        )

                                    })}
                            {i === 0 && <h4>Today isn't any match</h4>}
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        advertisement
                    </Col>
                </Row>
            </Container>
        </div>

    );

}

// export const     
export default Current_Matches;
