import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../shared/context/auth-context'
import PhotoModal from '../shared/component/PhotoModal'
import axios from 'axios'

const UploadedPrescriptions = () => {
    const [prescriptionInfo, setPrescriptionInfo] = useState([])
    const [imagePath, setImagePath] = useState(null)
    const auth = useContext(AuthContext)
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.token}`
        }
    })
    useEffect(() => {
        const prescriptionInfo = async () => {
            try {
                const response = await authAxios.get(process.env.REACT_APP_BACKEND_URL+'files/prescription', {
                });
                console.log(response.data);
                setPrescriptionInfo(response.data.message)
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        prescriptionInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const photoModal = (imageUrl) => {
        console.log(imageUrl)
        setImagePath(imageUrl)
        return 
    }
    const photoModalHandler = () => {
        setImagePath(null);
    };
    return  <React.Fragment>
        <div className="container mb-5">
            {imagePath && <PhotoModal imagePath={imagePath} onClear={photoModalHandler.bind(this)}/>}
            <div className="row">
                {prescriptionInfo ? 
                    prescriptionInfo.map((item, i) => {
                        return (<div className="col-md-4 mt-4" key={i} onClick={() => {photoModal(item.path)}}>
                            <img className="d-block mx-auto w-100 h-100" src={"https://"+item.path} alt="Prescription" style={{objectFit: 'cover'}}/>
                        </div>)
                    })
                    :
                    null
                }
            </div>
        </div>
    </React.Fragment>;
}

export default UploadedPrescriptions;