import jwt from 'jsonwebtoken';
import { SodiumPlus } from 'sodium-plus';

const generatePass = async (password: string): Promise<string> => {
  const sodium = await SodiumPlus.auto();

  return sodium.crypto_pwhash_str(
    password,
    sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE,
    sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE,
  );
};

const verifyPass = async (
  password: string,
  hashPassword: string,
): Promise<Boolean> => {
  const sodium = await SodiumPlus.auto();

  return sodium.crypto_pwhash_str_verify(password, hashPassword);
};

const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.SECRET_KEY || 'dev', {
    expiresIn: '1d',
  });
};

const verifyToken = async (token: string): Promise<any> =>
  new Promise((resolve) => {
    jwt.verify(
      token,
      process.env.SECRET_KEY || 'dev',
      (error: Error, decoded: any) => {
        if (error) {
          resolve(null);
        } else {
          resolve(decoded);
        }
      },
    );
  });

export { generatePass, verifyPass, generateToken, verifyToken };
