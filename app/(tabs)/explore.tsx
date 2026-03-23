// // import { Image } from 'expo-image';
// // import { Platform, StyleSheet } from 'react-native';

// // import { Collapsible } from '@/components/ui/collapsible';
// // import { ExternalLink } from '@/components/external-link';
// // import ParallaxScrollView from '@/components/parallax-scroll-view';
// // import { ThemedText } from '@/components/themed-text';
// // import { ThemedView } from '@/components/themed-view';
// // import { IconSymbol } from '@/components/ui/icon-symbol';
// // import { Fonts } from '@/constants/theme';

// // export default function TabTwoScreen() {
// //   return (
// //     <ParallaxScrollView
// //       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
// //       headerImage={
// //         <IconSymbol
// //           size={310}
// //           color="#808080"
// //           name="chevron.left.forwardslash.chevron.right"
// //           style={styles.headerImage}
// //         />
// //       }>
// //       <ThemedView style={styles.titleContainer}>
// //         <ThemedText
// //           type="title"
// //           style={{
// //             fontFamily: Fonts.rounded,
// //           }}>
// //           Explore
// //         </ThemedText>
// //       </ThemedView>
// //       <ThemedText>This app includes example code to help you get started.</ThemedText>
// //       <Collapsible title="File-based routing">
// //         <ThemedText>
// //           This app has two screens:{' '}
// //           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
// //           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
// //         </ThemedText>
// //         <ThemedText>
// //           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
// //           sets up the tab navigator.
// //         </ThemedText>
// //         <ExternalLink href="https://docs.expo.dev/router/introduction">
// //           <ThemedText type="link">Learn more</ThemedText>
// //         </ExternalLink>
// //       </Collapsible>
// //       <Collapsible title="Android, iOS, and web support">
// //         <ThemedText>
// //           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
// //           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
// //         </ThemedText>
// //       </Collapsible>
// //       <Collapsible title="Images">
// //         <ThemedText>
// //           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
// //           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
// //           different screen densities
// //         </ThemedText>
// //         <Image
// //           source={require('@/assets/images/react-logo.png')}
// //           style={{ width: 100, height: 100, alignSelf: 'center' }}
// //         />
// //         <ExternalLink href="https://reactnative.dev/docs/images">
// //           <ThemedText type="link">Learn more</ThemedText>
// //         </ExternalLink>
// //       </Collapsible>
// //       <Collapsible title="Light and dark mode components">
// //         <ThemedText>
// //           This template has light and dark mode support. The{' '}
// //           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
// //           what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
// //         </ThemedText>
// //         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
// //           <ThemedText type="link">Learn more</ThemedText>
// //         </ExternalLink>
// //       </Collapsible>
// //       <Collapsible title="Animations">
// //         <ThemedText>
// //           This template includes an example of an animated component. The{' '}
// //           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
// //           the powerful{' '}
// //           <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
// //             react-native-reanimated
// //           </ThemedText>{' '}
// //           library to create a waving hand animation.
// //         </ThemedText>
// //         {Platform.select({
// //           ios: (
// //             <ThemedText>
// //               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
// //               component provides a parallax effect for the header image.
// //             </ThemedText>
// //           ),
// //         })}
// //       </Collapsible>
// //     </ParallaxScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   headerImage: {
// //     color: '#808080',
// //     bottom: -90,
// //     left: -35,
// //     position: 'absolute',
// //   },
// //   titleContainer: {
// //     flexDirection: 'row',
// //     gap: 8,
// //   },
// // });
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function ExploreScreen() {
//   const tips = [
//     { emoji: '🥗', title: 'Eat More Greens', tip: 'Leafy greens are low calorie and high in nutrients.' },
//     { emoji: '💧', title: 'Stay Hydrated', tip: 'Drink 8 glasses of water daily to boost metabolism.' },
//     { emoji: '🍳', title: 'High Protein Breakfast', tip: 'Eggs and oats keep you full longer.' },
//     { emoji: '🚶', title: 'Walk After Meals', tip: 'A 10-minute walk after eating helps digestion.' },
//     { emoji: '🌙', title: 'No Late Night Snacks', tip: 'Stop eating 2 hours before bedtime.' },
//     { emoji: '📊', title: 'Track Everything', tip: 'Logging meals consistently leads to better results.' },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>💡 Nutrition Tips</Text>
//         <Text style={styles.subtitle}>Healthy habits for better results</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {tips.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <Text style={styles.emoji}>{item.emoji}</Text>
//             <View style={styles.cardContent}>
//               <Text style={styles.cardTitle}>{item.title}</Text>
//               <Text style={styles.cardTip}>{item.tip}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f1f8e9' },
//   header: { backgroundColor: '#2e7d32', padding: 20 },
//   title: { fontSize: 26, fontWeight: 'bold', color: 'white' },
//   subtitle: { fontSize: 13, color: '#c8e6c9', marginTop: 4 },
//   scroll: { padding: 12 },
//   card: {
//     flexDirection: 'row', backgroundColor: 'white',
//     borderRadius: 12, padding: 16, marginBottom: 10,
//     alignItems: 'center', elevation: 2
//   },
//   emoji: { fontSize: 32, marginRight: 14 },
//   cardContent: { flex: 1 },
//   cardTitle: { fontSize: 16, fontWeight: '700', color: '#1b5e20' },
//   cardTip: { fontSize: 13, color: '#666', marginTop: 4 },
// });
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase, MY_USER_ID } from '../../lib/supabase';

