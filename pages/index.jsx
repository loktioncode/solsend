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


      <style jsx>{`
  .MuiButton-root {

    border: 1px solid #963E7B!important;
    color: #963E7B!important;
}

.twitter{
  width:20px;
  height: 20px;
}
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
