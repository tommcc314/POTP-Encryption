import { useState } from "react";
import './App.css';
// For a seeded PRNG, I installed seedrandom using npm
function getRandomInt(seed) {
    var seedrandom = require('seedrandom');
    return Math.floor(seedrandom(seed) * (129));
}
function App() {
    const [formData, setFormData] = useState({ encmessage: "", enckey: "", encciphertext: "", decciphertext: "", deckey: "", decmessage: ""});
    const handleEnc = (event) => {
        event.preventDefault();
        if (formData.encmessage.length === 0 || formData.enckey.length === 0) {
            setFormData({ ...formData, encciphertext: "Error: Ciphertext and Key must have a value." });
        }
        else {
            //store each character of message and key as integers to xor
            const messages = [];
            for (let i = 0; i < formData.encmessage.length; i++) {
                messages.push(formData.encmessage[i].charCodeAt());
            }
            const keys = [];
            for (let i = 0; i < formData.enckey.length; i++) {
                keys.push(formData.enckey[i].charCodeAt());
            }
            var ciphertext = "";
            //xor each character and convert them to binary strings
            for (let i = 0; i < formData.encmessage.length; i++) {
                keys.push(getRandomInt(keys[i]));
                ciphertext += ("00000000" + (messages[i] ^ keys[i]).toString(2)).slice(-8);
            }
            setFormData({ ...formData, encciphertext: ciphertext });
        }
    };
    const handleDec = (event) => {
        event.preventDefault();
        if (formData.decciphertext.length === 0 || formData.deckey.length === 0) {
            setFormData({ ...formData, decmessage: "Error: Ciphertext and Key must have a value." });
        }
        else {
            //convert groups of 8 bits into integers. Each integer represents a character
            const ciphertexts = [];
            var temp = "";
            for (let i = 0; i < formData.decciphertext.length; i++) {
                temp += formData.decciphertext[i];
                if ((i + 1) % 8 === 0) {
                    ciphertexts.push(parseInt(temp, 2));
                    temp = "";
                }
            }
            //convert key to integers
            const keys = [];
            for (let i = 0; i < formData.deckey.length; i++) {
                keys.push(formData.deckey[i].charCodeAt());
            }
            //xor each integer and convert them back into chars
            var message = "";
            for (let i = 0; i < ciphertexts.length; i++) {
                keys.push(getRandomInt(keys[i]));
                message += String.fromCharCode(ciphertexts[i] ^ keys[i]);
            }
            setFormData({ ...formData, decmessage: message });
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    return (
        <div id = "container">
            <h1>Psuedo-Random One Time Pad Encrypter and Decrypter</h1>
            <div id="forms">
                <form onSubmit={handleEnc}>
                    <h2>Encryption</h2>
                    <label htmlFor="encmessage">Message:</label>
                    <textarea id="encmessage" name="encmessage" value={formData.encmessage} onChange={handleChange} />
                    <label htmlFor="enckey">Key:</label>
                    <textarea id="enckey" name="enckey" value={formData.enckey} onChange={handleChange} />
                    <button type="submit">Encrypt</button>
                    <label htmlFor="encciphertext">Ciphertext:</label>
                    <textarea id="encciphertext" name="encciphertext" value={formData.encciphertext} readOnly/>
                </form>

                <form onSubmit={handleDec}>
                    <h2>Decryption</h2>
                    <label htmlFor="decciphertext">Ciphertext:</label>
                    <textarea id="decciphertext" name="decciphertext" value={formData.decciphertext} onChange={handleChange} />
                    <label htmlFor="deckey">Key:</label>
                    <textarea id="deckey" name="deckey" value={formData.deckey} onChange={handleChange} />
                    <button type="submit">Decrypt</button>
                    <label htmlFor="decmessage">Message:</label>
                    <textarea id="decmessage" name="decmessage" value={formData.decmessage} readOnly />
                </form>
            </div>
            <h3>About the scheme:</h3>
            <p>One Time Pad is a perfectly secret scheme. The scheme is quite simple: xor every bit of the message with the corresponding bit of the key.</p>
            <p>Due to the properties of the xor operation, given a ciphertext, every message of the same length is equally likely. This means the scheme is perfectly secret because the ciphertext gives no information about the message.</p>
            <p>The drawback of one time pad is that the key must be as long as the message. Having keys that have such length is often impractical.</p>
            <p>Pseudo-Random One Time Pad utilizes a pseudo-random generator to add pseudo-random bits to a shorter key, making one time pad possible. Given a good pseudo-random generator, the ciphertext will be indistinguishable from a truly random one time pad ciphertext.</p>
        </div>
  );
}

export default App;
