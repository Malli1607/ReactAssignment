import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, MRT_Row, useMaterialReactTable } from 'material-react-table';
import { Person, data } from './data';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, InputLabel, DialogProps, Alert, styled, InputBase, FormControl, NativeSelect, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import './table.css';
import  Axios  from 'axios';
import { GrFormView } from "react-icons/gr";

import { RootState } from '../redux/store';

import { setPeople, addPerson, updatePerson, deletePerson } from '../redux/personSlice';

import { useDispatch, useSelector } from 'react-redux';

import PieCharts from './PieCharts';

import BarChart from './BarChart';



const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 5,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
   
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
     
    },
  },
}));
 

let name : any;
let age : any;
let gender : any;
let salary : any;
let department : any;


 

const Table = () => {
  // const [initdata, setData] = useState<Person[]>(data);
  const [editingRow, setEditingRow] = useState<Person | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<Person | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [width, setWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [color, setColor] = useState('');
  const [openCreate, setOpenCreate] = useState(false);

  const [view, setView] = useState<Person | null>(null);

  const[openView, setOpenView] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    gender: '',
    salary: '',
    department : '',
  });

  const dispatch = useDispatch();
  const people:any[] = useSelector((state : RootState) => state.person.people);
  const departments:any[] = useSelector((state : RootState) => state.department.department);

  console.log("Peoples : " +  JSON.stringify(people));


  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3500/api/allUsers');

      // console.log("Data : " + JSON.stringify(response.data));

      // response.data.users.forEach((user:any )=> {
      //   console.log("id: " + user._id);
      //   console.log("id: " + user.isDeleted);
      // });
      const users = response.data.users.filter((user: any) => !user.isDeleted).map((user: any) => ({
        id: user._id,
        Name: user.Name,
        Age: user.Age,
        Gender: user.Gender,
        Salary: user.Salary,
        Department : user.Department,
      }));

      console.log("users : " + JSON.stringify(users));
      // setData(users);
      dispatch(setPeople(users));
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };


  useEffect(() => {
     
    fetchData();
  }, []); 
  
  const getTextAlign = (key : any) => {

    if(key === 'Age' || key === 'Salary') {
      return 'right';
    }

  }

  const columns = useMemo(() => {
    const createColumnsFromData = (data: Person[]): MRT_ColumnDef<Person, any>[] => {
      let columnNames: string[] = [];
      let actionColumn: MRT_ColumnDef<Person, any> | null = null;
  
       
      data.forEach(item => {
        Object.keys(item).forEach(key => {
         
          if (key !== 'id' && key !== 'action' && !columnNames.includes(key)) {
            columnNames.push(key);
          }
        });
      });
  
      
      if (columnNames.length) {
        actionColumn = {
          accessorKey: 'action',
          header: 'Action',
          size: 150,
          muiTableBodyCellProps: {
            style: {
              textAlign: 'center',  
              border: '1px solid rgba(81, 81, 81, .5)',
            },
          },
          Cell: ({ row }: { row: MRT_Row<Person> }) => (
            <div>
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(row)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleView(row)}>
              <GrFormView />
              </IconButton>
            </div>
          ),
        };
      }
  
      
      const columnsWithoutAction: MRT_ColumnDef<Person, any>[] = columnNames.map((key) => {
        
        const validKey = key as string;
  
        return {
          accessorKey: validKey,
          header: validKey.charAt(0).toUpperCase() + validKey.slice(1), 
          size: 150,
          muiTableBodyCellProps: {
            style: {
              textAlign: getTextAlign(validKey),  
              border: '1px solid rgba(81, 81, 81, .5)',
            },
          },
    
        };
      });
  
      
      if (actionColumn) {
        columnsWithoutAction.push(actionColumn);
      }
  
      return columnsWithoutAction;
    };
  
    return createColumnsFromData(people);
  }, [people]);
  
  


  // const actionColumn : MRT_ColumnDef<Person, any>  = {
  //   accessorKey: 'actions',
  //   header: 'Actions',
  //   size: 200, muiTableBodyCellProps: {
  //     style: {  
  //       textAlign: 'center',
  //       border: '1px solid rgba(81, 81, 81, .5)',
  //     },
  //   },
  //   Cell: ({ row }: { row: MRT_Row<Person> }) => (
  //     <div>
  //       <IconButton onClick={() => handleEdit(row)}>
  //         <EditIcon />
  //       </IconButton>
  //       <IconButton onClick={() => handleDelete(row)}>
  //         <DeleteIcon />
  //       </IconButton>
  //       <IconButton onClick={() => handleView(row)}>
  //       <GrFormView />
  //       </IconButton>
  //     </div>
  //   ),
  // };

  const table = useMaterialReactTable({
    columns: [...columns],   
    data: people,
    
    muiTableHeadRowProps: {
      sx: { backgroundColor: '#072d52', color: 'white' },
    },
    muiTableHeadCellProps: {
      sx: { border: '1px solid rgba(81, 81, 81, .5)', color: '#fff', fontStyle: 'italic', fontWeight: 'normal' },
    },
    muiTableBodyCellProps: {
      sx: { border: '1px solid rgba(81, 81, 81, .5)', fontSize:'12px', textAlign:'rigth' },
    },
    autoResetPageIndex: false,
    enableColumnOrdering: true,

  });

  
  const handleEdit = (row: MRT_Row<Person>) => {

    setEditingRow({ ...row.original});
    setOpenEditDialog(true);

  };

  const handleDelete = (row: MRT_Row<Person>) => {

    setRowToDelete(row.original);
    setOpenDeleteDialog(true);

  };

  const handleView = (row : MRT_Row<Person>) => {
     
    setView({...row.original});
    setOpenView(true);
  }

  const handleSaveEdit = async () => {
    if (editingRow) {
      // setData(prevData =>
      //   prevData.map(item =>
      //     item.id === editingRow.id ? { ...editingRow } : item
      //   )
      // );

     const payload = {Name : editingRow.Name, Age : editingRow.Age, Gender : editingRow.Gender, Salary : editingRow.Salary ,  Department:editingRow.Department, id : editingRow.id};
     
     console.log("payload on edit:" + JSON.stringify(payload));

     const response = await Axios.put('http://localhost:3500/api/update', payload);
     console.log(response.data);

     dispatch(updatePerson(payload));

      setSnackbarMessage('Row updated successfully');
      setOpenEditDialog(false);
      setColor('success');
    }
  } ;

  const handleConfirmDelete = async () => {
    if (rowToDelete) {
      
      // setData(prevData => prevData.filter(item => item.id !== rowToDelete.id));
  
      
      dispatch(deletePerson(rowToDelete.id));
  
   
      const response = await Axios.delete('http://localhost:3500/api/softdelete', { data: { id: rowToDelete.id } });
      console.log(response.data);
  
       
      setSnackbarMessage('Row deleted successfully');
      setOpenDeleteDialog(false);
      setColor('success');
    }
  };
  
  const handleCreate = () => {

     setOpenCreate(true);  
  }
