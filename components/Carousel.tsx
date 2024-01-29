import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Billboard } from "@/models/billboard.interface";

const Carousel = ({ billboards = [] }: { billboards: Billboard[] }) => {
  const flatlistRef = useRef<FlatList<Billboard> | null>(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === billboards.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (
    data: ArrayLike<Billboard> | null | undefined,
    index: number
  ) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const renderItem = ({ item }: { item: Billboard }) => {
    return (
      <View>
        <Image
          source={{ uri: item.url }}
          style={{ height: 200, width: screenWidth }}
        />
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    let index = scrollPosition / screenWidth;
    index =
      index > Math.floor(index) + 0.5 ? Math.ceil(index) : Math.floor(index);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return billboards.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={[styles.dotIndicator, { backgroundColor: Colors.ORANGE }]}
          ></View>
        );
      }
      return <View key={index} style={styles.dotIndicator}></View>;
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={billboards}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View style={styles.dotsContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {},
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -22,
    paddingBottom: 20,
  },
  dotIndicator: {
    backgroundColor: "gray",
    height: 8,
    width: 8,
    borderRadius: 5,
    marginHorizontal: 6,
  },
});
