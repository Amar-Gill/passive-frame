import React from 'react'
import { Responsive } from 'semantic-ui-react'
const Zer0System = () => {
  // set states

  return (
    <div className="mt-40">
      <Responsive minWidth={790}>
        <h1 style={{ position: 'fixed', top: '55vh', left: '25vw', color: 'white', backgroundColor: 'black', fontFamily: 'Courier New' }} >  [  ZER0_system under development  ]  </h1>
      </Responsive>
      <Responsive maxWidth={789}>
        <h4 style={{ position: 'fixed', top: '95vh', left: '25vw', color: 'white', backgroundColor: 'black', fontFamily: 'Courier New' }} >  [  ZER0_system under development  ]  </h4>
      </Responsive>

      <img src={window.location.origin + '/Epyon-katoki1.jpg'} style={{ width: '100vw', marginTop: 2 }} />
      <img src={window.location.origin + '/009.jpg'} style={{ width: '100vw' }} />
      <img src={window.location.origin + '/Epyon-defense.jpg'} style={{ width: '100vw' }} />
      <img src={window.location.origin + '/Epyon-zwei.jpg'} style={{ width: '100vw' }} />
    </div>
  )
}

export default Zer0System
