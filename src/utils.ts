export function fromNow(d: number) {
  const now = Date.now();
  const diff = now - d;
  const sec = diff / 1000;
  if (sec < 60) return sec + "sec";
  const min = sec / 60;
  if (min < 60) return min + "min";
  const hr = min / 60;
  if (hr < 24) return hr + "hr";
  const ds = hr / 24;
  const dd = Math.floor(ds);
  return dd === 1 ? dd + "day" : dd + "days";
}

export function lengthValidator(
  payload: string | number | any[],
  message?: string,
): string | null {
  const length =
    typeof payload === "string" || typeof payload === "number"
      ? String(payload).length
      : payload.length;
  if (length === 0) return message ?? "아무것도 입력되지 않았습니다.";
  return null;
}

export function getDateInputValue(payload?: number) {
  const d = new Date(payload ?? Date.now());
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const date = d.getDate();

  return `${y}-${m > 10 ? m : `0${m}`}-${date > 10 ? date : `0${date}`}`;
}

export function prettifyMobile(mobile: string) {
  if (mobile.length !== 11) throw new Error("휴대전화번호가 아닙니다.");
  const ns = [...mobile];
  const letters = ns.map((m, i) => (i === 2 || i === 6 ? m + "-" : m));
  return letters.join("");
}

export function prettifyRegi(regi: string) {
  if (regi.length !== 10) throw new Error("사업자등록번호가 아닙니다.");
  const ns = [...regi];
  const letters = ns.map((m, i) => (i === 2 || i === 4 ? m + "-" : m));
  return letters.join("");
}
