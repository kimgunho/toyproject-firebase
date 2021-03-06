import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from './firebase';

import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SiginForm from './pages/SigninForm';
import List from './pages/List';
import Write from './pages/Write';
import Detail from './pages/Detail';

const Header = styled.div`
  margin: 10px 0;
  > .gnb {
    display: flex;
    list-style: none;
    > li {
      margin-right: 10px;
      > a {
        color: #333;
        text-decoration: none;
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
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        console.log(user.displayName);
        setDisplayName(user.displayName);
      }
    });
  }, [auth.currentUser]); // err

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
        console.log('๋ก๊ทธ์์');
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
              <>
                <li onClick={onSignOut}>log out</li>
                <li>
                  <Link to="/list">notice</Link>
                </li>
              </>
            )}
          </ul>
          <IsLogingState className={isLogin ? 'on' : 'off'} />
          <p>{isLogin ? `${displayName}๋ ๋ก๊ทธ์ธ์ค` : '๋ก๊ทธ์ธ์ค ์๋'}</p>
        </Header>

        <Routes>
          <Route path="/" element={<Home />} />
          {!isLogin ? (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signin" element={<SiginForm />} />
            </>
          ) : (
            <>
              <Route path="/list" element={<List />} />
              <Route path="/write" element={<Write />} />
              <Route path="/detail/:id" element={<Detail />} />
            </>
          )}

          <Route path="*" element={<div>์กด์ฌํ์ง ์๋ ํ์ด์ง์๋๋ค.</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
