// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS_LIST';
const CURRENT_USER_KEY = 'CURRENT_USER';

export const getUsers = async () => {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('getUsers error', e);
    return [];
  }
};

export const saveUsers = async (users) => {
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('saveUsers error', e);
  }
};

export const addUser = async (user) => {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
};

export const findUserByPhone = async (phone) => {
  const users = await getUsers();
  return users.find(u => u.phone === phone);
};

export const setCurrentUser = async (user) => {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('setCurrentUser error', e);
  }
};

export const getCurrentUser = async () => {
  try {
    const json = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error('getCurrentUser error', e);
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (e) {
    console.error('logout error', e);
  }
};
