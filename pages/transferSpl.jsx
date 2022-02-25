import Head from 'next/head'
import { useState } from "react";
import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {List} from "./utils.js"


const ColorButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "transparent",
    border: "1px solid #fff",
    '&:hover': {
        backgroundColor: "#yfyfy",
        border: "1px solid #298096",
        color: '#298096'
    },
}));

export default function Home() {

    const [tokenAccountAddress, setTokenAccountAddress] = useState("");
    const [tokenPrivateKey, setTokenPrivateKey] = useState("");
    const [network, setNetwork] = useState("");
    const [transferBtn, setTransferBtn] = useState(false);



    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        // window.location.reload();
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    async function handleTokenTransaction() {

        handleToggle()

        const MY_SECRET_KEY = tokenPrivateKey.split(",")

        const connection = new web3.Connection(
            web3.clusterApiUrl(network),
            'confirmed',
        );

        const fromWallet = web3.Keypair.fromSecretKey(
            new Uint8Array(MY_SECRET_KEY)
        )

        //to wallet
        let tokenRecieverPubkey

        // Construct my token class
        var tokenAccount = new web3.PublicKey(tokenAccountAddress);
        var myToken = new splToken.Token(
            connection,
            tokenAccount,
            splToken.TOKEN_PROGRAM_ID,
            fromWallet
        );

        console.log(`--------------------------------------------`)
        console.log(`Transfer to ${List.length} wallets Started `)
        console.log(`--------------------------------------------`)

        for (let i = 0; List.length > i; i++) {
            tokenRecieverPubkey = new web3.PublicKey(List[i].address)

            // Create associated token accounts for my token if they don't exist yet
            var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
                fromWallet.publicKey
            )
            var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
                tokenRecieverPubkey
            )

            // Add token transfer instructions to transaction
            var transferTokens = new web3.Transaction().add(
                splToken.Token.createTransferInstruction(
                    splToken.TOKEN_PROGRAM_ID,
                    fromTokenAccount.address,
                    toTokenAccount.address,
                    fromWallet.publicKey,
                    [],
                    List[i].tokens
                )
            );

            const signature = await web3.sendAndConfirmTransaction(
                connection,
                transferTokens,
                [fromWallet],
                { commitment: 'confirmed' },
            );
            List.splice(i, 1);
            console.log("length reduced to >",List.length)
            console.log(List)
            console.log("Transaction confirmed with signature:", signature)
            console.log("MA TOKEN ABAYA!")
        }

        setTimeout(function () {
            handleClose();
        }, 2000);


    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleTokenTransaction();
    }



    return (
        <div className="container">
            <Head>
                <title>SendTokens</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>



            <main>
                <div className="mainscreen">
                    {/* <img src="https://image.freepik.com/free-vector/purple-background-with-neon-frame_52683-34124.jpg" className="bgimg " alt=""> */}
                    <div className="card">

                        <div className="leftside">
                            <Stack spacing={10} direction="column">
                                <img
                                    src="https://solana.com/src/img/branding/solanaLogoMark.svg"
                                    className="product"
                                    alt="solana-logo"
                                />
                                <Link href="https://drive.google.com/file/d/1viAU152ut2dcL94ithpreTNjfC6oH0MW/view?usp=sharing">
                                    <ColorButton variant="outlined">whitelist csv template</ColorButton>
                                </Link>

                            </Stack>



                        </div>
                        <div className="rightside">
                            <form action="" onSubmit={handleSubmit}>
                                <h1>Distribute SPL tokens</h1>
                                <h2>Tranfer info</h2>

                                <p>TOKEN ACCOUNT ADDRESS</p>
                                <input type="text" className="inputbox" onChange={(e) => setTokenAccountAddress(e.target.value)} required />
                                <p>PRIVATE KEY</p>
                                <input type="password" className="inputbox" onChange={(e) => setTokenPrivateKey(e.target.value)} required />

                                <p>NETWORK/CHAIN</p>
                                <select className="inputbox" onChange={(e) => setNetwork(e.target.value)} required>
                                    <option value="">--Select a Chain--</option>
                                    <option value="devnet">DevNet</option>
                                    <option value="mainnet-beta">MainNet</option>
                                </select>
                               
                                <p></p>


                                <button className="button" type="submit">Transfer Tokens</button>
                                {/* <button className="button" type="submit">Transfer Tokens</button> */}

                            </form>

                            {/* <ConnectToPhantom /> */}

                        </div>
                    </div>
                    <a
                        href="https://twitter.com/loktioncode"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'white' }}
                    >
                        Powered by{' '}
                        @loktioncode
                    </a>
                </div>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}>
                    <CircularProgress color="inherit" />
                   
                </Backdrop>
                
            </main>


            
        </div>
    )
}
