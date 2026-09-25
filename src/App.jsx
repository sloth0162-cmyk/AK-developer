import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import  About  from './pages/About'
import BlogPage from './pages/Blogpage'
import Blogs from './pages/blogs'
import Property from './pages/Property'
import SiteVisit from './pages/Sitevisit'
import News from './pages/News'
import NewsArticle from "./pages/NewsArticle";
import PropertyDetails from "./pages/PropertyDetails";

function App() {

  return <>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/blogs/:area" element={<Blogs />} />
<Route path="/blog/:id" element={<Blogs />} />
     <Route path="/property" element ={<Property/>} />
     <Route path="/connect" element ={<SiteVisit/>} />
     <Route path="/news" element ={<News/>} />
     <Route path="/news/:id"
      element={<NewsArticle />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>

  </>
}
export default App
