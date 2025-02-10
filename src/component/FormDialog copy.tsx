import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FaCirclePlus } from 'react-icons/fa6';
import { FaMinusCircle } from 'react-icons/fa';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { tableColumnData, ColumnData } from './columnData';
import { FcAddColumn } from "react-icons/fc";
import { IconButton } from '@mui/material';
import { IoMdPersonAdd } from "react-icons/io";
import './FormDailog.css';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [inputRows, setInputRows] = React.useState<ColumnData[]>(tableColumnData);
  const [columns, setColumns] = React.useState<ColumnData[]>([]);
  const [tableData, setTableData] = React.useState<Record<string, any>[]>([]);

  const [data, setData] = React.useState<Record<string, any>[]>([{name:""}]);

   

  const [columnsData, setColumnsData] = React.useState([
    { name: '' },  
  ]);


  useEffect(() => {
    console.log("columnsData :" + columns[1]);
  }, [columns]);

  

  const handleChangeName2 = (e: any, index: number, key: string) => {
    const updatedTableData = data.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [key]: e.target.value };  
      }
      return row;
    });
  
    setData(updatedTableData);  
  };
  
  
  
  
  

  const handleAddCard = () => {
     
     
     setColumnsData([...columnsData, { name: ' ' }]);

     setData([...data, {name : ""}]);

     console.log("length : "+data.length);
     //setInputRows([...inputRows, { header: '', dataType: 'text', accessorKey: '' }]);
  };

  
  useEffect(() => {
    console.log("Columns Data:", columnsData);   
  }, [columnsData]);

  
  useEffect(() => {
    console.log("Updated data length:", data.length);   
  }, [data]);
  
  
  
  const handleRemoveCard = (index: number) => {
    const newRows = [...columnsData];
    if (newRows.length > 1) {
      newRows.splice(index, 1);
      setColumnsData(newRows);
    }
  
    const updatedTableData = data.filter((_, rowIndex) => rowIndex !== index);
    setData(updatedTableData);  

    console.log("On reMove : " + JSON.stringify(tableData));
  };
  

  const handleChange1 = (event: SelectChangeEvent<string>, index: number) => {
    
    const updatedRows = [...inputRows];
    updatedRows[index].dataType = event.target.value;
    setInputRows(updatedRows);
  };

  const handleChangeName = (event: any, index: number) => {
    const updatedRows = [...inputRows];
    updatedRows[index].header = event.target.value;
    updatedRows[index].accessorKey = event.target.value.toLowerCase().replace(/\s+/g, '_');   
    setInputRows(updatedRows);
  };

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    const newColumns: any[] = inputRows.map((row) => ({    
      header: row.header,
      dataType : row.dataType,
      accessorKey : row.accessorKey
    }));
    setColumns(newColumns);

    setTimeout(() =>{
      console.log("On save" + JSON.stringify(columns));
    }
    )
     
    // const newAccessorKeys = inputRows.map((row) => row.accessorKey);
    // setAccessorKeys(newAccessorKeys);
    setOpen(false);
     
    setTimeout(() => {
      console.log("columns after update:", columns); 
    }, 0); 
  };

  const handleAddRow = () => {
    setInputRows([...inputRows, { header: '', dataType: 'text', accessorKey: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    const newRows = [...inputRows];
    if (newRows.length > 1) {
      newRows.splice(index, 1);
      setInputRows(newRows);
    }
  };

  const handleEditOpen = () => setEditDialogOpen(true);

  const handleEditClose = () => setEditDialogOpen(false);

  const handleSaveEdit = () => {
    const updatedTableData = data.map((row, rowIndex) => {
      const updatedRow: Record<string, any> = {};
  
      columns.forEach((col) => {
        
        if (row[col.accessorKey] !== undefined) {
          updatedRow[col.accessorKey] = row[col.accessorKey]; 
        } else {
          updatedRow[col.accessorKey] = '';   
        }
      });
  
      return updatedRow;
    });
  
    setTableData(updatedTableData);   
    handleEditClose();  
  };
  
  //-----------------------------------Matrial react table-------------------------------------//


//   const transformedColumns = columns.map((item) => ({
//     accessorKey: item.accessorKey,   
//     header: item.header,             
//     size: 150,                      
//   }
   
// ));
 
  // const table = useMaterialReactTable({
  //   columns: transformedColumns,
  //   data: columns,   
  // });
  

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <FcAddColumn style={{color: 'gray' }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
          sx: { width: '100%', maxWidth: '720px!important' },
        }}
      >
        <DialogTitle style={{ fontSize: '14px', color: 'black' }}>Add Column Names</DialogTitle>
        <DialogContent>
          {inputRows.map((row, index) => (
            <div key={index} className="text-name">
              
              <FormControl sx={{ width: '40%' }} variant="outlined" margin="dense">
 
  <InputLabel htmlFor={`column-name-${index}`} sx={{ fontSize: "14px", marginTop:'-27px', marginLeft :'-12px'}}>
    Enter Name
  </InputLabel>

  
  <TextField
    autoFocus
    variant="outlined"
    size="small"
    placeholder='Enter Name'
    required
    id={`column-name-${index}`}
    value={row.header}
    type="text"
    inputProps={{ style: { fontSize: 12 } }}
    InputLabelProps={{ style: { fontSize: 12 } }}
    sx={{
      width: '100%',
      marginTop: '10px',  
      '.MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: 1,  
        },
      },
      '.MuiInputBase-input': {
        fontSize: '1.25rem',
      },
    }}
    onChange={(e) => handleChangeName(e, index)}
  />
</FormControl>
<FormControl sx={{ width: '40%', marginTop: 1 }} variant="outlined">
  {/* Label separately from the Select component */}
  <InputLabel sx={{ fontSize: '14px',position: 'absolute', left: '20px', top: '-10px'  }} id={`demo-simple-select-${index}-label`}>
    Data Types
  </InputLabel>

  {/* Select component with full width and outline */}
  <Select
    labelId={`demo-simple-select-${index}-label`}
    id={`demo-simple-select-${index}`}
    value={row.dataType}
    size='small'
    onChange={(e) => handleChange1(e, index)}
    sx={{
      width: '100%', // Full width
      fontSize: '12px', // Adjust font size
      marginTop: '8px',
      '.MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: 1,  
        },
      },
      '.MuiInputBase-input': {
        fontSize: '1.25rem',
      },
      '.MuiSelect-root': {
        width: '100%', // Ensure the select takes full width
      },
    }}
    label="Data Types"
  >
    <MenuItem value="number">Number</MenuItem>
    <MenuItem value="text">Text</MenuItem>
    <MenuItem value="date">Date</MenuItem>
  </Select>
</FormControl>

              <IconButton className="table-btn" onClick={() => handleRemoveRow(index)} style={{ marginTop: '25px', marginLeft:'10px' }}>
                <FaMinusCircle color="black" style={{width:'15px'}} />
              </IconButton>

              <IconButton onClick={handleAddRow} style={{ marginTop: '25px' , marginLeft:'10px'}}>
                <FaCirclePlus color="black" style={{width:'15px'}} />
              </IconButton>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type="submit">Save</Button>
          <Button variant='contained' onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <IconButton onClick={handleEditOpen}>
        <IoMdPersonAdd style={{ width: '20px', fontSize: '20px', color: 'gray' }} />
      </IconButton>

 
      <Dialog
  open={editDialogOpen}
  onClose={handleEditClose}
  PaperProps={{
    sx: { width: '100%', maxWidth: '720px!important' },
  }}
>
  <DialogTitle style={{ fontSize: '14px', color: 'black' }}>
    Edit Column Names
  </DialogTitle>
  <DialogContent>
    
  {columnsData.map((row, index) => (
    <div key={index} className="edit-container">
      {columns.length > 0 ? (
        columns.map((col) => (
          <div key={col.accessorKey} className="text-name">
            {data.length > 0 ? (
              data.map((item, itemIndex) => {
                if (index === itemIndex) {
                  return (
                    <TextField
                      margin="dense"
                      id={`edit-accessor-key-${index}`}
                      key={col.accessorKey}
                      value={item[col.accessorKey] || ' '}   
                      label={col.header}
                      type="text"
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      sx={{
                        width: '200px',
                        marginLeft: '20px',
                        '.MuiInputBase-input': { fontSize: '1.25rem' },
                      }}
                      variant="standard"
                      onChange={(e) => handleChangeName2(e, itemIndex, col.accessorKey)}  
                    />
                  );
                }
                return null;   
              })
            ) : (
              <TextField
                margin="dense"
                id={`edit-accessor-key-${index}`}
                key={col.accessorKey}
                label={col.header}
                type="text"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                sx={{
                  width: '200px',
                  marginLeft: '20px',
                  '.MuiInputBase-input': { fontSize: '1.25rem' },
                }}
                variant="standard"
                onChange={(e) => handleChangeName2(e, index, col.accessorKey)}  
              />
            )}
          </div>
        ))
      ) : null}

      <div>
        <Button className="table-btn"  style={{ marginTop: '35px' }}>
          <FaMinusCircle color="black" />
        </Button>
        <Button onClick={handleAddCard} style={{ marginTop: '35px' }}>
          <FaCirclePlus color="black" />
        </Button>
      </div>
    </div>
  ))}

  </DialogContent>
 
  <DialogActions>
  
    <Button variant='contained' type="submit" onClick={handleSaveEdit}>Save</Button>
          <Button variant='contained' onClick={handleEditClose}>Close</Button>
  </DialogActions>
</Dialog>

    <MaterialReactTable columns={columns} data={tableData} />
    </>
  );
}
