# send spl-tokens to multiple wallets

### project can be is live here: [solsend](https://solsend.netlify.app/transferSpl)


A package to send the SPL-TOKENS to multiple wallets so users can mint in presale. This was made in order to attempt to provide a way to send tokens to whitelisted wallets without sending gumdrop log for users to claim tokens.

## Overview

While this webapp is running, you will be able to send tokens to multiple wallets in a csv with the amout of token you want to send to each wallet.

Suggestions and PRs welcome!

Note: This is experimental software for a young ecosystem. Use at your own risk. The author is not responsible for misuse of the software or for the user failing to test on devnet before using in production.

## Installation

Clone the repository

```
git clone https://github.com/loktioncode/solsend.git
```

To get started, you will need to have the following in order to send:

### 1. TOKEN ACCOUNT WALLET ADDRESS

you can run the command `spl-tokens accounts` to see token accounts under your wallet.

###Secret key must be in the format as below.

```
_SECRET_KEY= > 1,2,3,4,5,...,64
```

You can also have this key in the .env.local and update the ui accordingly.


Once this is done, run the following commands

```
npm install

npm run dev
```


## Disclaimer

This is a beta version! Please do your own testing and use at your own risk. 

## Contributing

All contributions are welcome and encouraged. Send through a PR if you find any bugs. In an ideal world.
## Contact

Twitter: loktioncode

Discord: @loktioncode#2959
