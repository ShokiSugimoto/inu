import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const Relaxation = () => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [count, setCount] = useState(0);
  const handleTagPress = (tagNumber) => {
    const tagColumnName = `tag_${tagNumber}`;
    db.transaction((tx) => {
      if (selectedTags.includes(tagNumber)) {
        // タグが選択されている場合、削除
        tx.executeSql(
          `UPDATE tag SET ${tagColumnName} = NULL WHERE id = 1`, // 1 は仮の値です。実際のデータベースのIDに合わせてください。
          [],
          (_, result) => {
            console.log(`Tag ${tagColumnName} deleted successfully.`);
          },
          (_, error) => {
            console.log('Error deleting tag:', error);
          }
        );
        setSelectedTags(selectedTags.filter(tag => tag !== tagNumber));
        setCount(count - 1);
      } else {
        // タグが選択されていない場合、挿入
        if (count < 5) {
          tx.executeSql(
            `UPDATE tag SET ${tagColumnName} = 1 WHERE id = 1`, // 1 は仮の値です。実際のデータベースのIDに合わせてください。
            [],
            (_, result) => {
              console.log(`Tag ${tagColumnName} inserted successfully.`);
            },
            (_, error) => {
              console.log('Error inserting tag:', error);
            }
          );
          setSelectedTags([...selectedTags, tagNumber]);
          setCount(count + 1);
        }
      }
    });
  };
  
  const anim_1 = useRef(new Animated.Value(0)).current;
  const anim_2 = useRef(new Animated.Value(0)).current;
  const anim_3 = useRef(new Animated.Value(0)).current;
  const anim_4 = useRef(new Animated.Value(0)).current;
  const anim_5 = useRef(new Animated.Value(0)).current;
  const anim_6 = useRef(new Animated.Value(0)).current;
  const anim_7 = useRef(new Animated.Value(0)).current;
  const anim_8 = useRef(new Animated.Value(0)).current;
  const anim_9 = useRef(new Animated.Value(0)).current;
  const anim_10 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim_1, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_2, {
      toValue: 1,
      delay: 100,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_3, {
      toValue: 1,
      delay: 200,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_4, {
      toValue: 1,
      delay: 300,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_5, {
      toValue: 1,
      delay: 400,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_6, {
      toValue: 1,
      delay: 500,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_7, {
      toValue: 1,
      delay: 600,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_8, {
      toValue: 1,
      delay: 700,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_9, {
      toValue: 1,
      delay: 800,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(anim_10, {
      toValue: 1,
      delay: 900,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [anim_1, anim_2, anim_3, anim_4, anim_5, anim_6, anim_7, anim_8, anim_9, anim_10]);

  const anim_1Style = {
    opacity: anim_1
  };
  const anim_2Style = {
    opacity: anim_2
  };
  const anim_3Style = {
    opacity: anim_3
  };
  const anim_4Style = {
    opacity: anim_4
  };
  const anim_5Style = {
    opacity: anim_5
  };
  const anim_6Style = {
    opacity: anim_6
  };
  const anim_7Style = {
    opacity: anim_7
  };
  const anim_8Style = {
    opacity: anim_8
  };
  const anim_9Style = {
    opacity: anim_9
  };
  const anim_10Style = {
    opacity: anim_10
  };
  useEffect(() => {
    // selectedTags が初回レンダリング時に空でない場合のみ実行
    if (selectedTags.length > 0) {
      setCount(selectedTags.length);
    }
  }, [selectedTags]);

  const db = SQLite.openDatabase('inu.db');
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM tag`,
      [],
      (_, result) => {
      },
      (_, error) => {
        console.log('Error...', error);
      }
    );
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.searchContents]}>
        <TextInput
          placeholder=" Serach..."
          style={[styles.searchContentsText]}
        />
        <Button
          labelStyle={{lineHeight: 28}}
          style={styles.searchContentsButton}
        >
          <Ionicons name="search" size={28} color="rgba(000, 000, 000, .25)" />
        </Button>
      </View>
      <TouchableWithoutFeedback onPress={() => handleTagPress(1)}>
        <Animated.View style={[styles.tag, styles.tag_1, anim_1Style, selectedTags.includes(1) && styles.selectedTag]}>
          <Text style={styles.tagText}>#自然と景観</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(2)}>
        <Animated.View style={[styles.tag, styles.tag_2, anim_2Style, selectedTags.includes(2) && styles.selectedTag]}>
          <Text style={styles.tagText}>#ヨガと瞑想</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(3)}>
        <Animated.View style={[styles.tag, styles.tag_3, anim_3Style, selectedTags.includes(3) && styles.selectedTag]}>
          <Text style={styles.tagText}>#癒しの音楽</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(4)}>
        <Animated.View style={[styles.tag, styles.tag_4, anim_4Style, selectedTags.includes(4) && styles.selectedTag]}>
          <Text style={styles.tagText}>#アートとクリエイティブ</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(5)}>
        <Animated.View style={[styles.tag, styles.tag_5, anim_5Style, selectedTags.includes(5) && styles.selectedTag]}>
          <Text style={styles.tagText}>#ペットと動物</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(6)}>
        <Animated.View style={[styles.tag, styles.tag_6, anim_6Style, selectedTags.includes(6) && styles.selectedTag]}>
          <Text style={styles.tagText}>#料理と食べ物</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(7)}>
        <Animated.View style={[styles.tag, styles.tag_7, anim_7Style, selectedTags.includes(7) && styles.selectedTag]}>
          <Text style={styles.tagText}>#アクティブな冒険</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(8)}>
        <Animated.View style={[styles.tag, styles.tag_8, anim_8Style, selectedTags.includes(8) && styles.selectedTag]}>
          <Text style={styles.tagText}>#エンターテインメント</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(9)}>
        <Animated.View style={[styles.tag, styles.tag_9, anim_9Style, selectedTags.includes(9) && styles.selectedTag]}>
          <Text style={styles.tagText}>#科学とテクノロジー</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTagPress(10)}>
        <Animated.View style={[styles.tag, styles.tag_10, anim_10Style, selectedTags.includes(10) && styles.selectedTag]}>
          <Text style={styles.tagText}>#スポーツとアクション</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <View style={[styles.textContents]}>
        <Text style={[styles.textContentsText]}>{count}/5</Text>
        <Link href='/homeLoading' asChild>
          <Button
            disabled={count === 0}
            mode="text"
            textColor={count === 0 ? 'rgba(255, 255, 255, .25)' : '#FFFFFF'}
            buttonColor="transparent"
            contentStyle={{height: 'auto'}}
            labelStyle={{fontSize: 21, fontWeight: '400', lineHeight: 32}}
            style={styles.textContentsButton}
          >
            inuを始める。
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  searchContents: {
    width: 250,
    height: 42,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 125,
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: 0 }]
  },
  searchContentsText: {
    fontSize: 21,
    color: 'rgba(000, 000, 000, .25)',
  },
  searchContentsButton: {
    paddingLeft: 125
  },
  tag: {
    height: 28,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, .5)',
    paddingLeft: 28,
    paddingRight: 28,
    marginTop: 12.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tag_1: {
    marginTop: 0,
    transform: [{ translateX: -25 }, { translateY: 0 }]
  },
  tag_2: {
    transform: [{ translateX: 100 }, { translateY: 0 }]
  },
  tag_3: {
    transform: [{ translateX: -100 }, { translateY: 0 }]
  },
  tag_4: {
    transform: [{ translateX: 50 }, { translateY: 0 }]
  },
  tag_5: {
    transform: [{ translateX: -75 }, { translateY: 0 }]
  },
  tag_6: {
    transform: [{ translateX: 75 }, { translateY: 0 }]
  },
  tag_7: {
    transform: [{ translateX: -100 }, { translateY: 0 }]
  },
  tag_8: {
    transform: [{ translateX: 25 }, { translateY: 0 }]
  },
  tag_9: {
    transform: [{ translateX: -75 }, { translateY: 0 }]
  },
  tag_10: {
    transform: [{ translateX: 75 }, { translateY: 0 }]
  },
  tagText: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  selectedTag: {
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    borderWidth: 1
  },
  textContents: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 112.5,
    left: 0
  },
  textContentsText: {
    fontSize: 28,
    color: '#FFFFFF'
  },
  textContentsButton: {
    transform: [{ translateX: 30 }, { translateY: 0 }]
  }
});

export default Relaxation;
