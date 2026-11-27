# inplink

브랜드 × 인플루언서 매칭 서비스의 사전 신청 랜딩페이지와 프로토타입입니다. (화면 속 서비스명 `PICKLY`는 임시 이름)

- **`/`**: 사전 신청 랜딩페이지 (한국어/일본어, 신청 폼, 샘플 게시물 하트·투표, 섹션 도달 지표)
- **`/app`**: 브랜드 ↔ 인플루언서 매칭 프로토타입 (데이터는 브라우저 localStorage에만 저장)

Next.js (App Router) + TypeScript + pnpm

## 시작하기

```bash
pnpm install
cp .env.example .env.local   # 필요할 때만
pnpm dev                     # http://localhost:3000
```

배포 전 확인: `pnpm lint && pnpm build`

## 폴더 구조

```
src/
  app/
    layout.tsx            공통 레이아웃·메타데이터
    globals.css           공통 디자인 토큰(색상·그라데이션), 폼 기본 스타일
    page.tsx              랜딩페이지. 섹션 순서는 여기서 조정
    app/page.tsx          /app 프로토타입
  components/
    landing/              랜딩 섹션 하나당 파일 하나
      Header, Hero, HowItWorks, Benefits, SamplePosts, ApplyForm, Faq, Footer
      Section.tsx         섹션 공통 래퍼 (view_<id> 이벤트 자동 기록)
      LandingProvider.tsx 언어·역할 상태, track()
      landing.module.css
    app/                  /app 프로토타입
  lib/
    i18n/landing.ts       랜딩 문구 (ko/ja)
    i18n/app.ts           프로토타입 문구 (ko/ja)
    track.ts              신청·이벤트 전송
    store.ts              프로토타입용 localStorage 저장소
scripts/
  apps-script.gs          Google Sheets 기록용 Apps Script
```

**문구 수정**은 `src/lib/i18n/*.ts`에서 ko와 ja를 같이 고치면 됩니다. 폼의 선택값은 언어와 관계없이 한국어 값으로 저장됩니다.

## 협업

브랜치 → PR → CI·Vercel 미리보기 확인 → 리뷰 후 병합. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 보세요.

- 운영: https://inplink.vercel.app
- `main`은 보호 브랜치라 PR로만 변경됩니다.

## Google Sheets 연결 (약 5분)

1. 새 Google 스프레드시트를 만듭니다.
2. **확장 프로그램 → Apps Script**를 열고 `scripts/apps-script.gs` 내용을 붙여넣어 저장합니다.
3. **배포 → 새 배포 → 유형: 웹 앱**을 선택합니다. 실행 사용자는 **나**, 액세스 권한은 **모든 사용자**로 둡니다.
4. 발급된 웹 앱 URL을 `.env.local`(로컬)과 Vercel 프로젝트 환경 변수에 `NEXT_PUBLIC_SHEETS_ENDPOINT`로 넣습니다.
5. 스크립트를 수정한 뒤에는 **새 버전**으로 다시 배포해야 반영됩니다.

시트에는 `signups`(신청)와 `events`(클릭·하트·투표·스크롤) 탭이 자동으로 생깁니다.

## 공개 전 확인

- 서비스명·로고 교체 (`PICKLY` 검색)
- 개인정보 동의 문구를 실제 운영 기준(보관 기간, 문의처)에 맞게 보완
- 일본어 문구 원어민 검토
- 스프레드시트 공유 범위를 팀원으로 제한 (이메일이 쌓임)
