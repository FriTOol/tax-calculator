import React from 'react'
import {CssBaseline, Container} from '@material-ui/core/'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import routeConfig from './routes'
import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter basename={'tax'}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Switch>
          {routeConfig.map((route, index) => (
            <Route
              key={index}
              {...route}
            />
          ))}
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
