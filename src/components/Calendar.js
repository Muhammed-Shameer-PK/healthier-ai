import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { getDailyLogs } from '../services/storageService';

export default function CycleCalendar() {
  const [markedDates, setMarked] = useState({});

  useEffect(() => {
    getDailyLogs().then(logs => {
      const marks = {};
      logs.forEach(log => {
        const key = log.date?.split('T')[0];
        if (!key) return;
        if (log.isPeriod) {
          marks[key] = { marked: true, dotColor: '#C2185B', selected: true, selectedColor: '#FFB6C1' };
        } else if (log.symptoms?.length > 0) {
          marks[key] = { marked: true, dotColor: '#FF9500' };
        }
      });
      setMarked(marks);
    });
  }, []);

  return (
    <View style={styles.container}>
      <RNCalendar
        markedDates={markedDates}
        theme={{
          backgroundColor:       '#FFF5F5',
          calendarBackground:    '#FFF5F5',
          todayTextColor:        '#C2185B',
          arrowColor:            '#C2185B',
          selectedDayBackgroundColor: '#FFB6C1',
          dotColor:              '#C2185B',
          textDayFontSize:       14,
          textMonthFontSize:     16,
          textMonthFontWeight:   'bold',
        }}
      />
      <View style={styles.legend}>
        <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#FFB6C1' }]} /><Text style={styles.legendText}>Period</Text></View>
        <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#FF9500' }]} /><Text style={styles.legendText}>Symptoms</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#FFF5F5' },
  legend:      { flexDirection: 'row', justifyContent: 'center', gap: 20, padding: 12 },
  legendItem:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot:         { width: 10, height: 10, borderRadius: 5 },
  legendText:  { fontSize: 12, color: '#666' },
});
