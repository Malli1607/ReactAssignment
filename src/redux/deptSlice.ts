import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
 export interface Dept {
  id?: string;
  Department: string;
  Description: string;
}

interface DeptState {
  department: Dept[];
}

const initialDeptState: DeptState = {
  department: [],
};

const departmentSlice = createSlice({
  name: 'dep',
  initialState: initialDeptState,
  reducers: {
    setDepartments(state, action: PayloadAction<Dept[]>) {
      state.department = action.payload;
    },
    addDepartment(state, action: PayloadAction<Dept>) {
      state.department.push(action.payload);
    },
    updateDepartment(state, action: PayloadAction<Dept>) {
      const index = state.department.findIndex(dept => dept.id === action.payload.id);
      if (index !== -1) {
        state.department[index] = action.payload;
      }
    },
    deleteDepartment(state, action: PayloadAction<string>) {
      state.department = state.department.filter(dept => dept.id !== action.payload);
    }
  }
});

export const { setDepartments, addDepartment, updateDepartment, deleteDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
