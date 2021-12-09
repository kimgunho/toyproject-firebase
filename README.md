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

### 데이터 등록

저같은 경우 입력된 데이터의 값은 useRef를 활용하여 value값을 받아왔습니다.
onchange를 활용하여 한번에 값을 받아오는 방법도 존재하며
원하시는 방식으로 진행하셔도 무방합니다.
온라인강의에서는 collection.add를 이용하여 데이터를 등록했지만
9버젼에서는 collection, addDoc 를 이용하여 데이터를 등록했습니다.
아래 코드를 확인해봅시다.

```
import { collection, addDoc } from 'firebase/firestore';

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
```

### 데이터 읽기

### 데이터 보기

스터디 참고 영상 : [PedroTech-CRUD Tutorial Using React + Firebase | Firebase 9 and Firestore Tutorial](https://youtu.be/jCY6DH8F4oc)
