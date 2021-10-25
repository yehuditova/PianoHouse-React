import React from 'react'
import AddImage from './addImage'
import './sellUs.scss'
export default () => {
    return (
        <div className="sellUs">
           
            <div className="form">
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" ></textarea>
                    <label htmlfor="floatingTextarea2">Tell us about your piano!</label>
                </div>
            </div>
            <div className="addimage">
                <AddImage />
            </div>
        </div>
    )
}
