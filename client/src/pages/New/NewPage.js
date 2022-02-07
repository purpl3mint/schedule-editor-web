import React, { useCallback, useEffect} from "react"
import { Sidebar } from "../../components/Sidebar"
import Grid from '@mui/material/Grid';

export const NewPage = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8}>
        <h1>Новое расписание</h1>
        <div>
          <span>To be done</span>
        </div>
      </Grid>
    </Grid>
  )
}