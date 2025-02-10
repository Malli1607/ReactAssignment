import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, MRT_Row, useMaterialReactTable } from 'material-react-table';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, InputLabel, DialogProps, Alert, styled, InputBase, FormControl, NativeSelect, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './table.css';
import  Axios  from 'axios';
import { GrFormView } from "react-icons/gr";
import { RootState } from '../redux/store';
import { setDepartments, addDepartment, updateDepartment, deleteDepartment } from '../redux/deptSlice';
import { useDispatch, useSelector } from 'react-redux';
  
let department : any;
let description : any;
 
const DeptTable = () => {
  // const [initdata, setData] = useState<Person[]>(data);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [width, setWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [color, setColor] = useState('');
  const [openCreate, setOpenCreate] = useState(false);





  const [errors, setErrors] = useState({
     
    department : '',
    description : ''
  });

  const dispatch = useDispatch();
  const departments:any[] = useSelector((state : RootState) => state.department.department);

  console.log("Departments : " +  JSON.stringify(departments));


  const fetchData = async () => {


    try {
             console.log("fetch")
      const response = await Axios.get('http://localhost:3001/api/allDepartments');

      // console.log("Data : " + JSON.stringify(response.data));

      // response.data.users.forEach((user:any )=> {
      //   console.log("id: " + user._id);
      //   console.log("id: " + user.isDeleted);
      // });
      console.log("response" + JSON.stringify(response.data));

      const dept = response.data.Departments.map((dep: any) => ({
        id: dep._id,
        Department : dep.Department,
        Description : dep.Description

      }));

      console.log("departments : " + JSON.stringify(dept));
      // setData(users);
      dispatch(setDepartments(dept));
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };


  useEffect(() => {
     
    fetchData();
  }, []); 
  
  

  const columns = useMemo(() => {
    const createColumnsFromData = (data: any[]): MRT_ColumnDef<any, any>[] => {
      let columnNames: string[] = [];
      let actionColumn: MRT_ColumnDef<any, any> | null = null;
  
       
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
          Cell: ({ row }: { row: MRT_Row<any> }) => (
            <div>
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(row)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ),
        };
      }
  
      
      const columnsWithoutAction: MRT_ColumnDef<any, any>[] = columnNames.map((key) => {
        
        const validKey = key as string;
  
        return {
          accessorKey: validKey,
          header: validKey.charAt(0).toUpperCase() + validKey.slice(1), 
          size: 150,
    
        };
      });
  
      
      if (actionColumn) {
        columnsWithoutAction.push(actionColumn);
      }
  
      return columnsWithoutAction;
    };
  
    return createColumnsFromData(departments);
  }, [departments]);
  

  const table = useMaterialReactTable({
    columns: [...columns],   
    data: departments,
    
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

  
  const handleEdit = (row: MRT_Row<any>) => {

    setEditingRow({ ...row.original});
    setOpenEditDialog(true);

  };

  const handleDelete = (row: MRT_Row<any>) => {

    setRowToDelete(row.original);
    setOpenDeleteDialog(true);

  };

   
  const handleSaveEdit = async () => {
    if (editingRow) {
      // setData(prevData =>
      //   prevData.map(item =>
      //     item.id === editingRow.id ? { ...editingRow } : item
      //   )
      // );

     const payload = {Department:editingRow.Department, Description : editingRow.Description, id : editingRow.id};
     
     console.log("payload on edit:" + JSON.stringify(payload));

     const response = await Axios.put('http://localhost:3001/api/update', payload);
     console.log(response.data);

     dispatch(updateDepartment(payload));

      setSnackbarMessage('Row updated successfully');
      setOpenEditDialog(false);
      setColor('success');
    }
  };

  const handleConfirmDelete = async () => {
    if (rowToDelete) {
      
      // setData(prevData => prevData.filter(item => item.id !== rowToDelete.id));
  
      
      dispatch(deleteDepartment(rowToDelete.id));
  
   
      const response = await Axios.delete('http://localhost:3001/api/delete', { data: { id: rowToDelete.id } });
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
   department = e.target.value;
  setErrors((prevErrors) => ({ ...prevErrors, department: '' }));
}
const handleChangeAge = (e : any) =>{
 description = e.target.value;
 setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
}
 

const validateForm = () => {
  let valid = true;
  const errorMessages = {department : '', description : ''};

  
  if (!department) {
    errorMessages.department = 'Please select dept';
    valid = false;
  }
  if(!description){
    errorMessages.description = 'please ente descript'
  }

  setErrors(errorMessages);
  return valid;
};


  const handleSubmit = async (e: any) => {
    e.preventDefault();    

       if(validateForm()) {

    const payload = {Department : department, Description : description };
    console.log("payload:", JSON.stringify(payload));

    try{
          const response = await Axios.post('http://localhost:3001/api/create', payload);
          console.log("created : " + response.data);
          dispatch(addDepartment(payload));
          setSnackbarMessage(response.data.message);
          setColor('success');
    }
    catch(err) {  

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
    <div>
      <Button className='font-size-header' onClick={handleCreate} style={{display:'flex', backgroundColor:'#072d52', color:'white', marginBottom:'10px', marginLeft:'86.2%',textTransform: 'capitalize'}}>Create Department</Button>
      <MaterialReactTable table={table} />

  {/*<---------------------------------------Create User --------------------------------------------------->*/}
 
  <Dialog maxWidth={width} fullWidth={true} open={openCreate} onClose={() => setOpenCreate(false)}>
  <DialogTitle className='font-size-header'>Create New Department</DialogTitle>
  <DialogContent>
 
    <div style={{marginBottom: '10px' }}>
      <div>
        <InputLabel className='label' sx={{ fontSize: "12px" }}>DeptName</InputLabel>
        <TextField
          sx={{ marginBottom: '5px', '.MuiInputBase-input': { fontSize: '12px', padding:'10px 10px' },  width: '100%'}}
          required
          fullWidth
          placeholder='Enter Dept'
          onChange={handleChangeName}
        />
        {errors.department && <span style={{ color: 'red', fontSize: '12px' }}>{errors.department}</span>}
      </div>
      <div>
        <InputLabel className='label' sx={{ fontSize: "12px" }}>Description</InputLabel>
        <textarea
        className='text-area'
          style={{width:'100%', height:'80px'}}
          required
          placeholder='Enter Description'
          onChange={handleChangeAge}
        />
        {errors.description && <span style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>}
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
    
        <div style={{marginBottom: '10px' }}>
          <div  >
            <InputLabel className="label" sx={{ fontSize: '12px' }}>
              DeptName
            </InputLabel>
            <TextField
              sx={{
                marginBottom: '5px',
                '.MuiInputBase-input': {
                  fontSize: '12px',
                  padding: '10px 10px'
                },
              }}
              required
              value={editingRow.Department}
              onChange={(e) =>
                setEditingRow({
                  ...editingRow,
                  Department: e.target.value,
                })
              }
              id="outlined-basic"
              fullWidth
            />
          </div>
          <div>
            <InputLabel className="label" sx={{ fontSize: '12px' }}>
              Description
            </InputLabel>
            <textarea
              className='text-area'
              
              required
              value={editingRow.Description}
              onChange={(e) =>
                setEditingRow({
                  ...editingRow,
                  Description: e.target.value,
                })
              }
              id="outlined-basic"
               
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

export default DeptTable;
