import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Secondary_Header from "./Secondary_Header";
import "../Css/Upcomming_Matches.css"
import { Link } from 'react-router-dom';
import axios from "axios";

function Upcomming_Matches(props) {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(5);

    let curr_date;
    let curr_month;
    let i = 0;

    useEffect(async () => {
        // if(localStorage.getItem('matches')){
        //     setData(JSON.parse(localStorage.getItem('matches'))) 
        //     console.log("csvsdbv",data);
        // }

        await fetch('/api/values/upcomingMatches')
            .then((res)=>res.json())
            .then(res=>{
                setData(res.AllMatch)
                console.log(res.AllMatch)
                const temp = [].concat(data).sort((a,b)=> a.Matchtime > b.Matchtime ? 1 : -1);
        console.log(temp)
            })
            .catch(err=>console.log(err))
        ;
    }

    
    , []);


    const date = new Date();

    curr_date = date.getDate();
    console.log("Today's date is :- ", (curr_date));  //21

    curr_month = date.toLocaleString('en-us', { month: 'short' });  //'Mar'
    console.log("Curr Month is :- ", curr_month);

    const getFormattedDate = (str) => {
        i += 1;   //puspose to set that if i.val > 0 then today is atlist one match otherwise not.   & by val of i we can find out the total no of matches held on today 
        return str
    }

    console.log("data ", data);

    return (
        <div>
            <Secondary_Header />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='justify-items-center'>
                            {data.slice(0, visible).map((obj, index) => {
                                if (Number(obj.Matchtime.split('-')[0]) <= curr_date && obj.Matchtime.split('-')[1] === curr_month) {
                                    return null
                                }
                                else {
                                    return (
                                        <div key={index} className="CurrentMatch__Card">
                                            <Link to="/match-score/${match_id}" className='text-decoration-none text-muted'>
                                                <div key={index}>
                                                    <Card className='mt-2 CurrentMatch__Card' style={{ boxShadow: "3px 6px 3px #ccc" }}>
                                                        <Container>
                                                            <Card.Text className='mb-1 mt-1'> {getFormattedDate(obj.Matchtime)} </Card.Text>
                                                            <hr className='m-0' />
                                                            <Card.Body className='p-0 pt-2 pb-2'>
                                                                <div className='d-flex CurrMatch__name'>
                                                                    <div className='d-flex CurrMatch__team1'>
                                                                        {/* <Card.Text className='CurrMatch__team1__img'>{obj.matchInfo[0].team1.imageId}</Card.Text> */}
                                                                        <Card.Title>{obj.TeamA}</Card.Title>
                                                                    </div>
                                                                    <Card.Title>VS</Card.Title>
                                                                    <div className='d-flex'>
                                                                        {/* <Card.Text className='CurrMatch__team2__img'>{obj.matchInfo[0].team1.imageId}</Card.Text> */}
                                                                        <Card.Title>{obj.TeamB}</Card.Title>
                                                                    </div>
                                                                </div>
                                                                <hr className='m-0 mb-2' />
                                                                <Card.Text>{obj.Venue}</Card.Text>
                                                            </Card.Body>
                                                        </Container>
                                                    </Card>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }


                            })}
                            {i === 0 && <h4>Today isn't any match</h4>}
                        </div>
                        <div className='d-flex justify-content-center'>
                            {visible < data.length && (
                                <button className='loadMore__btn1 d-flex justify-content-center' onClick={() => setVisible(visible + 5)}>Load More Matches</button>
                            )}
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

export default Upcomming_Matches;