import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import AddPage from './pages/Country/AddPage'
import EditPage from './pages/Country/EditPage'

type Route = {
  path: string;
  component: React.FC;
  exact?: boolean;
}

const routes: Route[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/country/add',
    component: AddPage,
  },
  {
    path: '/country/edit/:id',
    component: EditPage,
  },
]

export default routes
