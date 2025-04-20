import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../components/GlobalText";
import { TodoItem } from "./TodoItem";

import styles from "../style";

const TodoScreen: React.FC<{ parsedText?: string }> = ({ parsedText }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleTasks = async () => {
      try {
        setLoading(true);

        const storedTasksJson = await AsyncStorage.getItem("todoTasks");
        const storedTasks = storedTasksJson ? JSON.parse(storedTasksJson) : [];

        if (parsedText) {
          const newTasksText = parsedText;
          const newTasks = newTasksText
            .split("\n\n")
            .filter((task: string) => task.trim() !== "")
            .map((task: string) => task.trim());

          const updatedTasks = [...newTasks, ...storedTasks];

          const uniqueTasks = [...new Set(updatedTasks)];

          setTasks(uniqueTasks);
          await AsyncStorage.setItem("todoTasks", JSON.stringify(uniqueTasks));
        } else {
          setTasks(storedTasks);
        }
      } catch (err) {
        console.error("Error handling tasks:", err);
        setError("Failed to load your tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    handleTasks();
  }, [parsedText]);

  useEffect(() => {
    const saveTasks = async () => {
      if (!loading) {
        try {
          await AsyncStorage.setItem("todoTasks", JSON.stringify(tasks));
        } catch (err) {
          console.error("Error saving tasks:", err);
          setError("Failed to save your changes. Please try again.");
        }
      }
    };

    saveTasks();
  }, [tasks, loading]);

  const handleDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={{ gap: 20 }}>
      <Text style={styles.headerTitle}>My Tasks</Text>

      {loading && (
        <View style={styles.messageContainer}>
          <Text>Loading your tasks...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && tasks.length === 0 && (
        <View style={styles.messageContainer}>
          <Text>No tasks yet. Record something to get started!</Text>
        </View>
      )}

      {tasks.map((task: string, index: number) => (
        <TodoItem
          key={index}
          text={task}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </View>
  );
};

export default TodoScreen;
