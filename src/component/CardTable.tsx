import React from 'react';
import ProgressBar from './ProgressBar';
import './cardTable.css';

 
interface ProgressItem {
  Phase: string;
  POC: number;
  status: string;
}

 
interface CardTableProps {
  progressData: ProgressItem[];  
}

const CardTable: React.FC<CardTableProps> = ({ progressData }) => {
  const getStatusColor = (value: number) => {
    if (value === 0) return '#0000FF';   
    return value >= 80 ? '#035e35' : '#fa8a0a';   
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Progress Table</div>
      <table style={{ border: "1px solid black", width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Phase</th>
            <th>POC</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          
          {progressData.map((item, index) => (
            <tr key={index}>
              <td>{item.Phase}</td>
              <td>
                <ProgressBar value={item.POC} />
              </td>
              <td>
                <div
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '20px',
                    backgroundColor: getStatusColor(item.POC),
                    marginRight: '8px',
                  }}
                />
                <span>{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
