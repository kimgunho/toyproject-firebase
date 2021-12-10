import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { collection, addDoc } from 'firebase/firestore';

import { database, auth } from '../firebase';
import Button from '../components/Button';

function List() {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(database, 'list'), {
        title: title.current.value,
        description: description.current.value,
        text: text.current.value,
        date: Date.now(),
        like: 0,
        user: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      }).then(() => {
        console.log('등록완료');
        navigate('/list');
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  const title = useRef();
  const description = useRef();
  const text = useRef();

  return (
    <div>
      <Button title={'목록'} link={'/list'} />

      <form onSubmit={onSubmit}>
        <input
          ref={title}
          type="text"
          name="title"
          placeholder="title..."
          required
        />
        <br />
        <input
          ref={description}
          type="text"
          name="description"
          placeholder="description..."
          required
        />
        <br />
        <textarea ref={text} />
        <br />
        {/* <input name="image" type="file" accept="image/*" /> */}
        <br />
        <input type="submit" value="등록" />
      </form>
    </div>
  );
}

export default List;
