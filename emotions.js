// 마음 돋보기 감정 사전
// 기본 감정 8개와 색 방향은 플루치크(Plutchik)의 감정바퀴를 따르고, 앱 분위기에 맞게 옅은 톤으로 조정했다
// 세부 감정(조각) 4개씩은 대학생의 일기 표현에 맞게 팀이 구성한 초안이다
// 순서는 감정바퀴를 도는 순서: 기쁨 → 신뢰 → 두려움 → 놀람 → 슬픔 → 혐오 → 분노 → 기대

export const EMOTIONS = [
  {
    id: 'joy', label: '기쁨', icon: '☀️', weather: '맑음', color: '#FFF3D1', // 노랑
    pieces: [
      { name: '뿌듯함', meaning: '내가 해낸 일이 자랑스러울 때' },
      { name: '즐거움', meaning: '하는 일이 재미있고 신날 때' },
      { name: '홀가분함', meaning: '부담이 사라져 마음이 가벼울 때' },
      { name: '편안함', meaning: '걱정 없이 몸과 마음이 느긋할 때' },
    ],
  },
  {
    id: 'trust', label: '신뢰', icon: '🌤️', weather: '화창', color: '#E6F4D7', // 연두
    pieces: [
      { name: '감사함', meaning: '누군가에게 고마운 마음이 들 때' },
      { name: '든든함', meaning: '믿을 수 있는 사람이나 것이 곁에 있을 때' },
      { name: '안심됨', meaning: '걱정하던 일이 괜찮아졌을 때' },
      { name: '친밀함', meaning: '누군가와 마음이 가깝게 느껴질 때' },
    ],
  },
  {
    id: 'fear', label: '두려움', icon: '☁️', weather: '흐림', color: '#D6EFE4', // 초록
    pieces: [
      { name: '불안', meaning: '나쁜 일이 생길 것 같아 마음이 놓이지 않을 때' },
      { name: '걱정', meaning: '앞으로의 일이 마음에 걸릴 때' },
      { name: '초조함', meaning: '시간에 쫓겨 마음이 급할 때' },
      { name: '막막함', meaning: '무엇부터 해야 할지 모를 때' },
    ],
  },
  {
    id: 'surprise', label: '놀람', icon: '🌈', weather: '무지개', color: '#DCEFF8', // 하늘
    pieces: [
      { name: '당황', meaning: '예상 못 한 일에 어쩔 줄 모를 때' },
      { name: '놀라움', meaning: '생각지 못한 일에 깜짝 놀랐을 때' },
      { name: '어이없음', meaning: '말이 안 되는 상황에 할 말을 잃었을 때' },
      { name: '신기함', meaning: '처음 보는 일에 흥미가 생길 때' },
    ],
  },
  {
    id: 'sad', label: '슬픔', icon: '🌧️', weather: '비', color: '#D3DEEA', // 파랑
    pieces: [
      { name: '서운함', meaning: '기대한 만큼 마음을 받지 못했을 때' },
      { name: '속상함', meaning: '일이 뜻대로 되지 않아 마음이 아플 때' },
      { name: '외로움', meaning: '곁에 아무도 없는 것처럼 느껴질 때' },
      { name: '허무함', meaning: '애쓴 일이 의미 없게 느껴질 때' },
    ],
  },
  {
    id: 'disgust', label: '혐오', icon: '🌫️', weather: '안개', color: '#EADFF4', // 보라
    pieces: [
      { name: '싫증', meaning: '같은 일이 반복돼 더 하기 싫을 때' },
      { name: '불쾌함', meaning: '무언가가 마음에 거슬리고 기분이 상할 때' },
      { name: '거부감', meaning: '받아들이고 싶지 않은 마음이 들 때' },
      { name: '못마땅함', meaning: '어떤 일이나 사람이 마음에 들지 않을 때' },
    ],
  },
  {
    id: 'anger', label: '분노', icon: '⛈️', weather: '폭풍', color: '#F8DADA', // 빨강
    pieces: [
      { name: '짜증', meaning: '작은 일들이 계속 거슬릴 때' },
      { name: '억울함', meaning: '내 잘못이 아닌데 손해를 봤다고 느낄 때' },
      { name: '답답함', meaning: '상황이 막혀 풀리지 않을 때' },
      { name: '배신감', meaning: '믿었던 사람에게 실망했을 때' },
    ],
  },
  {
    id: 'anticipation', label: '기대', icon: '🌅', weather: '갬', color: '#FDE5CF', // 주황
    pieces: [
      { name: '설렘', meaning: '좋은 일을 기다리며 마음이 들뜰 때' },
      { name: '기대감', meaning: '앞으로의 일이 잘될 것 같을 때' },
      { name: '궁금함', meaning: '어떻게 될지 알고 싶은 마음이 들 때' },
      { name: '의욕', meaning: '무언가를 해 보고 싶은 힘이 생길 때' },
    ],
  },
]

