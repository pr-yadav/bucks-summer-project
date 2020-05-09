# Task 2
#### This program basically checks whether the signature is valid or not.
It has 2 main files **script.js** and **index.js**. 
#### using script.js we can create signature pairs using private key
#### index.js checks whether the signature is valid using public key
All the dependicies needed fr both can be installed using
> npm install fs</br>
> npm install crypto</br>
> npm install path</br>
> npm install prompt-sync</br>
</br>
I have some pairs of correct signature</br>
> **text** : hello</br>
> **signature**:3fb58651e04cf02f2008827c7c793edb1c92eefd7476971ebb97fcbb5982bd2921f8db92ddfbc0470a8b7e5f39f80980fb712dfdd74050fddd8ae1bc9b55bb83e54410d5e0702ad2d1682307bd695712c06634fecac1a9882f8ef6e82cc8b7033d82387eb8f1df068cd9230dbd94d5dcaaec2034a6db41581c22fee08820e50a</br></br>
>> text :</br>
>> signature :</br>
>> text :</br>
>> signature :</br>
Some incorrect pairs are</br>
>> text :</br>
>> signature :</br>
>> text :</br>
>> signature :</br>
>> text :</br>
>> signature :</br>
