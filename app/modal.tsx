import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { supabase, MY_USER_ID } from '../lib/supabase';
import { router } from 'expo-router';

export default function ScanModal() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const logMeal = async (mealName: string, calories: number) => {
    await supabase.from('meals').insert({
      user_id: MY_USER_ID,
      meal_name: mealName,
      calories: calories,
      meal_time: new Date().toISOString(),
    });
    Alert.alert('✅ Logged!', `${mealName} (${calories} cal) added!`, [
      { text: 'OK', onPress: () => router.replace('/(tabs)') }
    ]);
  };

  const analyzeFood = async () => {
    if (!image) return;
    setLoading(true);
    // Simulate AI analysis (replace with real API later)
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '🍎 AI Result',
        'Detected: Apple\nEstimated: 95 calories',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log This Meal', onPress: () => logMeal('Apple', 95) }
        ]
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 Scan Food</Text>
      <Text style={styles.subtitle}>Take a photo to identify food & calories</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📷</Text>
          <Text style={styles.placeholderLabel}>No image selected</Text>
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>📷 Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={pickFromGallery}>
        <Text style={styles.btnText}>🖼️ Choose from Gallery</Text>
      </TouchableOpacity>

      {image && (
        <TouchableOpacity style={[styles.btn, styles.btnAnalyze]} onPress={analyzeFood}>
          {loading
            ? <ActivityIndicator color="white" />
            : <Text style={styles.btnText}>🤖 Analyze with AI</Text>
          }
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.closeBtn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.closeBtnText}>✕ Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9', padding: 24, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1b5e20', marginTop: 20 },
  subtitle: { fontSize: 13, color: '#777', marginTop: 6, marginBottom: 20, textAlign: 'center' },
  preview: { width: '100%', height: 220, borderRadius: 16, marginBottom: 20 },
  placeholder: {
    width: '100%', height: 220, borderRadius: 16,
    backgroundColor: '#e8f5e9', justifyContent: 'center',
    alignItems: 'center', marginBottom: 20, borderWidth: 2,
    borderColor: '#a5d6a7', borderStyle: 'dashed'
  },
  placeholderText: { fontSize: 48 },
  placeholderLabel: { color: '#888', marginTop: 8 },
  btn: {
    backgroundColor: '#2e7d32', padding: 14, borderRadius: 12,
    width: '100%', alignItems: 'center', marginBottom: 10
  },
  btnSecondary: { backgroundColor: '#388e3c' },
  btnAnalyze: { backgroundColor: '#1565c0' },
  btnText: { color: 'white', fontSize: 16, fontWeight: '600' },
  closeBtn: { marginTop: 10 },
  closeBtnText: { color: '#999', fontSize: 15 },
});
