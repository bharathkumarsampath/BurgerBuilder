import React from 'react'
import './Backdrop.css'

const Backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.modelClosed}></div>:null
)

export default Backdrop;