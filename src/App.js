import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Header from "./Screens/Header"
import Current_Matches from './Screens/Current_Matches';
import Upcomming_Matches from './Screens/Upcomming_Matches';
import ScoreBoard from './Screens/ScoreBoard';
import Point_Table from './Screens/Point_Table';
import Ipl_Teams from './Screens/Ipl_Teams';
import Ipl_News from './Screens/Ipl_News';
import Info from './Screens/Info';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        {/* <Info /> */}
        <Routes>
            <Route path="/" exact element={<Current_Matches />} />
            <Route path="/matches/upcomming-matches" element={<Upcomming_Matches />} />
            {/* /match-score/:id */}
            <Route path="/match-score" element={<ScoreBoard />} />   
            <Route path="/ipl-team-point" element={<Point_Table />} />
            <Route path="/get-ipl-Teams" element={<Ipl_Teams />} />
            <Route path="/ipl-news" element={<Ipl_News />} />
            <Route path="/info" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;