import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Task, useTasks } from '../tasks-context';

export default function StatsScreen() {
  // get tasks from global context
  const { tasks } = useTasks();

  // theme-aware colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor(
    { light: '#FFFFFF', dark: '#1C1C1E' },
    'background'
  );

  // calculate real-time statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: Task) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(1) : '0.0';

  // stats configuration with dynamic values
  const dynamicStats = [
    { title: 'Total Tasks', value: totalTasks.toString(), icon: 'list.bullet' as const, color: '#007AFF', subtitle: 'All time tasks' },
    { title: 'Completed', value: completedTasks.toString(), icon: 'checkmark.circle.fill' as const, color: '#34C759', subtitle: `${completionRate}% complete` },
    { title: 'Active', value: activeTasks.toString(), icon: 'circle' as const, color: '#FF9500', subtitle: 'Tasks remaining' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Statistics</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Your productivity at a glance
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsGrid}>
        {dynamicStats.map((stat, index) => (
          <ThemedView 
            key={index} 
            style={[styles.statCard, { backgroundColor: cardBackground }]}
          >
            {/* Icon */}
            <ThemedView style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <IconSymbol name={stat.icon} size={24} color={stat.color} />
            </ThemedView>
            
            {/* Value */}
            <View style={styles.valueContainer}>
              <ThemedText style={[styles.statValue, { color: stat.color }]}>{stat.value}</ThemedText>
            </View>
            
            {/* Title + Subtitle */}
            <View style={styles.textContainer}>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
              <ThemedText style={styles.statSubtitle}>{stat.subtitle}</ThemedText>
            </View>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    paddingTop: 70,
  },
  subtitle: {
    opacity: 0.6,
    marginTop: 4,
  },
  statsGrid: {
    padding: 20,
    paddingTop: 0,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  valueContainer: {
    justifyContent: 'center',
    marginRight: 20,
    minWidth: 50,
    paddingVertical: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    includeFontPadding: false,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  activityList: {
    marginTop: 16,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  activityAction: {
    fontSize: 15,
  },
});