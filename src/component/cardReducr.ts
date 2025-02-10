interface Progress {
    progrsess: string;
    value: number;
  }
  
  interface Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }
  
  export interface HeaderCard1 {
    index: number;
    Title: string;
    projectCost: Progress[];
    layout: Layout;
    splitCount: number;
  }
  
  interface CardAction {
    type: string;
    payload: any;
  }
  
  const initialState: HeaderCard1[] = [
    {
      index: 1,
      Title: "Budget and Cost",
      projectCost: [
        { progrsess: "Budget", value: 9.05 },
        { progrsess: "Invoiced", value: 3.29 },
        { progrsess: "Remaining", value: 5.76 }
      ],
      layout: {
        i: "card-1",
        x: 0,
        y: 0,
        w: 3.65,
        h: 9
      },
      splitCount: 0
    },
    {
      index: 2,
      Title: "Project Health",
      projectCost: [
        { progrsess: "Budget", value: 80 },
        { progrsess: "Invoiced", value: 40 },
        { progrsess: "Remaining", value: 0 }
      ],
      layout: {
        i: "card-2",
        x: 3.65,
        y: 0,
        w: 3.65,
        h: 9
      },
      splitCount: 0
    },
    {
      index: 3,
      Title: "Resource Utilization",
      projectCost: [
        { progrsess: "APR 25", value: 78 },
        { progrsess: "Mar 25", value: 84 },
        { progrsess: "Feb 25", value: 85 }
      ],
      layout: {
        i: "card-3",
        x: 7.3,
        y: 0,
        w: 3.65,
        h: 9
      },
      splitCount: 0
    },
  ];
  
  const cardReducer = (state = initialState, action: CardAction): HeaderCard1[] => {
    switch (action.type) {
      case 'ADD_CARD':
        return [...state, action.payload];
      case 'SPLIT_CARD':
        return state.map(card =>
          card.index === action.payload.index
            ? { ...card, splitCount: card.splitCount + 1 }
            : card
        );
      case 'REMOVE_CARD':
        return state.filter(card => card.index !== action.payload.index);
      default:
        return state;
    }
  };
  
  export { cardReducer };
  