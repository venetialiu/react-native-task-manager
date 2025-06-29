import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTasks } from '../tasks-context';


export default function HomeScreen() {
  // get task management functions from context
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [inputText, setInputText] = useState('');
  
  // theme-aware colors
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const buttonTextColor = useThemeColor({}, 'text');

  const handleAddTask = () => {
    addTask(inputText);
    setInputText('');
  };

  // render individual task item with toggle & delete functionality
  const renderTask = ({ item }: { item: { id: string; text: string; completed: boolean } }) => (
    <ThemedView style={styles.taskItem}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
      >
        <IconSymbol
          name={item.completed ? 'checkmark.circle.fill' : 'circle'}
          size={24}
          color={item.completed ? tintColor : '#666'}
        />
        <ThemedText
          style={[
            styles.taskText,
            item.completed && styles.completedText
          ]}
        >
          {item.text}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <IconSymbol name="trash.fill" size={20} color="#ff4444" />
      </TouchableOpacity>
    </ThemedView>
  );

  // calculate task stats for header display
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">My Tasks</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          {activeTasks} active, {completedTasks} completed
        </ThemedText>
      </ThemedView>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: useThemeColor({}, 'text') }]}
          placeholder="Add a new task..."
          placeholderTextColor="#666"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: tintColor }]}
          onPress={handleAddTask}
        >
          <IconSymbol name="plus" size={24} color={buttonTextColor} weight="medium"/>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
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
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});