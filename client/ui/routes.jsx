import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { 
  ViewerQueries, 
  NodeQueries,
} from 'store/relay/queries'

import {
  prepareTagParams,
  prepareAuthorParams
} from 'store/relay/params'

import Home from './shared/containers/Home'
import PostIndex from './frontend/containers/Post/Index'
import PostShow from './frontend/containers/Post/Show'
import ProjectIndex from './frontend/containers/Project/Index'
import App from './shared/containers/App'
import NotFound from './shared/containers/notFound'

// backend
import Login from './backend/containers/Author/Login'
import AuthorForm from './backend/containers/Author/Form'
import PostIndexBackend from './backend/containers/Post/Index'

import * as authSelectors from 'store/selectors/auth'

// login for check login, may be put in other file
const checkAuth = (store) => {
  return (nextState, replace) => {    
    const loggedIn = authSelectors.isLogged(store.getState())   
    
    // Check if the path isn't dashboard. That way we can apply specific logic to    
    if(!loggedIn) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      }) 
    }        
  }
}

// must specify queries for relay
export const Routes = (store) => (
  <Route path='/' component={App}>         
    <IndexRoute component={Home} queries={ViewerQueries} />    
    <Route path='/posts' component={PostIndex} queries={ViewerQueries} 
      prepareParams={prepareTagParams} />
    <Route path='/posts/:id' component={PostShow} queries={ViewerQueries} />
    <Route path="/projects" component={ProjectIndex} queries={ViewerQueries} 
      prepareParams={prepareTagParams} />
    <Route path='/login' component={Login}/>

    <Route onEnter={checkAuth(store)} path='/cms'>
      <Route path="author/edit" component={AuthorForm} queries={ViewerQueries} 
        prepareParams={prepareAuthorParams(store)} />

      <Route path="/cms/posts" component={PostIndexBackend} queries={ViewerQueries} />
      {
      // <Route path="/cms/posts/new" component={ProgressBar(Alert(Authentication(PostForm)))} />
      // <Route path="/cms/posts/:id/edit" component={ProgressBar(Alert(Authentication(PostForm)))} />

      // <Route path="/cms/projects" component={ProgressBar(Alert(Authentication(ProjectIndex)))} />
      // <Route path="/cms/projects/new" component={ProgressBar(Alert(Authentication(ProjectForm)))} />
      // <Route path="/cms/projects/:id/edit" component={ProgressBar(Alert(Authentication(ProjectForm)))} />
    }
    </Route>
    
    <Route path='*' component={NotFound} />
  </Route>  
)

