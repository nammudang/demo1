import crypto from 'crypto'
import fs from 'fs'
const { publicKey, privateKey  } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });
 
  fs.writeFileSync('sk.txt', privateKey, 'utf8', function(err) {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', err);
        return;
    }
    console.log('เขียนคีย์ลงในไฟล์เรียบร้อยแล้ว');
});
fs.writeFileSync('pk.txt', publicKey, 'utf8', function(err) {
  if (err) {
      console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', err);
      return;
  }
  console.log('เขียนคีย์ลงในไฟล์เรียบร้อยแล้ว');
});
  const data = 'Hello, World!';
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data, 'utf-8'));
console.log('Encrypted data:', encryptedData.toString('base64'));

// ถอดรหัสข้อมูลด้วย private key
crypto.privateEncrypt
const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
console.log('Decrypted data:', decryptedData.toString('utf-8')); 