import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Loading from "./loading";

const Index = () => {

  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('select');
      // sqliteファイル呼び出し用
      /*
      navigation.navigate('sqlite/create');
      navigation.navigate('sqlite/insert');
      navigation.navigate('sqlite/select');
      navigation.navigate('sqlite/update');
      navigation.navigate('sqlite/drop');
      */
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Loading />
  );
};

export default Index;
