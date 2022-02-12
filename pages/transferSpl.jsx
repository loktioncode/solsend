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
import Alert from '@mui/material/Alert';

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
import {
    useCSVReader,
    lightenDarkenColor,
    formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
);
const GREY_DIM = '#686868';

const styles = {
    zone: {
        alignItems: 'center',
        border: `2px dashed ${GREY}`,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
        cursor: 'pointer',
    },
    file: {
        background: 'linear-gradient(to bottom, #EEE, #DDD)',
        borderRadius: 20,
        display: 'flex',
        height: 120,
        width: 120,
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    size: {
        backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        marginBottom: '0.5em',
        justifyContent: 'center',
        display: 'flex',
    },
    name: {
        backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        fontSize: 12,
        marginBottom: '0.5em',
    },
    progressBar: {
        bottom: 14,
        position: 'absolute',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    zoneHover: {
        borderColor: GREY_DIM,
    },
    default: {
        borderColor: GREY,
    },
    remove: {
        height: 23,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 23,
    },

};


export default function Home() {

    const [tokenAccountAddress, setTokenAccountAddress] = useState("");
    const [tokenPrivateKey, setTokenPrivateKey] = useState("");
    const [network, setNetwork] = useState("");
    const [transferBtn, setTransferBtn] = useState(false);


    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
    );

    var whitelistAccount = {}, whiteListedAccounts = []


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        window.location.reload();
        
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


        for (let i = 0; i < whiteListedAccounts.length; i++) {
            tokenRecieverPubkey = new web3.PublicKey(whiteListedAccounts[i].address)

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
                    whiteListedAccounts[i].tokens
                )
            );

            const signature = await web3.sendAndConfirmTransaction(
                connection,
                transferTokens,
                [fromWallet],
                { commitment: 'confirmed' },
            );


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
                                    <ColorButton variant="outlined">csv template</ColorButton>
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
                                    <option value="mainnet">MainNet</option>
                                </select>
                                <div className="expcvv">


                                    <CSVReader
                                        onUploadAccepted={(results) => {
                                            setTransferBtn(true);
                                            for (let index = 1; index < results.data.length; index++) {
                                                const element = results.data[index];

                                                if (element[0] !== null && element[0] !== '' && element[0] != 'undefined') {
                                                    // console.log(element[0]);
                                                    // console.log(element[1])
                                                    whitelistAccount.address = element[0];
                                                    whitelistAccount.tokens = element[1];
                                                    whiteListedAccounts.push(whitelistAccount);
                                                }

                                            }
                                            console.log('---------------------------');
                                            console.log(whiteListedAccounts);
                                            console.log('---------------------------');

                                            setZoneHover(false);
                                        }}
                                        onDragOver={(event) => {
                                            event.preventDefault();
                                            setZoneHover(true);
                                        }}
                                        onDragLeave={(event) => {
                                            event.preventDefault();
                                            setZoneHover(false);
                                        }}
                                    >
                                        {({
                                            getRootProps,
                                            acceptedFile,
                                            ProgressBar,
                                            getRemoveFileProps,
                                            Remove,
                                        }) => (
                                            <>
                                                <div
                                                    {...getRootProps()}
                                                    style={Object.assign(
                                                        {},
                                                        styles.zone,
                                                        zoneHover && styles.zoneHover
                                                    )}
                                                >
                                                    {acceptedFile ? (
                                                        <>
                                                            <div style={styles.file}>
                                                                <div style={styles.info}>
                                                                    <span style={styles.size}>
                                                                        {formatFileSize(acceptedFile.size)}
                                                                    </span>
                                                                    <span style={styles.name}>{acceptedFile.name}</span>
                                                                </div>
                                                                <div style={styles.progressBar}>
                                                                    <ProgressBar />
                                                                </div>
                                                                <div
                                                                    {...getRemoveFileProps()}
                                                                    style={styles.remove}
                                                                    onMouseOver={(event) => {
                                                                        event.preventDefault();
                                                                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                                                    }}
                                                                    onMouseOut={(event) => {
                                                                        event.preventDefault();
                                                                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                                                    }}
                                                                >
                                                                    <Remove color={removeHoverColor} />
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        'Drop Whitelist CSV file here or click to upload'
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </CSVReader>
                                </div>
                                <p></p>


                                {(transferBtn === true) ? <button className="button" type="submit">Transfer Tokens</button> : <></>}
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


            <style jsx>{`


.mainscreen
{
min-height: 100vh;
width: 100%;
display: flex;
  flex-direction: column;
  background-color: #DFDBE5;
  background-image: url("https://wallpaperaccess.com/full/3063067.png");
  color:#963E7B;
}

.card {
width: 60rem;
  margin: auto;
  background: white;
  position:center;
  align-self: center;
  top: 50rem;
  border-radius: 1.5rem;
  box-shadow: 4px 3px 20px #3535358c;
  display:flex;
  flex-direction: row;
  
}

.leftside {
background: #030303;
width: 25rem;
display: inline-flex;
  align-items: center;
  justify-content: center;
border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}

.product {
  object-fit: cover;
width: 10em;
  height: 10em;
  border-radius: 100%;
}

.rightside {
  background-color: #ffffff;
width: 35rem;
border-bottom-right-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  padding: 1rem 2rem 3rem 3rem;
}

p{
  display:block;
  font-size: 1.1rem;
  font-weight: 400;
  margin: .8rem 0;
}

.inputbox
{
  color:#030303;
width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 1.5px solid #ccc;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  font-family: 'Roboto', sans-serif;
  color: #615a5a;
  font-size: 1.1rem;
  font-weight: 500;
outline:none;
}

.expcvv {
  display:flex;
  justify-content: space-between;
  padding-top: 0.6rem;
  justify-content:center;
}

.expcvv_text{
  padding-right: 0.5rem;
  width: 250px;
}
.expcvv_text2{
  padding:0 1rem;
}


.hide{
  display: 'none',
}

.button{
  background: linear-gradient(
135deg
, #753370 0%, #298096 100%);
  padding: 15px;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 10px;
  width:100%;
  letter-spacing: .11rem;
  outline:none;
}

.button:hover
{
transform: scale(1.05) translateY(-3px);
  box-shadow: 3px 3px 6px #38373785;
}

@media only screen and (max-width: 1000px) {
  .card{
      flex-direction: column;
      width: auto;  
  }
  .leftside{
      width: 100%;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
    border-top-right-radius:0;
    border-radius:0;
  }

  .rightside{
      width:auto;
      border-bottom-left-radius: 1.5rem;
      padding:0.5rem 3rem 3rem 2rem;
    border-radius:0;
  }
}
      `}</style>

            <style jsx global>{`
    body {
      font-family: 'Roboto', sans-serif!important;
    margin:0;
    padding:0;
    box-sizing: border-box;
    }
      `}</style>
        </div>
    )
}
