import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from './common'

// ───────── 감정 구슬 ─────────
// 두 감정이 섞인 날: 두 원이 물방울처럼 부드럽게 이어지고, 가운데에 두 색을 섞은 원이 생기는 모양
// 수업 범위(View, borderRadius, 색, margin)만으로 만든다
//
// 만드는 방법
//  ① 두 원의 중심을 잇는 직사각형 다리를 깐다
//  ② 다리 위·아래를 배경색 원 두 개로 동그랗게 파낸다 → 잘록한 허리가 생김
//     (파내는 원은 두 원에 딱 맞닿게 크기를 계산해서, 이음새가 매끄럽게 이어짐)
//  ③ 그 위에 두 원을 올린다

const BG = COLORS.card // 카드 배경색 (파내는 원의 색)

// 두 색 섞기: t=0이면 c1, t=1이면 c2
export const mix = (c1, c2, t) => {
  let out = '#'
  for (let i = 1; i <= 5; i += 2) {
    const a = parseInt(c1.slice(i, i + 2), 16)
    const b = parseInt(c2.slice(i, i + 2), 16)
    const v = Math.round(a * (1 - t) + b * t)
    out += (v < 16 ? '0' : '') + v.toString(16)
  }
  return out
}

// 옅은 파스텔 색을 더 진하게: 흰색에서 떨어진 정도를 k배로 늘린다
// 예) k=2.5면 '#d8e7f1'(아주 옅은 하늘) → '#9cc2db'(또렷한 하늘)
export const deepen = (c, k) => {
  let out = '#'
  for (let i = 1; i <= 5; i += 2) {
    const v = parseInt(c.slice(i, i + 2), 16)
    const d = Math.max(0, Math.round(255 - (255 - v) * k))
    out += (d < 16 ? '0' : '') + d.toString(16)
  }
  return out
}

// ── 한 감정: 원 하나 ──
export function SoloOrb({ emotion, size = 120 }) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: emotion.color }]}>
      <Text style={{ fontSize: size * 0.42 }}>{emotion.icon}</Text>
    </View>
  )
}

// ── 두 감정: 두 원이 잘록한 허리로 이어진 모양 ──
export function MixOrb({ first, second, size = 96 }) {
  const R = size / 2 // 원 반지름
  const D = R * 2.45 // 두 원 중심 사이 거리 (조금 떨어뜨려서 허리가 보이게)
  const neck = R * 0.3 // 허리 두께의 절반 (작을수록 잘록함)

  // 파내는 원: 두 원에 딱 맞닿도록 반지름 계산
  // (D/2)² + (neck + rc)² = (R + rc)²  →  rc = ((D/2)² - R² + neck²) / (2(R - neck))
  const half = D / 2
  const rc = (half * half - R * R + neck * neck) / (2 * (R - neck))
  const cy = neck + rc // 파내는 원 중심의 세로 위치 (가운데 기준)

  // 다리(직사각형)의 높이: 파내는 원과 큰 원이 맞닿는 지점까지
  const bridgeH = (2 * cy * R) / (R + rc)

  const W = D + size // 전체 너비
  const midSize = size * 0.62 // 가운데 섞인 색 원 크기 (두 원에 살짝 걸치는 크기)
  const H = size // 전체 높이
  const mid = W / 2

  // 다리 색: 왼쪽 감정 색 → 오른쪽 감정 색으로 조금씩 바뀌는 세로 줄 8개
  const strips = []
  for (let i = 0; i < 8; i++) strips.push(mix(first.color, second.color, (i + 0.5) / 8))

  return (
    <View style={{ width: W, height: H }}>
      {/* ① 두 원 중심을 잇는 다리 */}
      <View style={[styles.row, { width: W, height: H, alignItems: 'center' }]}>
        <View style={[styles.row, { marginLeft: R, width: D, height: bridgeH }]}>
          {strips.map((c) => (
            <View style={{ flex: 1, backgroundColor: c }} />
          ))}
        </View>
      </View>

      {/* ② 위쪽을 동그랗게 파내기 */}
      <View style={[styles.row, { width: W, height: H, marginTop: -H }]}>
        <View style={[styles.circle, { marginLeft: mid - rc, marginTop: H / 2 - cy - rc, width: rc * 2, height: rc * 2, borderRadius: rc, backgroundColor: BG }]} />
      </View>

      {/* ② 아래쪽을 동그랗게 파내기 */}
      <View style={[styles.row, { width: W, height: H, marginTop: -H }]}>
        <View style={[styles.circle, { marginLeft: mid - rc, marginTop: H / 2 + cy - rc, width: rc * 2, height: rc * 2, borderRadius: rc, backgroundColor: BG }]} />
      </View>

      {/* ③ 두 원 */}
      <View style={[styles.row, { width: W, height: H, marginTop: -H }]}>
        <View style={[styles.circle, { width: size, height: size, borderRadius: R, backgroundColor: first.color }]}>
          <Text style={{ fontSize: size * 0.38 }}>{first.icon}</Text>
        </View>
        <View style={[styles.circle, { marginLeft: D - size, width: size, height: size, borderRadius: R, backgroundColor: second.color }]}>
          <Text style={{ fontSize: size * 0.38 }}>{second.icon}</Text>
        </View>
      </View>

      {/* ④ 가운데 섞인 색 원: 두 감정이 섞여 생긴 새 감정 */}
      <View style={[styles.row, { width: W, height: H, marginTop: -H, justifyContent: 'center', alignItems: 'center' }]}>
        <View
          style={[
            styles.circle,
            {
              width: midSize,
              height: midSize,
              borderRadius: midSize / 2,
              backgroundColor: deepen(mix(first.color, second.color, 0.5), 2.5), // 두 색을 섞고 조금 더 진하게
              borderWidth: 4,
              borderColor: BG, // 카드 배경색 테두리로 두 원과 또렷하게 구분
            },
          ]}
        >
          <Text style={{ fontSize: midSize * 0.34, color: COLORS.onColor }}>✦</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: { justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row' },
})
