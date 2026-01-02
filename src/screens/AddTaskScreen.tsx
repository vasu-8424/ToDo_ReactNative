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
import Toast from 'react-native-toast-message';

export default function AddTaskScreen({ navigation }: any) {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');
  const [dueDateInput, setDueDateInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const setQuickDate = (daysFromNow: number) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + daysFromNow);
    setDueDateInput(date.toISOString().slice(0, 10));
  };

  const submit = () => {
    if (!title.trim()) {
      return;
    }

    let dueDate: string | undefined;
    if (dueDateInput.trim()) {
      const parsed = new Date(dueDateInput);
      if (isNaN(parsed.getTime())) {
        Toast.show({
          type: 'error',
          text1: 'Invalid date',
          text2: 'Use format YYYY-MM-DD',
          position: 'top',
        });
        return;
      }
      dueDate = parsed.toISOString();
    }

    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
    
    addTask({
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date().toISOString(),
      dueDate,
      priority,
      completed: false,
      tags,
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

            <Text style={styles.priorityLabel}>Due date (optional)</Text>
            <View style={styles.quickDatesRow}>
              {[0, 1, 7].map(offset => (
                <TouchableOpacity
                  key={offset}
                  style={styles.quickDateChip}
                  onPress={() => setQuickDate(offset)}
                >
                  <Text style={styles.quickDateText}>
                    {offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : 'Next Week'}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.quickDateChip, styles.clearChip]}
                onPress={() => setDueDateInput('')}
              >
                <Text style={[styles.quickDateText, styles.clearText]}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="YYYY-MM-DD (optional)"
                placeholderTextColor={colors.gray}
                value={dueDateInput}
                onChangeText={setDueDateInput}
              />
            </View>

            <Text style={styles.priorityLabel}>Tags (comma separated)</Text>
            <View style={commonStyles.inputContainer}>
              <TextInput
                style={commonStyles.input}
                placeholder="e.g. Work, Errand, School"
                placeholderTextColor={colors.gray}
                value={tagsInput}
                onChangeText={setTagsInput}
              />
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
  quickDatesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  quickDateChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    marginRight: 8,
    marginBottom: 8,
  },
  quickDateText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 12,
  },
  clearChip: {
    borderColor: colors.error,
  },
  clearText: {
    color: colors.error,
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

