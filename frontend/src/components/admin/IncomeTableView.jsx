import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, TablePagination, CircularProgress } from '@material-ui/core'
const IncomeTable = ({incomeDetail, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage}) => {
  return (
      <Paper id="tablas" style={{width:"80%", margin: "1em auto", padding:"1em"}}>
      <h2 >Tabla de ingresos</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeDetail ? incomeDetail.map((concept, k) => {
            return (
              (k < ((page * 5) + 5) && k >= (page * 5)) ? 
              <TableRow key={k}>
                <TableCell component="th" scope="row">
                    {concept.incomeConcept}
                </TableCell>
                <TableCell align="right">${concept.incomeValue}</TableCell>
              </TableRow> : ""
            );
          }) : <TableRow>
                <TableCell component="th" scope="row">
                  Cargando datos
                </TableCell>
                <TableCell component="th" scope="row">
                  <CircularProgress color="secondary" style={{margin:"1em"}}/>
                </TableCell>
              </TableRow>}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5]}
          component="Table"
          count={incomeDetail ? incomeDetail.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  )
}

export default IncomeTable
