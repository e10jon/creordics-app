import { useState } from "react";
import { View, Image, StyleSheet, ImageProps } from "react-native";

const ERROR_IMG_SRC = "https://via.placeholder.com/150?text=Error";

export function ImageWithFallback(props: ImageProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { source, style, ...rest } = props;

  return didError ? (
    <View style={[styles.errorContainer, style]}>
      <Image
        source={{ uri: ERROR_IMG_SRC }}
        style={styles.errorImage}
        {...rest}
      />
    </View>
  ) : (
    <Image source={source} style={style} onError={handleError} {...rest} />
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  errorImage: {
    width: "100%",
    height: "100%",
  },
});
