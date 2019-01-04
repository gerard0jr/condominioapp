import React from 'react'

const Dashboard = ({name,role,job,residenceName, income,outcome}) => {
  return (
    <div>
        My Dashboard
        <p>{residenceName}</p>
        <p>Ingresos: {income}</p>
        <p>Gastos: {outcome}</p>
    </div>
  )
}

export default Dashboard