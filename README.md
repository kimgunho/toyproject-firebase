# firebase test practive

기록 : 666 공포 커뮤니티를 진행하며 함께 활용한 firebase 기능을 좀더 소화시키기 위하여 기록을 남깁니다.
디자인과 검증은 추후처리로 하며 firebase의 기능적인 부분만 기록하기 위한 목적입니다.

또한 온라인강의를 찾아가며 해보았지만 국내 강의는 대부분 8버젼 위주였습니다.
최신버젼인 9버젼의 사용법을 기록해봅시다. 👍

## login

로그인 기능관련을 기록해봅시다.
auth의 기능을 불러오는 import는 아래입니다.

```
import { getAuth } from 'firebase/auth'; // auth
```

### 일반 회원가입 & 유저 프로필 데이터

이메일과 비밀번호를 기준으로 일반가입이 가능합니다.
검증을 위해서는

- 비밀번호 동일 체크
- auth/email-already-in-use : 사용중인 이메일값
- auth/invalid-email : 사용에 적합하지 않는 이메일 형태
  기능을 적용하여야하지만 현재 테스트 프로젝트는 firebase의 전반적인 큰 흐름을 우선적으로 파악하고자 함이므로
  생략합니다.

프로필에서 회원 프로필사진의 경우 이미지이기 때문에 Storage를 이용하여 따로 유저의 이미지 콜렉션이 존재하여야합니다.
이는 아래에서 좀더 상세하게 기록할 예정입니다.
아래 코드의 주석을 함께보며 소화를 시켜봅시다.

```
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// createUserWithEmailAndPassword 회원생성
// updateProfile 회원의 프로필데이터 [프로필사진주소, 닉네임]

// onSubmit만 발췌

createUserWithEmailAndPassword(auth, email, password) // email, password은 입력된 데이터를 가져옵니다.
.then((userCredential) => {
    const user = userCredential.user; // 일반 회원가입은 이까지에서 충분합니다.

    updateProfile(user, { // 프로필 데이터의 업데이트 시작입니다.
    displayName: displayName, // displayName = 이름 또는 닉네임
    })
    .then(() => {
        console.log('프로필네임 등록 완료'); // 프로필 등록 완료
    })
    .catch((error) => {
        console.log(error.code); // code를 추가하면 간결한 에러코드가 확인가능
    });
})
.catch((error) => {
    console.log(error.code); // auth에서 에러발생시
})
.finally(() => {
    console.log('auth finish'); 에러가되든 가입이 되든 완료
});
```

### 쇼셜(sns) 가입 [db작업 이후 진행예정]

### login

가입된 유저의 정보 기반으로 이메일, 비밀번호로 로그인을 합니다.
검증을 위해서는

- auth/wrong-password : 잘못된 비밀번호
- auth/user-not-found : 찾을수없는 유저
- auth/invalid-email : 잘못된 형식
  으로 구분합니다.
  당연한 말이겠지만 로그인을 완료하면 Router의 useNavigate()를 이용하여 Home으로 페이지전환을 해주는것이 좋습니다.
  로그인에 필요한 기능은 signInWithEmailAndPassword이며
  아래코드에서 좀더 상세하게 파악해봅시다.

```
// 받아온 이메일과 비밀번호의 값을 매개변수에 추가해준 후 진행합니다.

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { // 로그인 완료 후 진행합니다.
    const user = userCredential.user; // 유저의 통합정보이며 user.제공레퍼런스 를 이용하여 상세한 정보가 확인가능합니다.
    console.log(user);
    })
    .catch((err) => {
    console.log(err.code);
    })
    .finally(() => {
    console.log('로그인 완료');
    navigate(link.home);
    });
};
```

### profile src [db작업 이후 진행 예정]

## firebase database

초보자가 처음 헷갈릴수 있는 부분은 firebase에서 제공해주는
firestore Database와 Realtime Database의 사용가능한 레퍼런스입니다.
구분을 확실하게 한 후 각 목적에 맞는 레퍼런스 값을 잘 찾아야합니다.

