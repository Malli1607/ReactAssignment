import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

const TypoGraphy = () => {
  const [layout, setLayout] = useState([
    
  { i: 'widget1', x: 0, y: 0, w: 2, h: 4 },
  { i: 'widget2', x: 2, y: 0, w: 2, h: 4 },
  { i: 'widget3', x: 4, y: 0, w: 2, h: 4 },
  { i: 'widget4', x: 6, y: 4, w: 2, h: 4 },
  { i: 'widget5', x: 0, y: 6, w: 2, h: 4 },
  { i: 'widget6', x: 4, y: 10, w: 2, h: 4 },
  { i: 'widget7', x: 0, y: 8, w: 2, h: 4 },
  { i: 'widget8', x: 2, y: 8, w: 2, h: 4 },
  { i: 'widget9', x: 4, y: 8, w: 2, h: 4 },
  ]);

   
  

  return (
    <GridLayout
      className="complex-interface-layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      onLayoutChange={(newLayout) => setLayout(newLayout)}
    >
      {layout.map((item) => (
        <div key={item.i} style={{ background: '#009688' }}>
          {`Widget ${item.i}`}
        </div>
      ))}
      
    </GridLayout>
  );
};

export default TypoGraphy;
