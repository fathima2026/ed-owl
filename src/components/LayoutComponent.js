import React from 'react'
import { Outlet } from "react-router-dom"
const LayoutComponent = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default LayoutComponent