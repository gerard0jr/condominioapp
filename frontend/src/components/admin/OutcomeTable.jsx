import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, Checkbox, TablePagination } from '@material-ui/core'
const OutcomeTable = ({outcomeDetail, isSelected, rowsPerPage, page2, handleChangePage, handleChangeRowsPerPage}) => {
  return (
      <Paper style={{width:"80%", margin: "1em auto", padding:"1em"}}>
      <h2 >Tabla de egresos</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outcomeDetail ? outcomeDetail.map((concept, k) => {
            return (
              (k < ((page2 * 5) + 5) && k >= (page2 * 5)) ? <TableRow key={k}>
            <TableCell component="th" scope="row">
                {concept.outcomeConcept}
            </TableCell>
            <TableCell align="right">${concept.outcomeValue}</TableCell>
            </TableRow> : ""
            );
          }) : <p>Cargando...</p>}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5]}
          component="Table"
          count={outcomeDetail ? outcomeDetail.length : 0}
          rowsPerPage={rowsPerPage}
          page={page2}
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
//PAGINATION, poner una funcion para cada componen
export default OutcomeTable
