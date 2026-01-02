import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView 
} from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { AuthContext } from '../contexts/AuthContext';
import { colors } from '../styles/commonStyles';

export default function TaskListScreen({ navigation }: any) {
  const { tasks, toggleTask, deleteTask } = useContext(TaskContext);
  const { logout, user, userName } = useContext(AuthContext);

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

        {/* Daily Task Section */}
        <View style={styles.dailyTaskCard}>
          <Text style={styles.dailyTaskTitle}>Daily Task</Text>
          
          <ScrollView style={styles.taskListContainer} showsVerticalScrollIndicator={false}>
            {tasks.length === 0 ? (
              <Text style={styles.noTaskText}>No tasks yet. Add your first task!</Text>
            ) : (
              tasks.map((item: any) => (
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
                    {item.priority && (
                      <Text style={styles.taskPriority}>Priority: {item.priority}</Text>
                    )}
                  </View>

                  <TouchableOpacity 
                    onPress={() => deleteTask(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))
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
  taskPriority: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
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

