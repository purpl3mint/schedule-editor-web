import React from "react"
import { Routes, Route } from 'react-router-dom'
import { StartPage } from "./pages/Start/StartPage"
import { AuthPage } from "./pages/Auth/AuthPage"
import { BannersPage } from "./pages/Banners/BannersPage"
import { ContentsPage } from "./pages/Contents/ContentsPage"
import { MediaplansPage } from "./pages/Mediaplans/MediaplansPage"
import { TickersPage } from "./pages/Tickers/TickersPage"
import { UsersPage } from "./pages/Users/UsersPage"
import { Sidebar } from "./components/Sidebar"

export const useRoutes = (isAuthenticated) => {

  return (
    <div className="row">
        
        <div className="col s9 m9 l9 xl9">
            {isAuthenticated && <Sidebar /> }

            {!isAuthenticated && 
            <Routes>
              <Route path="/*" element={<AuthPage />} />
            </Routes>
            }

            {isAuthenticated &&
            <Routes>
              <Route path="/">
                <Route path="*" element={<StartPage />} />
                <Route path="banners" element={<BannersPage />} />
                <Route path="contents" element={<ContentsPage />} />
                <Route path="mediaplans" element={<MediaplansPage />} />
                <Route path="tickers" element={<TickersPage />} />
                <Route path="users" element={<UsersPage />} />
              </Route>
            </Routes>
            }
        </div>
    </div>
  )
}