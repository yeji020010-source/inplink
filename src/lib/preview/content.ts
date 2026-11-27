/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
// 사이트 전반에서 쓰는 정적 콘텐츠.
// PICKLY: 브랜드 제품을 인플루언서에게 무료로 연결해 인스타그램 게시물로 홍보 효과와 소비자 피드백을 받는
// 브랜드-인플루언서 매칭 플랫폼.

export const BRAND_NAME = "PICKLY";
export const TAGLINE = "브랜드와 인플루언서를 잇는 제품 매칭 플랫폼";

// 브랜드용 핵심 메시지 (차별점: 게시물 + 소비자 반응 리포트 + 콘텐츠 2차 활용)
export const BRAND_PROMISE = "제품을 보내면, 게시물과 소비자 반응 리포트가 돌아옵니다";
export const BRAND_PROMISE_SUB =
  "우리 제품과 잘 맞는 인플루언서 10명에게 무료로 보내면, 인스타그램 게시물 10개와 팔로워 반응을 정리한 리포트, 브랜드 채널에 다시 쓸 수 있는 콘텐츠가 남습니다.";

// 1기 파일럿 모집 (실적이 쌓이기 전까지 '예시' 대신 이 프레임으로 안내)
export const PILOT = {
  badge: "1기 파일럿 모집 중",
  brandTitle: "PICKLY 1기 파일럿 브랜드 5곳을 모집해요",
  brandBody: "첫 캠페인은 1기 특가로 진행하고, 결과 리포트를 함께 다듬어요. 자리가 차면 마감돼요.",
  creatorTitle: "PICKLY 1기 인플루언서를 모집해요",
  creatorBody: "1기로 활동한 인플루언서는 다음 캠페인에 우선 추천돼요.",
};

// 콘텐츠 2차 활용 (인플루언서 동의 기반)
export const CONTENT_USE = "선정된 캠페인 게시물은 해당 브랜드가 출처를 밝히고 브랜드 SNS·상세페이지에 다시 쓸 수 있어요. 활용 기간과 범위는 캠페인마다 미리 안내하고, 유료 광고에 쓰려면 따로 동의를 받아요.";

export type Status = "fact" | "hyp" | "goal" | "tbd";

export const STATUS_LABEL: Record<Status, string> = {
  fact: "공식 외부자료",
  hyp: "사업 가설·가정",
  goal: "목표 (실적 아님)",
  tbd: "미확정·미측정",
};

export type ServiceId = "seeding" | "feedback" | "compare" | "reseed";

export type Service = {
  id: ServiceId;
  name: string;
  stage: string;
  summary: string;
  question: string;
  design: string;
  deliverable: string;
  outcome: string;
  main?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "seeding",
    name: "Seeding",
    stage: "01 · 첫 알림",
    summary: "제품 무료 시딩",
    question: "우리 제품을 누가 먼저 써보고 알려줄까?",
    design: "카테고리·피부 타입이 맞는 인플루언서에게 제품 무료 발송, 인스타그램 게시물 1건",
    deliverable: "게시물 링크 모음, 도달·좋아요·댓글·저장 수, 2차 활용 가능한 콘텐츠",
    outcome: "첫 게시물 확보 → 인지도",
  },
  {
    id: "feedback",
    name: "Feedback Campaign",
    stage: "02 · 초기 주력",
    summary: "홍보 + 소비자 피드백",
    question: "실제 소비자는 우리 제품에 어떻게 반응하는가?",
    design: "인플루언서 10명이 각자 게시물 1건 + 사용 피드백, 게시 후 2주간 팔로워 반응 정리",
    deliverable: "게시물 성과, 팔로워 반응 요약, 인플루언서 사용 피드백, 개선 제안, 2차 활용 가능한 콘텐츠",
    outcome: "홍보 효과와 소비자 반응을 한 번에",
    main: true,
  },
  {
    id: "compare",
    name: "A/B Campaign",
    stage: "03 · 선택",
    summary: "메시지·컬러 비교",
    question: "어떤 메시지·컬러·제형이 더 반응이 좋은가?",
    design: "비슷한 규모의 인플루언서 두 그룹에 서로 다른 안을 보내 게시물 반응 비교",
    deliverable: "안별 참여율·댓글 반응 비교, 출시안 추천",
    outcome: "반응 비교 → 출시안 선택 근거",
  },
  {
    id: "reseed",
    name: "Re-Seeding",
    stage: "04 · 개선 후",
    summary: "개선 제품 재시딩",
    question: "고친 제품, 반응이 나아졌는가?",
    design: "이전 캠페인과 같은 기준으로 인플루언서를 다시 매칭, 같은 피드백 항목 유지",
    deliverable: "개선 전후 반응 차이, 추가 개선 판단",
    outcome: "이전 캠페인과 비교 → 다음 개선",
  },
];

