import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeLoading = () => {

  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      alert('アップロード完了しました！');
      // 'creater' 画面への遷移
      navigation.navigate('creater');
    }, 3000);

    // コンポーネントがアンマウントされた場合にクリアする
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default HomeLoading;
