import Home from './pages/Home';
import PostPage from './pages/PostPage';
import User from './pages/User';
import Tag from './pages/Tag';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import New from './pages/New';
import Edit from './pages/Edit';
import Error from './pages/Error';
import { Route, Routes } from 'react-router-dom';
import { Authorization, UnAuthorization } from './components/Authorization';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/user/:username' element={<User />} />
            <Route path='/tag/:name' element={<Tag />} />
            <Route path={'/search/'} element={<Search />} />
            <Route element={<UnAuthorization />}>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Route>
            <Route element={<Authorization />}>
                <Route path='/new' element={<New />} />
                <Route path='/edit/:id' element={<Edit />} />
                <Route path='/user' element={<User />} />
            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default App;