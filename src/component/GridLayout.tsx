import React, { useState } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Button, IconButton,  TextField } from '@mui/material';
import { FaPlus, FaMinus,  } from 'react-icons/fa';
 
import './grid.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
 
import FormDialog from './FormDialog';

interface Card {
  id: string;
  title: string;
  layout: { i: string; x: number; y: number; w: number; h: number };
  isEditing?: boolean;
}

const GridLayout = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      title: 'Untitled',
      layout: { i: '1', x: 0, y: 0, w: 10, h: 4 },
      isEditing : false
    }
  ]);

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  // const [columnName, setColumnName] = useState(false);
   
  // Function to add a column (this opens the dialog)
  // const addColumn = () => {
  //   console.log('show dialog box');
  //   setColumnName(true);
  // };

    

  const generateNewCardId = () => `card-${Date.now()}-${Math.random()}`;

  
  const getNextAvailableY = (x: number, w: number): number => {
    let maxY = 0;
    cards.forEach((card) => {
      if (card.layout.x < x + w && card.layout.x + card.layout.w > x) {
        maxY = Math.max(maxY, card.layout.y + card.layout.h);
      }
    });
    return maxY;
  };

 
  const addFullWidthCard = () => {
    
    console.log(`[info] - addFullWidthCard - cards -${JSON.stringify(cards)}`);

    const newFullWidthCard: Card = {
      id: generateNewCardId(),
      title: `Untitled`,
      layout: { i: generateNewCardId(), x: 0, y: getNextAvailableY(0, 10), w: 10, h: 4 },
      isEditing : false
    };
    setCards((prevCards) => [...prevCards, newFullWidthCard]);
  };

 
  const splitCardIntoTwo = (cardId: string) => {
    const cardToSplit = cards.find((card) => card.id === cardId);
    if (!cardToSplit) return;

    const newYPos = cardToSplit.layout.y;
    const newCards: Card[] = [
      {
        id: generateNewCardId(),
        title: `${cardToSplit.title}`,
        layout: {
          i: generateNewCardId(),
          x: 0,
          y: newYPos,
          w: 5,
          h: 4,
        },
      },
      {
        id: generateNewCardId(),
        title: 'untitled',
        layout: {
          i: generateNewCardId(),
          x: 5,
          y: newYPos,
          w: 5,
          h: 4,
        },
      },
    ];

    setCards((prevCards) => [
      ...prevCards.filter((card) => card.id !== cardId),
      ...newCards,
    ]);
  };

 
  const splitTwoCardsIntoThree = (cardId: string) => {
    const cardToSplit = cards.find((card) => card.id === cardId);
    if (!cardToSplit) return;

    const otherCard = cards.find(
      (card) => card.layout.y === cardToSplit.layout.y && card.id !== cardToSplit.id
    );
    if (!otherCard) return;

    const newYPos = cardToSplit.layout.y;
    const newCards: Card[] = [
      {
        id: generateNewCardId(),
        title: `${otherCard.title}`,
        layout: {
          i: generateNewCardId(),
          x: 0,
          y: newYPos,
          w: 3,
          h: 4,
        },
      },
      {
        id: generateNewCardId(),
        title: `${cardToSplit.title}`,
        layout: {
          i: generateNewCardId(),
          x: 3,
          y: newYPos,
          w: 3,
          h: 4,
        },
      },
      {
        id: generateNewCardId(),
        title: 'untitled',
        layout: {
          i: generateNewCardId(),
          x: 6,
          y: newYPos,
          w: 3,
          h: 4,
        },
      },
    ];

    setCards((prevCards) => [
      ...prevCards.filter((card) => card.id !== cardToSplit.id && card.id !== otherCard.id),
      ...newCards,
    ]);
  };

 
  const removeCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  
  // const handleDialogSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries((formData as any).entries());
  //   const email = formJson.email;
  //   console.log('Email submitted:', email);
  //   setOpen(false);  // Close dialog after submission
  // };

   

  const handleTitleKeyDown = (e: React.KeyboardEvent, cardId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
     
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, isEditing: false } : card
        )
      );
    }
  };
  const handleTitleChange = (e: any, cardId: string) => {
    const newTitle = e.target.value;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
  };
  const handleDoubleClick = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isEditing: true } : card
      )
    );
  };

  return (
    <div>
      <ReactGridLayout
        className="layout"
        cols={12}
        rowHeight={100}
        width={1200}
        isDraggable={true}
        isResizable={true}
        // margin={[10, 10]}
      >
        {cards.map((headerCard) => (
          <div
            key={headerCard.id}
            data-grid={headerCard.layout}
            onMouseEnter={() => setHoveredCardId(headerCard.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            className="header-card-container"
          >
                   
              <div className="sub-header-card-container">
                <div className="title">
                  <div className="header-card-title">
                  <Button className='title-btn'
                    onDoubleClick={() => handleDoubleClick(headerCard.id)}
                    style={{ fontSize: '14px', color:'gray', width:'50%'
                    }}
                  >
                    {headerCard.isEditing ? (
                      <TextField
                        value={headerCard.title}
                        onChange={(e) => handleTitleChange(e, headerCard.id)}
                        onKeyDown={(e) => handleTitleKeyDown(e, headerCard.id)}
                        autoFocus
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Enter Name"
                        inputProps={{ style: { fontSize: 12, padding:'6px 8px' } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        sx={{
                          width: '100%',
                          marginBottom:'36px',
                          height:'20px',
                           
                           
                          '.MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderWidth: 1,
                            },
                          },
                          '.MuiInputBase-input': {
                            fontSize: '12px',
                          },
                        }}
                      />
                    ) : (
                    
                      <div style={{width: '100%', textAlign: 'left', whiteSpace: 'nowrap', marginLeft:'-10px', marginBottom:'30px'}}>{headerCard.title}</div> 
                    )}
                  </Button>
 
                    <FormDialog  isHovered={hoveredCardId === headerCard.id}/>
                    {hoveredCardId === headerCard.id && (  
                    <div className="action-buttons">
                      <IconButton
                        aria-label="add"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          if (headerCard.layout.w === 10) {
                            splitCardIntoTwo(headerCard.id);
                          } else if (headerCard.layout.w === 5) {
                            splitTwoCardsIntoThree(headerCard.id);
                          } else {
                            addFullWidthCard();
                          }
                        }}
                        style={{ marginLeft: '10px', fontSize: '12px', width:'35px', height:'35px',marginTop:'8px'}}
                      >
                        <FaPlus style={{ width: '200px' }} />
                         
                      </IconButton>
                      <IconButton
                        aria-label="remove"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          removeCard(headerCard.id);
                        }}
                        style={{fontSize: '12px', width:'35px', height:'35px', marginTop:'8px' }}
                      >
                        <FaMinus style={{ width: '200px' }} />
                      </IconButton>
                    </div>
                      )}
                  </div>
                </div>
               

              {/* {hoveredCardId === headerCard.id && (
                <IconButton
                  aria-label="add"
                  onMouseDown={(e) => {                  
                    e.stopPropagation();
                    addFullWidthCard();
                  }}
                 
                >
                  <FaPlus className="btn" style={{ width: '8px'}} />  
                </IconButton>
              )} */}
              </div>
            </div>
          
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
