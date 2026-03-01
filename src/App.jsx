import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppHeader from './layouts/AppHeader'
import AppFooter from './layouts/AppFooter'
import { HomePage, ProjectPage, AboutPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <div id="wrap">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
