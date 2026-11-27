# 협업 가이드

## 처음 한 번

1. 저장소 초대 메일(GitHub)을 수락합니다.
2. Node 24 이상과 pnpm을 설치합니다. (`corepack enable` 하면 저장소에 맞는 pnpm 버전이 자동으로 쓰입니다)
3. 내려받고 실행합니다.

   ```bash
   git clone git@github.com:yeji020010-source/inplink.git
   cd inplink
   pnpm install
   pnpm dev
   ```

   http://localhost:3000 (랜딩) · http://localhost:3000/app (프로토타입)

## 작업 흐름

1. **이슈 만들기**: Issues → New issue → "작업" 또는 "버그" 템플릿. 누가 할지 Assignees에 지정합니다.
2. **브랜치 만들기**: 항상 최신 `main`에서 시작합니다.

   ```bash
   git switch main && git pull
   git switch -c feat/hero-copy
   ```

   이름 규칙: `feat/…` 새 기능·디자인, `fix/…` 버그, `copy/…` 문구만 수정, `chore/…` 설정
3. **커밋 & push**

   ```bash
   git add -A
   git commit -m "Hero 문구 수정"
   git push -u origin feat/hero-copy
   ```

4. **PR 올리기**: GitHub에 뜨는 "Compare & pull request" 버튼. 템플릿 체크리스트를 채웁니다.
5. **확인**: PR에 자동으로
   - **CI** (lint + build)가 돌고,
   - **Vercel 미리보기 URL**이 댓글로 달립니다. 리뷰어는 이 URL에서 화면을 봅니다.
6. **리뷰 & 병합**: 승인 1개 + CI 통과 후 **Squash and merge**. 병합되면 https://inplink.vercel.app 에 자동 배포됩니다.

`main`은 보호되어 있어 직접 push할 수 없고, PR로만 바뀝니다.

## 충돌 줄이기

- 랜딩 섹션은 `src/components/landing/` 안에 파일 하나씩입니다. 섹션 단위로 나눠 맡으면 충돌이 거의 없습니다.
- 문구는 `src/lib/i18n/landing.ts` 한 파일에 모여 있어 동시에 고치면 충돌이 나기 쉽습니다. 문구 작업은 PR을 작게, 빨리 병합하세요.
- 작업 중 `main`이 바뀌었다면: `git pull origin main` 후 충돌을 정리하고 다시 push 합니다.

## 환경 변수

로컬에서 Sheets 전송을 테스트하려면 `.env.example`을 `.env.local`로 복사해 값을 넣습니다. `.env.local`은 커밋하지 않습니다. 배포 환경 값은 Vercel 프로젝트 설정에서 관리합니다.
