import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Modal, TextInput, Alert, StyleSheet,
  SafeAreaView, StatusBar, RefreshControl
} from 'react-native';
import { supabase, MY_USER_ID } from '../../lib/supabase';
import { router } from 'expo-router'

type Meal = {
  id: string;
  meal_name: string;
  calories: number | null;
  meal_time: string;
};

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');

  const fetchMeals = async () => {
    const { data } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', MY_USER_ID)
      .order('meal_time', { ascending: false });
    if (data) setMeals(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMeals();
    const channel = supabase
      .channel('meals-realtime')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'meals',
        filter: `user_id=eq.${MY_USER_ID}`
      }, () => { fetchMeals(); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMeals();
  }, []);

 const openAddModal = () => {
    Alert.alert(
      '➕ Add Meal',
      'How would you like to add?',
      [
        {
          text: '✏️ Enter Manually',
          onPress: () => {
            setEditingMeal(null);
            setMealName('');
            setCalories('');
            setModalVisible(true);
          }
        },
        {
          text: '📷 Scan Food',
          onPress: () => router.push('/modal')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };
  const openEditModal = (meal: Meal) => {
    setEditingMeal(meal);
    setMealName(meal.meal_name);
    setCalories(meal.calories?.toString() || '');
    setModalVisible(true);
  };

  const saveMeal = async () => {
    if (!mealName.trim()) {
      Alert.alert('Error', 'Please enter a meal name');
      return;
    }
    const mealData = {
      meal_name: mealName.trim(),
      calories: calories ? parseInt(calories) : null,
      updated_at: new Date().toISOString()
    };
    if (editingMeal) {
      await supabase.from('meals').update(mealData).eq('id', editingMeal.id);
    } else {
      await supabase.from('meals').insert({
        ...mealData,
        user_id: MY_USER_ID,
        meal_time: new Date().toISOString()
      });
    }
    setModalVisible(false);
    fetchMeals();
  };

  const deleteMeal = (id: string) => {
    Alert.alert('Delete Meal', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          await supabase.from('meals').delete().eq('id', id);
          fetchMeals();
        }
      }
    ]);
  };

  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading meals...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />
      <View style={styles.header}>
        <Text style={styles.title}>🍎 CalorAI</Text>
        <Text style={styles.subtitle}>
          {meals.length} meals • {totalCalories} cal today
        </Text>
      </View>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{item.meal_name}</Text>
              <Text style={styles.mealMeta}>
                {item.calories ? `🔥 ${item.calories} cal  •  ` : ''}
                🕐 {new Date(item.meal_time).toLocaleString('en-IN', {
                  day: '2-digit', month: 'short',
                  hour: '2-digit', minute: '2-digit'
                })}
              </Text>
            </View>
            <View style={styles.mealActions}>
              <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editBtn}>
                <Text>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMeal(item.id)} style={styles.deleteBtn}>
                <Text>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No meals logged yet!</Text>
            <Text style={styles.emptySubtext}>Tap + to add a meal or use Telegram bot</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editingMeal ? '✏️ Edit Meal' : '🍽️ Log Meal'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Meal name (e.g. Chicken Rice)"
              value={mealName}
              onChangeText={setMealName}
              autoFocus
            />
            <TextInput
              style={styles.input}
              placeholder="Calories (optional)"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveMeal} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>{editingMeal ? 'Update' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#2e7d32', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 13, color: '#c8e6c9', marginTop: 4 },
  mealCard: {
    flexDirection: 'row', backgroundColor: 'white',
    margin: 8, marginHorizontal: 12, borderRadius: 12,
    padding: 14, alignItems: 'center', elevation: 2
  },
  mealInfo: { flex: 1 },
  mealName: { fontSize: 16, fontWeight: '600', color: '#1b5e20' },
  mealMeta: { fontSize: 12, color: '#888', marginTop: 5 },
  mealActions: { flexDirection: 'row', gap: 8 },
  editBtn: { backgroundColor: '#e8f5e9', padding: 10, borderRadius: 8 },
  deleteBtn: { backgroundColor: '#fce4ec', padding: 10, borderRadius: 8 },
  fab: {
    position: 'absolute', bottom: 28, right: 20,
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: '#2e7d32', justifyContent: 'center',
    alignItems: 'center', elevation: 8
  },
  fabText: { fontSize: 32, color: 'white', lineHeight: 36 },
  emptyContainer: { alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#555' },
  emptySubtext: { fontSize: 13, color: '#999', marginTop: 8, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: 'white', borderTopLeftRadius: 20,
    borderTopRightRadius: 20, padding: 24, paddingBottom: 36
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#1b5e20' },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    padding: 14, marginBottom: 12, fontSize: 16
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  cancelBtn: { padding: 12, paddingHorizontal: 20 },
  cancelText: { color: '#666', fontSize: 16 },
  saveBtn: { backgroundColor: '#2e7d32', padding: 12, paddingHorizontal: 28, borderRadius: 10 },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});