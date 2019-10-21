import React from 'react'
import { Responsive } from 'semantic-ui-react'

const StickyHorizontalDivider = () => {

    return (
        <>
            <Responsive as="hr" minWidth={790} style={{ position: "sticky", top: 88, marginTop: 0, zIndex: 10, width: "97.5vw", borderBottomWidth: 1, borderTop: "none", borderColor: "black" }} />
            <Responsive as="hr" maxWidth={789} style={{ position: "sticky", top: 174, marginTop: 0, zIndex: 10, width: "97.5vw", borderBottomWidth: 1, borderTop: "none", borderColor: "black" }} />
        </>
    )
}

export default StickyHorizontalDivider
