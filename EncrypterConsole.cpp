// EncrypterConsole.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <cstdlib>
#include <vector>
#include <bitset>
#include <string>
using namespace std;
void encrypt() {
    string message;
    string key;
    // get user input
    cout << "Enter Message: ";
    cin.ignore();
    getline(cin, message, '\n');
    cout << "Enter Key: ";
    cin.ignore();
    getline(cin, key, '\n');
    //store each character of message and key as integers to xor
    vector<int> messages;
    for (int i = 0; i < message.length(); i++) {
        messages.push_back(int(message[i]));
    }
    vector<int> keys;
    for (int i = 0; i < key.length(); i++) {
        keys.push_back(int(key[i]));
    }
    string ciphertext;
    //xor each character and convert them to binary strings
    for (int i = 0; i < message.length(); i++) {
        srand(keys[i]);
        keys.push_back(rand());
        ciphertext += bitset<8>(messages[i] ^ keys[i]).to_string();
    }
    cout << "Ciphertext: " << ciphertext;
}
void decrypt() {
    string ciphertext;
    string key;
    //get user input
    cout << "Enter Ciphertext: ";
    cin.ignore();
    getline(cin, ciphertext, '\n');
    cout << "Enter Key: ";
    cin.ignore();
    getline(cin, key, '\n');
    //convert groups of 8 bits into integers. Each integer represents a character
    vector<int> ciphertexts;
    string temp = "";
    for (int i = 0; i < ciphertext.length(); i++) {
        temp += ciphertext[i];
        if ((i + 1) % 8 == 0) {
            bitset<8> tempbit{ temp };
            ciphertexts.push_back(int(tempbit.to_ulong()));
            temp = "";
        }
    }
    //convert key to integers
    vector<int> keys;
    for (int i = 0; i < key.length(); i++) {
        keys.push_back(int(key[i]));
    }
    //xor each integer and convert them back into chars
    string message;
    for (int i = 0; i < ciphertexts.size(); i++) {
        srand(keys[i]);
        keys.push_back(rand());
        message += static_cast<char>(ciphertexts[i] ^ keys[i]);
    }
    cout << "Message: " << message;
}
int main()
{
    string choice;
    cout << "Enter 'E' for encryption or 'D' for decryption: ";
    cin >> choice;
    while (choice != "E" and choice != "D") {
        cout << "Invalid. Enter 'E' for encryption or 'D' for decryption: ";
        cin >> choice;
    }
    if (choice == "E") encrypt();
    if (choice == "D") decrypt();
    return 0;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
