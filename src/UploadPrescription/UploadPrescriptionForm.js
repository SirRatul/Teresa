import React, {useState} from 'react';
import PrescriptionPhoto from '../shared/img/prescriptionPhoto.png';
import UploadIcon from '../shared/img/upload.png';
import PlusCurcle from '../shared/img/plus-circle.png';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Collapse from 'react-bootstrap/Collapse'
import Modal from '../shared/component/Modal'
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
    const [firstQuestionOpen, setFirstQuestionOpen] = useState(false);
    const [secondQuestionOpen, setSecondQuestionOpen] = useState(false);
    const [prescriptionPhotoUpload, setPrescriptionPhotoUpload] = useState();
    const submitHandler = async (event) => {
        event.preventDefault()
        if(prescriptionImage === PrescriptionPhoto){
            setPrescriptionPhotoUpload("Not Uploaded")
        } else {
            console.log(prescriptionImage)
            console.log(inputList)
        }
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
    const modalHandler = () => {
        setPrescriptionPhotoUpload(null)
    }
    return <React.Fragment>
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    {prescriptionPhotoUpload === "Not Uploaded" ? <Modal message="Please Upload Prescription Image to submit your order" onClear={modalHandler.bind(this)}/> : null}
                    <div className="col-12 col-lg-4">
                        <div className="prescription-image-container position-relative text-center">
                            <span className={"close position-absolute "+ (prescriptionImage !== PrescriptionPhoto? "": "d-none")} style={{top: '0%', right: '0%'}} onClick={function(){setPrescriptionImage(PrescriptionPhoto)}}><i className="fa fa-window-close close-icon-button text-light bg-danger" aria-hidden="true"></i></span>
                            <img className="d-block mx-auto w-100 h-100" src={prescriptionImage} alt="Prescription"/>
                            <form className="position-absolute text-center" style={{top: '50%'}}>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-12 text-center my-lg-auto mt-5 mt-lg-0">
                                            <label className={"text-center mx-auto " + (prescriptionImage === PrescriptionPhoto? "": "d-none")} htmlFor="files">
                                                <img className="d-block mx-auto" src={UploadIcon} alt="Prescription"/>
                                                <p>Upload Prescription Image</p>
                                            </label>
                                            <input id="files" style={{visibility: 'hidden',width: '0%'}} type="file" accept="image/*" onChange={(e) => {if(e.target.files[0]){
                                                    setPrescriptionImage(URL.createObjectURL(e.target.files[0]))
                                                }
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-6 col-lg-6 offset-3 offset-lg-3">
                            <button type="button" className="btn btn-block btn-outline-purple mt-4 mb-4 d-none d-lg-block" onClick={function(){setQueryFormVisibility(true)}}>Need Help?</button>
                        </div>
                        <form className={"form-group mt-5 d-none d-lg-block "+(queryFormVisibility ? 'visible': 'invisible w-0')} onSubmit={querySubmitHandler}>
                            <p className='h3 text-center font-weight-bold'>Send us your query</p>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Name</label>
                                    <input type="text" className="form-control rounded-pill   form-input-background" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Email</label>
                                    <input type="email" className="form-control rounded-pill   form-input-background" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Phone</label>
                                    <input type="tel" className="form-control rounded-pill   form-input-background" name="phone" placeholder="Your Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
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
                                    <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Send</button>
                                </div>
                            </div>
                        </form>
                        <p className="h4 font-weight-bold mb-4 d-none d-lg-block" style={{color: '#090A36'}}>Frequently Asked Questions</p>
                        <ul className="list-group d-none d-lg-block" style={{listStyle: 'decimal'}}>
                            <li className="list-group-item border-0" style={{display: 'list-item', cursor: 'pointer'}}>
                                <div onClick={() => setFirstQuestionOpen(!firstQuestionOpen)} aria-controls="example-collapse-text" aria-expanded={firstQuestionOpen}>
                                    <p className="h6 font-weight-bold ml-n3" style={{color: '#090A36'}}>How can I upload prescription image?</p>
                                </div>
                                <Collapse in={firstQuestionOpen} id="example-collapse-text">
                                    <p className="h6 ml-n3">Ans: Go to Buy Medicine &gt; Upload prescription page. Then click on the upload prescription button</p>
                                </Collapse>
                            </li>
                            <li className="list-group-item border-0" style={{display: 'list-item', cursor: 'pointer'}}>
                                <div onClick={() => setSecondQuestionOpen(!secondQuestionOpen)} aria-controls="example-collapse-text" aria-expanded={secondQuestionOpen}>
                                    <p className="h6 font-weight-bold ml-n3" style={{color: '#090A36'}}>What is "Additional Note" ?</p>
                                </div>
                                <Collapse in={secondQuestionOpen} id="example-collapse-text">
                                    <p className="h6 ml-n3">Ans: If you need to add more info while ordering medicine, you can add them in "Additional Note" box.</p>
                                </Collapse>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-2">
                    </div>
                    <div className="col-12 col-lg-6">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-12 col-lg-12">
                                        <div className="form-row">
                                            <div className="col-12 col-lg-12">
                                                <p className='text-center font-weight-bold' style={{color: '#464768'}}>If you want to buy individual medicine from the uploaded prescription, please submit the medicine names and units in the table below</p>
                                                <div className="row">
                                                    <div className="col-5 col-sm-5">
                                                        <p>Medicine Serial Number</p>
                                                        <p className='form-header-medicine mt-n2'>(According to the uploaded prescription)</p>
                                                    </div>
                                                    <div className="col-3 col-sm-3">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" id="unit" name="exampleRadios" className="custom-control-input" value="Unit" checked={dynamicCheckBox === 'Unit'} onChange={(e) => {setDynamicCheckBox('Unit')
                                                            inputList.forEach(function(inputList) {
                                                                inputList.day = '';
                                                            })
                                                            }}/>
                                                            <label className="custom-control-label unit" htmlFor="unit">Unit</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 col-sm-3">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" id="day" name="exampleRadios" className="custom-control-input" value="Day" checked={dynamicCheckBox === 'Day'} onChange={(e) =>{ setDynamicCheckBox('Day')
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
                                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}} placeholder="House No:&#10;Road No:&#10;Area:&#10;" required></textarea>
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
                                                <div className="form-row mb-4 d-none d-lg-block">
                                                    <div className="col-6 offset-3">
                                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Submit</button>
                                                    </div>
                                                </div>
                                                <p className='h3 font-weight-bold mt-5 d-none d-lg-block' style={{color: '#090A36'}}>Procedure</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>1. Upload your prescription using upload button.</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>2. Input the medicine names and units that you want to buy.</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>3. Add additional note if you want. Suppose you want to buy 1st, 2nd and 4th medicine from your uploaded prescription. You can add these serial number in the "Additional Note" field.</p>
                                                <p className='d-none d-lg-block' style={{color: '#090A36'}}>4. Click the submit button to place order.</p>
                                                <div className="form-group d-block d-lg-none">
                                                    <div className="form-row mb-4">
                                                        <div className="col-8 col-sm-6 col-md-4 offset-2 offset-sm-3 offset-md-4">
                                                            <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Submit</button>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-8 col-sm-6 col-md-4 offset-2 offset-sm-3 offset-md-4">
                                                            <button type="button" className="btn btn-block btn-outline-purple mt-1" onClick={function(){setQueryFormVisibility(true)}}>Need Help?</button>
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
                                    <label>Your Name</label>
                                    <input type="text" className="form-control rounded-pill   form-input-background" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Email</label>
                                    <input type="email" className="form-control rounded-pill   form-input-background" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Phone</label>
                                    <input type="tel" className="form-control rounded-pill   form-input-background" name="phone" placeholder="Your Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-10 offset-1 col-sm-10 offset-sm-1">
                                    <label>Your Query</label>
                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}} value={query} onChange={(e) => setQuery(e.target.value)} required></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-8 col-sm-6 offset-2 offset-sm-3">
                                    <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <p className='h3 font-weight-bold d-block d-lg-none' style={{color: '#090A36'}}>Procedure</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>1. Upload your prescription using upload button.</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>2. Input the medicine names and units that you want to buy.</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>3. Add additional note if you want. Suppose you want to buy 1st, 2nd and 4th medicine from your uploaded prescription. You can add these serial number in the "Additional Note" field.</p>
                <p className='d-block d-lg-none' style={{color: '#090A36'}}>4. Click the submit button to place order.</p>
                <p className="h3 font-weight-bold mb-4 d-block d-lg-none" style={{color: '#090A36'}}>Frequently Asked Questions</p>
                <ul className="list-group d-block d-lg-none" style={{listStyle: 'decimal'}}>
                    <li className="list-group-item border-0" style={{display: 'list-item', cursor: 'pointer'}}>
                        <div onClick={() => setFirstQuestionOpen(!firstQuestionOpen)} aria-controls="example-collapse-text" aria-expanded={firstQuestionOpen}>
                            <p className="h6 font-weight-bold ml-n3" style={{color: '#090A36'}}>How can I upload prescription image?</p>
                        </div>
                        <Collapse in={firstQuestionOpen} id="example-collapse-text">
                            <p className="h6 ml-n3">Ans: Go to Buy Medicine &gt; Upload prescription page. Then click on the upload prescription button</p>
                        </Collapse>
                    </li>
                    <li className="list-group-item border-0" style={{display: 'list-item', cursor: 'pointer'}}>
                        <div onClick={() => setSecondQuestionOpen(!secondQuestionOpen)} aria-controls="example-collapse-text" aria-expanded={secondQuestionOpen}>
                            <p className="h6 font-weight-bold ml-n3" style={{color: '#090A36'}}>What is "Additional Note" ?</p>
                        </div>
                        <Collapse in={secondQuestionOpen} id="example-collapse-text">
                            <p className="h6 ml-n3">Ans: If you need to add more info while ordering medicine, you can add them in "Additional Note" box.</p>
                        </Collapse>
                    </li>
                </ul>
            </div>
        </div>
    </React.Fragment>;
};

export default UploadPrescriptionForm;