import React from 'react'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'
const Dashboard = () => {
  return (

   
        <div className="row">
            <aside className='col-3'>
            <Sidebar/>
            </aside>
            <section className='col-9'>
             <DashboardContent/>
            </section>
        </div>
    
   
  )
}

export default Dashboard