firebase database의 기능을 불러오는 import는 아래입니다.

```
import { getFirestore } from 'firebase/firestore'; // firesotore Database
```

### 데이터 등록

저같은 경우 입력된 데이터의 값은 useRef를 활용하여 value값을 받아왔습니다.
onchange를 활용하여 한번에 값을 받아오는 방법도 존재하며
원하시는 방식으로 진행하셔도 무방합니다.
온라인강의에서는 collection.add를 이용하여 데이터를 등록했지만
9버젼에서는 collection, addDoc 를 이용하여 데이터를 등록했습니다.
아래 코드를 확인해봅시다.

```
import { collection, addDoc } from 'firebase/firestore'; // 만약 doc의 id값을 자동으로 해도 된다면 <-
import { doc, setDoc } from 'firebase/firestore'; // id값을 내가 생성하길 바란다면 <-

// use addDoc
try {
    await addDoc(collection(database, 'list'), { // 넣고싶은 데이터의 값을 json의 형태로 넣어줍니다.
    title: title.current.value,
    description: description.current.value,
    text: text.current.value,
    date: Date.now(),
    like: 0,
    user: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    }).then(() => { // 이부분은 없어도 됩니다. 테스트를 위한 확인차 추가하였습니다.
    console.log('등록완료');
    });
} catch (error) {
    console.log(error.code);
}

// use setDoc
const id = auth.currentUser.uid.substring(0, 8) + new Date().getTime(); // id값 생성 굳이 이렇게 안만들어주어도 uuid를 사용해도 편하게 가능
await setDoc(doc(database, 'list', id), {
    ...data
}

```

### 데이터 읽기

초기에는 리스트의 데이터들중 find()함수를 이용하여 원하는 결과값이 포함된 데이터를 불러오도록 하였으나
firebase에서 제공해주는 get data once의 레퍼런스를 확인해보았습니다.

해당 레퍼런스에는 데이터를 읽는 방법중 게시판의 리스트에 적합한 형태와 디테일페이지에 적합한 형태가 확인되었습니다.
순차대로 기록해보겠습니다.

1. 리스트 형식으로 구조 읽기
   import { collection, getDocs } from 'firebase/firestore';
   을 사용하여 데이터를 읽어옵니다.

좀더 디테일한 코드를 보며 확인해봅시다.

```
  const [list, setList] = useState([]); // 배열 생성
  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    // 이부분 부터 헷갈릴수 있으나 자세히 봅시다.
    const querySnapshot = await getDocs(collection(database, 'list'));  // 콜렉션 데이터의 리스트폴더
    querySnapshot.forEach((data) => {
      return setList((prev) => [...prev, data.data()]); // 데이터를 순환하며 각 데이터의 값을 배열에 넣어주었습니다.
    });
  };
```

위 방식은 콜렉션의 특정 폴더안에 데이터를 전체적으로 순환을 돌며 배열안에 푸시한 방식입니다.

하지만 여러 데이터가 아닌 특정목적에 맞는 하나의 데이터 객체를 불러오는 방식은 아래와 같습니다. 2. 디테일 형식으로 데이터 읽기

디테일형식은 라우터의 서브:id를 활용하여 진행하였습니다.
useParams 함수를 사용하여 디테일내 페이지 detail/:id 값을 통하여
해당 sub id값과 데이터의 id와 비교하여 같은 값을 찾아주는
방식으로 진행했습니다.

코드를 확인해보겠습니다.

```
  const getDetail = async () => {
    const docRef = doc(database, 'list', item.id); // 리스트폴더에서 item.id값이 useParams를 통하여 알아낸 값
    const docSnap = await getDoc(docRef); // docSnap은 docRef이며 해당 데이터를 아래에서 셋해주었습니다.
    setDetail(docSnap.data());
  };

  // 이제 detail데이터는 특정 객체의 값이므로 해당 데이터를 랜더링 합니다.
```

스터디 참고 영상 : [PedroTech-CRUD Tutorial Using React + Firebase | Firebase 9 and Firestore Tutorial](https://youtu.be/jCY6DH8F4oc)
