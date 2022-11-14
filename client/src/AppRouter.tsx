import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./screeens"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default AppRouter
