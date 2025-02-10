export{}

// import { useEffect, useState } from 'react';
// import { data } from './headerdata';
// import './headerCard.css';
// import { RiMoneyDollarBoxFill } from "react-icons/ri";
// import { MdRepeatOn } from "react-icons/md";
// import { BiSolidBarChartSquare } from "react-icons/bi";
// import ProgressBar from './ProgressBarHeader';
// import ReactGridLayout from 'react-grid-layout';
// import { IconButton } from '@mui/material';
// import { FaPlus, FaMinus } from "react-icons/fa";
// import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';

// const HeaderCard = () => {
//   const [cards, setCards] = useState(data);

//   // useEffect(() => {
//   //   console.log(`[info] - card - ${JSON.stringify(cards)}`)
//   // }, [cards]);

//   const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);


//   // const canAddFullWidthCard = (cardIndex: number) => {
//   //   const card = cards.find(c => c.index === cardIndex);
//   //   return card && card.layout.w !== 10.95 && card.splitCount < 3;  
//   // };

//   // const canSplitCard = (cardIndex: number) => {
//   //   const card = cards.find(c => c.index === cardIndex);
//   //   return card && card.layout.w !== 5.5 && card.splitCount < 3;  
//   // };

//   // const canSplitTwoCards = (cardIndex: number) => {
//   //   const card = cards.find(c => c.index === cardIndex);
//   //   if (!card) return false;

//   //   const card1 = cards.find(c => c.layout.i === card.layout.i);
//   //   const card2 = cards.find(c => c.index !== card.index && c.layout.y === card.layout.y);


//   //   return card1 && card2 && card1.layout.w === 5.5 && card2.layout.w === 5.5 && card.splitCount < 3;  
//   // };


//   const addFullWidthCard = (cardIndex: number) => {
//     // if (!canAddFullWidthCard(cardIndex)) return;
//     // console.log(`[info] - addFullWidthCard - cards -${JSON.stringify(cards)}`)
//     // console.log(`[info] - addFullWidthCard - card-${cards.length + 1}`)

//     // const card = cards.find(c => c.index === cardIndex);
//     // if (!card) return;

//     const newFullWidthCard = {
      
//       Title: 'Untitled',
      
//       layout: {
//         i: `1`,
//         x: 0,
//         y: 1,
//         w: 10.95,
//         h: 9,
//       },
      
//     }

//     setCards(prevCards => [...prevCards, newFullWidthCard]);
//   };

//   const splitCardIntoTwo = (cardIndex: number) => {
//     // if (!canSplitCard(cardIndex)) return;

//     console.log(`[info] - splitCardIntoTwo - cards -${JSON.stringify(cards)}`);
//     console.log(`[info] - splitCardIntoTwo - card-${cards.length + 1} - card-${cards.length + 2}`);

//     const card = cards.find(c => c.index === cardIndex);
//     if (!card) return;

//     const splitCards = [
//       {
//         ...card,
//         index: cards.length + 1,
//         layout: {
//           i: `card-${cards.length + 1}`,
//           x: 0,
//           y: card.layout.y + 1,
//           w: 5.5,
//           h: 9,
//         },
//         splitCount: card.splitCount + 1,
//       },
//       {
//         ...card,
//         index: cards.length + 2,
//         layout: {
//           i: `card-${cards.length + 2}`,
//           x: 5.5,
//           y: card.layout.y + 1,
//           w: 5.5,
//           h: 9,
//         },
//         splitCount: card.splitCount + 1,
//       },
//     ];

//     setCards(prevCards => [
//       ...prevCards.filter(c => c.index !== cardIndex),
//       ...splitCards,
//     ]);
//   };

//   const splitTwoCardsIntoThree = (cardIndex: number) => {
//     // if (!canSplitTwoCards(cardIndex)) return;

//     console.log(`[info] - splitTwoCardsIntoThree - cards -${JSON.stringify(cards)}`)
//     console.log(`[info] - splitTwoCardsIntoThree - card-${cards.length + 1} - card-${cards.length + 2} - card-${cards.length + 3}`)

//     const card = cards.find(c => c.index === cardIndex);
//     if (!card) return;

//     const card1 = cards.find(c => c.layout.i === card.layout.i);
//     const card2 = cards.find(c => c.index !== card.index && c.layout.y === card.layout.y);

//     if (!card1 || !card2) return;

