import { ScrollView, StyleSheet, View } from 'react-native';

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}) {
  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor?.light || '#D0D0D0' }]}>
        {headerImage}
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 250,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
});