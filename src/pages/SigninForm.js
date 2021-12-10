import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { ref } from 'firebase/storage';
// import { v4 as uuidv4 } from 'uuid';

import { auth } from '../firebase';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  // const [file, setFile] = useState('');

  const navigate = useNavigate();
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
          navigate('/');
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

  // const onFileChange = (event) => {
  //   const {
  //     target: { files, value },
  //   } = event;
  //   const theFile = files[0];
  //   const reader = new FileReader();
  //   setFile(value);
  //   reader.onloadend = (finishedEvent) => {
  //     const {
  //       currentTarget: { result },
  //     } = finishedEvent;
  //   };
  //   reader.readAsDataURL(theFile);

  //   setFile();
  // };

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
        <br />
        <input
          autoComplete="on"
          defaultValue={password}
          type="password"
          name="password"
          placeholder={'password'}
          onChange={onChange}
          required
        />
        <br />
        <input
          autoComplete="on"
          defaultValue={checkPassword}
          type="password"
          name="passwordCheck"
          placeholder={'again password'}
          onChange={onChange}
          required
        />
        <br />
        <input
          name="displayName"
          defaultValue={displayName}
          type="text"
          placeholder={'name'}
          onChange={onChange}
          required
        />
        <br />
        {/* <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          value={file}
        /> */}

        <input type="submit" value="가입하기" />
      </form>
    </div>
  );
}

export default Signin;
