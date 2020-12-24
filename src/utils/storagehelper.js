import AsyncStorage from '@react-native-async-storage/async-storage';

const _set = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`setStorageItem : ${key}`, value);
  } catch (e) {
    // saving error
  }
};

async function _get(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(`getStorageItem : ${key}`, JSON.parse(value));
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function _remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    return false;
  }
}

export default {
  _set,
  _get,
  _remove,
};
