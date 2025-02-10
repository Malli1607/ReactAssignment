import {  useState } from 'react';
import './headerCard.css';
import ReactGridLayout from 'react-grid-layout'; // Assuming you're using react-grid-layout
// import { RiMoneyDollarBoxFill } from "react-icons/ri";
// import { MdRepeatOn } from "react-icons/md";

// Define the type for each card
type Card = {
  index: number;
  layout: { i: string; x: number; y: number; w: number; h: number };
};

const HeaderCardComponent = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (newCard: Card) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const splitCardIntoTwo = (cardIndex: number) => {
    const card = cards.find((c) => c.index === cardIndex);
    if (!card) return;

    const splitCards = [
      {
        ...card,
        index: cards.length + 1,
        layout: { ...card.layout, i: `card-${cards.length + 1}`, x: 0, y: card.layout.y + 1, w: 5.5 },
      },
      {
        ...card,
        index: cards.length + 2,
        layout: { ...card.layout, i: `card-${cards.length + 2}`, x: 5.5, y: card.layout.y + 1, w: 5.5 },
      },
    ];

    setCards((prevCards) => [
      ...prevCards.filter((c) => c.index !== cardIndex),
      ...splitCards,
    ]);
  };

  const removeCard = (cardIndex: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.index !== cardIndex));
  };

  return (
    <div>
      <ReactGridLayout className="layout" cols={11} rowHeight={5} width={1050} isDraggable={true} isResizable={true}>
        {cards.map((headerCard) => (
          <div key={headerCard.layout.i} data-grid={headerCard.layout}>
            <div className="header-card-title">
              {headerCard.layout.i}
            </div>
            {/* Removed project cost related code */}
            <div className="header-card-actions">
              <button onClick={() => splitCardIntoTwo(headerCard.index)}>Split</button>
              <button onClick={() => removeCard(headerCard.index)}>Remove</button>
            </div>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default HeaderCardComponent;
