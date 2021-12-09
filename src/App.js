import styled from 'styled-components';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SiginForm from './pages/SigninForm';

const Header = styled.div`
  margin: 10px 0;
  > .gnb {
    display: flex;
    list-style: none;
    > li {
      margin-right: 10px;
      > a {
        color: #333;
      }
    }
  }
`;

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header>
          <ul className={'gnb'}>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signin">join us</Link>
            </li>
          </ul>
        </Header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signin" element={<SiginForm />} />
          <Route path="*" element={<div>존재하지 않는 페이지입니다.</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
