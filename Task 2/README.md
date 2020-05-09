# Task 2
#### This program basically checks whether the signature is valid or not.
It has 2 main files **script.js** and **index.js**. 
#### using script.js we can create signature pairs using private key
#### index.js checks whether the signature is valid using public key
All the dependicies needed fr both can be installed using
>> npm install fs</br>
>> npm install crypto</br>
>> npm install path</br>
>> npm install prompt-sync</br>
</br>
I have some pairs of correct signature </br>
text : hello</br>
 signature : 3fb58651e04cf02f2008827c7c793edb1c92eefd7476971ebb97fcbb5982bd2921f8db92ddfbc0470a8b7e5f39f80980fb712dfdd74050fddd8ae1bc9b55bb83e54410d5e0702ad2d1682307bd695712c06634fecac1a9882f8ef6e82cc8b7033d82387eb8f1df068cd9230dbd94d5dcaaec2034a6db41581c22fee08820e50a</br></br>
>> text : pickachu</br>
>> signature : 2d1aea1d3c810ce7cf629e8be7eda672cab45cdb4ab3842147f6b041a5a0434b1edf3c17f1ce3220ac12cef326288aba69e5a2a74bc6f6da563a533c2e1b69523dfb6f5e0a2cb9215434eca6b9871732e1e916be8e99d963e8b1cc1e7d2817124b3e178dd937887f17630e6096c08deb9bbdccef417de74c7916e98840d5fc4d</br>
>> text : heist</br>
>> signature : 0094921a7d7a88cbba8c3eb3eb601f1bb9f96a64a19c0d4fc2b8750e4b4b8c6e8cd029a7c6dda5708af7a5ce5637aeae0ebaed47bee0a3cb213617bc1783561226e8fddda809fb8be81d1d560a233231349c9ecd8526bec830087aca80b889688fd2a3d0f1fe4a383e67e78033a8641f8f67f12987aabb70bf8fb680c8fe0b22
</br>
Some incorrect pairs are</br>
>> text :</br>
>> signature :</br>
>> text :</br>
>> signature :</br>
>> text :</br>
>> signature :</br>
