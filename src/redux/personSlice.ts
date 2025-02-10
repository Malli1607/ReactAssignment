import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id?: string;
  Name: string;
  Age: string;
  Gender: string;
  Salary: string;
  Department : string;
}
 

interface RootState {
  people: Person[];
  
}

const initialState: RootState = {
  people: [],
 
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<Person[]>) {
        console.log('Setting people:', action.payload);
        console.log("state : " + JSON.stringify(state));
      state.people = action.payload;

    },
    addPerson(state, action: PayloadAction<Person>) {
   
        console.log('on add : ' + JSON.stringify(action.payload) + ", state : " + JSON.stringify(state));
      state.people.push(action.payload);
      console.log('after add : ' + JSON.stringify(action.payload) + ", state : " + JSON.stringify(state));

    },
    updatePerson(state, action: PayloadAction<Person>) {
        
      const index = state.people.findIndex(person => person.id === action.payload.id);
      if (index !== -1) {
        state.people[index] = action.payload;
      }
       
    },
    deletePerson(state, action: PayloadAction<string>) {
      state.people = state.people.filter(person => person.id !== action.payload);
    }, 
    setGender(state, action:PayloadAction<Person[]>){
      console.log('Setting people:', action.payload);
        console.log("state : " + JSON.stringify(state));
      state.people = action.payload;

    }
  },
});

export const { setPeople, addPerson, updatePerson, deletePerson, setGender} = personSlice.actions;
export default personSlice.reducer;
