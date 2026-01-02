
/**
 * 문자열(string)에 공백이 있을 때 그 공백 기준으로 줄바꿈
 */
export function wrapBySpace(text: string): string {
  return text.replace(/ /g, '\n');
}