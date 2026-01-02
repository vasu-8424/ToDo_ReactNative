import React, { useContext, useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  TextInput 
} from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { AuthContext } from '../contexts/AuthContext';
import { colors } from '../styles/commonStyles';
import { Task } from '../models/Task';

const priorityOrder: Record<Task['priority'], number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

export default function TaskListScreen({ navigation }: any) {
  const { tasks, toggleTask, deleteTask } = useContext(TaskContext);
  const { logout, user, userName } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [tagQuery, setTagQuery] = useState('');
  const [sortMode, setSortMode] = useState<'smart' | 'created'>('smart');

  // Get current time and greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get user's first name
  const getFirstName = () => {
    if (userName) {
      return userName.split(' ')[0];
    }
    return user?.split('@')[0] || 'User';
  };

  const filteredTasks = useMemo(() => {
    let list: Task[] = [...tasks];

    if (statusFilter === 'active') {
      list = list.filter(t => !t.completed);
    } else if (statusFilter === 'completed') {
      list = list.filter(t => t.completed);
    }

    if (priorityFilter !== 'All') {
      list = list.filter(t => t.priority === priorityFilter);
    }

    if (tagQuery.trim()) {
      const query = tagQuery.trim().toLowerCase();
      list = list.filter(t => (t.tags ?? []).some((tag: string) => tag.toLowerCase().includes(query)));
    }

    const parseDate = (value?: string) => {
      if (!value) return Number.POSITIVE_INFINITY;
      const parsed = new Date(value).getTime();
      return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
    };

    list.sort((a, b) => {
      if (sortMode === 'created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // incomplete first
      }

      const dueDiff = parseDate(a.dueDate) - parseDate(b.dueDate);
      if (dueDiff !== 0) return dueDiff;

      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [tasks, statusFilter, priorityFilter, tagQuery, sortMode]);

  const formatDueDate = (value?: string) => {
    if (!value) return 'No due date';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return 'No due date';
    return parsed.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      {/* Top decorative background */}
      <View style={styles.topSection}>
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        
        {/* Profile and greeting */}
        <View style={styles.headerContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImage}>
              <View style={styles.profileIcon} />
            </View>
          </View>
          
          <View style={styles.greetingContainer}>
            <Text style={styles.welcomeText}>Welcome {getFirstName()}</Text>
            <Text style={styles.greetingText}>{getGreeting()}</Text>
          </View>

          {/* Clock */}
          <View style={styles.clockContainer}>
            <View style={styles.clock}>
              <View style={styles.clockCenter} />
              <View style={[styles.clockHand, styles.hourHand]} />
              <View style={[styles.clockHand, styles.minuteHand]} />
              <View style={styles.clockMarker12} />
              <View style={styles.clockMarker3} />
              <View style={styles.clockMarker6} />
              <View style={styles.clockMarker9} />
            </View>
          </View>
        </View>
      </View>

      {/* Task List Section */}
      <View style={styles.taskSection}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskListTitle}>Task list</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            {['all', 'active', 'completed'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterChip,
                  statusFilter === status && styles.filterChipActive
                ]}
                onPress={() => setStatusFilter(status as any)}
              >
                <Text style={[
                  styles.filterChipText,
                  statusFilter === status && styles.filterChipTextActive
                ]}>
                  {status === 'all' ? 'All' : status === 'active' ? 'Active' : 'Done'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterRow}>
            {(['All', 'High', 'Medium', 'Low'] as const).map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.filterChip, priorityFilter === p && styles.filterChipActive]}
                onPress={() => setPriorityFilter(p)}
              >
                <Text style={[styles.filterChipText, priorityFilter === p && styles.filterChipTextActive]}>
                  {p === 'All' ? 'Any Priority' : p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterRow}>
            {(['smart', 'created'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.filterChip, sortMode === mode && styles.filterChipActive]}
                onPress={() => setSortMode(mode)}
              >
                <Text style={[styles.filterChipText, sortMode === mode && styles.filterChipTextActive]}>
                  {mode === 'smart' ? 'Smart Sort' : 'Newest'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tagFilterRow}>
            <TextInput
              style={styles.tagInput}
              placeholder="Filter by tag (e.g. Work)"
              placeholderTextColor={colors.gray}
              value={tagQuery}
              onChangeText={setTagQuery}
            />
            <TouchableOpacity style={styles.clearButton} onPress={() => {
              setTagQuery('');
              setPriorityFilter('All');
              setStatusFilter('all');
              setSortMode('smart');
            }}>
              <Text style={styles.clearButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Task Section */}
        <View style={styles.dailyTaskCard}>
          <Text style={styles.dailyTaskTitle}>Daily Task</Text>
          
          <ScrollView style={styles.taskListContainer} showsVerticalScrollIndicator={false}>
            {filteredTasks.length === 0 ? (
              <Text style={styles.noTaskText}>
                {tasks.length === 0 ? 'No tasks yet. Add your first task!' : 'No tasks match the current filters.'}
              </Text>
            ) : (
              filteredTasks.map((item: any) => {
                const priorityStyle = item.priority === 'High'
                  ? styles.priorityHigh
                  : item.priority === 'Medium'
                    ? styles.priorityMedium
                    : styles.priorityLow;

                return (
                <View key={item.id} style={styles.taskItem}>
                  <TouchableOpacity 
                    style={styles.checkboxContainer}
                    onPress={() => toggleTask(item.id)}
                  >
                    <View style={[
                      styles.checkbox, 
                      item.completed && styles.checkboxChecked
                    ]}>
                      {item.completed && <View style={styles.checkmark} />}
                    </View>
                  </TouchableOpacity>
                  
                  <View style={styles.taskContent}>
                    <Text style={[
                      styles.taskTitle,
                      item.completed && styles.taskTitleCompleted
                    ]}>
                      {item.title}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.dueText}>{formatDueDate(item.dueDate)}</Text>
                      <View style={[styles.priorityPill, priorityStyle]}>
                        <Text style={styles.priorityPillText}>{item.priority}</Text>
                      </View>
                    </View>
                    {item.tags?.length ? (
                      <View style={styles.tagRow}>
                        {item.tags.map((tag: string) => (
                          <View key={tag} style={styles.tagChip}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>

                  <TouchableOpacity 
                    onPress={() => deleteTask(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              );
            })
            )}
          </ScrollView>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  topSection: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.secondary,
    opacity: 0.3,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.secondary,
    opacity: 0.2,
  },
  headerContent: {
    position: 'relative',
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD7BE',
  },
  greetingContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  greetingText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  clockContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  clock: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clockCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.black,
    position: 'absolute',
    zIndex: 3,
  },
  clockHand: {
    position: 'absolute',
    backgroundColor: colors.black,
    transformOrigin: 'bottom center',
  },
  hourHand: {
    width: 2,
    height: 20,
    top: 20,
    transform: [{ rotate: '90deg' }],
  },
  minuteHand: {
    width: 2,
    height: 28,
    top: 12,
    transform: [{ rotate: '180deg' }],
  },
  clockMarker12: {
    position: 'absolute',
    top: 8,
    width: 2,
    height: 6,
    backgroundColor: colors.primary,
  },
  clockMarker3: {
    position: 'absolute',
    right: 8,
    width: 6,
    height: 2,
    backgroundColor: colors.primary,
  },
  clockMarker6: {
    position: 'absolute',
    bottom: 8,
    width: 2,
    height: 6,
    backgroundColor: colors.primary,
  },
  clockMarker9: {
    position: 'absolute',
    left: 8,
    width: 6,
    height: 2,
    backgroundColor: colors.primary,
  },
  taskSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 12,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  tagFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    marginRight: 10,
    color: colors.black,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.secondary,
    borderRadius: 12,
  },
  clearButtonText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 12,
  },
  taskListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  dailyTaskCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    flex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  dailyTaskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 15,
  },
  taskListContainer: {
    flex: 1,
  },
  noTaskText: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 14,
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '500',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dueText: {
    fontSize: 12,
    color: colors.gray,
  },
  priorityPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  priorityHigh: {
    backgroundColor: '#FFE1E1',
  },
  priorityMedium: {
    backgroundColor: '#FFECC7',
  },
  priorityLow: {
    backgroundColor: '#DFF5E1',
  },
  priorityPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.black,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 28,
    color: colors.gray,
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

