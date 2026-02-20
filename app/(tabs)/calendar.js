import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_DAYS = 28;
const START_DAY = 6; // Feb 2026 starts on Saturday

// Mock period days and symptom days
const PERIOD_DAYS  = new Set([1, 2, 3, 4, 5]);
const SYMPTOM_DAYS = new Set([8, 14, 22]);

export default function CalendarScreen() {
  const [selected, setSelected] = useState(null);

  const cells = [
    ...Array(START_DAY).fill(null),
    ...Array.from({ length: MONTH_DAYS }, (_, i) => i + 1),
  ];

  const handleDay = (day) => {
    if (!day) return;
    setSelected(day);
    Alert.alert('Coming Soon', 'Period logging will be enabled in the next sprint.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow}><Text style={styles.arrowTxt}>‹</Text></TouchableOpacity>
        <Text style={styles.monthTitle}>February 2026</Text>
        <TouchableOpacity style={styles.arrow}><Text style={styles.arrowTxt}>›</Text></TouchableOpacity>
      </View>

      {/* Day labels */}
      <View style={styles.dayRow}>
        {DAYS.map(d => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {cells.map((day, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.cell,
              !day && styles.emptyCell,
              day && PERIOD_DAYS.has(day)  && styles.periodCell,
              day && SYMPTOM_DAYS.has(day) && styles.symptomCell,
              day === selected && styles.selectedCell,
            ]}
            onPress={() => handleDay(day)}
            activeOpacity={day ? 0.7 : 1}
          >
            {day ? (
              <Text style={[
                styles.cellTxt,
                PERIOD_DAYS.has(day)  && styles.periodTxt,
                day === selected      && styles.selectedTxt,
              ]}>{day}</Text>
            ) : null}
            {day && PERIOD_DAYS.has(day)  && <View style={styles.dot} />}
            {day && SYMPTOM_DAYS.has(day) && <View style={[styles.dot, { backgroundColor: '#FF9500' }]} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFB6C1' }]} />
          <Text style={styles.legendTxt}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF9500' }]} />
          <Text style={styles.legendTxt}>Symptoms</Text>
        </View>
      </View>

      {/* Log Button */}
      <TouchableOpacity
        style={styles.logBtn}
        onPress={() => Alert.alert('Coming Soon', 'Period logging will be added in the next sprint.')}
      >
        <Text style={styles.logBtnTxt}>🩸  Log Period</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20, paddingTop: 52 },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  arrow:       { padding: 8 },
  arrowTxt:    { fontSize: 24, color: '#C2185B', fontWeight: '300' },
  monthTitle:  { fontSize: 18, fontWeight: 'bold', color: '#333' },
  dayRow:      { flexDirection: 'row', marginBottom: 8 },
  dayLabel:    { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '600', color: '#aaa' },
  grid:        { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  cell:        { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', padding: 2 },
  emptyCell:   { opacity: 0 },
  periodCell:  { backgroundColor: '#FFE4E9', borderRadius: 20 },
  symptomCell: { backgroundColor: '#FFF3E0', borderRadius: 20 },
  selectedCell:{ backgroundColor: '#C2185B', borderRadius: 20 },
  cellTxt:     { fontSize: 14, color: '#333' },
  periodTxt:   { color: '#C2185B', fontWeight: '600' },
  selectedTxt: { color: '#fff', fontWeight: '700' },
  dot:         { width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFB6C1', marginTop: 2 },
  legend:      { flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 20 },
  legendItem:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot:   { width: 10, height: 10, borderRadius: 5 },
  legendTxt:   { fontSize: 13, color: '#666' },
  logBtn:      { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  logBtnTxt:   { color: '#fff', fontSize: 16, fontWeight: '700' },
});
