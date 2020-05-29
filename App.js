import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountryCallingCode,
} from "libphonenumber-js";

export default function App() {
  const [countryCode, setCountryCode] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callingCode, setCallingCode] = useState("");
  const asYouTypeInstance = useRef(null);

  useEffect(() => {
    asYouTypeInstance.current = new AsYouType();
    
    return () => {
      asYouTypeInstance.current = null;
    }
  }, [phoneNumber])

  function handleCountrySelect(country) {
    const newCallingCode = getCountryCallingCode(country.cca2);
    const newPhoneNumber = phoneNumber.replace(
      `+${callingCode}`,
      `+${newCallingCode}`
    );
    setCountryCode(country.cca2);
    setPhoneNumber(
      parsePhoneNumberFromString(newPhoneNumber).formatInternational()
    );
    setCallingCode(newCallingCode);
  };

  function handleNumberChange(value) {
    asYouTypeInstance.current.input(value);

    if (asYouTypeInstance.current.country != undefined) {
      setCountryCode(asYouTypeInstance.current.country);
    }

    setPhoneNumber(asYouTypeInstance.current.formattedOutput);
    setCallingCode(asYouTypeInstance.current.countryCallingCode);
  };

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withCallingCode
        withFlagButton
        onSelect={handleCountrySelect}
      />
      <TextInput
        placeholder="Insert phone number"
        value={phoneNumber}
        keyboardType="phone-pad"
        onChangeText={handleNumberChange}
      />

      <Text>Country code: {countryCode}</Text>
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