export const PROCESS = [
  { n: "01", title: "캠페인 등록", body: "제품, 원하는 인플루언서 조건, 게시물 미션을 정리" },
  { n: "02", title: "인플루언서 매칭", body: "카테고리·피부 타입·팔로워 규모·참여율로 선별" },
  { n: "03", title: "무료 발송·게시", body: "제품을 보내고 인스타그램 게시물 1건 업로드 (협찬 표기)" },
  { n: "04", title: "반응 리포트", body: "게시물 성과, 팔로워 댓글, 사용 피드백을 정리" },
];

export const PROBLEMS = [
  {
    n: "01",
    title: "알릴 방법이 마땅치 않다",
    body: "광고 예산이 작은 신생 브랜드는 첫 고객과 첫 후기를 만들기가 어렵다",
  },
  {
    n: "02",
    title: "인플루언서 섭외가 번거롭다",
    body: "계정 찾기 → DM 섭외 → 주소 받기 → 발송 → 게시 확인까지 모두 직접 해야 한다",
  },
  {
    n: "03",
    title: "소비자 반응이 흩어진다",
    body: "댓글과 DM에 흩어진 반응을 모아 제품 개선에 쓰기 어렵다",
  },
];

export const ALTERNATIVES = [
  { name: "직접 DM 섭외", how: "브랜드가 계정을 찾아 개별 연락·발송" },
  { name: "마케팅 대행사", how: "기획부터 집행까지 위탁, 비용 부담이 큼" },
  { name: "일반 체험단", how: "후기 게시 중심, 반응 분석은 제한적" },
  { name: "PICKLY", how: "맞춤 매칭 + 게시물 + 소비자 반응 리포트 + 콘텐츠 2차 활용", us: true },
];

export const VALIDATION_PLAN = [
  { weeks: "1~2주", goal: "브랜드 10곳·인플루언서 20명 인터뷰", check: "섭외 부담·예산·참여 의향 확인" },
  { weeks: "3주", goal: "유료 파일럿 1건 계약", check: "견적 제시 → 계약·결제로 지불 의향 확인" },
  { weeks: "4~5주", goal: "인플루언서 10명 게시", check: "게시 완료 8명 이상 목표 · 미게시 사유도 수집" },
  { weeks: "6주", goal: "리포트 제공·활용 확인", check: "개선·마케팅 결정 1건 기록 · 재의뢰 여부 확인" },
];

export const SOURCES = [
  {
    id: 1,
    org: "공정거래위원회 · 추천·보증 등에 관한 표시·광고 심사지침",
    title: "SNS 게시물의 경제적 이해관계(협찬) 표시 기준",
    note: "제품을 무료로 받은 게시물도 협찬 사실을 표시해야 함",
    url: "https://m.korea.kr/news/reporterView.do?newsId=148876511",
  },
];

// ---------- 매칭 기준 (/channels) ----------

