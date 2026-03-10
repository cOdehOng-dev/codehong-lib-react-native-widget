import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import type { TextStyle, ViewStyle } from "react-native";
import type { HongTextFieldTimerOption } from "./HongTextFieldTimerOption";
import { hongColorHexToRNColor, HongColor } from "../../rule/color/HongColor";
import { isMatchParent } from "../../rule/HongLayoutParam";
import { hongTypoSize, hongTypoFontType } from "../../rule/typo/HongTypo";
import { HongImages } from "../../assets/images/HongImages";
import { HongText } from "../../text/def/HongText";
import { HongTextBuilder } from "../../text/def/HongTextBuilder";

interface HongTextFieldTimerProps {
  option: HongTextFieldTimerOption;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function HongTextFieldTimer({option}: HongTextFieldTimerProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const totalSeconds = option.min * 60 + option.sec;
  const [inputText, setInputText] = useState(option.input);
  const [isFocused, setIsFocused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isFinished, setIsFinished] = useState(totalSeconds === 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setInputText(option.input);
  }, [option.input]);

  useEffect(() => {
    const total = option.min * 60 + option.sec;
    setSecondsLeft(total);
    setIsFinished(total === 0);
  }, [option.min, option.sec]);

  useEffect(() => {
    if (isFinished || secondsLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsFinished(true);
          option.onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [option.min, option.sec]);

  const handleChangeText = (text: string) => {
    setInputText(text);
    option.onTextChanged(text);
  };

  const handleClear = () => {
    setInputText("");
    option.onTextChanged("");
  };

  const underlineColor =
    isFinished && option.underlineFinishColorHex
      ? hongColorHexToRNColor(option.underlineFinishColorHex)
      : isFocused
        ? hongColorHexToRNColor(option.underlineFocusColorHex)
        : hongColorHexToRNColor(option.underlineOutFocusColorHex);

  const outerStyle: ViewStyle = {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    backgroundColor: hongColorHexToRNColor(option.backgroundColorHex),
    paddingTop: option.padding.top,
    paddingBottom: option.padding.bottom,
    paddingLeft: option.padding.left,
    paddingRight: option.padding.right,
    ...(isMatchParent(option.width) ? { alignSelf: "stretch" } : {}),
  };

  const inputFontSize = hongTypoSize(option.inputTypo);
  const inputFontFamily = hongTypoFontType(option.inputTypo).fileName;

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: inputFontSize,
    fontFamily: inputFontFamily,
    color: hongColorHexToRNColor(option.inputColorHex),
    padding: 0,
    margin: 0,
  };

  const showClear = option.useClearButton && inputText.length > 0;
  const showTimer = option.min > 0 || option.sec > 0;

  return (
    <View style={outerStyle}>
      <View style={styles.row}>
        <TextInput
          style={inputStyle}
          value={inputText}
          onChangeText={handleChangeText}
          onSubmitEditing={() => {
            if (option.useHideKeyboard) Keyboard.dismiss();
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={option.placeholder || undefined}
          placeholderTextColor={hongColorHexToRNColor(
            option.placeholderColorHex,
          )}
          keyboardType={option.useNumberKeypad ? "numeric" : "default"}
          returnKeyType="done"
          cursorColor={hongColorHexToRNColor(option.cursorColorHex)}
          selectionColor={hongColorHexToRNColor(option.cursorColorHex)}
          multiline={false}
        />

        {showClear && (
          <TouchableOpacity
            onPress={handleClear}
            activeOpacity={0.7}
            style={styles.clearButton}
          >
            <Image
              source={HongImages.honglib_ic_close}
              style={styles.clearIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {showTimer && (
          <HongText
            option={new HongTextBuilder()
              .text(formatTime(secondsLeft))
              .typography(option.countDownTypo)
              .color(option.countDownColorHex)
              .applyOption()}
          />
        )}
      </View>

      {/* 언더라인 */}
      {option.underlineHeight > 0 && (
        <View
          style={[
            styles.underline,
            { height: option.underlineHeight, backgroundColor: underlineColor },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    marginLeft: 8,
    marginRight: 5,
    padding: 2,
  },
  clearIcon: {
    width: 20,
    height: 20,
  },
  underline: {
    width: "100%",
  },
});
