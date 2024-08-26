import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { Responsive } from "../../theme/Layout";
import { COLOR } from "../../theme/Theme";


export default function CommonInput({
  label,
  val,
  autoCapitalize,
  onchange,
  keyboardType,
  placeholderText,
  maxLength,
  addressinputStyle,
  wordCounter,
  Counter,
  inputStyle,
  labelTextStyle,
  optionalInputField,
  editable = true,
  onBlur,
  onError,
  useref,
  multiline,
  heightInput,
  errors,
  InputIcon,
  textCustomAligned,
  name,
  submit,
  rightSideText,
  rightSideTextImportant,
}) {
  const [focused, setFocused] = useState(false);

  const customOnBlur = (e) => {
    setFocused(false);
    onBlur ? onBlur(e) : null;
  };

  const customOnFocus = () => {
    setFocused(true);
  };

  return (
    <View style={{ ...styles.inputStyle, ...inputStyle }}>
      <View style={styles.labelTextRow}>
        {label ? (
          <Text
            style={[
              
              { ...styles.labelTextStyle, ...labelTextStyle },
            ]}
          >
            {label}
            {optionalInputField && (
              <Text
                optionalInputField
                style={[styles.optionalInputField]}
              >
                {" "}
                (Optional)
              </Text>
            )}
          </Text>
        ) : null}

        {wordCounter && <Text>{Counter}/100</Text>}
      </View>
      <View style={styles.flexView}>
        {InputIcon ? (
          <>
            <View style={{ zIndex: 9 }}>
              <View style={styles.inputIcons}>
                <Image
                  source={InputIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#EBEDF3",
                  width: 1,
                  height: 30,
                  marginLeft: 48,
                  position: "absolute",
                  top: -15,
                }}
              ></View>
            </View>
          </>
        ) : null}
        <TextInput
          name={name}
          ref={useref ? useref : null}
          style={[
            {
              width: "100%",
              borderWidth: 1,
              borderColor: errors
                ? "rgba(233, 130, 140, 1)"
                : focused
                ? "rgba(184, 166, 255, 1)"
                : COLOR.borderColor,
              backgroundColor: !editable
                ? 'grey'
                : errors
                ? "rgba(253, 245, 246, 1)"
                : focused
                ?'white'
                : 'white',
              color: !editable ? 'white' : 'black',
              textAlignVertical: textCustomAligned ? textCustomAligned : "auto",
              paddingLeft: InputIcon
                ? 63
                : 15,
              paddingRight:Responsive.width(30),
              height: heightInput ? heightInput :55,
              borderRadius: 28,
              ...addressinputStyle,
            },
          ]}
          onBlur={(e) => customOnBlur(e)}
          onFocus={customOnFocus}
          value={val}
          onChangeText={(text) => (onchange ? onchange(text) : null)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          autoCompleteType="off"
          placeholder={placeholderText}
          maxLength={maxLength}
          onSubmitEditing={submit}
          editable={editable}
          placeholderTextColor={
            editable ? 'pink' : 'blue'
          }
          returnKeyType={keyboardType == "numeric" ? "done" : undefined}
          multiline={multiline}
        />
      </View>
      {rightSideText ? (
        <View style={styles.rightSideTextBox}>
          <Text>{rightSideText}</Text>
          {rightSideTextImportant? <Text >*</Text> : null}
        </View>
      ) : null}
      {onError ? (
        <View style={{ paddingTop: 2 }}>
          <Text
            style={[
              {
                color:'red'},
            ]}
          >
            {onError}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inlineStyle: {
    paddingVertical: 8,
    fontSize:16,
    color: COLOR.white,
    flex: 1,
  },
  labelTextStyle: {
    paddingBottom:6,
    color: COLOR.white,
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionalInputField: {
    color: "#84859A",
  },
  labelTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputIcons: {
    width: 20,
    height: 20,
    zIndex: 9,
    position: "absolute",
    left: 15,
    top: -10,
  },
  rightSideTextBox: {
    position: "absolute",
    right: 10,
    top:10,
    borderLeftWidth: 1,
    // borderLeftColor: COLORS.thinPurple,
    paddingLeft:8,
    flexDirection:'row'
  },
});





//////// jis page p call krwana h ///////
{/* <CommonInput
                      name="email"
                      label="Email"
                      placeholderText="eg. john@gmail.com"
                      InputIcon={Icons.sms}
                      onchange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      onError={
                        errors.email && touched.email ? errors.email : null
                      }
                      errors={errors.email && touched.email}
                    /> */}