import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../firebase';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (password === checkPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: displayName,
          })
            .then(() => {
              console.log('프로필네임 등록 완료');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err.code);
        })
        .finally(() => {
          console.log('auth finish');
        });
    } else {
      console.log('비밀번호가 서로 다음');
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordCheck':
        setCheckPassword(value);
        break;
      case 'displayName':
        setDisplayName(value);
        break;
      default:
        console.log('err');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          defaultValue={email}
          type="email"
          placeholder={'email'}
          onChange={onChange}
          required
        />
        <input
          autoComplete="on"
          defaultValue={password}
          type="password"
          name="password"
          placeholder={'password'}
          onChange={onChange}
          required
        />
        <input
          autoComplete="on"
          defaultValue={checkPassword}
          type="password"
          name="passwordCheck"
          placeholder={'again password'}
          onChange={onChange}
          required
        />
        <input
          name="displayName"
          defaultValue={displayName}
          type="text"
          placeholder={'name'}
          onChange={onChange}
          required
        />
        <input type="submit" value="가입하기" />
      </form>
    </div>
  );
}

export default Signin;
