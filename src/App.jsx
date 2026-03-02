import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppHeader from './layouts/AppHeader'
import AppFooter from './layouts/AppFooter'
import { HomePage, ProjectPage, AboutPage } from './pages'
import ProjectDetailPage from './pages/ProjectDetailPage'

function App() {
  return (
    <BrowserRouter>
      <div id="wrap">
        <AppHeader />
        <main className="content_block">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:key" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
