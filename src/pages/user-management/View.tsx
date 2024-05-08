import { Link } from "react-router-dom"
import AuthLayout from "../AuthLayout"


const View = () => {
 
    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">User Profile </h4>
                </div>
                {/* <div><Link to="/user-listing" className="btn btn-success">Back</Link></div> */}
            </div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5" width="150px" src={"abc.mc"} />
                                    <span className="font-weight-bold">Maaz</span>
                                    <span className="text-black-50">abc@</span>
                                    <span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-9 border-right">
                                <div className="p-3 py-5">
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels"><strong>First Name</strong></label>
                                            <input type="text" readOnly className="form-control caption_input" placeholder="first name" value={"maaz"} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels"><strong>Last Name</strong></label>
                                            <input type="text" readOnly className="form-control caption_input" value={"ma"} placeholder="surname" />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label className="labels"><strong>Date Of Birth</strong></label>
                                            <input type="text" readOnly className="form-control caption_input" placeholder="enter address line 1" value={123-23} />
                                        </div>
                                        <div className="col-md-6"><label className="labels"><strong>Joining Date</strong></label><input type="text" readOnly className="form-control caption_input" placeholder="Joining Date" value={123-2} /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label className="labels"><strong>Gender</strong></label>
                                            <input type="text" readOnly className="form-control caption_input" placeholder="Gender" value={"male"} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels"><strong>Country</strong></label>
                                            <input type="text" readOnly className="form-control caption_input" placeholder="Country" value={"abc"} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels"><strong>Wallet Adrress</strong></label>
                                            <input type="text" readOnly className="form-control caption_input" value={ 'N/A'} />
                                        </div>
                                    </div>
                                    {true && (<div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="display-5 font-weight-bold"><strong>Minted Assets</strong></div>
                                        </div>

                                        
                                   
                                    </div>)}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}
export default View