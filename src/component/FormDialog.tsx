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
import { IconButton, NativeSelect, Tooltip } from '@mui/material';
import { IoMdPersonAdd } from "react-icons/io";
import './FormDailog.css';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Style } from '@mui/icons-material';

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
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

interface FormDailogProps{
  isHovered: boolean;
}

  const FormDialog:React.FC<FormDailogProps> = ({isHovered})  => {
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
  

  const handleChange1 = (event: any, index: number) => {
    
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
  const getTextAlign = (dataType: string) => {
    if (dataType === 'number' || dataType === 'date') {
      return  'right' } ;  
      
    return 'left' ;  
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    const newColumns: any[] = inputRows.map((row) => ({    
      header: row.header,
      dataType : row.dataType,
      accessorKey : row.accessorKey,
      muiTableBodyCellProps: {
        style: {  
          textAlign: getTextAlign(row.dataType),
          border: '1px solid rgba(81, 81, 81, .5)',
        },
      },
      
      muiTableHeadCellProps: { style: { textAlign: 'left',  border: '1px solid rgba(81, 81, 81, .5)',   backgroundColor: '#044F74'} },
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
    <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight:'70px', marginTop:'-64px', height:'37px' }}> 
      {isHovered &&
    <Tooltip title="Add Column"> 
      <IconButton  onMouseDown={
        (e) => {e.stopPropagation()
        handleClickOpen()}}
       
        >
        <FcAddColumn style={{color: 'black'}} />
      </IconButton>
      </Tooltip>}
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
              <div className='multi'> 
              <FormControl sx={{ width: '49%' }} variant="outlined" margin="dense">
              <InputLabel htmlFor={`column-name-${index}`} sx={{ fontSize: "12px", marginTop:'-27px', marginLeft :'-12px'}}>
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
         
          <FormControl sx={{ width: '49%',m:1,  position: 'relative', top: '-5px'}} variant="standard">
          
            <InputLabel sx={{ fontSize: '17px', marginLeft:'2px', marginTop:'2px' }} id={`demo-simple-select-${index}-label`}>
              Data Types
            </InputLabel>

          
            <NativeSelect  
               
              id={`demo-simple-select-${index}`}
              value={row.dataType}
              size="small"
              onChange={(e) => handleChange1(e, index)}
              sx={{
                width: '100%',   
                fontSize: '12px',   
                '.MuiOutlinedInput-root': {
                  width: '100%',
                  padding: '10px',
                  height: '45px',  
                  borderRadius: '4px', 
                  '& fieldset': {
                    borderWidth: 1,  
                    borderColor: 'rgba(0, 0, 0, 0.23)',  
                  },
                },
                '.MuiInputBase-input': {
                  fontSize: '12px',  
                  padding: '6px 8px',  
                },
                 
              }}
               input={<BootstrapInput/>}
            >
              <option style={{fontSize:'12px'}}  value="number">Number</option>
              <option style={{fontSize:'12px'}} value="text">Text</option>
              <option style={{fontSize:'12px'}} value="date">Date</option>
            </NativeSelect>
          </FormControl>
          </div>

           <div className='button-container'> 
              <IconButton className="table-btn" onClick={() => handleRemoveRow(index)} style={{ marginTop: '25px',  }}>
                <FaMinusCircle color="black" style={{width:'15px'}} />
              </IconButton>

              <IconButton onClick={handleAddRow} style={{ marginTop: '25px' , }}>
                <FaCirclePlus color="black" style={{width:'15px'}} />
              </IconButton>
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type="submit" style={{width:'52px', marginBottom:'10px', fontSize:'12px'}}>Save</Button>
          <Button variant='contained' style={{width:'52px', marginRight:'15px', marginBottom:'10px', fontSize:'12px'}} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    {isHovered &&
      <Tooltip title="Add Data">
      <IconButton onMouseDown={
        (e) => {e.stopPropagation()
        handleEditOpen()}}
       
        >
        <IoMdPersonAdd style={{ width: '20px', fontSize: '20px', color: 'gray' }} />
      </IconButton>
      </Tooltip>}

 
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        PaperProps={{
          sx: { width: '100%', maxWidth: '720px!important' },
        }}
      >
      <DialogTitle style={{ fontSize: '14px', color: 'black' }}>
        Add Data
      </DialogTitle>
      <DialogContent>
    
  {columnsData.map((row, index) => (
    <div key={index} className="edit-container">
      {columns.length > 0 ? (
        columns.map((col) => (
          <div key={col.accessorKey} className='multi1'>
            {data.length > 0 ? (
              data.map((item, itemIndex) => {
                if (index === itemIndex) {
                  return (
                    <FormControl sx={{ width: '48%',   }}  required variant="outlined" margin="dense">
                    <InputLabel
                      htmlFor={`column-name-${index}`}
                      sx={{
                        fontSize: '12px',
                        marginTop: '-25px',
                        marginLeft: '-12px',
                      }}
                    >
                      Enter {col.header}
                    </InputLabel>
                  
                    <TextField
                    margin="dense"
                    id={`edit-accessor-key-${index}`}
                    key={col.accessorKey}
                    size="small"
                    value={item[col.accessorKey] || ''}   
                    placeholder={`Enter ${col.header}`}
                    required
                    type="text"
                    inputProps={{
                      style: { fontSize: 12 },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 12 },
                    }}
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
                    variant="outlined"
                    onChange={(e) => handleChangeName2(e, itemIndex, col.accessorKey)}
                  />
                  </FormControl>
                  
                  );
                }
                return null;   
              })
            ) : (
              <FormControl sx={{ width: '48%',   }} variant="outlined" margin="dense">
                    <InputLabel
                      htmlFor={`column-name-${index}`}
                      sx={{
                        fontSize: '12px',
                        marginTop: '-25px',
                        marginLeft: '-12px',
                      }}
                    >
                      Enter {col.header}
                    </InputLabel>
                  
                    <TextField
                      margin="dense"
                      id={`edit-accessor-key-${index}`}
                      key={col.accessorKey}
                      size='small'
                      required
                      placeholder={`Enter ${col.header}`}
                      type="text"
                      inputProps={{
                        style: { fontSize: 12 },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 12 },
                      }}
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
                      variant="outlined"  
                      onChange={(e) => handleChangeName2(e, index, col.accessorKey)}
                    />
                  </FormControl>
            )}
          </div>
        ))
      ) : <div>No columns Added</div>}
 
 { columns.length > 0 ? 
      <div className='button-container'>
        <IconButton className="table-btn" onClick={() => handleRemoveCard(index)} style={{ marginTop: '35px' }}>
          <FaMinusCircle color="black" style={{width:'15px'}} />
        </IconButton>
        <IconButton onClick={handleAddCard} style={{ marginTop: '35px' }}>
          <FaCirclePlus color="black" style={{width:'15px'}} />
        </IconButton>
      </div>
      : ''}
    </div> 
  ))}

  </DialogContent>
 
  <DialogActions>
  
  {columns.length > 0 ? 
    <Button variant='contained' type="submit" style={{width:'52px', marginTop:'-20px', marginBottom:'10px',  fontSize:'12px'}} onClick={handleSaveEdit}>Save</Button> :
    <Button variant='contained' disabled type="submit" style={{width:'52px', marginTop:'-20px', marginBottom:'10px',  fontSize:'12px'}} onClick={handleSaveEdit}>Save</Button> }
    <Button variant='contained' style={{width:'52px', marginRight:'15px',marginTop:'-20px', marginBottom:'10px', fontSize:'12px'}} onClick={handleEditClose}>Close</Button>
  </DialogActions>
</Dialog>
</div>

 
 
  <div className="table-container">   
    <MaterialReactTable
      columns={columns}
      data={tableData}
      muiTableProps={{
        style: {
          borderCollapse: 'collapse',
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          tableLayout: 'fixed',
          border: '1px solid rgba(81, 81, 81, .5)',
        },
      }}
      muiTableHeadCellProps={{
        className: 'custom-header',
        style: {
          backgroundColor: '#044F74',
          padding: '12px',
          borderBottom: '1px solid #ddd',
          textAlign: 'left',
           border: '1px solid rgba(81, 81, 81, .5)'
        },
      }}
      muiTableBodyCellProps={{
        style: {
          padding: '10px',
          borderBottom: '1px solid #ddd',
          borderRight: '1px solid #dfc',
          border: '1px solid rgba(81, 81, 81, .5)',
        },
      }}
    />
  </div>     
    </>
  );
}

export default FormDialog;