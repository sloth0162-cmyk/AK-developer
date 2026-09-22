import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import  About  from './pages/About'
import BlogPage from './pages/Blogpage'
import Blogs from './pages/blogs'
import Property from './pages/propery'
import SiteVisit from './pages/Sitevisit'
import News from './pages/News'


function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/blogs/:area" element={<Blogs />} />
<Route path="/blog/:id" element={<Blogs />} />
     <Route path="/property" element ={<Property/>} />
     <Route path="/connect" element ={<SiteVisit/>} />
     <Route path="/news" element ={<News/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