export const MATCH_CRITERIA = [
  {
    title: "카테고리 적합도",
    body: "평소 스킨케어·메이크업 등 제품과 같은 분야의 게시물을 올리는지 확인합니다.",
    color: "lime",
  },
  {
    title: "피부 타입·고민",
    body: "제품이 맞는 피부 타입과 고민을 가진 인플루언서를 우선 연결합니다.",
    color: "lilac",
  },
  {
    title: "팔로워 규모",
    body: "나노·마이크로·매크로 중 브랜드가 원하는 규모로 모집합니다.",
    color: "cream",
  },
  {
    title: "참여율",
    body: "팔로워 수보다 좋아요·댓글·저장 같은 실제 반응을 함께 봅니다.",
    color: "lime",
  },
  {
    title: "협찬 표기 준수",
    body: "이전 협찬 게시물에 협찬 사실을 잘 표시했는지 확인합니다. [1]",
    color: "lilac",
  },
  {
    title: "솔직한 후기",
    body: "좋은 점만이 아니라 아쉬운 점도 이야기하는 인플루언서를 환영합니다.",
    color: "cream",
  },
] as const;

export const TIERS = [
  { name: "나노", range: "팔로워 1천~1만", fit: "가까운 팔로워와 대화가 많아 댓글 피드백을 받기 좋음" },
  { name: "마이크로", range: "팔로워 1만~10만", fit: "도달과 신뢰의 균형 · 초기 캠페인의 기본 구성" },
  { name: "매크로", range: "팔로워 10만 이상", fit: "넓은 도달 · 출시 시점 인지도 확보용" },
];

export const POST_RULES = [
  "게시물 첫 줄 또는 사진·영상 안에 ‘제품 협찬’ 등 협찬 사실을 한글로 표시합니다. [1]",
  "브랜드가 문구를 정해 주지 않습니다. 직접 써본 느낌을 솔직하게 씁니다.",
  "아쉬운 점을 써도 불이익이 없습니다.",
  "선정된 캠페인 게시물은 브랜드가 출처를 밝히고 브랜드 SNS·상세페이지에 다시 쓸 수 있어요. 기간·범위는 캠페인마다 안내하고, 유료 광고는 따로 동의를 받아요.",
  "이상 반응이 있으면 즉시 사용을 중단하고 알려 주세요. 게시하지 않아도 됩니다.",
];

// 정적 배포라 신청은 외부 폼으로 받는다. 빌드 시 환경 변수로 링크를 넣으며, 비어 있으면 '준비 중'으로 표시한다.
// 0단계 구글 폼 (응답은 'PICKLY 운영 시트'에 모인다)
export const FORM_LINKS = {
  request: process.env.NEXT_PUBLIC_REQUEST_FORM_URL || "https://forms.gle/5Qc7K6zTj7CEcGQ5A",
  participate: process.env.NEXT_PUBLIC_PARTICIPATE_FORM_URL || "https://forms.gle/9MmtmhGHt819i2229",
  feedback: process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL || "https://forms.gle/QiksLECPr2SGxVsf6",
  // 3문항 브랜드 상담 신청 (가장 낮은 문턱의 브랜드 버튼)
  consult: process.env.NEXT_PUBLIC_CONSULT_FORM_URL || "https://forms.gle/tRmMLx3TtvBgu6NHA",
};

export const REQUEST_CHECKLIST = [
  { title: "브랜드·담당자", body: "브랜드명, 인스타그램 계정, 담당자 연락처" },
  { title: "제품", body: "카테고리, 무료로 보낼 수 있는 수량, 출시 상태" },
  { title: "캠페인 목표", body: "예: “출시 전에 첫 게시물 10건 확보”, “두 컬러 중 반응 좋은 쪽 찾기”" },
  { title: "원하는 인플루언서", body: "팔로워 규모, 피부 타입, 콘텐츠 스타일(피드·릴스)" },
  { title: "안전성·품질 자료", body: "성분표, 자가품질검사 등. 자료 확인 후 발송을 진행합니다." },
];

export const PARTICIPATE_CHECKLIST = [
  "인스타그램 계정과 팔로워 규모",
  "주로 올리는 콘텐츠 분야 (스킨케어·메이크업 등)",
  "피부 타입과 피부 고민",
  "화장품 사용 후 이상 반응 경험 (해당 성분·제품은 매칭에서 제외)",
];
