import React , { Suspense , lazy , useState } from 'react'
import { Routes , Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/Store';

//CSS
import './App.css'

// Components
import NavbarTop from './components/NavbarTop/NavbarTop';
import Footer from './components/Footer/Footer';

// Pages
const HomePage = React.lazy(() => import("./pages/Home/Home"));
const MovieDetailPage = React.lazy(() => import("./pages/MovieDetail/MovieDetail"));
const CategoryHomePage = React.lazy(() => import("./pages/CategoryHome/CategoryHome"));
const SeriesPage = React.lazy(() => import("./pages/Series/Series"));
const SeriesDetailPage = React.lazy(() => import("./pages/SeriesDetail/SeriesDetail"));
const ArticlePage = React.lazy(() => import("./pages/Article/Article"));
const ArticleReviewPage = React.lazy(() => import("./pages/ArticleTemplate/ArticleTemplate"));

const TestPage = React.lazy(() => import("./pages/Test/Test"));

function App() {
  return (
      <Suspense fallback="Loading...">
        <Provider store={store}>
          <NavbarTop />
          <div className="App">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/movie/:id' element={<MovieDetailPage />} />
              <Route path='/category/:id' element={<CategoryHomePage />} />

              <Route path='/series' element={<SeriesPage />} />
              <Route path='/Series/:id' element={<SeriesDetailPage />} />
              
              <Route path='/article' element={<ArticlePage />} />
              <Route path='/review/:id' element={<ArticleReviewPage />} />

              <Route path='/test' element={<TestPage />} />
            </Routes>
          </div>
          <Footer />
        </Provider>
      </Suspense>
  )
}

export default App
