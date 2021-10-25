//The component that takes care of the realization of the search
import React from 'react'
import { withRouter } from 'react-router-dom'
import './search.scss'

const Search = ({ history }) => {
    //Pointers that save the current search value
    const companyRef = React.createRef();
    const colorRef = React.createRef();
    const priceRef = React.createRef();

    const on_submit = (event) => {
        event.preventDefault();
        const company = companyRef.current.value;
        const color = colorRef.current.value;
        const price = priceRef.current.value;
        history.push(`/sale?company=${company}&color=${color}&price=${price}`)
    }
    return (
        <>
            <form onSubmit={on_submit} noValidate  className="search"  autocomplete="off">
                <div className="form-floating   field  i1" >
                    <input type="text" id="floatingInput" name="company" placeholder="company" className="form-control" ref={companyRef} />
                    <label htmlfor="floatingInput">Company:</label>
                </div>
                <div className="form-floating field  2" >
                    <input type="text" id="floatingInput" name="color" placeholder="color" className="form-control" ref={colorRef} />
                    <label htmlfor="floatingInput">Color:</label>
                </div>
                <div className="form-floating field  3">
                    <input type="text" id="floatingInput" name="price" placeholder="price" className="form-control" ref={priceRef} />
                    <label htmlfor="floatingInput">Max Price:</label>
                </div>
                <div className="form-floating field 4">
                    <label htmlfor="login"></label>
                    <input value="search" type="submit" id="submit" name="search" placeholder="price" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default withRouter(Search);