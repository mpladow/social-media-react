import { Route, Routes } from 'react-router';
import { Navbar } from './components/common/Navbar';
import { Home } from './pages/Home';
import CreatePostPage from './pages/CreatePostPage';
import Post from './pages/Post';
function App() {
  return (
    <div className="min-h-screen bg-gray-600 text-gray-100 transition-opacity duration-700 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
