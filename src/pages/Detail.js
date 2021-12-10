import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { database } from '../firebase';

function Detail() {
  const [detail, setDetail] = useState({});
  let item = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const docRef = doc(database, 'list', 'Sy8tJjUNOzYB0h7xI9zj');
    const docSnap = await getDoc(docRef);
    setDetail(docSnap.data());
  };

  console.log(item.id);
  return <div>{detail?.title}</div>;
}

export default Detail;
