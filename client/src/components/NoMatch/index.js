import React from 'react'
import { Box } from 'rebass'

const Wrapper = Box.extend`
  text-align: center;
  font-family: 'Source Sans Pro', 'Helvetica', 'Arial', sans-serif;
  color: #222; 
  a {
    color: #705AB2;
    text-decoration: none; 
  }
  h1 {
    color: #000;
    font-size: 48px;
    margin: 0; 
  }
  p {
    color: #000;
    font-size: 18px;
    margin: 6px 0 0 0; 
  }
  img {
    height: 150px; 
  }
  #svg {
    width: 100%; 
  }
`

const NoMatch = () => (
  <Wrapper>

    <main>

      <section id='svg'>
        <img src='https://s3-us-west-2.amazonaws.com/nma-public/404.svg' alt='404' />
      </section>

      <section>
        <br />
        <h1>404 We&#39;re sorry!</h1>
        <br />
        <p>We couldn&#39;t find what you&#39;re looking for.</p>
      </section>

      <section>
        <br />
        <p>Were you looking for a custom built website?</p>
        <p><a href='https://www.nomoreanalog.com'>NoMoreAnalog</a> or <a href='https://www.backroadtech.com'>Backroad Technologies</a> can help.</p>
      </section>

    </main>

    <footer>
      <br /><br />
      <p><a href='/'>&raquo; Go back to the main page</a></p>
      <br />
    </footer>

  </Wrapper>
)

export default NoMatch