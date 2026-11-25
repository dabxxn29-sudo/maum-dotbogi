// 마음 돋보기에서 함께 쓰는 날짜 함수와 색상

// 숫자를 두 자리 문자로: 3 -> '03'
const two = (n) => (n < 10 ? '0' + n : '' + n)

// Date 객체 → '2026-11-22'
// (toISOString()은 시간대 때문에 날짜가 하루 밀릴 수 있어서 쓰지 않는다)
export const toDateString = (d) =>
  d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate())

// 오늘 날짜 문자열
export const todayString = () => toDateString(new Date())

// n일 전 날짜 문자열 (시연용 예시 기록에 사용)
export const daysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toDateString(d)
}

// '2026-11-22' -> '11월 22일'
export const toKoreanDate = (dateString) =>
  Number(dateString.slice(5, 7)) + '월 ' + Number(dateString.slice(8, 10)) + '일'

export const COLORS = {
  sky: '#161B36',      // 전체 배경 (깊은 밤하늘)
  paper: '#232A52',    // 카드 안쪽 배경, 입력칸
  card: '#1E2447',     // 카드
  ink: '#EEF1FF',      // 밝은 글자
  quiet: '#9AA3CC',    // 흐린 글자
  accent: '#A9B8FF',   // 버튼·링크 (별빛 보라)
  onAccent: '#161B36', // 밝은 버튼 위의 글자
  onColor: '#1E2447',  // 감정 색(파스텔) 위의 글자
  line: '#343D6E',
  tabBg: '#232A52',
  today: '#2F3870',    // 달력 오늘 칸
  tabOn: '#A9B8FF',    // 선택된 큰 탭
  subTabOn: '#343D6E', // 선택된 작은 탭
  danger: '#FF9A9A',   // 삭제
  star: '#FFE9A8',     // 별 장식
}

// 한 줄 일기 최대 글자 수
export const MAX_LENGTH = 50
