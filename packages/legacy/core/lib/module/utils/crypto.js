import argon2 from 'react-native-argon2';
export const hashPIN = async (PIN, salt) => {
  const result = await argon2(PIN, salt, {});
  const {
    rawHash
  } = result;
  return rawHash;
};
//# sourceMappingURL=crypto.js.map