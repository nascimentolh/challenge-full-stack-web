import { SodiumPlus } from 'sodium-plus';

const generatePass = async (password: string): Promise<string> => {
  const sodium = await SodiumPlus.auto();

  return sodium.crypto_pwhash_str(
    password,
    sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE,
    sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE,
  );
};


export { generatePass };