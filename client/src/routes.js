import React from "react"
import { Routes, Route, Redirect } from 'react-router-dom'
import { StartPage } from "./pages/Start/StartPage"
import { NewPage } from "./pages/New/NewPage"

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/new" element={<NewPage />} />
    </Routes>
  )
}