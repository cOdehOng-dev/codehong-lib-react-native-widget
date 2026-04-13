import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal as RNModal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HongBottomSheetModalOption } from './hongBottomSheetModalOption';

type Props = {
  option: HongBottomSheetModalOption;
};

const IOSModal = ({ option }: Props) => {
  const { bottom } = useSafeAreaInsets();
  const [mounted, setMounted] = useState(option.isVisible);
  const dimAnim = useRef(new Animated.Value(option.isVisible ? 1 : 0)).current;
  const slideAnim = useRef(
    new Animated.Value(option.isVisible ? 0 : 600),
  ).current;

  useEffect(() => {
    if (option.isVisible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(dimAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(dimAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 600,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [option.isVisible, dimAnim, slideAnim]);

  return (
    <RNModal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={option.onDismiss}
    >
      <View style={styles.iosContainer}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.dim, { opacity: dimAnim }]}
          pointerEvents="none"
        />
        {option.isClickDimDismiss && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={option.onDismiss}
          />
        )}
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: bottom,
              borderTopLeftRadius: option.topRadius,
              borderTopRightRadius: option.topRadius,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.handle} />
          {option.children}
        </Animated.View>
      </View>
    </RNModal>
  );
};

const AndroidModal = ({ option }: Props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      <RNModal
        visible={option.isVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={option.onDismiss}
      >
        <Pressable
          style={styles.dim}
          onPress={option.isClickDimDismiss ? option.onDismiss : undefined}
        />
      </RNModal>

      <RNModal
        visible={option.isVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={option.onDismiss}
      >
        <View style={styles.androidContainer}>
          {option.isClickDimDismiss && (
            <Pressable style={StyleSheet.absoluteFill} onPress={option.onDismiss} />
          )}
          <View
            style={[
              styles.sheet,
              {
                paddingBottom: bottom,
                borderTopLeftRadius: option.topRadius,
                borderTopRightRadius: option.topRadius,
              },
            ]}
          >
            <View style={styles.handle} />
            {option.children}
          </View>
        </View>
      </RNModal>
    </>
  );
};

export function HongBottomSheetModal(option: Props): React.ReactElement | null {
  if (Platform.OS === 'ios') {
    return <IOSModal {...option} />;
  }
  return <AndroidModal {...option} />;
}

export default HongBottomSheetModal;

const styles = StyleSheet.create({
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iosContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  androidContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  handle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d0d0d0',
  },
});
