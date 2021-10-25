import React from 'react'

import './home.scss'

export default ({ history }) => {

  return (<div className="home">
    <div className="captions">
      <h1>Piano House</h1><br />
      <h3>The best second hand piano for you!</h3><br />
      <p>

        Examined pianos - we choose the piano piano one by one after a comprehensive and careful examination in the eyes of an expert who knows how to diagnose the true condition of the piano. And so all our pianos, are in exceptional mechanical condition.</p><p>
        Pianos in optimal condition - we take care of pianos that come to us carefully. Each second-hand piano undergoes several directions and regulation in order to bring it to an optimal state where you can enjoy playing for many years.</p><p>
        Responsibilities and directions - we do not leave you after the sale and refer you to another person who will take care of your piano. We give the warranty on the piano and direct it at your home. We have been with you for years and it is most important to us that you are satisfied
 </p>
      <p>
        From all the land people come to buy our pianos
     because they knou the our service
     because they knou the our prices
     because they knou the they can find here the best piano
</p>
    </div>
    <img id="imgHome" src="pianoImages/6.jpg"></img>
    <img src="pianoImages/24.jpg"></img>
    <div className="video">
      <p>Our customers come to the best places</p>
      <div className="v">
        <video width="400" controls>
          <source src="https://drive.google.com/file/d/1qaatgfOwJ-lIzdQOIJa2rTr92UdYYr2o/view?usp=sharing" type="video/mp4" />
        </video>
        <div class="container">
          <p>The musical piece<br/><b>First touch</b></p>
        </div>
      </div>
      <div className="v">
        <video width="400" controls>
          <source src="https://drive.google.com/file/d/1Qq-kvYMzg9TyRtHhJ35ZwsvkskugAagf/view?usp=sharing" type="video/mp4" />
        </video>
        <div class="container">
          <p>The musical piece<br/><b>Ballade pour Adeline</b></p>
        </div>
      </div>
    </div>
  </div>

  )
}