export default function TipsScreen() {
  const [stats, setStats] = useState({ total: 0, avg: 0, highest: '', lowest: '', streak: 0 });
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', MY_USER_ID)
      .order('meal_time', { ascending: false });

    if (!data || data.length === 0) return;
    setMeals(data);

    const totalCal = data.reduce((s, m) => s + (m.calories || 0), 0);
    const avg = Math.round(totalCal / data.length);
    const highest = data.reduce((a, b) => (a.calories > b.calories ? a : b));
    const lowest = data.reduce((a, b) => (a.calories < b.calories ? a : b));

    setStats({
      total: totalCal,
      avg,
      highest: highest.meal_name,
      lowest: lowest.meal_name,
      streak: Math.min(data.length, 7),
    });
  }

  const today = new Date().toISOString().split('T')[0];
  const todayMeals = meals.filter(m => m.meal_time?.startsWith(today));
  const todayCal = todayMeals.reduce((s, m) => s + (m.calories || 0), 0);
  const goal = 2000;
  const progress = Math.min((todayCal / goal) * 100, 100);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📊 Analytics</Text>
        <Text style={styles.subText}>Your nutrition insights</Text>
      </View>

      {/* Today Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Today's Progress</Text>
        <Text style={styles.bigNum}>{todayCal} <Text style={styles.unit}>/ {goal} cal</Text></Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: progress > 90 ? '#e53935' : '#2e7d32' }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}% of daily goal</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.grid}>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statVal}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Cal</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>📈</Text>
          <Text style={styles.statVal}>{stats.avg}</Text>
          <Text style={styles.statLabel}>Avg/Meal</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🥗</Text>
          <Text style={styles.statVal}>{meals.length}</Text>
          <Text style={styles.statLabel}>Total Meals</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>⚡</Text>
          <Text style={styles.statVal}>{stats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Highest & Lowest */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏆 Meal Insights</Text>
        <Text style={styles.insight}>🔺 Highest cal: <Text style={styles.bold}>{stats.highest}</Text></Text>
        <Text style={styles.insight}>🔻 Lowest cal: <Text style={styles.bold}>{stats.lowest}</Text></Text>
      </View>

      {/* Tips */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Nutrition Tips</Text>
        {['Drink 8 glasses of water daily 💧', 'Eat protein with every meal 🥩', 'Avoid eating after 9 PM 🌙', 'Add vegetables to every plate 🥦', 'Walk 10 mins after meals 🚶'].map((tip, i) => (
          <Text key={i} style={styles.tip}>• {tip}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  header: { backgroundColor: '#2e7d32', padding: 24, paddingTop: 50 },
  headerText: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  subText: { color: '#a5d6a7', marginTop: 4 },
  card: { backgroundColor: 'white', margin: 12, borderRadius: 16, padding: 16, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  bigNum: { fontSize: 36, fontWeight: 'bold', color: '#2e7d32' },
  unit: { fontSize: 16, color: '#888' },
  progressBar: { height: 12, backgroundColor: '#e0e0e0', borderRadius: 6, marginTop: 12 },
  progressFill: { height: 12, borderRadius: 6 },
  progressText: { color: '#666', marginTop: 6, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  statBox: { width: '46%', backgroundColor: 'white', margin: '2%', borderRadius: 16, padding: 16, alignItems: 'center', elevation: 2 },
  statEmoji: { fontSize: 28 },
  statVal: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginTop: 4 },
  statLabel: { color: '#888', fontSize: 12, marginTop: 2 },
  insight: { fontSize: 14, color: '#555', marginBottom: 6 },
  bold: { fontWeight: 'bold', color: '#333' },
  tip: { fontSize: 14, color: '#555', marginBottom: 8, lineHeight: 20 },
});