import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, Checkbox, TablePagination, CircularProgress } from '@material-ui/core'

const OutcomeTable = ({outcomeDetail, isSelected, rowsPerPage2, page2, handleChangePage2, handleChangeRowsPerPage}) => {
    return (
      <Paper id="tablasO" style={{width:"80%", margin: "1em auto", padding:"1em"}}>
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
          count={outcomeDetail ? outcomeDetail.length : 0}
          rowsPerPage={rowsPerPage2}
          page={page2}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage2}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  )
}
//PAGINATION, poner una funcion para cada componen
export default OutcomeTable