const handleChangeName = (e : any) =>{
  name = e.target.value;
  setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
}
const handleChangeAge = (e : any) =>{
 age = e.target.value;
 setErrors((prevErrors) => ({ ...prevErrors, age: '' }));
}
const handleChangeSalary = (e : any) =>{
 salary = e.target.value;
 setErrors((prevErrors) => ({ ...prevErrors, salary: '' }));
}
const handleChangeDept = (e : any) =>{
 department = e.target.value;
 console.log("dept :" + department);
 setErrors((prevErrors) => ({ ...prevErrors, department: '' }));
}
const handleChangeGender = (e : any) =>{
 gender = e.target.value;
 setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
}

const validateForm = () => {
  let valid = true;
  const errorMessages = { name: '', age: '', gender: '', salary: '', department : '' };

  if (!name) {
    errorMessages.name = 'Name is required';
    valid = false;
  }

  if (!age || isNaN(age) || age <= 0) {
    errorMessages.age = 'Please enter a valid age';
    valid = false;
  }

  if (!gender) {
    errorMessages.gender = 'Gender is required';
    valid = false;
  }

  if (!salary || isNaN(salary) || salary <= 0) {
    errorMessages.salary = 'Please enter a valid salary';
    valid = false;
  }
  if (!department) {
    errorMessages.department = 'Please select dept';
    valid = false;
  }

  setErrors(errorMessages);
  return valid;
};


  const handleSubmit = async (e: any) => {
    e.preventDefault();    

       if(validateForm()) {

    const payload = { Name: name, Age: age, Gender: gender, Salary: salary,  Department : department };
    console.log("payload:", JSON.stringify(payload));

    try{
          const response = await Axios.post('http://localhost:3500/api/create', payload);

          console.log("created : " + response.data);

          dispatch(addPerson(payload));

          setSnackbarMessage(response.data.message);
          
            setColor('success');
    }
    catch(err){  
      console.log("error : " + err);
      setSnackbarMessage('user already exists');
      setColor('error');
    }


    fetchData();
    setOpenCreate(false);   
  } 
};
  const handleCloseSnackbar = () => setSnackbarMessage('');

   
  


  return (
<> 
    <div className='charts'> 
   
    <PieCharts/>  
     <div style={{marginLeft:'10px'}}></div>
    <BarChart/>  
    </div>

    <div>
      <Button className='font-size-header' onClick={handleCreate} style={{display:'flex', backgroundColor:'#072d52', color:'white', marginBottom:'10px', marginLeft:'91%',textTransform: 'capitalize'}}>Create User</Button>
      <MaterialReactTable table={table} />

  {/*<---------------------------------------Create User --------------------------------------------------->*/}
 
  <Dialog maxWidth={width} fullWidth={true} open={openCreate} onClose={() => setOpenCreate(false)}>
  <DialogTitle className='font-size-header'>Create New User</DialogTitle>
  <DialogContent>
 
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div style={{ width: '48%' }}>
        <InputLabel className='label' sx={{ fontSize: "12px" }}>Name</InputLabel>
        <TextField
          sx={{ marginBottom: '5px', '.MuiInputBase-input': { fontSize: '12px' },  width: '100%' }}
          required
          size="small"
          placeholder='Enter Name'
          onChange={handleChangeName}
        />
        {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
      </div>
      <div style={{ width: '48%' }}>
        <InputLabel className='label' sx={{ fontSize: "12px" }}>Age</InputLabel>
        <TextField
          sx={{ marginBottom: '5px', '.MuiInputBase-input': { fontSize: '12px' }, width: '100%' }}
          required
          size="small"
          type="number"
          placeholder='Enter Age'
          onChange={handleChangeAge}
        />
        {errors.age && <span style={{ color: 'red', fontSize: '12px' }}>{errors.age}</span>}
      </div>
    </div>

 
    <div style={{ marginBottom: '6px' }}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" className='font-size'>Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChangeGender}
        >
          <FormControlLabel value="Female" control={<Radio size="small"/>} label="Female" />
          <FormControlLabel value="Male" control={<Radio size="small"/>} label="Male" />
          
        </RadioGroup>
      </FormControl>
    </div>

 
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>

    <div style={{ width: '48%' }}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel sx={{ fontSize: '17px' }}>Department</InputLabel>
          <NativeSelect
            size="small"
            value={department}
            onChange={handleChangeDept}
            sx={{
              width: '100%',
              fontSize: '12px',
              '.MuiOutlinedInput-root': {
                width: '100%',
                height: '45px',
                borderRadius: '4px',
                
                '& fieldset': { borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.23)' },
              },
              '.MuiInputBase-input': { fontSize: '12px', padding: '8px 8px',  marginTop: '-6px', },
            }}
            input={<BootstrapInput />}
          >
            {departments && departments.map((dep) => {
                return (
                  <>
                    <option style={{ fontSize: '12px' }} value={dep.Department}>{dep.Department}</option>
                  </>
                );
              })}
          </NativeSelect>
        </FormControl>
        {errors.department && <span style={{ color: 'red', fontSize: '12px' }}>{errors.department}</span>}
      </div>


      <div style={{ width: '48%', marginTop:'2px'}}>
        <InputLabel className='label' sx={{ fontSize: "12px" }}>Salary</InputLabel>
        <TextField
          sx={{ marginBottom: '5px', '.MuiInputBase-input': { fontSize: '12px' } }}
          required
          size="small"
          type="number"
          placeholder='Enter Salary'
          onChange={handleChangeSalary}
        />
        {errors.salary && <span style={{ color: 'red', fontSize: '12px' }}>{errors.salary}</span>}
      </div>
       
    </div>
  </DialogContent>

  <DialogActions>
    <Button className='font-size' onClick={handleSubmit} sx={{ backgroundColor: '#072d52', color: 'white', textTransform: 'capitalize' }}>
      Save
    </Button>
    <Button className='font-size' onClick={() => setOpenCreate(false)} sx={{ backgroundColor: '#072d52', color: 'white', textTransform: 'capitalize' }}>
      Cancel
    </Button>
  </DialogActions>
</Dialog>








  {/*<---------------------------------------Editing part --------------------------------------------------->*/}
 
  <Dialog
  maxWidth={width}
  fullWidth={true}
  open={openEditDialog}
  onClose={() => setOpenEditDialog(false)}
>
  <DialogTitle className="font-size-header">Edit Row</DialogTitle>
  <DialogContent>
    {editingRow && (
      <>
    
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ width: '48%' }}>
            <InputLabel className="label" sx={{ fontSize: '12px' }}>
              Name
            </InputLabel>
            <TextField
              sx={{
                marginBottom: '5px',
                '.MuiInputBase-input': {
                  fontSize: '12px',
                },
              }}
              required
              value={editingRow.Name}
              onChange={(e) =>
                setEditingRow({
                  ...editingRow,
                  Name: e.target.value,
                })
              }
              id="outlined-basic"
              size="small"
            />
          </div>
          <div style={{ width: '48%' }}>
            <InputLabel className="label" sx={{ fontSize: '12px' }}>
              Age
            </InputLabel>
            <TextField
              sx={{
                marginBottom: '5px',
                '.MuiInputBase-input': {
                  fontSize: '12px',
                },
              }}
              required
              value={editingRow.Age}
              onChange={(e) =>
                setEditingRow({
                  ...editingRow,
                  Age: e.target.value,
                })
              }
              id="outlined-basic"
              size="small"
            />
          </div>
        </div>

    
        <div style={{ marginBottom: '6px' }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" className="font-size">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) =>
                setEditingRow({
                  ...editingRow,
                  Gender: e.target.value,
                })
              }
              value={editingRow.Gender}
            >
              <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
              <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
              
            </RadioGroup>
          </FormControl>
        </div>

     
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ width: '48%' }}>
            <FormControl
              sx={{
                width: '100%',
                m: 1,
                position: 'relative',
                marginLeft: '0px',
                marginTop: '-2px',
              }}
              variant="standard"
            >
              <InputLabel sx={{ fontSize: '17px', marginTop: '6px' }}>
                Department
              </InputLabel>
              <NativeSelect
                value={editingRow.Department || ''}
                size="small"
                onChange={(e) =>
                  setEditingRow({
                    ...editingRow,
                    Department: e.target.value,
                  })
                }
                sx={{
                  width: '100%',
                  fontSize: '12px',
                  '.MuiOutlinedInput-root': {
                    width: '100%',
                    height: '45px',
                    borderRadius: '4px',
                    '& fieldset': {
                      borderWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                  },
                  '.MuiInputBase-input': {
                    fontSize: '12px',
                    padding: '8px 8px',
                  },
                }}
                input={<BootstrapInput />}
              >
                 {departments && departments.map((dep) => {
                return (
                  <>
                    <option style={{ fontSize: '12px' }} value={dep.Department}>{dep.Department}</option>
                  </>
                );
              })}
              </NativeSelect>
            </FormControl>
          </div>
          <div style={{ width: '48%',  marginTop:'5px'}}>
            <InputLabel className="label" sx={{ fontSize: '12px' }}>
              Salary
            </InputLabel>
            <TextField
              sx={{
                marginBottom: '5px',
                '.MuiInputBase-input': {
                  fontSize: '12px',
                },
              }}
              required
              value={editingRow.Salary}
              onChange={(e) =>
                setEditingRow({
                  ...editingRow,
                  Salary: e.target.value,
                })
              }
              id="outlined-basic"
              size="small"
            />
          </div>
        </div>
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button
      className="font-size"
      onClick={handleSaveEdit}
      sx={{ backgroundColor: '#072d52', color: 'white', textTransform: 'capitalize' }}
    >
      Save
    </Button>
    <Button
      className="font-size"
      onClick={() => setOpenEditDialog(false)}
      sx={{ backgroundColor: '#072d52', color: 'white', textTransform: 'capitalize' }}
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>



{/*-------------------------------------------View Part------------------------------------------------------ */}

      <Dialog maxWidth={width} fullWidth={true} open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle className='font-size-header'>View Row</DialogTitle>
        <DialogContent >
          {view && (
            <>
              {Object.keys(view).map((key) => {
                if (key !== 'id') {
                  return (
                    <>
                      <InputLabel className='label' sx={{ fontSize: "12px" }}>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                      <TextField
                       
                        sx={{ marginBottom: '5px', '.MuiInputBase-input': {
                    fontSize: '12px',
                  } }}
                        required
                        disabled
                        key={key}
                        value={(view as any)[key]}
                        onChange={(e) =>
                          setEditingRow({
                            ...view,
                            [key]: e.target.value,
                          })
                        }
                        fullWidth
                        id="outlined-basic"
                        size="small"
                      />
                    </>
                  );
                }
                return null;
              })}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button className='font-size' onClick={() => setOpenView(false)} sx={{ backgroundColor: '#072d52', color: 'white' , textTransform:'capitalize'}}>Close</Button>
          
        </DialogActions>
      </Dialog>


{/*----------------------------------------------Deleting part------------------------------------------*/}
       
      <Dialog open={openDeleteDialog} fullWidth={true} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle className='font-size-header'>Confirm Deletion</DialogTitle>
        <DialogContent className='font-size'>Are you sure you want to delete this row?</DialogContent>
        <DialogActions>

        <Button className='font-size' onClick={handleConfirmDelete} sx={{ backgroundColor: '#072d52', color: 'white', marginRight: '10px',textTransform:'capitalize', marginLeft:'20px' }}>
            Delete
          </Button>
          <Button className='font-size' onClick={() => setOpenDeleteDialog(false)} sx={{ backgroundColor: '#072d52', color: 'white', textTransform:'capitalize' }}>Cancel</Button>
           
        </DialogActions>
      </Dialog>

   
      {/* <Snackbar
        style={{ background: 'green' }}
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

      /> */}

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={color==="error" ? 'error':'success'} sx={{ width: '100%', color:"#fff" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    </>
  );

};

export default Table;
