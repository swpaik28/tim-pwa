# Trust-in-Minutes

청소년 자기조절 학습 도구 — 공부에 투자한 만큼 보상을 공정하게.

PWA(Progressive Web App)로, 스마트폰 홈화면에 아이콘으로 추가해 앱처럼 쓸 수 있습니다.

---

## 로컬에서 실행하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속.

## 빌드

```bash
npm run build
```

`dist/` 폴더에 배포용 파일이 생성됩니다.

---

## Vercel 배포 방법

1. 이 폴더를 GitHub repository에 올립니다.
2. [vercel.com](https://vercel.com) 에 GitHub 계정으로 로그인합니다.
3. **Add New → Project** 클릭 후 이 repository를 선택합니다.
4. 프레임워크는 **Vite** 로 자동 인식됩니다. 그대로 **Deploy** 클릭.
5. 약 1~2분 후 `https://[프로젝트명].vercel.app` URL이 생성됩니다.

---

## 스마트폰 홈화면에 추가하기

**iPhone (Safari):** 공유 버튼 → "홈 화면에 추가"
**Android (Chrome):** 메뉴(⋮) → "홈 화면에 추가"

---

## 데이터 저장

- 사용자 데이터는 기기의 브라우저(localStorage)에 저장됩니다.
- 같은 기기·브라우저에서는 새로고침해도 유지됩니다.
- 브라우저 캐시를 지우거나 기기를 바꾸면 데이터는 사라집니다.
- 설정 화면의 "모든 데이터 초기화" 버튼으로 리셋할 수 있습니다.

> 파일럿 테스트용 버전입니다. 여러 사용자 데이터 통합, 클라우드 백업,
> 부모/교사 원격 조회는 향후 Firebase 연동이 필요합니다.