//     const splitCards = [
//       {
//         ...card1,
//         index: cards.length + 1,
//         layout: {
//           i: `card-${cards.length + 1}`,
//           x: 0,
//           y: card1.layout.y,
//           w: 3.65,
//           h: 9,
//         },
//         splitCount: card1.splitCount + 1,
//       },
//       {
//         ...card1,
//         index: cards.length + 2,
//         layout: {
//           i: `card-${cards.length + 2}`,
//           x: 3.65,
//           y: card1.layout.y,
//           w: 3.65,
//           h: 9,
//         },
//         splitCount: card1.splitCount + 1,
//       },
//       {
//         ...card2,
//         index: cards.length + 3,
//         layout: {
//           i: `card-${cards.length + 3}`,
//           x: 7.3,
//           y: card2.layout.y,
//           w: 3.65,
//           h: 9,
//         },
//         splitCount: card2.splitCount + 1,
//       },
//     ];

//     setCards(prevCards => [
//       ...prevCards.filter(c => c.index !== card1.index && c.index !== card2.index),
//       ...splitCards,
//     ]);
//   };

//   const removeCard = (cardIndex: number) => {
//     setCards(prevCards => prevCards.filter(card => card.index !== cardIndex));
//   };

//   return (
//     <div>
//       <ReactGridLayout className="layout" cols={11} rowHeight={5} width={1050} isDraggable={true} isResizable={true}>
//         {cards.map((headerCard, index) => (
//           <div
//             key={headerCard.layout.i}
//             data-grid={headerCard.layout}
//             onMouseEnter={() => setHoveredCardIndex(index)}
//             onMouseLeave={() => setHoveredCardIndex(null)}
//           >
//             <div className="header-card-container">
//               <div className="sub-header-card-container">
//                 <div className="title">
//                   <div className="header-card-symbol">
//                     {headerCard.Title === 'Project Health' ? (
//                       <MdRepeatOn style={{ width: '30px', height: '30px', marginTop: '10px', color: 'green' }} />
//                     ) : headerCard.Title === 'Resource Utilization' ? (
//                       <BiSolidBarChartSquare style={{ width: '40px', height: '40px', marginTop: '10px', color: 'red' }} />
//                     ) : (
//                       <RiMoneyDollarBoxFill style={{ width: '40px', height: '40px', marginTop: '10px', color: 'orange' }} />
//                     )}
//                   </div>
//                   <div className="header-card-title">
//                     {headerCard.Title}
//                     {hoveredCardIndex === index && (
//                       <>
//                         <IconButton
//                           aria-label="add"
//                           onMouseDown={(e) => {
//                             e.stopPropagation();
//                             if (headerCard.layout.w === 3.65) {
//                               addFullWidthCard(headerCard.index);
//                             } else if (headerCard.layout.w === 10.95) {
//                               splitCardIntoTwo(headerCard.index);
//                             } else if (headerCard.layout.w === 5.5) {
//                               splitTwoCardsIntoThree(headerCard.index);
//                             }
//                           }}
//                           style={{ marginLeft: '10px', fontSize: '12px' }}
//                         >
//                           <FaPlus style={{ width: '8px' }} />
//                         </IconButton>

//                         <IconButton
//                           aria-label="remove"
//                           style={{ marginLeft: '10px', fontSize: '12px' }}
//                           onMouseDown={(e) => {
//                             e.stopPropagation();
//                             removeCard(headerCard.index);
//                           }}
//                         >
//                           <FaMinus style={{ width: '8px' }} />
//                         </IconButton>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="header-card-data-container">
//                   {headerCard.projectCost.map((item, itemIndex) => (
//                     <div key={itemIndex} className="header-card-data-row">
//                       {headerCard.Title === 'Project Health' ? (
//                         <div className="header-card-progress-bar">
//                           <ProgressBar value={item.value} />
//                         </div>
//                       ) : (
//                         <>
//                           <div className="header-card-data">{item.progrsess}</div>
//                           <div className="header-card-data">{item.value}</div>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 {hoveredCardIndex === index && (
//                   <>
//                     <IconButton
//                       aria-label="add"
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         addFullWidthCard(headerCard.index);
//                       }}
//                       style={{ marginLeft: '10px', fontSize: '12px' }}
//                     >
//                       <FaPlus style={{ width: '8px', marginTop: '-10px' }} />
//                     </IconButton>
//                   </>)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </ReactGridLayout>
//     </div>
//   );
// };

// export default HeaderCard;
