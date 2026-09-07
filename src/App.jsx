import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import  About  from './pages/About'
import BlogPage from './pages/Blogpage'
import Blogs from './pages/blogs'


function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/blogs/:area" element={<Blogs/>} />
     
      </Routes>
    </BrowserRouter>
  </>
}

export default App
