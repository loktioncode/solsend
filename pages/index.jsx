import Head from 'next/head'
import Link from 'next/link'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


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
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#0000",
    backgroundColor: "transparent",

  }));

  return (
    <div className="container">
      <Head>
        <title>SendSol Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main>
        <div className="mainscreen">

          <div className="card">
            <div className="leftside">
              <Stack spacing={10} direction="column">
                <img
                  src="https://solana.com/src/img/branding/solanaLogoMark.svg"
                  className="product"
                  alt="solana-logo"
                />
                <Link href="https://github.com/loktioncode">
                  <ColorButton variant="outlined">Github</ColorButton>
                </Link>

              </Stack>
            </div>
            <div className="rightside">
              <div  >
                <h1>DISTRIBUTE SPL TOKENS</h1>
                <h2>Send Spl Tokens to allow user <br /> to mint in Pre-sale</h2>

                <p> You will need a TOKEN ACCOUNT ADDRESS</p>

                <p style={{ padding: 10 }}>You will need a PRIVATE KEY to sign transactions<br /> (<b>NB:</b> this is the privatekey to wallet that created tokens)</p>

                <em>IF YOU WANT TO RUN CODE IN YOUR SERVER OR CONTRIBUTE FEeL FREE TO Do So
                  <a target='_blank' href="https://twitter.com/loktioncode"> TWITTER <img className="twitter" src="https://img.icons8.com/nolan/96/twitter.png" /></a>
                </em>

                <div className="expcvv">

                </div>
                <p></p>


              </div>

              <Stack spacing={2} direction="row">
                <Link href="transferSpl">
                  <ColorButton variant="outlined">Continue</ColorButton>
                </Link>

              </Stack>

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

      </main>

    </div>
  )
}
