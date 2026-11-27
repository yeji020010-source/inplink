/**
 * 관심도 지표 전송 (Google Apps Script 웹앱 → 스프레드시트)
 * 엔드포인트는 .env.local 의 NEXT_PUBLIC_SHEETS_ENDPOINT 로 설정합니다. (README 참고)
 * 비어 있으면 전송하지 않고 브라우저 콘솔에만 기록합니다.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT ?? "";

type Payload = Record<string, unknown>;

function sessionId(): string {
  try {
    return (sessionStorage.sid ||= Math.random().toString(36).slice(2));
  } catch {
    return "na";
  }
}

export function send(payload: Payload, lang: string): Promise<unknown> {
  const body = JSON.stringify({
    ...payload,
    sid: sessionId(),
    lang,
    ua: navigator.userAgent.slice(0, 120),
    ref: document.referrer.slice(0, 200),
    ts: new Date().toISOString(),
  });
  if (!ENDPOINT) {
    console.log("[track]", body);
    return Promise.resolve();
  }
  // Apps Script는 CORS 프리플라이트를 지원하지 않으므로 text/plain + no-cors 로 전송
  return fetch(ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body,
    keepalive: true,
  });
}

export const track = (name: string, lang: string, extra: Payload = {}) =>
  send({ type: "event", name, ...extra }, lang);
