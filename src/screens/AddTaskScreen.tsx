import React, { useState, useContext } from 'react';
import { 
  View, 
  Text,
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView 
} from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { colors, commonStyles } from '../styles/commonStyles';

export default function AddTaskScreen({ navigation }: any) {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');

  const submit = () => {
    if (!title.trim()) {
      return;
    }
    
    addTask({
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date().toISOString(),
      deadline: new Date().toISOString(),
      priority,
      completed: false,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.topCircleDecoration} />
        <View style={commonStyles.topLeftCircle} />
        
        <View style={styles.content}>
          <Text style={styles.title}>Add New Task</Text>
          
          <View style={styles.inputWrapper}>
            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="Task Title"
                placeholderTextColor={colors.gray}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={[commonStyles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[commonStyles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor={colors.gray}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.priorityLabel}>Priority</Text>
            <View style={styles.priorityContainer}>
              {(['High', 'Medium', 'Low'] as const).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityButton,
                    priority === p && styles.priorityButtonActive,
                    p === 'High' && styles.priorityHigh,
                    p === 'Medium' && styles.priorityMedium,
                    p === 'Low' && styles.priorityLow,
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text style={[
                    styles.priorityText,
                    priority === p && styles.priorityTextActive
                  ]}>
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={commonStyles.button} onPress={submit}>
            <Text style={commonStyles.buttonText}>Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 35,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  textAreaContainer: {
    minHeight: 120,
  },
  textArea: {
    minHeight: 100,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
    marginTop: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.white,
  },
  priorityButtonActive: {
    borderWidth: 2,
  },
  priorityHigh: {
    borderColor: '#FF4444',
  },
  priorityMedium: {
    borderColor: '#FFA500',
  },
  priorityLow: {
    borderColor: '#4CAF50',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
  },
  priorityTextActive: {
    color: colors.black,
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
  },
});

