import React, { useState } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { IconButton } from '@mui/material';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';  
import { MdViewColumn } from "react-icons/md";
import './grid.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material';
import FormDialog from './FormDialog';

interface Card {
  id: string;
  title: string;
  layout: { i: string; x: number; y: number; w: number; h: number };
}

const GridLayout = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      title: 'Untitled 1',
      layout: { i: '1', x: 0, y: 0, w: 10, h: 2 },
    }
  ]);

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null); 

  const [columnName, setColumnName] = useState(false);


  const addCoulmn = () => {

    setColumnName(true)

  }

  const generateNewCardId = () => `card-${Date.now()}-${Math.random()}`;

  const getNextAvailableY = (x: number, w: number): number => {
    let maxY = 0;
    cards.forEach((card) => {
      if (card.layout.x < x + w && card.layout.x + card.layout.w > x) {
        maxY = Math.max(maxY, card.layout.y + card.layout.h);
      }
    });
    return maxY;
  }

  // const getNextYForSplit = (): number => {
 
  //   let maxY = 0;
  //   cards.forEach((card) => {
  //     if (card.layout.w === 10) {
  //       maxY = Math.max(maxY, card.layout.y + card.layout.h);
  //     }
  //   });
  //   return maxY + 1;
  // };
  

  const addFullWidthCard = () => {
    console.log(`[info] - addFullWidthCard - cards -${JSON.stringify(cards)}`)
    console.log(`[info] - addFullWidthCard - card-${cards.length + 1}`)
    const newFullWidthCard: Card = {
      id: generateNewCardId(),
      title: `Untitled ${cards.length + 1}`,
      layout: { i: generateNewCardId(), x: 0, y: getNextAvailableY(0, 10), w: 10, h: 2 },
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
        title: `${cardToSplit.title} (1)`,
        layout: {
          i: generateNewCardId(),
          x: 0,
          y: newYPos,   
          w: 5,
          h: 2,
        },
      },
      {
        id: generateNewCardId(),
        title: `${cardToSplit.title} (2)`,
        layout: {
          i: generateNewCardId(),
          x: 5,
          y: newYPos,   
          w: 5,
          h: 2,
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
        title: `${cardToSplit.title} (1)`,
        layout: {
          i: generateNewCardId(),
          x: 0,
          y: newYPos,   
          w: 3,
          h: 2,
        },
      },
      {
        id: generateNewCardId(),
        title: `${cardToSplit.title} (2)`,
        layout: {
          i: generateNewCardId(),
          x: 3,
          y: newYPos,   
          w: 3,
          h: 2,
        },
      },
      {
        id: generateNewCardId(),
        title: `${otherCard.title} (3)`,
        layout: {
          i: generateNewCardId(),
          x: 6,
          y: newYPos,   
          w: 3,
          h: 2,
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

  const editCard = (cardId: string) => {
    alert(`Edit card`);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      >
        {cards.map((headerCard) => (
          <div
            key={headerCard.id}
            data-grid={headerCard.layout}
            onMouseEnter={() => setHoveredCardId(headerCard.id)}  
            onMouseLeave={() => setHoveredCardId(null)}  
          >
            <div className="header-card-container">
              <div className="sub-header-card-container">
                <div className="title">
                  <div className="header-card-title">
                    {headerCard.title}

                    {/* Dialog box for coloumn  */}
                    <IconButton
                  aria-label="edit"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    addCoulmn();
                  
                  }}
                  style={{marginLeft : '120px', marginTop : '-4px', position: 'fixed'}}
                  className="edit-button"
                >
                  <MdViewColumn style={{marginLeft:'-40px'}} />
                </IconButton>

                {columnName && (      
           
           <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button> */}
        </DialogActions>
      </Dialog>
      </>) 
};
                    
                    <IconButton
                  aria-label="edit"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    editCard(headerCard.id);
                  }}
                  style={{marginLeft : '120px', marginTop : '-4px', position: 'fixed'}}
                  className="edit-button"
                >
                  <FaEdit  style={{width : '15px'}}/>
                </IconButton>
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
                        style={{ marginLeft: '10px', fontSize: '12px' }}
                      >
                        <FaPlus style={{ width: '8px' }} />
                      </IconButton>
                      <IconButton
                        aria-label="remove"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          removeCard(headerCard.id);
                        }}
                        style={{ marginLeft: '10px', fontSize: '12px' }}
                      >
                        <FaMinus style={{ width: '8px' }} />
                      </IconButton>
                    </div>

                     
                  </div>

                   
                </div>
                {hoveredCardId === headerCard.id && (
                  <IconButton
                    aria-label="add"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      addFullWidthCard();
                    }}
                    
                    style={{marginTop : '50px', marginLeft : '80px'}}
                  >
                    <FaPlus className="btn" style={{ width: '8px'}} />
                  </IconButton>
                )}
                 
                
              </div>
            </div>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
