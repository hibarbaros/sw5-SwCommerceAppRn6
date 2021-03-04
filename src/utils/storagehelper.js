import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`setStorageItem : ${key}`, value);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(`getStorageItem : ${key}`, JSON.parse(value));
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
    return false;
  }
}
