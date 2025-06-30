import { BrowserRouter, Route, Routes } from 'react-router';
import { Navbar } from './components/common/Navbar/Navbar';
import { Home } from './pages/Home';
import CreatePostPage from './pages/CreatePostPage';
import Post from './pages/Post';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupsPage from './pages/GroupsPage';
import GroupPage from './pages/GroupPage';
import EmailSignupPage from './pages/EmailSignupPage';
import AboutPage from './pages/AboutPage';
import SideNav from './components/SideNav/SideNav';
function App() {
  return (
    <div className="w-full bg-gray-750 bg-gradient-to-b from-gray-800 to-black text-gray-100 transition-opacity duration-700 pt-16 overflow-y-hidden">
      <Navbar />
      <div className="flex flex-row ">
        <SideNav />
        <div className={`flex flex-3 min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full overflow-y-auto pb-16`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/groups/create" element={<CreateGroupPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/group/:name" element={<GroupPage />} />
            <Route path="/email-signup" element={<EmailSignupPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
