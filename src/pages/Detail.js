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
    const docRef = doc(database, 'list', item.id);
    const docSnap = await getDoc(docRef);
    setDetail(docSnap.data());
  };

  return (
    <div>
      {detail?.title} <br />
      {detail?.description} <br />
      {detail?.date} <br />
      {detail?.like} <br />
      {detail?.name} <br />
      {detail?.text} <br />
    </div>
  );
}

export default Detail;
