import React from 'react';
import { data, Card } from './cardsData';   
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";
import ProgressBar from './ProgressBar';
import CardTable from './CardTable';
import Grid from '@mui/material/Grid2' 
import Item from '@mui/material/Grid2'; 
import './card.css';   

const Cards: React.FC = () => {
  return (
    <div className='main-container-card'>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12}}>
        {data.map((card: Card, index: number) => (
          <Grid key={index} size={{ xs: 6, sm: 4, md: 4 }}> 
          <Item> 
            <div className='card-container'>
              <div className='card-header'>
                <div className='title'>{card.Title}</div>
                <div>
                  <BsThreeDotsVertical />
                  <IoMdRefresh />
                </div>
              </div>

              <div className="name-and-progress progress">
                <div className='name'>{card.Name}</div>
                <div className='progress'>
                  <div style={{ marginLeft: '20px', marginBottom: '5px', fontSize: '12px' }}>Progress</div>
                  <SemiCircleProgressBar diameter={80} percentage={card.ProgressData} showPercentValue />
                </div>
                <div className='timeLine-progress'>
                  <div style={{ marginTop: '5px', marginBottom: '-30px', fontSize: '12px' }}>TimeLine</div>
                  <div className='percentage'>
                    <div style={{ marginTop: '35px' }}>
                      <ProgressBar value={card.TimeLine} />
                    </div>
                    <span style={{ marginTop: '35px', marginLeft: '10px' }}>{card.TimeLine}%</span>
                  </div>
                  <div className='date-content'>
                    <div style={{ fontSize: '8px' }}>Started Date</div>
                    <div style={{ fontSize: '8px' }}>End Date</div>
                  </div>
                  <div className='date-content'>
                    <div style={{ fontSize: '8px' }}>01/02/2024</div>
                    <div style={{ fontSize: '8px' }}>08/01/2024</div>
                  </div>
                </div>
              </div>

              <div className='Description'>{card.Description}</div>

              <div className='table'>
                <CardTable progressData={card.Progress} />
              </div>
            </div>
            </Item>
          </Grid>
        ))}
      </Grid>

      {/* hello */}
    </div>
  );
}

export default Cards;
