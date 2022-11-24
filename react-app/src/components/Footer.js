import React from "react"

export default function Footer(){
const user = JSON.parse(localStorage.getItem('user')) ;
return(
<footer className="page-footer font-small blue pt-4">
    {user? (<div style={{backgroundColor: '#424242', height:'80px'}} className="container-fluid text-center text-md-left">
        <div className="row">
            <hr className="clearfix w-100 d-md-none pb-0"/>
            <div >
                <ul className="list-unstyled">
                    <li><a className='text-light ' href="StoreApplication">Mağaza başvurusu yap</a></li>
                    
                </ul>
            </div>
        </div>
    </div>):(<div style={{backgroundColor: '#424242', height:'80px'}} className="container-fluid text-center text-md-left">
        <div className="row">
            <hr className="clearfix w-100 d-md-none pb-0"/>
            <div >
                <ul className="list-unstyled">
                    <li><a className='text-light ' href="#!">lorem ipsum</a></li>   
                </ul>
            </div>
        </div>
    </div>)}
</footer>
)
}
