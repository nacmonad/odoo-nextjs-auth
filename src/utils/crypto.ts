import crypto from 'crypto';

// Encryption and decryption functions
const ENCRYPTION_KEY = process.env.ODOO_LOYALTY_CARD_ENCRYPTION_KEY;
const IV_LENGTH = 16;

export function encrypt(text: string): string {
    if(!ENCRYPTION_KEY) throw Error("EncryptionKeyNotProvided");

  const iv = crypto.randomBytes(IV_LENGTH);
  console.log("iv", iv);

  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'base64'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(text: string): string {
    if(!ENCRYPTION_KEY) throw Error("EncryptionKeyNotProvided")
  const [iv, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'base64'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
