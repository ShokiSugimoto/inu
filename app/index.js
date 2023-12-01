import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Loading from "./loading";

const Index = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('select');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Loading />
  );
};

export default Index;
