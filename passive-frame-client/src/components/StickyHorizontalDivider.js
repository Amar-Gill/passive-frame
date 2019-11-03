import React from 'react'
import { Responsive } from 'semantic-ui-react'

const StickyHorizontalDivider = (props) => {

    return (
        <>
            <Responsive as="hr" minWidth={790} style={{ position: "sticky", top: props.topDesktop, marginTop: 0, zIndex: 10, width: "97.5vw", borderBottomWidth: 1, borderTop: "none", borderColor: "black" }} />
            <Responsive as="hr" maxWidth={789} style={{ position: "sticky", top: props.topMobile, marginTop: 0, zIndex: 10, width: "97.5vw", borderBottomWidth: 1, borderTop: "none", borderColor: "black" }} />
        </>
    )
}

export default StickyHorizontalDivider
