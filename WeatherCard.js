import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { decideEmotion, findEmotionByPiece, findDyad, UNKNOWN } from './emotions'
import { KINDS } from './pieceAi'
import WheelBar from './WheelBar'
import { toKoreanDate, COLORS } from './common'

// 날씨 카드
// 앞면: 복합 감정이 있으면 두 렌즈가 겹친 모양, 없으면 렌즈 하나
// 뒷면: 오늘 마음에 건네는 AI의 작은 추천 (카드를 누르면 뒤집힌다)
export default function WeatherCard({ record, commentLoading }) {
  const [back, setBack] = useState(false)

  const emotion = decideEmotion(record.pieces) || UNKNOWN
  const mix = findDyad(record.pieces)

  // 감정바퀴 띠에서 켤 칸
  const litIds = []
  for (const name of record.pieces) {
    const e = findEmotionByPiece(name)
    if (!litIds.includes(e.id)) litIds.push(e.id)
  }

  // 복합 감정이면 바깥 테두리와 안쪽 테두리를 두 감정 색으로
  const outerColor = mix ? mix.first.color : emotion.color
  const innerColor = mix ? mix.second.color : COLORS.card

  return (
    <TouchableOpacity style={[styles.card, { borderColor: outerColor }]} onPress={() => setBack(!back)}>
      <View style={[styles.inner, { borderColor: innerColor }]}>
        {/* ── 앞면 ── */}
        {!back && (
          <View style={styles.face}>
            <Text style={styles.date}>{toKoreanDate(record.date)}</Text>

            {mix ? (
              <View style={styles.face}>
                {/* 두 렌즈가 겹친 모양: 두 감정이 섞인 날 */}
                <View style={styles.venn}>
                  <View style={[styles.ring, { borderColor: mix.first.color }]}>
                    <Text style={styles.ringIcon}>{mix.first.icon}</Text>
                  </View>
                  <View style={[styles.ring, styles.ringRight, { borderColor: mix.second.color }]}>
                    <Text style={styles.ringIcon}>{mix.second.icon}</Text>
                  </View>
                </View>
                <Text style={styles.mixLabel}>✦ 오늘의 복합 감정 ✦</Text>
                <Text style={styles.mixName}>{mix.dyad.name}</Text>
                <Text style={styles.formula}>
                  <Text style={{ color: mix.first.color }}>{mix.first.label}</Text>
                  {'  +  '}
                  <Text style={{ color: mix.second.color }}>{mix.second.label}</Text>
                </Text>
              </View>
            ) : (
              <View style={styles.face}>
                {/* 렌즈 하나: 한 감정이 또렷한 날 */}
                <View style={[styles.lens, { borderColor: emotion.color }]}>
                  <Text style={styles.icon}>{emotion.icon}</Text>
                </View>
                <Text style={[styles.weather, { color: emotion.color }]}>오늘의 마음날씨 · {emotion.weather}</Text>
              </View>
            )}

            <View style={styles.wheel}>
              <WheelBar litIds={litIds} />
            </View>

            <View style={styles.pieceRow}>
              {record.pieces.length == 0 && <Text style={[styles.piece, styles.unknownPiece]}>{UNKNOWN.label}</Text>}
              {record.pieces.map((name) => (
                <Text style={[styles.piece, { backgroundColor: findEmotionByPiece(name).color }]}>{name}</Text>
              ))}
            </View>

            <View style={styles.hintPill}>
              <Text style={styles.hint}>카드를 눌러 오늘의 작은 추천 보기</Text>
            </View>
          </View>
        )}

        {/* ── 뒷면: 오늘 마음에 건네는 작은 추천 ── */}
        {back && (
          <View style={styles.face}>
            {mix && <Text style={styles.backMix}>✦ {mix.dyad.name} · {mix.dyad.meaning}</Text>}
            {commentLoading && <Text style={styles.reason}>오늘의 추천을 고르고 있어요...</Text>}
            {!commentLoading && record.comment == null && (
              <Text style={styles.reason}>추천을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.</Text>
            )}
            {!commentLoading && record.comment != null && (
              <View style={styles.face}>
                <Text style={styles.backTitle}>
                  {KINDS[record.comment.kind] || '🌤'} 오늘의 작은 추천{record.comment.kind != '' ? ` · ${record.comment.kind}` : ''}
                </Text>
                {record.comment.item != '' && <Text style={styles.menu}>{record.comment.item}</Text>}
                {record.comment.reason != '' && <Text style={styles.reason}>{record.comment.reason}</Text>}
                {record.comment.line != '' && <Text style={styles.line}>“{record.comment.line}”</Text>}
              </View>
            )}
            <View style={styles.hintPill}>
              <Text style={styles.hint}>다시 누르면 앞면으로 돌아가요</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: { borderRadius: 24, padding: 6, height: 440, backgroundColor: COLORS.card, borderWidth: 3 },
  inner: { flex: 1, borderRadius: 18, borderWidth: 2, padding: 16 },
  face: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  date: { fontSize: 13, color: COLORS.quiet },

  // 렌즈 하나
  lens: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 6,
    backgroundColor: COLORS.paper,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 58 },
  weather: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },

  // 두 렌즈가 겹친 모양
  venn: { flexDirection: 'row', alignItems: 'center' },
  ring: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringRight: { marginLeft: -36 }, // 왼쪽 렌즈와 겹치게
  ringIcon: { fontSize: 40 },
  mixLabel: { fontSize: 12, color: COLORS.star, marginTop: 12 },
  mixName: { fontSize: 32, fontWeight: 'bold', color: COLORS.ink, marginTop: 2 },
  formula: { fontSize: 14, color: COLORS.quiet, marginTop: 4 },

  wheel: { marginTop: 14 },
  pieceRow: { flexDirection: 'row', marginTop: 12 },
  piece: { margin: 4, padding: 7, borderRadius: 14, fontSize: 13, color: COLORS.onColor, backgroundColor: COLORS.paper },
  unknownPiece: { color: COLORS.ink },

  hintPill: { backgroundColor: COLORS.subTabOn, borderRadius: 8, padding: 6, marginTop: 14 },
  hint: { fontSize: 12, color: COLORS.accent },
  backMix: { fontSize: 13, color: COLORS.star },
  backTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.ink, marginTop: 10 },
  menu: { fontSize: 26, fontWeight: 'bold', color: COLORS.ink, marginTop: 16 },
  reason: { fontSize: 15, color: COLORS.ink, marginTop: 10 },
  line: { fontSize: 15, color: COLORS.ink, marginTop: 14 },
})
