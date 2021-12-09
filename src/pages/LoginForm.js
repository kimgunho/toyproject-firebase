import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.code);
      })
      .finally(() => {
        console.log('로그인 완료');
        navigate('/');
      });
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
      default:
        console.log('err');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          type="email"
          placeholder={'email'}
          required
          onChange={onChange}
        />
        <input
          autoComplete="on"
          value={password}
          type="password"
          name="password"
          placeholder={'password'}
          required
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
}

export default LoginForm;
