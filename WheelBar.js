import { View, StyleSheet } from 'react-native'
import { EMOTIONS } from './emotions'
import { COLORS } from './common'

// 감정바퀴 8칸 띠: 오늘 고른 기본 감정 칸만 밝게 켜진다
export default function WheelBar({ litIds, width = 220 }) {
  return (
    <View style={[styles.bar, { width }]}>
      {EMOTIONS.map((e) => (
        <View style={[styles.piece, { backgroundColor: litIds.includes(e.id) ? e.color : COLORS.line }]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row' },
  piece: { flex: 1, height: 8, margin: 1, borderRadius: 4 },
})
