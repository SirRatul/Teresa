import React, {useState} from 'react';
import PrescriptionPhoto from '../shared/img/prescriptionPhoto.png';
import UploadIcon from '../shared/img/upload.png';
import PlusCurcle from '../shared/img/plus-circle.png';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './UploadPrescriptionForm.css'

const UploadPrescriptionForm = () => {
    const [inputList, setInputList] = useState([{ serialNumber: '', unit: '', day: '' }]);
    const [prescriptionImage, setPrescriptionImage] = useState(PrescriptionPhoto)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [query, setQuery] = useState('')
    const [queryFormVisibility, setQueryFormVisibility] = useState(false)
    const [dynamicCheckBox, setDynamicCheckBox] = useState('Unit')
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(prescriptionImage)
        console.log(inputList)
    }
    const querySubmitHandler = async (event) => {
        event.preventDefault()
        console.log('Query Form Submit')
        console.log(name)
        console.log(email)
        console.log(phone)
        console.log(query)
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const handleAddClick = () => {
        setInputList([...inputList, { serialNumber: '', unit: '', day: '' }]);
    };
    return <React.Fragment>
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <img className="d-block mx-auto prescription-image" src={prescriptionImage} alt="Prescription"/>
                        <form className={"form-group mt-5 d-none d-lg-block "+(queryFormVisibility ? 'visible': 'invisible w-0')} onSubmit={querySubmitHandler}>
                            <p className='h3 text-center font-weight-bold'>Send us your query</p>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Name</label>
                                    <input type="text" className="form-control rounded-pill   form-input-background" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Email</label>
                                    <input type="email" className="form-control rounded-pill   form-input-background" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Phone</label>
                                    <input type="tel" className="form-control rounded-pill   form-input-background" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Query</label>
                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}} value={query} onChange={(e) => setQuery(e.target.value)} required></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-8 offset-2">
                                    <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-lg-8">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-12 col-lg-12">
                                        <div className="form-row">
                                            <div className="col-12 col-lg-4 text-center my-lg-auto mt-5 mt-lg-0">
                                                <label className='text-center mx-auto' htmlFor="files">
                                                    <img className="d-block mx-auto" src={UploadIcon} alt="Prescription"/>
                                                    <p>Upload Prescription Image</p>
                                                </label>
                                                <input id="files" style={{visibility: 'hidden',width: '0%'}} type="file" accept="image/*" onChange={(e) => {if(e.target.files[0]){
                                                        setPrescriptionImage(URL.createObjectURL(e.target.files[0]))
                                                    }
                                                }}/>
                                                <div className="form-group d-none d-lg-block">
                                                    <div className="form-row mb-4">
                                                        <div className="col-8 offset-2">
                                                            <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Submit</button>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-8 offset-2">
                                                            <a href='#/' className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} onClick={function(){setQueryFormVisibility(true)}}>Need Help?</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <p className='text-center font-weight-bold' style={{color: '#464768'}}>If you want to buy individual medicine from the uploaded prescription, please submit the medicine names and units in the table below</p>
                                                <div className="row">
                                                    <div className="col-5 col-sm-5">
                                                        <p>Medicine Serial Number</p>
                                                        <p className='form-header-medicine mt-n2'>(According to the uploaded prescription)</p>
                                                    </div>
                                                    <div className="col-3 col-sm-3">
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" id="unit" name="exampleRadios" className="custom-control-input" value="Unit" checked={dynamicCheckBox === 'Unit'} onChange={(e) => {setDynamicCheckBox('Unit')
                                                            inputList.forEach(function(inputList) {
                                                                inputList.day = '';
                                                            })
                                                            }}/>
                                                            <label className="custom-control-label unit" htmlFor="unit">Unit</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 col-sm-3">
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" id="day" name="exampleRadios" className="custom-control-input" value="Day" checked={dynamicCheckBox === 'Day'} onChange={(e) =>{ setDynamicCheckBox('Day')
                                                            inputList.forEach(function(inputList) {
                                                                inputList.unit = '';
                                                            })
                                                            }}/>
                                                            <label className="custom-control-label day" htmlFor="day">Day</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {inputList.map((x, i) => {
                                                    return (
                                                        <div className="row mb-4" key={i}>
                                                            <div className="col-5 col-sm-5">
                                                                <input type="text" className="form-control rounded-pill form-input-background" name="serialNumber" value={x.serialNumber} onChange={e => handleInputChange(e, i)}/>
                                                            </div>
                                                            <div className="col-3 col-sm-3">
                                                                <input type="text" className="form-control rounded-pill form-input-background" name="unit" value={x.unit} onChange={e => handleInputChange(e, i)} disabled = {(dynamicCheckBox === 'Day')? "disabled" : ""}/>
                                                            </div>
                                                            <div className="col-3 col-sm-3">
                                                                <input type="text" className="form-control rounded-pill form-input-background" name="day" value={x.day} onChange={e => handleInputChange(e, i)} disabled = {(dynamicCheckBox === 'Unit')? "disabled" : ""}/>
                                                            </div>
                                                            <div className="col-1 col-sm-1 ml-n3 ml-sm-0">
                                                                <ButtonGroup aria-label="Basic example">
                                                                    {inputList.length - 1 === i &&<img className='mr-2 plus-icon-button' src={PlusCurcle} onClick={handleAddClick} alt='Plus Icon'/>}
                                                                    {inputList.length !== 1 &&<i className="fas fa-minus-circle minus-icon-button" aria-hidden="true" onClick={() => handleRemoveClick(i)}></i>}
                                                                </ButtonGroup>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                <div className="form-group mb-5">
                                                    <label>Additional Note</label>
                                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}}></textarea>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label>Delivery Details</label>
                                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}}></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-row">
                                                        <div className="col-10 offset-1 col-sm-12 offset-sm-0 mt-2 mt-lg-0">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="defaultCheck1ForNotLg" required/>
                                                                <label htmlFor="defaultCheck1ForNotLg" className="custom-control-label">I've read and agree to the terms and conditions</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='h3 font-weight-bold mt-5 d-none d-lg-block' style={{color: '#090A36'}}>Procedure</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>1. Upload your prescription using upload button.</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>2. Input the medicine names and units that you want to buy.</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>3. Add additional note if you want. Suppose you want to buy 1st, 2nd and 4th medicine from your uploaded prescription. You can add these serial number in the "Additional Note" field.</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>4. Click the submit button to place order.</p>
                                                <div className="form-group d-block d-lg-none">
                                                    <div className="form-row mb-4">
                                                        <div className="col-8 offset-2">
                                                            <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Submit</button>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-8 offset-2">
                                                            <a href='#/' className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} onClick={function(){setQueryFormVisibility(true)}}>Need Help?</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form className={"form-group d-block d-lg-none "+(queryFormVisibility ? 'visible': 'invisible w-0')} onSubmit={querySubmitHandler}>
                            <p className='h3 text-center font-weight-bold'>Send us your query</p>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Name</label>
                                    <input type="text" className="form-control rounded-pill   form-input-background" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Email</label>
                                    <input type="email" className="form-control rounded-pill   form-input-background" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Phone</label>
                                    <input type="tel" className="form-control rounded-pill   form-input-background" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Query</label>
                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}} value={query} onChange={(e) => setQuery(e.target.value)} required></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-8 offset-2">
                                    <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <p className='h3 font-weight-bold mt-5 d-block d-lg-none' style={{color: '#090A36'}}>Procedure</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>1. Upload your prescription using upload button.</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>2. Input the medicine names and units that you want to buy.</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>3. Add additional note if you want. Suppose you want to buy 1st, 2nd and 4th medicine from your uploaded prescription. You can add these serial number in the "Additional Note" field.</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>4. Click the submit button to place order.</p>
            </div>
        </div>
    </React.Fragment>;
};

export default UploadPrescriptionForm;