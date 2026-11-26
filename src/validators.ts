import { z } from "zod";

export function isEmail(t: string): string | null {
  if (t.length === 0) return "이메일이 입력되지 않았습니다.";
  if (!t.includes("@")) return '"@"를 포함해야 합니다.';
  const split = t.split("@");
  if (split[1].length === 0) return "이메일 주소를 입력해주세요.";
  const schema = z.email();
  const { success, data, error } = schema.safeParse(t);
  if (error) return JSON.parse(error?.message)[0]?.message;
  if (!success || !data) return "Nothing has been typed in";
  return null;
}

export function passwordValidator(
  password: string,
  options?: {
    max?: number;
    min?: number;
    isConfirm?: boolean;
    confirmPassword?: string;
  },
) {
  const min = options?.min ?? 6;
  const max = options?.max ?? 18;
  const length = password.length;
  if (length < min || length > max)
    return `비밀번호는 ${min}~${max}자리 입니다.`;

  if (options?.isConfirm && options?.confirmPassword) {
    if (options.confirmPassword !== password)
      return "비밀번호가 일치하지 않습니다.";
  }

  return null;
}

export function isNum(input: string) {
  const regex = /^\d+$/;
  if (!regex.test(input)) return "숫자가 아닙니다.";
  return null;
}

export function mobileValidator(mobile: string) {
  if (isNum(mobile)) return "숫자만 입력해주세요.";
  if (mobile.length !== 11) return "휴대전화는 11자리입니다.";
  return null;
}

export function regiValidator(regi: string) {
  if (isNum(regi)) return "숫자만 입력해주세요.";
  if (regi.length !== 10) return "사업자등록번호는 10자리입니다.";
  return null;
}
