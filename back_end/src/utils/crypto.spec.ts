import {
  verifyPass,
  generatePass,
  generateToken,
  verifyToken,
} from './crypto';

describe('Crypto utils', () => {
  test('Test and verify password hash', async () => {
    const hash = await generatePass('meryJaneS2');
    let hashed = await verifyPass('meryJaneS2', hash);
    expect(hashed).toBe(true);

    hashed = await verifyPass('natashaRomanoff', hash);
    expect(hashed).toBe(false);

    hashed = await verifyPass('martinMacfly', hash);
    expect(hashed).toBe(false);

    hashed = await verifyPass('drBrown', hash);
    expect(hashed).toBe(false);
  });

  test('Test valid JWT Token', async () => {
    const token = generateToken({
      id: 1,
      name: 'Peter Parker',
      email: 'peter@midtownhighschool.com',
    });

    const verifyJWT = await verifyToken(token);

    expect(verifyJWT.email).toBe('peter@midtownhighschool.com');
    expect(verifyJWT.name).toBe('Peter Parker');
  });

  test('Test invalid JWT Token', async () => {
    const token = 'thisIsWrongTokenProvidedBy_____';
    expect(await verifyToken(token)).toBe(null);
  });
});
