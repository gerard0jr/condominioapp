import React from 'react'
import { Paper, CircularProgress, Button } from '@material-ui/core';
import IncomeTable from '../admin/IncomeTable';
import OutcomeTable from '../admin/OutcomeTable';
import { Link } from 'react-router-dom'

const Dashboard = ({reports, residence, name,role,job,residenceName, income,outcome, handleChangePage, handleChangeRowsPerPage,
                    page, page2, rowsPerPage, rowsPerPage2, incomeDetails, outcomeDetails, handleChangePage2}) => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  switch(month){
    case 1:
    month = "Enero"
    break
    case 2:
    month = "Febrero"
    break
    case 3:
    month = "Marzo"
    break
    case 4:
    month = "Abril"
    break
    case 5:
    month = "Mayo"
    break
    case 6:
    month = "Junio"
    break
    case 7:
    month = "Julio"
    break
    case 8:
    month = "Agosto"
    break
    case 9:
    month = "Septiembre"
    break
    case 10:
    month = "Octubre"
    break
    case 11:
    month = "Noviembre"
    break
    case 12:
    month = "Diciembre"
    break
    default:
    month = ""
  }
  let year = dateObj.getUTCFullYear();                    
  return (
    <div style={{marginTop:"4em"}}>
        <div className="financialData">
          <div className="income-outcome">
            <Paper className="paper">
              <div className="card-titles">
                Datos financieros
              </div> 
              {income ? <div className="prices">
                          <p>Ingresos totales: <p>${income}</p></p>
                          <p>Egresos totales: <p>${outcome}</p></p>
                          <div><small style={{color: "gray",fontStyle: "italic"}}>{month} {year}</small></div>
                        </div> : 
                        <div>
                          <p>Cargando datos... <CircularProgress/></p> 
                        </div>}
            </Paper>
            <Paper className="paper">
              <div className="card-titles">
                Reportes
              </div>
                {reports ? reports.map(report => <div>
                  <p>{report.description}</p>
                </div>) : 
                <div>
                  <p>Cargando datos... <CircularProgress/></p> 
                </div>}
              <Link style={{textDecoration:"none"}} to="/app/addReport">
                <Button variant="contained" color="secondary" style={{margin:"1em"}}>
                    Agregar reporte
                </Button>
              </Link>
            </Paper>
          </div>
            <div className="margin-tables">
              <div>
                  <IncomeTable style={{width:"100%"}} handleChangePage={handleChangePage} 
                  handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} 
                  rowsPerPage={rowsPerPage} {...residence} incomeDetails={incomeDetails}/>
              </div>
              <div>
                  <OutcomeTable style={{width:"100%"}} handleChangePage2={handleChangePage2} 
                  handleChangeRowsPerPage={handleChangeRowsPerPage} page2={page2} 
                  rowsPerPage2={rowsPerPage2} {...residence} outcomeDetails={outcomeDetails}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard