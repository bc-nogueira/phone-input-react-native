import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountryCallingCode,
} from "libphonenumber-js";

export default function App() {
  const [countryCode2, setCountryCode2] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callingCode, setCallingCode] = useState("");

  dealWithCountryChange = (country) => {
    const newCallingCode = getCountryCallingCode(country.cca2);
    const newPhoneNumber = phoneNumber.replace(
      `+${callingCode}`,
      `+${newCallingCode}`
    );
    setCountryCode2(country.cca2);
    setPhoneNumber(
      parsePhoneNumberFromString(newPhoneNumber).formatInternational()
    );
    setCallingCode(newCallingCode);
  };

  dealWithTextChange = (value) => {
    const asYouType = new AsYouType();
    asYouType.input(value);
    setCountryCode2(asYouType.country);
    setPhoneNumber(asYouType.formattedOutput);
    setCallingCode(asYouType.countryCallingCode);
  };

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={countryCode2}
        withFilter
        withCallingCode
        withFlagButton
        onSelect={this.dealWithCountryChange}
      />
      <TextInput
        placeholder="Insert phone number"
        value={phoneNumber}
        keyboardType="phone-pad"
        onChangeText={this.dealWithTextChange}
      />

      <Text>Country code: {countryCode2}</Text>
      <Text>Phone number: {phoneNumber}</Text>
      <Text>Calling code: {callingCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
