import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from './firebase';

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

const IsLogingState = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &.on {
    background-color: green;
  }

  &.off {
    background-color: red;
  }
`;

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      }
    });
  }, []);

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
        console.log('로그아웃');
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  return (
    <BrowserRouter>
      <div>
        <Header>
          <ul className={'gnb'}>
            <li>
              <Link to="/">home</Link>
            </li>
            {!isLogin ? (
              <>
                <li>
                  <Link to="/login">login</Link>
                </li>
                <li>
                  <Link to="/signin">join us</Link>
                </li>
              </>
            ) : (
              <li onClick={onSignOut}>log out</li>
            )}
          </ul>
          <IsLogingState className={isLogin ? 'on' : 'off'} />
          <p>{isLogin ? '로그인중' : '로그인중 아님'}</p>
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
