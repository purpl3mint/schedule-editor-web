import React, { useCallback, useEffect} from "react"
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

function createData(name, type) {
  return { name, type};
}

const rows = [
  createData('La-La-La', 'Video'),
  createData('Somebodys watching me', 'URL'),
  createData('Dog', 'Image'),
  createData('Schedule', 'Text'),
  createData('La-La-La', 'Video'),
  createData('Somebodys watching me', 'URL'),
  createData('Dog', 'Image'),
  createData('Schedule', 'Text'),
  createData('La-La-La', 'Video'),
  createData('Somebodys watching me', 'URL'),
  createData('Dog', 'Image'),
  createData('Schedule', 'Text'),
  createData('La-La-La', 'Video'),
  createData('Somebodys watching me', 'URL'),
  createData('Dog', 'Image'),
  createData('Somebodys watching me', 'URL'),
  createData('Dog', 'Image'),
];

function ContentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={3} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
  );
}

export const Sidebar = () => {

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <h2 className="sidebar__title">Библиотека контента</h2>
      <Button className="sidebar__add-content" variant="contained">Добавить новый контент</Button>

      <FormControl>
        <FormLabel id="sidebar__content-type">Тип контента</FormLabel>
        <RadioGroup
          aria-labelledby="sidebar__content-type"
          defaultValue="all"
          name="content-type-sidebar"
          row
        >
          <FormControlLabel value="all" control={<Radio />} label="Все" />
          <FormControlLabel value="url" control={<Radio />} label="URL" />
          <FormControlLabel value="video" control={<Radio />} label="Видео" />
          <FormControlLabel value="images" control={<Radio />} label="Изображения" />
          <FormControlLabel value="text" control={<Radio />} label="Текст" />
        </RadioGroup>
      </FormControl>

      <Button className="sidebar__select" variant="contained">Выбрать</Button>
      <div className="sidebar__content">
        <ContentTable />
      </div>
    </div>
  )
}