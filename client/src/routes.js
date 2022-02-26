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
  
  let routesList = [
    {comp:<AuthPage />,                  path:"/",                           exact:true,  auth:false},
    {comp:<StartPage />,                 path:"/",                           exact:false, auth:true},
    {comp:<BannersPage />,               path:"/banners",                    exact:true,  auth:true},
    {comp:<ContentsPage />,              path:"/contents",                   exact:true,  auth:true},
    {comp:<MediaplansPage />,            path:"/mediaplans",                 exact:true,  auth:true},
    {comp:<TickersPage />,               path:"/tickers",                    exact:true,  auth:true},
    {comp:<UsersPage />,                 path:"/users",                      exact:true,  auth:true},
  ]

  let routesDisplay = routesList.map(r => {
      if (isAuthenticated === r.auth)
          if (r.exact === true)
              return <Route path={r.path} element={r.comp} key={r.comp + r.path} exact/>
          else
              return <Route path={r.path} element={r.comp} key={r.comp + r.path} />
      return <Route key={r.comp + r.path}/>
  })
  

  return (
    <div className="row">
        
        <div className="col s9 m9 l9 xl9">
            {isAuthenticated && <Sidebar /> }

            <Routes>
                {routesDisplay}
            </Routes>
        </div>
    </div>
  )
}

/*
              {
                (isAuthenticated) && <Route path="/" element={<StartPage/>} />
              }
              {
                (!isAuthenticated) && <Route path="/" element={<AuthPage/>} />
              }
              */