// 조각 이름으로 그 조각이 속한 기본 감정 찾기 (없으면 undefined)
// 예) findEmotionByPiece('막막함') → 두려움
export const findEmotionByPiece = (pieceName) =>
  EMOTIONS.filter((e) => e.pieces.filter((p) => p.name == pieceName).length > 0)[0]

// 고른 조각들로 오늘의 날씨(기본 감정) 정하기
// 가장 많이 고른 기본 감정을 쓰고, 개수가 같으면 먼저 고른 조각의 감정을 쓴다
export const decideEmotion = (pieceNames) => {
  let best = null
  let bestCount = 0
  for (const name of pieceNames) {
    const emotion = findEmotionByPiece(name)
    if (emotion == undefined) continue
    const count = pieceNames.filter((n) => findEmotionByPiece(n) == emotion).length
    if (count > bestCount) {
      best = emotion
      bestCount = count
    }
  }
  return best // 조각이 없으면 null
}

// 조각을 고르지 않았을 때(잘 모르겠어요) 쓰는 카드 모양
export const UNKNOWN = { icon: '🔍', weather: '들여다보는 중', label: '아직 들여다보는 중인 마음', color: '#EEF1F4' }

// ───────── 복합 감정 (플루치크의 1차 조합: 감정바퀴에서 이웃한 두 감정) ─────────
// ※ 조합 이름은 자료마다 번역이 조금씩 다르다 (예: 놀람+슬픔은 '반감'으로 쓰기도 함)
export const DYADS = [
  { a: 'joy', b: 'trust', name: '사랑', meaning: '기쁨과 믿음이 함께 있는 따뜻한 마음' },
  { a: 'trust', b: 'fear', name: '순종', meaning: '믿고 따르면서도 조심스러운 마음' },
  { a: 'fear', b: 'surprise', name: '경외', meaning: '놀라우면서도 두렵게 압도되는 마음' },
  { a: 'surprise', b: 'sad', name: '실망', meaning: '예상과 달라 마음이 가라앉는 마음' },
  { a: 'sad', b: 'disgust', name: '후회', meaning: '지난 일이 아프고 싫게 느껴지는 마음' },
  { a: 'disgust', b: 'anger', name: '경멸', meaning: '싫음과 화가 겹쳐 등을 돌리고 싶은 마음' },
  { a: 'anger', b: 'anticipation', name: '공격성', meaning: '화가 앞으로 나아가는 힘으로 바뀌는 마음' },
  { a: 'anticipation', b: 'joy', name: '낙관', meaning: '앞으로 좋은 일이 있을 거라 믿는 마음' },
]

// 고른 조각들에서 복합 감정 찾기
// 결과: { dyad, first, second } (first, second는 기본 감정) / 없으면 null
export const findDyad = (pieceNames) => {
  const ids = []
  for (const name of pieceNames) {
    const e = findEmotionByPiece(name)
    if (e && !ids.includes(e.id)) ids.push(e.id)
  }
  for (const d of DYADS) {
    if (ids.includes(d.a) && ids.includes(d.b)) {
      const first = EMOTIONS.filter((e) => e.id == d.a)[0]
      const second = EMOTIONS.filter((e) => e.id == d.b)[0]
      return { dyad: d, first, second }
    }
  }
  return null
}
