import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../Css/ScoreBoard.css";
import { StateContext } from '../StateProvider';
import Match_Score_Sec_Header from './Match_Score_Sec_Header';


function Match_Score() {

    const { addPlayerData, bowlers } = useContext(StateContext);

    const [isbowlers, setIsBowlers] = useState(true);
    const [allMatchData, setAllMatchData] = useState([]);
    // const [player2,setPlayer2] = useState({ name : '' , run : '' , ball : '' , isbowled : false});

    let i = 0;
    console.log("score :- ", bowlers[0]);
    useEffect(async () => {

        async function getApiData() {
            await fetch('api/values/LiveLine')
                .then(res => res.json())
                .then(data => setAllMatchData(data)).catch(err => console.log(err.message))

        }

        getApiData()

        // option-2 this one is perfect too... 
        // await axios.get('api/values/LiveLine').then(res => { 
        //     setAllMatchData(res.data)   // To store 3rd match's data.
        //     console.log("res data :- ",score)  // score.jsondata.batsman.split('*|') -->For geting batsman
        // }).catch(err=>console.log(err))
    }, [])

    console.log("Today's Matches :-  ", allMatchData);

    const getPlayers = (players) => {
        let CurrPlayers = players.split('|');

        // for (const i of CurrPlayers) {
        //     if (!(player.includes(i))) {
        //         player.push(i)
        //         console.log("player  ", i);
        //     }
        // }

        return CurrPlayers;
    }

    const getPlayerRuns = (runs) => {
        let CurrPlayers_runs = runs.split('|').join(', ').split(',');
        console.log("current players runs :-  ", CurrPlayers_runs);
        return CurrPlayers_runs
    }

    return (
        <div className='w-100 text-align-inherit'>
            <Match_Score_Sec_Header />



            {allMatchData && allMatchData.filter((obj) => {
                return Number(obj.MatchId) === 7876
            }).map((singleMatch, index) => {

                var livedata = JSON.parse(singleMatch.jsondata.replaceAll('\n', '\\n')).jsondata

                let player_name = getPlayers(livedata.batsman);

                let runs = getPlayerRuns(livedata.oversB);    // NEED TO DO DYNAMIC LOGIC PRO:-- WHEN SECOND TEAM CAME TO BAT THEN ALSO SECOND TEAM'S DATA WILL BE DISPLAYED.

                let title = livedata.title.split('*****').join('').split('\n');
                let score = livedata.Result    //pujab kings won by 5 wicket   orrr   singleMatch.Result

                if (isbowlers) {
                    console.log("bowlers :- ", isbowlers);
                    addPlayerData({ livedata: livedata })
                    // bowler1: livedata.bowler1, bowler2: livedata.bowler2, bowler3: livedata.bowler3, bowler4: livedata.bowler4, beco1:livedata.beco1
                    setIsBowlers(false)
                }

                console.log("", livedata.oversB);

                // after complition of the first inning the result is singleMatch.wicketA && singleMatch.wicketB
                return (


                    <div key={index}>
                        <Container>
                            <Row>
                                <Col xm={12} md={8} className="p-0">
                                    <div>
                                        <Container>
                                            {score && <p>{score}</p>}
                                            <h4>{singleMatch.TeamA} VS {singleMatch.TeamB}</h4>
                                            <p>{singleMatch.Title}</p>
                                            <h6>{singleMatch.TeamA} Score :- {livedata.wicketA} ({livedata.oversA})</h6>
                                            <h6>{singleMatch.TeamB} Score :- {livedata.wicketB} ({livedata.oversB})</h6>
                                            <div>
                                                <table cellSpacing="0" className='mt-2 Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                                                    <thead>
                                                        <tr style={{ backgroundColor: "#BC8CF2" }}>
                                                            <th colSpan="6">Batsmen</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th></th>
                                                            <th>R</th>
                                                            <th>B</th>
                                                            <th>4s</th>
                                                            <th>6s</th>
                                                            <th>SR</th>
                                                        </tr>

                                                        {player_name.map((player, index) => {
                                                            console.log('PLAYER :-', player);
                                                            return (
                                                                <tr key={index}>
                                                                    <th>{player}</th>
                                                                    <th>{index == 0 ? runs[(index + 1)] : runs[(index - 1)]}</th>
                                                                    <th>{index == 0 ? runs[(index + 3)] : runs[(index + 1)]}</th>
                                                                    <th>{index == 0 ? livedata.s4 : livedata.ns4}</th>
                                                                    <th>{index == 0 ? livedata.s6 : livedata.ns6}</th>
                                                                    <th>{index == 0 ? Number(String((runs[(index + 1)] / runs[(index + 3)]) * 100).substring(0, 5)) : Number(String((runs[(index - 1)] / runs[(index + 1)]) * 100).substring(0, 5))}</th>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div>
                                                {livedata.Result && <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>Run Rate :- </p>
                                                    <p className='Match_Score_RunRate mb-1'>{livedata.Result}</p>
                                                </div>}
                                                <div className='d-flex mt-3'>
                                                    <p className='Score_Extra_Title mb-1'>EXTRAS :- </p>
                                                    <p className='Score_Extra_runs mb-1'>0(b 0,lb 0,w 0,nb 0,p)</p>
                                                </div>
                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>PARTNERSHIP :- </p>
                                                    <p className='Match_Score_Total mb-1'>{livedata.partnership}</p>
                                                </div>
                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>LAST 6 BALLS :- </p>
                                                    <p className='Match_Score_Total mb-1'>{livedata.Last6Balls}</p>
                                                </div>
                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>Run Rate :- </p>
                                                    <p className='Match_Score_RunRate mb-1'>{livedata.rateA}</p>
                                                </div>

                                                <div className='d-flex '>
                                                    <p className='Score_Extra_Title mb-1'>LAST wicket :- </p>
                                                    <p className='Match_Score_LastWicket mb-1'>{livedata.lastwicket}  {livedata.bwicket1}</p>
                                                </div>
                                                {/* <div>
                                                <p className='Score_Extra_Title'>Yet To Bat :- </p>
                                                <p>Virat Kohli, Rohit Sharma, Jadeja, Hardik Pandya</p>
                                            </div> */}
                                            </div>

                                            <div className='mt-3'>
                                                <table cellSpacing="0" className='Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "azure" }}>
                                                    <tr style={{ backgroundColor: "  #9edadb" }}>
                                                        <th colSpan="6">Bollwers</th>
                                                    </tr>
                                                    <tr>
                                                        <th></th>
                                                        <th>O</th>
                                                        {/* <th>M</th> */}
                                                        <th>R</th>
                                                        <th>W</th>
                                                        <th>Eco</th>
                                                    </tr>

                                                    {bowlers && bowlers.map((obj, index) => {
                                                        console.log("bowler obj :- ", bowlers[0]);
                                                        console.log("e obj :- ", obj);

                                                        obj.map((e, index) => {  // ERROR :- data nathi display thata table ma....
                                                            console.log("e :- ", index);  
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <th>{index}</th> */}
                                                                    <th>{e.name}</th>
                                                                    <th>{e.over}</th> 
                                                                    <th>{e.run}</th>
                                                                    <th>{e.wicket}</th>
                                                                    <th>{((e.run)/(e.over))}</th>
                                                                </tr>
                                                            )
                                                        })
                                                    })}

                                                </table>
                                            </div>

                                            {/* <h4>Commentry about score</h4> */}
                                            <p>{title[0]}</p>

                                        </Container>

                                    </div>
                                </Col>
                                <Col xm={12} md={4}>
                                    Advertisement
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            })}

        </div>
    );
}

export default Match_Score;
