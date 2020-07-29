import React, {useEffect, useState} from 'react';

const QualityRanger = props => {
    const [editButtonShow, setEditButtonShow] = useState(true)
    const [editableButtonShow, setEditableButtonShow] = useState(false)
    useEffect(() => {
        console.log('effect in ranger')
        // props.setSearchIdThroughFunction(props.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editButtonShow])
    useEffect(() => {
        console.log('effect in ranger 2')
        // props.setSearchIdThroughFunction(props.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editableButtonShow])
    return  <div className="btn-group" role="group" aria-label="Basic example">
        {/* <p>{props.id}</p> */}
        <button type="button" className={"table-row-icon "+(editButtonShow ? "d-none" : null)} onClick={function() {
            props.setSearchIdThroughFunction(props.id)
            props.setEditButtonShowThroughFunction()
            setEditButtonShow(false)
            console.log('test1 quality')
        }}>
            <i className="fas fa-edit"></i>
        </button>
        <button type="button" className={"table-row-icon "+(editButtonShow && !editableButtonShow ? "d-inline" : "d-none")} onClick={function() {
            console.log('test2 quality')
            console.log(props.id)
            setEditableButtonShow(true)
            props.setSearchIdThroughFunction(props.id)
            props.setEditButtonShowThroughFunction()
        }}>
            <i className="fas fa-edit"></i>
        </button>
        <button type="button" className={"table-row-icon "+(editableButtonShow ? "d-inline" : "d-none")} onClick={function() {
            setEditableButtonShow(false)
            console.log('test2 in quality')
        }}>
            <i className="fas fa-check"></i>
        </button>
        <button type="button" className={"table-row-icon "+(editableButtonShow ? "d-inline" : "d-none")} onClick={function() {
            setEditableButtonShow(false)
            console.log('test3 in quality')
        }}>
            <i className="fas fa-window-close"></i>
        </button>
        {/* <button type="button" className={"table-row-icon "+(!editButtonShow ? "d-none" : null)} onClick={function() {
            console.log('test3 quality')
            props.setEditButtonShowThroughFunction()
        }}>
            <i className="fas fa-window-close"></i>
        </button> */}
    </div>;
}

export default QualityRanger;