import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import Button from '../components/Button';
import { database } from '../firebase';

function List() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    const querySnapshot = await getDocs(collection(database, 'list'));
    querySnapshot.forEach((data) => {
      return setList((prev) => [...prev, data.data()]);
    });
  };

  return (
    <div>
      <Button title={'글작성'} link={'/write'} />
      <ul>
        {list?.map((item, index) => {
          return <li key={index}>{item.id}</li>;
        })}
      </ul>
    </div>
  );
}

export default List;
