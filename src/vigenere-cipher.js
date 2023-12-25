const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let encryptMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/)) {
        const mesCode = message.charCodeAt(i) - 65;
        const keyCode = key.charCodeAt(keyIndex % key.length) - 65;
        const encryptCode = (mesCode + keyCode) % 26;

        encryptMessage += String.fromCharCode(encryptCode + 65);
        keyIndex++;
      } else {
        encryptMessage += message[i];
      }
    }

    return this.direct ? encryptMessage : encryptMessage.split('').reverse().join('');
  }

  decrypt(encryptMessage, key) {
    if (!encryptMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    encryptMessage = encryptMessage.toUpperCase();
    key = key.toUpperCase();

    let decryptMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptMessage.length; i++) {
      if (encryptMessage[i].match(/[A-Z]/)) {
        const encryptedCode = encryptMessage.charCodeAt(i) - 65;
        const keyCode = key.charCodeAt(keyIndex % key.length) - 65;
        const decryptedCode = (encryptedCode - keyCode + 26) % 26;

        decryptMessage += String.fromCharCode(decryptedCode + 65);
        keyIndex++;
      } else {
        decryptMessage += encryptMessage[i];
      }
    }

    return this.direct ? decryptMessage : decryptMessage.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
