import React from 'react'
import { Outlet } from "react-router-dom"
import { NavBar } from '../components/NavBar'

const Main = () => {
  return (
    <div>
        <NavBar/>
        <Outlet />
        <main>Main Content</main>
        <footer> Footer </footer>
        </div>
  )
}

export default Main