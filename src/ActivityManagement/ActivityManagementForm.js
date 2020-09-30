import React, { useState, useEffect, useContext } from "react"
import axios from 'axios'
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Select from "react-select"
import Model from "../shared/component/Modal"
import Modal from "react-bootstrap/Modal"
import {Cookies} from 'react-cookie'
import {AuthContext} from '../shared/context/auth-context'
import moment from 'moment'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import "./ActivityManagementForm.css"
/* eslint-disable */

const ActivityManagementForm = props => {
  const auth = useContext(AuthContext)
  const cookies = new Cookies()
  const [isLoading, setIsLoading] = useState(false)
  const [routineCreationMessage, setRoutineCreationMessage] = useState('')

  useEffect(() => {
    console.log('effect in token')
    console.log(auth.token)
  }, [auth.token])
  const [activityItem, setActivityItem] = useState({
    activityItem: {
      value: "Medicine",
      label: "Medicine",
    },
  })
  const [activityItemChangeValue, setActivityItemChangeValue] = useState("")
  const [activityFor, setActivityFor] = useState({
    activityFor: {
      value: "Ayon Mahmud",
      label: "Ayon Mahmud"
    },
  })
  const mealState = {
    mealState: {
      value: "Before",
      label: "Before"
    },
  }

  const notificationTimeState = {
    notificationTimeState: {
      value: "15",
      label: "Before 15 mins"
    },
  }
  const [selfCheckBox, setselfCheckBox] = useState(false)
  const [guardianCheckBox, setGuardianCheckBox] = useState(false)
  const [allCheckBox, setAllCheckBox] = useState(false)
  const [notificationTypeCheckBox, setNotificationTypeCheckBox] = useState(false)

  const [medicineInputList, setMedicineInputList] = useState([
    {
      item: "",
      startDate: "",
      endDate: "",
      continuity: "",
      mealState: mealState.mealState,
      time: "",
      unit: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    }
  ])
  const [dietInputList, setDietInputList] = useState([
    {
      item: "",
      startDate: "",
      endDate: "",
      continuity: "",
      time: "",
      unit: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    }
  ])
  const [exerciseInputList, setExerciseInputList] = useState([
    {
      item: "",
      startDate: "",
      endDate: "",
      continuity: "",
      time: "",
      duration: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    }
  ])
  /*const [doctorsScheduleInputList, setDoctorsScheduleInputList] = useState([
    {
      doctorsName: "",
      place: "",
      date: "",
      time: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    }
  ])*/

  const activityItemOptions = [
    { value: "Medicine", label: "Medicine" },
    { value: "Diet", label: "Diet" },
    { value: "Exercise", label: "Exercise" },
    // { value: "Doctor's Schedule", label: "Doctor's Schedule" }
  ]

  /*const activityForOptions = [
    { value: "Ayon Mahmud", label: "Ayon Mahmud" },
    { value: "Samsul Islam", label: "Samsul Islam" },
    { value: "Abu Ubaida Akash", label: "Abu Ubaida Akash" }
  ]*/

  const mealStateOptions = [
    { value: "Before", label: "Before" },
    { value: "After", label: "After" }
  ]

  const notificationTimeStateOptions = [
    { value: "15", label: "Before 15 mins" },
    { value: "30", label: "Before 30 mins" },
    { value: "60", label: "Before 1 hour" }
  ]

  const [errorModal, setErrorModal] = useState(false)
  const [requiredModal, setRequiredModal] = useState(false)

  const selectActivityItem = (value) => {
    setActivityItem({
      ...activityItem,
      activityItem: value
    })
  }

  /* const selectActivityFor = (value) => {
    setActivityFor({
      ...activityFor,
      activityFor: value
    })
  } */

  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      "&:hover": {
        backgroundColor: "#0C0C52",
        color: "white"
      },
    }),
    control: (base) => ({
      ...base,
      backgroundColor: "#E6E6E6",
      borderRadius: "50rem"
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = "opacity 300ms"

      return { ...provided, opacity, transition }
    },
  }

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        Authorization : `Bearer ${auth.token}`
    } 
  })

  const timeFormat = (timeString) => {
    var time = timeString.split(':');
    var hour = time[0] % 12 || 12;
    var minute = time[1];
    var ampm = (time[0] < 12 || time[0] === 24) ? "am" : "pm";
    return hour < 10 ? '0'+hour +':'+minute +' '+ ampm : hour +':'+minute +' '+ ampm;
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log(activityItem.activityItem.value)
    console.log(activityFor.activityFor.value)
    if (activityItem.activityItem.value === "Medicine") {
      console.log("Medicine Input List")
      console.log(medicineInputList)
      var submitForm = false
      for (let medicineInput of medicineInputList) {
        if(!moment(medicineInput.startDate).isSameOrBefore(medicineInput.endDate)) {
          submitForm = false
          break;
        } else {
          submitForm = true
        }
      }
      if(!submitForm){
        setRoutineCreationMessage('Start Date should not be greater than End Date.')
      }
      else {
        medicineInputList.forEach((medicineInputList) => {
          console.log('Inside loop')
          medicineInputList.itemName = medicineInputList.item
          medicineInputList.meal = medicineInputList.mealState.value
          medicineInputList.time = timeFormat(medicineInputList.time)
          medicineInputList.notificationBefore = medicineInputList.notificationTimeState.value
          medicineInputList.activityItem = undefined,
          medicineInputList.mealState = undefined
          medicineInputList.notificationTimeState = undefined
        })
        console.log('Outside loop')
        console.log(medicineInputList)
        setIsLoading(true)
        try {
          const response = await authAxios.post('routines/medicine', {
            routineArray: medicineInputList
          })
          console.log(response.data)
          setRoutineCreationMessage('Routine Created Succesfully.')
        } catch (error) {
          console.log(error.response.data)
          if(error.response.data.error === 'Please authenticate'){
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
              _id: auth.userId
            });
            console.log(response.data)
            auth.token = response.data.token
            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
            const authAxiosChange = axios.create({
                baseURL: process.env.REACT_APP_BACKEND_URL,
                headers: {
                    Authorization : `Bearer ${response.data.token}`
                } 
            })
            try {
              const response = await authAxiosChange.post('routines/medicine', {
                routineArray: medicineInputList
              })
              console.log(response.data)
              setRoutineCreationMessage('Routine Created Succesfully.')
            } catch (error) {
              console.log(error.response.data)
              // setRoutineCreationMessage(error.response.data.status)
              // setRoutineCreationMessage('Routine Can not Created Succesfully.')
              setRoutineCreationMessage(error.response.data.message)
            }
          }
          else {
            // setRoutineCreationMessage(error.response.data.status)
            // setRoutineCreationMessage('Routine Can not Created Succesfully.')
            setRoutineCreationMessage(error.response.data.message)
          }
        }
        setIsLoading(false)
        props.pageRenderParent()
        setMedicineInputList([
          {
            item: "",
            startDate: "",
            endDate: "",
            continuity: "",
            mealState: mealState.mealState,
            time: "",
            unit: "",
            notificationTimeState: notificationTimeState.notificationTimeState
          }
        ])
      }
    } else if (activityItem.activityItem.value === "Diet") {
      console.log("Diet Input List")
      console.log(dietInputList)
      var submitForm = false
      for (let dietInput of dietInputList) {
        if(!moment(dietInput.startDate).isSameOrBefore(dietInput.endDate)) {
          submitForm = false
          break;
        } else {
          submitForm = true
        }
      }
      if(!submitForm){
        setRoutineCreationMessage('Start Date should not be greater than End Date.')
      }
      else {
        dietInputList.forEach((dietInputList) => {
          console.log('Inside loop')
          dietInputList.itemName = dietInputList.item
          dietInputList.time = timeFormat(dietInputList.time)
          dietInputList.notificationBefore = dietInputList.notificationTimeState.value
          dietInputList.activityItem = undefined,
          dietInputList.mealState = undefined
          dietInputList.notificationTimeState = undefined
        })
        console.log('Outside loop')
        console.log(dietInputList)
        setIsLoading(true)
        try {
          const response = await authAxios.post('routines/diet', {
            routineArray: dietInputList
          })
          console.log(response.data)
          setRoutineCreationMessage('Routine Created Succesfully.')
        } catch (error) {
          console.log(error.response.data)
          if(error.response.data.error === 'Please authenticate'){
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
              _id: auth.userId
            });
            console.log(response.data)
            auth.token = response.data.token
            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
            const authAxiosChange = axios.create({
                baseURL: process.env.REACT_APP_BACKEND_URL,
                headers: {
                    Authorization : `Bearer ${response.data.token}`
                } 
            })
            try {
              const response = await authAxiosChange.post('routines/diet', {
                routineArray: medicineInputList
              })
              console.log(response.data)
              setRoutineCreationMessage('Routine Created Succesfully.')
            } catch (error) {
              console.log(error.response.data)
              // setRoutineCreationMessage(error.response.data.status)
              // setRoutineCreationMessage('Routine Can not Created Succesfully.')
              setRoutineCreationMessage(error.response.data.message)
            }
          }
          else {
            // setRoutineCreationMessage(error.response.data.status)
            // setRoutineCreationMessage('Routine Can not Created Succesfully.')
            setRoutineCreationMessage(error.response.data.message)
          }
        }
        setIsLoading(false)
        props.pageRenderParent()
        setDietInputList([
          {
            item: "",
            startDate: "",
            endDate: "",
            continuity: "",
            time: "",
            unit: "",
            notificationTimeState: notificationTimeState.notificationTimeState
          }
        ])
      }
    } else if (activityItem.activityItem.value === "Exercise") {
      console.log("Exercise Input List")
      console.log(exerciseInputList)
      var submitForm = false
      for (let exerciseInput of exerciseInputList) {
        if(!moment(exerciseInput.startDate).isSameOrBefore(exerciseInput.endDate)) {
          submitForm = false
          break;
        } else {
          submitForm = true
        }
      }
      if(!submitForm){
        setRoutineCreationMessage('Start Date should not be greater than End Date.')
      }
      else {
        exerciseInputList.forEach((exerciseInputList) => {
          console.log('Inside loop')
          exerciseInputList.itemName = exerciseInputList.item
          exerciseInputList.time = timeFormat(exerciseInputList.time)
          exerciseInputList.notificationBefore = exerciseInputList.notificationTimeState.value
          exerciseInputList.activityItem = undefined,
          exerciseInputList.mealState = undefined
          exerciseInputList.notificationTimeState = undefined
        })
        console.log('Outside loop')
        console.log(exerciseInputList)
        setIsLoading(true)
        try {
          const response = await authAxios.post('routines/exercise', {
            routineArray: exerciseInputList
          })
          console.log(response.data)
          setRoutineCreationMessage('Routine Created Succesfully.')
        } catch (error) {
          console.log(error.response.data)
          if(error.response.data.error === 'Please authenticate'){
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
              _id: auth.userId
            });
            console.log(response.data)
            auth.token = response.data.token
            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
            const authAxiosChange = axios.create({
                baseURL: process.env.REACT_APP_BACKEND_URL,
                headers: {
                    Authorization : `Bearer ${response.data.token}`
                } 
            })
            try {
              const response = await authAxiosChange.post('routines/exercise', {
                routineArray: exerciseInputList
              })
              console.log(response.data)
              setRoutineCreationMessage('Routine Created Succesfully.')
            } catch (error) {
              console.log(error.response.data)
              // setRoutineCreationMessage(error.response.data.status)
              // setRoutineCreationMessage('Routine Can not Created Succesfully.')
              setRoutineCreationMessage(error.response.data.message)
            }
          }
          else {
            // setRoutineCreationMessage(error.response.data.status)
            // setRoutineCreationMessage('Routine Can not Created Succesfully.')
            setRoutineCreationMessage(error.response.data.message)
          }
        }
        setIsLoading(false)
        props.pageRenderParent()
        setExerciseInputList([
          {
            item: "",
            startDate: "",
            endDate: "",
            continuity: "",
            time: "",
            duration: "",
            notificationTimeState: notificationTimeState.notificationTimeState,
          },
        ])
      }
    } /*else if (activityItem.activityItem.value === "Doctor's Schedule") {
      console.log("Doctor's Schedule Input List")
      console.log(doctorsScheduleInputList)
      setDoctorsScheduleInputList([
        {
          doctorsName: "",
          place: "",
          date: "",
          time: "",
          notificationTimeState: notificationTimeState.notificationTimeState,
        },
      ])
    }*/
  }

  const activityItemChangeSubmitHandler = async (event) => {
    event.preventDefault()
    if (activityItem.activityItem.value === "Medicine") {
      var submitForm = false
      for (let medicineInput of medicineInputList) {
        if (medicineInput.item === "" ||medicineInput.startDate === "" ||medicineInput.endDate === "" ||medicineInput.continuity === "" ||medicineInput.time === "" ||medicineInput.unit === "") {
          console.log("required")
          setRequiredModal(true)
          submitForm = false
          break;
        } else {
          submitForm = true
        }
      }
      if (submitForm) {
        for (let medicineInput of medicineInputList) {
          if(!moment(medicineInput.startDate).isSameOrBefore(medicineInput.endDate)) {
            submitForm = false
            break;
          } else {
            submitForm = true
          }
        }
        if(!submitForm){
          setRoutineCreationMessage('Start Date should not be greater than End Date.')
        } else {
          medicineInputList.forEach((medicineInputList) => {
            console.log('Inside loop')
            medicineInputList.itemName = medicineInputList.item
            medicineInputList.meal = medicineInputList.mealState.value
            medicineInputList.time = timeFormat(medicineInputList.time)
            medicineInputList.notificationBefore = medicineInputList.notificationTimeState.value
            medicineInputList.activityItem = undefined,
            medicineInputList.mealState = undefined
            medicineInputList.notificationTimeState = undefined
          })
          console.log('Outside loop')
          console.log(medicineInputList)
          setIsLoading(true)
          try {
            const response = await authAxios.post('routines/medicine', {
              routineArray: medicineInputList
            })
            console.log(response.data)
            setRoutineCreationMessage('Routine Created Succesfully.')
          } catch (error) {
            console.log(error.response.data)
            if(error.response.data.error === 'Please authenticate'){
              const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                _id: auth.userId
              });
              console.log(response.data)
              auth.token = response.data.token
              cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
              const authAxiosChange = axios.create({
                  baseURL: process.env.REACT_APP_BACKEND_URL,
                  headers: {
                      Authorization : `Bearer ${response.data.token}`
                  } 
              })
              try {
                const response = await authAxiosChange.post('routines/medicine', {
                  routineArray: medicineInputList
                })
                console.log(response.data)
                setRoutineCreationMessage('Routine Created Succesfully.')
              } catch (error) {
                console.log(error.response.data)
                // setRoutineCreationMessage(error.response.data.status)
                // setRoutineCreationMessage('Routine Can not Created Succesfully.')
                setRoutineCreationMessage(error.response.data.message)
              }
            }
            else {
              // setRoutineCreationMessage(error.response.data.status)
              // setRoutineCreationMessage('Routine Can not Created Succesfully.')
              setRoutineCreationMessage(error.response.data.message)
            }
          }
          setIsLoading(false)
          props.pageRenderParent()
          setMedicineInputList([
            {
              item: "",
              startDate: "",
              endDate: "",
              continuity: "",
              mealState: mealState.mealState,
              time: "",
              unit: "",
              notificationTimeState: notificationTimeState.notificationTimeState,
            },
          ])
          selectActivityItem(activityItemChangeValue)
        }
      }
    }
    if (activityItem.activityItem.value === "Diet") {
      submitForm = false
      for (let dietInput of dietInputList) {
        if (dietInput.item === "" ||dietInput.startDate === "" ||dietInput.endDate === "" ||dietInput.continuity === "" ||dietInput.time === "" ||dietInput.unit === "") {
          console.log("required")
          setRequiredModal(true)
          submitForm = false
          break;
        } else {
          submitForm = true
        }
      }
      if (submitForm) {
        for (let dietInput of dietInputList) {
          if(!moment(dietInput.startDate).isSameOrBefore(dietInput.endDate)) {
            submitForm = false
            break;
          } else {
            submitForm = true
          }
        }
        if(!submitForm){
          setRoutineCreationMessage('Start Date should not be greater than End Date.')
        } else {
          dietInputList.forEach((dietInputList) => {
            console.log('Inside loop')
            dietInputList.itemName = dietInputList.item
            dietInputList.time = timeFormat(dietInputList.time)
            dietInputList.notificationBefore = dietInputList.notificationTimeState.value
            dietInputList.activityItem = undefined,
            dietInputList.mealState = undefined
            dietInputList.notificationTimeState = undefined
          })
          console.log('Outside loop')
          console.log(dietInputList)
          setIsLoading(true)
          try {
            const response = await authAxios.post('routines/diet', {
              routineArray: dietInputList
            })
            console.log(response.data)
            setRoutineCreationMessage('Routine Created Succesfully.')
          } catch (error) {
            console.log(error.response.data)
            if(error.response.data.error === 'Please authenticate'){
              const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                _id: auth.userId
              });
              console.log(response.data)
              auth.token = response.data.token
              cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
              const authAxiosChange = axios.create({
                  baseURL: process.env.REACT_APP_BACKEND_URL,
                  headers: {
                      Authorization : `Bearer ${response.data.token}`
                  } 
              })
              try {
                const response = await authAxiosChange.post('routines/diet', {
                  routineArray: dietInputList
                })
                console.log(response.data)
                setRoutineCreationMessage('Routine Created Succesfully.')
              } catch (error) {
                console.log(error.response.data)
                // setRoutineCreationMessage(error.response.data.status)
                // setRoutineCreationMessage('Routine Can not Created Succesfully.')
                setRoutineCreationMessage(error.response.data.message)
              }
            }
            else {
              // setRoutineCreationMessage(error.response.data.status)
              // setRoutineCreationMessage('Routine Can not Created Succesfully.')
              setRoutineCreationMessage(error.response.data.message)
            }
          }
          setIsLoading(false)
          props.pageRenderParent()
          setDietInputList([
            {
              item: "",
              startDate: "",
              endDate: "",
              continuity: "",
              time: "",
              unit: "",
              notificationTimeState: notificationTimeState.notificationTimeState
            }
          ])
          selectActivityItem(activityItemChangeValue)
        }
      }
    }
    if (activityItem.activityItem.value === "Exercise") {
      submitForm = false
      if (submitForm) {
        console.log(activityItem.activityItem.value)
        console.log(activityFor.activityFor.value)
        console.log("Exercise Input List")
        console.log(exerciseInputList)
        setExerciseInputList([
          {
            item: "",
            startDate: "",
            endDate: "",
            continuity: "",
            time: "",
            duration: "",
            notificationTimeState: notificationTimeState.notificationTimeState,
          },
        ])
        selectActivityItem(activityItemChangeValue)
      }
      for (let exerciseInput of exerciseInputList) {
        if (exerciseInput.item === "" ||exerciseInput.startDate === "" ||exerciseInput.endDate === "" ||exerciseInput.continuity === "" ||exerciseInput.time === "" ||exerciseInput.duration === "") {
          console.log("required")
          setRequiredModal(true)
          submitForm = false
          break;
        } else {
          submitForm = true
        }
      }
      if (submitForm) {
        for (let exerciseInput of exerciseInputList) {
          if(!moment(exerciseInput.startDate).isSameOrBefore(exerciseInput.endDate)) {
            submitForm = false
            break;
          } else {
            submitForm = true
          }
        }
        if(!submitForm){
          setRoutineCreationMessage('Start Date should not be greater than End Date.')
        } else {
          exerciseInputList.forEach((exerciseInputList) => {
            console.log('Inside loop')
            exerciseInputList.itemName = exerciseInputList.item
            exerciseInputList.time = timeFormat(exerciseInputList.time)
            exerciseInputList.notificationBefore = exerciseInputList.notificationTimeState.value
            exerciseInputList.activityItem = undefined,
            exerciseInputList.mealState = undefined
            exerciseInputList.notificationTimeState = undefined
          })
          
          console.log('Outside loop')
          console.log(exerciseInputList)
          setIsLoading(true)
          try {
            const response = await authAxios.post('routines/exercise', {
              routineArray: exerciseInputList
            })
            console.log(response.data)
            setRoutineCreationMessage('Routine Created Succesfully.')
          } catch (error) {
            console.log(error.response.data)
            if(error.response.data.error === 'Please authenticate'){
              const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                _id: auth.userId
              });
              console.log(response.data)
              auth.token = response.data.token
              cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
              const authAxiosChange = axios.create({
                  baseURL: process.env.REACT_APP_BACKEND_URL,
                  headers: {
                      Authorization : `Bearer ${response.data.token}`
                  } 
              })
              try {
                const response = await authAxiosChange.post('routines/exercise', {
                  routineArray: exerciseInputList
                })
                console.log(response.data)
                setRoutineCreationMessage('Routine Created Succesfully.')
              } catch (error) {
                console.log(error.response.data)
                // setRoutineCreationMessage(error.response.data.status)
                // setRoutineCreationMessage('Routine Can not Created Succesfully.')
                setRoutineCreationMessage(error.response.data.message)
              }
            }
            else {
              // setRoutineCreationMessage(error.response.data.status)
              // setRoutineCreationMessage('Routine Can not Created Succesfully.')
              setRoutineCreationMessage(error.response.data.message)
            }
          }
          setIsLoading(false)
          props.pageRenderParent()
          setExerciseInputList([
            {
              item: "",
              startDate: "",
              endDate: "",
              continuity: "",
              time: "",
              duration: "",
              notificationTimeState: notificationTimeState.notificationTimeState,
            },
          ])
          selectActivityItem(activityItemChangeValue)
        }
      }
    }
    /*if (activityItem.activityItem.value === "Doctor's Schedule") {
      submitForm = false
      doctorsScheduleInputList.forEach(function (doctorsScheduleInputList) {
        if (
          doctorsScheduleInputList.doctorsName === "" ||
          doctorsScheduleInputList.place === "" ||
          doctorsScheduleInputList.date === "" ||
          doctorsScheduleInputList.time === ""
        ) {
          console.log("required")
          setRequiredModal(true)
        } else {
          console.log("Not required")
          submitForm = true
        }
      })
      if (submitForm) {
        console.log("this")
        console.log(activityItem.activityItem.value)
        console.log(activityFor.activityFor.value)
        console.log("Doctor's Schedule Input List")
        console.log(doctorsScheduleInputList)
        setDoctorsScheduleInputList([
          {
            doctorsName: "",
            place: "",
            date: "",
            time: "",
            notificationTimeState: notificationTimeState.notificationTimeState,
          },
        ])
        selectActivityItem(activityItemChangeValue)
      }
    }*/
  }

  const resetAllInput = () => {
    setMedicineInputList([
      {
        item: "",
        startDate: "",
        endDate: "",
        continuity: "",
        mealState: mealState.mealState,
        time: "",
        unit: "",
        notificationTimeState: notificationTimeState.notificationTimeState,
      },
    ])
    setDietInputList([
      {
        item: "",
        startDate: "",
        endDate: "",
        continuity: "",
        time: "",
        unit: "",
        notificationTimeState: notificationTimeState.notificationTimeState
      }
    ])
    setExerciseInputList([
      {
        item: "",
        startDate: "",
        endDate: "",
        continuity: "",
        time: "",
        duration: "",
        notificationTimeState: notificationTimeState.notificationTimeState,
      },
    ])
    selectActivityItem(activityItemChangeValue)
  }

  const handleInputChangeInMedicineList = (e, index) => {
    const { name, value } = e.target
    const list = [...medicineInputList]
    list[index][name] = value
    if(list[index]['startDate'] && list[index]['endDate']){
      list[index]['continuity'] = moment(list[index]['endDate'], "YYYY-MM-DD").diff(moment(list[index]['startDate'], "YYYY-MM-DD"), "days") + 1
    }
    setMedicineInputList(list)
  }

  const handleSelectInputChangeInMedicineList = (name, newValue, index) => {
    const list = [...medicineInputList]
    list[index][name] = newValue
    setMedicineInputList(list)
  }

  const handleRemoveClickInMedicineList = (index) => {
    const list = [...medicineInputList]
    list.splice(index, 1)
    setMedicineInputList(list)
  }

  const handleAddClickInMedicineList = () => {
    setMedicineInputList([
      ...medicineInputList,
      {
        item: "",
        startDate: "",
        endDate: "",
        continuity: "",
        mealState: mealState.mealState,
        time: "",
        unit: "",
        notificationTimeState: notificationTimeState.notificationTimeState,
      },
    ])
  }

  const handleInputChangeInDietList = (e, index) => {
    const { name, value } = e.target
    const list = [...dietInputList]
    list[index][name] = value
    if(list[index]['startDate'] && list[index]['endDate']){
      list[index]['continuity'] = moment(list[index]['endDate'], "YYYY-MM-DD").diff(moment(list[index]['startDate'], "YYYY-MM-DD"), "days") + 1
    }
    setDietInputList(list)
  }

  const handleSelectInputChangeInDietList = (name, newValue, index) => {
    const list = [...dietInputList]
    list[index][name] = newValue
    setDietInputList(list)
  }

  const handleRemoveClickInDietList = (index) => {
    const list = [...dietInputList]
    list.splice(index, 1)
    setDietInputList(list)
  }

  const handleAddClickInDietList = () => {
    setDietInputList([
      ...dietInputList,
      {
        item: "",
        startDate: "",
        endDate: "",
        continuity: "",
        time: "",
        unit: "",
        notificationTimeState: notificationTimeState.notificationTimeState,
      },
    ])
  }

  const handleInputChangeInExerciseList = (e, index) => {
    const { name, value } = e.target
    const list = [...exerciseInputList]
    list[index][name] = value
    if(list[index]['startDate'] && list[index]['endDate']){
      list[index]['continuity'] = moment(list[index]['endDate'], "YYYY-MM-DD").diff(moment(list[index]['startDate'], "YYYY-MM-DD"), "days") + 1
    }
    setExerciseInputList(list)
  }

  const handleSelectInputChangeInExerciseList = (name, newValue, index) => {
    const list = [...exerciseInputList]
    list[index][name] = newValue
    setExerciseInputList(list)
  }

  const handleRemoveClickInExerciseList = (index) => {
    const list = [...exerciseInputList]
    list.splice(index, 1)
    setExerciseInputList(list)
  }

  const handleAddClickInExerciseList = () => {
    setExerciseInputList([
      ...exerciseInputList,
      {
        item: "",
        startDate: "",
        endDate: "",
        continuity: "",
        time: "",
        duration: "",
        notificationTimeState: notificationTimeState.notificationTimeState,
      },
    ])
  }

  const handleInputChangeInDoctorsScheduleList = (e, index) => {
    const { name, value } = e.target
    const list = [...doctorsScheduleInputList]
    list[index][name] = value
    if(list[index]['startDate'] && list[index]['endDate']){
      list[index]['continuity'] = moment(list[index]['endDate'], "YYYY-MM-DD").diff(moment(list[index]['startDate'], "YYYY-MM-DD"), "days") + 1
    }
    setDoctorsScheduleInputList(list)
  }

  const handleSelectInputChangeInDoctorsScheduleList = (
    name,
    newValue,
    index
  ) => {
    const list = [...doctorsScheduleInputList]
    list[index][name] = newValue
    setDoctorsScheduleInputList(list)
  }

  const handleRemoveClickInDoctorsScheduleList = (index) => {
    const list = [...doctorsScheduleInputList]
    list.splice(index, 1)
    setDoctorsScheduleInputList(list)
  }

  const handleAddClickInDoctorsScheduleList = () => {
    setDoctorsScheduleInputList([
      ...doctorsScheduleInputList,
      {
        doctorsName: "",
        place: "",
        date: "",
        time: "",
        notificationTimeState: notificationTimeState.notificationTimeState,
      },
    ])
  }

  const [show, setShow] = useState(true)
  const handleClose = () => {
    setShow(false)
  }

  const modalHandler = () => {
    setRequiredModal(false)
    setRoutineCreationMessage(null)
  }

  return (
    <React.Fragment>
      <div className="container-fluid position-relative">
        <div className="row">
          {requiredModal ? (
            <Model
              message="Please fill all the input field to submit your form"
              onClear={modalHandler.bind(this)}
            />
          ) : null}
          {isLoading && <LoadingSpinner/>}
          {routineCreationMessage &&<Model message={routineCreationMessage} onClear={modalHandler.bind(this)}/>}
          <div className="col-12 mt-4 mb-4">
            <Form onSubmit={submitHandler}>
              {errorModal ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header style={{ backgroundColor: "#0C0C52" }}>
                    <Modal.Title style={{ color: "white" }}>
                      Teresa
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Do you want to reset this item?</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={function (e) {
                        // activityItemChangeSubmitHandler(e)
                        resetAllInput()
                        setErrorModal(false)
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={function (e) {
                        setErrorModal(false)
                      }}
                    >
                      No
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : null}
              <Form.Group as={Row}>
                <Form.Label className="h4 ml-3 mr-5" htmlFor="activityItem">Activity Item</Form.Label>
                <div className="col-8 col-md-3 col-xl-3 ml-2 ml-xl-n5 mb-3 mb-xl-0">
                  <Select id="activityItem" styles={customStyles} name={"activityItem"} value={activityItem.activityItem} onChange={function (newValue, e) {
                      if (activityItem.activityItem.value !== newValue.value) {
                        if (activityItem.activityItem.value === "Medicine") {
                          console.log("Previuos Value: " + activityItem.activityItem.value)
                          console.log("New Value: " + newValue.value)
                          var changeActivityItemValue = false
                          for (let medicineInputListItem of medicineInputList) {
                            if (medicineInputListItem.item === "" && medicineInputListItem.startDate === "" && medicineInputListItem.endDate === "" && medicineInputListItem.continuity === "" && medicineInputListItem.time === "" && medicineInputListItem.unit === "") {
                              console.log("All Input Field Empty")
                              changeActivityItemValue = true
                              break
                            }
                            if (medicineInputListItem.item !== "" || medicineInputListItem.startDate !== "" || medicineInputListItem.endDate !== "" || medicineInputListItem.continuity !== "" || medicineInputListItem.time !== "" || medicineInputListItem.unit !== "") {
                              console.log("Change If")
                              setErrorModal(true)
                              changeActivityItemValue = false
                              break
                            } else {
                              console.log("Change Else")
                              // setErrorModal(true)
                              changeActivityItemValue = true
                            }
                          }
                          console.log("Change Activity Item: " + changeActivityItemValue)
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue)
                          }
                        }
                        if (activityItem.activityItem.value === "Diet") {
                          console.log("Previuos Value: " + activityItem.activityItem.value)
                          console.log("New Value: " + newValue.value)
                          changeActivityItemValue = false
                          for (let dietInputListItem of dietInputList) {
                            if (dietInputListItem.item === "" && dietInputListItem.startDate === "" && dietInputListItem.endDate === "" && dietInputListItem.continuity === "" && dietInputListItem.time === "" && dietInputListItem.unit === "") {
                              console.log("All Input Field Empty")
                              changeActivityItemValue = true
                              break
                            }
                            if (dietInputListItem.item !== "" || dietInputListItem.startDate !== "" || dietInputListItem.endDate !== "" || dietInputListItem.continuity !== "" || dietInputListItem.time !== "" || dietInputListItem.unit !== "") {
                              console.log("Change If")
                              setErrorModal(true)
                              changeActivityItemValue = false
                              break
                            } else {
                              console.log("Change Else")
                              // setErrorModal(true)
                              changeActivityItemValue = true
                            }
                          }
                          console.log("Change Activity Item: " + changeActivityItemValue )
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue)
                          }
                        }
                        if (activityItem.activityItem.value === "Exercise") {
                          console.log("Previuos Value: " + activityItem.activityItem.value)
                          console.log("New Value: " + newValue.value)
                          changeActivityItemValue = false
                          for (let exerciseInputListItem of exerciseInputList) {
                            if (exerciseInputListItem.item === "" && exerciseInputListItem.startDate === "" && exerciseInputListItem.endDate === "" && exerciseInputListItem.continuity === "" && exerciseInputListItem.time === "" && exerciseInputListItem.duration === "") {
                              console.log("All Input Field Empty")
                              changeActivityItemValue = true
                              break
                            }
                            if (
                                exerciseInputListItem.item !== "" || exerciseInputListItem.startDate !== "" || exerciseInputListItem.endDate !== "" || exerciseInputListItem.continuity !== "" || exerciseInputListItem.time !== "" || exerciseInputListItem.duration !== "") {
                              console.log("Change If")
                              setErrorModal(true)
                              changeActivityItemValue = false
                              break
                            } else {
                              console.log("Change Else")
                              // setErrorModal(true)
                              changeActivityItemValue = true
                            }
                          }
                          console.log("Change Activity Item: " + changeActivityItemValue)
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue)
                          }
                        }
                        /*if (activityItem.activityItem.value ==="Doctor's Schedule") {
                          console.log("Previuos Value: " + activityItem.activityItem.value)
                          console.log("New Value: " + newValue.value)
                          changeActivityItemValue = false
                          for (let doctorsScheduleInputListItem of doctorsScheduleInputList) {
                            if (doctorsScheduleInputListItem.doctorsName === "" && doctorsScheduleInputListItem.place === "" && doctorsScheduleInputListItem.date === "" && doctorsScheduleInputListItem.time === "") {
                            console.log("All Input Field Empty")
                            changeActivityItemValue = true
                            break
                          }
                          if (doctorsScheduleInputListItem.doctorsName !== "" || doctorsScheduleInputListItem.place !== "" || doctorsScheduleInputListItem.date !== "" || doctorsScheduleInputListItem.time !== "") {
                            console.log("Change If")
                            setErrorModal(true)
                            changeActivityItemValue = false
                            break
                          } else {
                              console.log("Change Else")
                              // setErrorModal(true)
                              changeActivityItemValue = true
                            }
                          }
                          console.log("Change Activity Item: " + changeActivityItemValue)
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue)
                          }
                        }*/
                      }
                      setActivityItemChangeValue(newValue)
                    }}
                    options={activityItemOptions}
                  />
                </div>
                {/* <div className="col-12 col-md-4 col-xl-2 gap-between-select-item"></div>
                <Form.Label className="h4 ml-3 mr-5 mr-md-5 mr-xl-0" htmlFor="activityFor">Activity For</Form.Label>
                <div className="col-8 col-md-3 col-xl-3 ml-2 ml-sm-4 ml-xl-2">
                  <Select id="activityFor" styles={customStyles} name={"activityFor"} value={activityFor.activityFor} onChange={(newValue) => 
                    selectActivityFor(newValue)
                  } options={activityForOptions}/>
                </div> */} 
              </Form.Group>
              <Form.Group>
                <Form.Row className='d-flex flex-column'>
                  {activityItem.activityItem.value === "Medicine" &&
                    medicineInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className='col-xl-11 d-none d-xl-flex flex-xl-row justify-content-xl-end pr-0'>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size ml-n3 mr-n1 mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Item</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Item" name="item" value={x.item} onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                } required={activityItem.activityItem.value === "Medicine" ? "required" : ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto ml-n4 mr-n1">
                                <Form.Label className={"d-block text-center " +(i > 0 ?"d-xl-none" : "")}>Start Date</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Start Date" name="startDate" value={x.startDate} onChange={(e) => 
                                  handleInputChangeInMedicineList(e, i)
                                } required={activityItem.activityItem.value === "Medicine" ? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto ml-n4 mr-n1 mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>End Date</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="date" placeholder="End Date" name="endDate" value={x.endDate} onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                } required={activityItem.activityItem.value === "Medicine"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 ml-n4 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Continuity</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Continuity" name="continuity" value={x.continuity} readOnly  onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                } required={activityItem.activityItem.value === "Medicine"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 mr-n4 mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Meal</Form.Label>
                                <Select styles={customStyles} name="mealState" value={x.mealState} onChange={(newValue) =>
                                  handleSelectInputChangeInMedicineList("mealState",newValue,i)
                                } options={mealStateOptions}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto ml-n1 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time" name="time" value={x.time} onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                } required={ activityItem.activityItem.value === "Medicine"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-1 ml-n1 mr-n4 mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Unit</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Unit" name="unit" min="1" value={x.unit} onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                } required={activityItem.activityItem.value === "Medicine"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 ml-n1 mr-n5">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                                <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) =>
                                  handleSelectInputChangeInMedicineList("notificationTimeState",newValue,i)
                                } options={notificationTimeStateOptions}/>
                              </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Item</Form.Label>
                              <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Item" name="item" value={x.item} onChange={(e) =>
                                handleInputChangeInMedicineList(e, i)
                              } required={activityItem.activityItem.value === "Medicine" ? "required" : ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ?"d-xl-none" : "")}>Start Date</Form.Label>
                              <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Start Date" name="startDate" value={x.startDate} onChange={(e) => 
                                handleInputChangeInMedicineList(e, i)
                              } required={activityItem.activityItem.value === "Medicine" ? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>End Date</Form.Label>
                              <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="date" placeholder="End Date" name="endDate" value={x.endDate} onChange={(e) =>
                                handleInputChangeInMedicineList(e, i)
                              } required={activityItem.activityItem.value === "Medicine"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Continuity</Form.Label>
                              <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Continuity" name="continuity" value={x.continuity} readOnly  onChange={(e) =>
                                handleInputChangeInMedicineList(e, i)
                              } required={activityItem.activityItem.value === "Medicine"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Meal</Form.Label>
                              <Select styles={customStyles} name="mealState" value={x.mealState} onChange={(newValue) => 
                                handleSelectInputChangeInMedicineList("mealState",newValue,i)
                              } options={mealStateOptions}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                              <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time" name="time" value={x.time} onChange={(e) =>
                                handleInputChangeInMedicineList(e, i)
                              } required={ activityItem.activityItem.value === "Medicine"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Unit</Form.Label>
                              <Form.Control className="form-control rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Unit" name="unit" min="1" value={x.unit} onChange={(e) =>
                                handleInputChangeInMedicineList(e, i)
                              } required={activityItem.activityItem.value === "Medicine"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                              <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) =>
                                handleSelectInputChangeInMedicineList("notificationTimeState",newValue,i)
                              } options={notificationTimeStateOptions}/>
                            </div>
                            <div className={"col-6 col-sm-6 col-md-6 col-xl-0 d-block d-xl-none " +(i === 0 ? "mt-2" : "mt-0")}></div>
                            <ButtonGroup className={'col-xl-1 d-none d-xl-flex justify-content-xl-start pl-5 '+(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {medicineInputList.length - 1 === i && (<i className={"fas fa-plus-circle plus-icon-button-font-awesome "+(i === 0 ? "mt-3": "mt-2")} aria-hidden="true" onClick={
                                handleAddClickInMedicineList
                              }></i>)}
                              {medicineInputList.length !== 1 && (<i className={"fas fa-minus-circle minus-icon-button pl-1 "+(i === 0 ? "mt-3": "mt-2")} aria-hidden="true" onClick={() =>
                                handleRemoveClickInMedicineList(i)
                              }></i>)}
                            </ButtonGroup>
                            <ButtonGroup className={'d-xl-none justify-content-xl-center '+(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {medicineInputList.length - 1 === i && (<i className={"fas fa-plus-circle plus-icon-button-font-awesome "+(i === 0 ? "mt-3": "mt-2")} aria-hidden="true" onClick={
                                handleAddClickInMedicineList
                              }></i>)}
                              {medicineInputList.length !== 1 && (<i className={"fas fa-minus-circle minus-icon-button pl-1 "+(i === 0 ? "mt-3": "mt-2")} aria-hidden="true" onClick={() =>
                                handleRemoveClickInMedicineList(i)
                              }></i>)}
                            </ButtonGroup>
                          </Form.Row>
                        </Form.Group>
                      )
                    })}
                  {activityItem.activityItem.value === "Diet" &&
                    dietInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className='col-xl-11 d-none d-xl-flex flex-xl-row justify-content-xl-end'>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb-4 mb-xl-0 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Item</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Item" name="item" value={x.item} onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Start Date</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Start Date" name="startDate" value={x.startDate} onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto mb-4 mb-xl-0 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>End Date</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="End Date" name="endDate" value={x.endDate} onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Continuity</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Continuity" name="continuity" value={x.continuity} onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time" name="time" value={x.time} onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Unit</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="number" min="1" placeholder="Unit" name="unit" value={x.unit} onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                                <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) =>
                                  handleSelectInputChangeInDietList("notificationTimeState",newValue,i)
                                } options={notificationTimeStateOptions}/>
                              </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Item</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Item" name="item" value={x.item} onChange={(e) =>
                                handleInputChangeInDietList(e, i)
                              } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Start Date</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Start Date" name="startDate" value={x.startDate} onChange={(e) =>
                                handleInputChangeInDietList(e, i)
                              } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>End Date</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="End Date" name="endDate" value={x.endDate} onChange={(e) =>
                                handleInputChangeInDietList(e, i)
                              } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Continuity</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Continuity" name="continuity" value={x.continuity} onChange={(e) =>
                                handleInputChangeInDietList(e, i)
                              } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time" name="time" value={x.time} onChange={(e) =>
                                handleInputChangeInDietList(e, i)
                              } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Unit</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="number" min="1" placeholder="Unit" name="unit" value={x.unit} onChange={(e) =>
                                handleInputChangeInDietList(e, i)
                              } required={activityItem.activityItem.value === "Diet"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                              <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) =>
                                handleSelectInputChangeInDietList("notificationTimeState",newValue,i)
                              } options={notificationTimeStateOptions}/>
                            </div>
                            <div className={"col-6 col-sm-6 col-md-6 col-xl-form-size d-block d-xl-none " +(i === 0 ? "mt-2" : "mt-0")}></div>
                            <ButtonGroup className={'col-xl-1 d-none d-xl-flex justify-content-xl-start pl-5 ' +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {dietInputList.length - 1 === i && (<i className={"fas fa-plus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={handleAddClickInDietList}></i>)}
                              {dietInputList.length !== 1 && (<i className={"fas fa-minus-circle minus-icon-button pl-1 "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={() =>
                                handleRemoveClickInDietList(i)
                              }></i>)}
                            </ButtonGroup>
                            <ButtonGroup className={'d-xl-none justify-content-xl-center ' +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {dietInputList.length - 1 === i && (<i className={"fas fa-plus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={handleAddClickInDietList}></i>)}
                              {dietInputList.length !== 1 && (<i className={"fas fa-minus-circle minus-icon-button pl-1 "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={() =>
                                handleRemoveClickInDietList(i)
                              }></i>)}
                            </ButtonGroup>
                          </Form.Row>
                        </Form.Group>
                      )
                    })}
                  {activityItem.activityItem.value === "Exercise" &&
                    exerciseInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className='col-xl-11 d-none d-xl-flex flex-xl-row justify-content-xl-end'>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Item</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Item" name="item" value={x.item} onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Start Date</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Start Date" name="startDate" value={x.startDate} onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto mb-4 mb-xl-0 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>End Date</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="End Date" name="endDate" value={x.endDate} onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Continuity</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Continuity" name="continuity" value={x.continuity} onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time" name="time" value={x.time} onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 mr-n4">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Duration</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Duration" name="duration" value={x.duration} onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mr-n5">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                                <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) => {
                                  handleSelectInputChangeInExerciseList("notificationTimeState",newValue,i)
                                }} options={notificationTimeStateOptions}/>
                              </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Item</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Item" name="item" value={x.item} onChange={(e) =>
                                handleInputChangeInExerciseList(e, i)
                              } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Start Date</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Start Date" name="startDate" value={x.startDate} onChange={(e) =>
                                handleInputChangeInExerciseList(e, i)
                              } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>End Date</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="End Date" name="endDate" value={x.endDate} onChange={(e) =>
                                handleInputChangeInExerciseList(e, i)
                              } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Continuity</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="number" placeholder="Continuity" name="continuity" value={x.continuity} onChange={(e) =>
                                handleInputChangeInExerciseList(e, i)
                              } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time" name="time" value={x.time} onChange={(e) =>
                                handleInputChangeInExerciseList(e, i)
                              } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Duration</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Duration" name="duration" value={x.duration} onChange={(e) =>
                                handleInputChangeInExerciseList(e, i)
                              } required={activityItem.activityItem.value === "Exercise"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                              <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) => {
                                handleSelectInputChangeInExerciseList("notificationTimeState",newValue,i)
                              }} options={notificationTimeStateOptions}/>
                            </div>
                            <div className={"col-6 col-sm-6 col-md-6 col-xl-form-size d-block d-xl-none " +(i === 0 ? "mt-2" : "mt-0")}></div>
                            <ButtonGroup className={'col-xl-1 d-none d-xl-flex justify-content-xl-start pl-5 ' +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {exerciseInputList.length - 1 === i && (
                                <i className={"fas fa-plus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={
                                  handleAddClickInExerciseList
                                }></i>
                              )}
                              {exerciseInputList.length !== 1 && (
                                <i className={"fas fa-minus-circle minus-icon-button pl-1 "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={() =>
                                  handleRemoveClickInExerciseList(i)
                                }></i>
                              )}
                            </ButtonGroup>
                            <ButtonGroup className={'d-xl-none justify-content-xl-center ' +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {exerciseInputList.length - 1 === i && (
                                <i className={"fas fa-plus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={
                                  handleAddClickInExerciseList
                                }></i>
                              )}
                              {exerciseInputList.length !== 1 && (
                                <i className={"fas fa-minus-circle minus-icon-button pl-1 "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={() =>
                                  handleRemoveClickInExerciseList(i)
                                }></i>
                              )}
                            </ButtonGroup>
                          </Form.Row>
                        </Form.Group>
                      )
                    })}
                  {/*activityItem.activityItem.value === "Doctor's Schedule" &&
                    doctorsScheduleInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className='col-xl-11 d-none d-xl-flex flex-xl-row justify-content-xl-start'>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 col-xl-form-size mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Doctor's Name</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Doctor's Name" name="doctorsName" value={x.doctorsName} onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                } required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 col-xl-form-size mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Place</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Place" name="place" value={x.place} onChange={(e) =>
                                    handleInputChangeInDoctorsScheduleList(e, i)
                                  } required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto col-xl-form-size mb-4 mb-xl-0">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Date</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Date" name="date" value={x.date} onChange={(e) => 
                                    handleInputChangeInDoctorsScheduleList(e, i)
                                  } required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-auto col-xl-form-size">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time"
                                  name="time" value={x.time} onChange={(e) =>
                                    handleInputChangeInDoctorsScheduleList(e, i)
                                  }
                                  required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-xl-2 col-xl-form-size">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                                <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) =>
                                  handleSelectInputChangeInDoctorsScheduleList("notificationTimeState",newValue,i)
                                } options={notificationTimeStateOptions}/>
                              </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-2 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Doctor's Name</Form.Label>
                                <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Doctor's Name" name="doctorsName" value={x.doctorsName} onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                } required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                              </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-2 col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Place</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="text" placeholder="Place" name="place" value={x.place} onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                } required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-auto col-xl-form-size mb-4 mb-xl-0 d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Date</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="date" placeholder="Date" name="date" value={x.date} onChange={(e) => 
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                } required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-auto col-xl-form-size d-xl-none">
                              <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Time</Form.Label>
                              <Form.Control className="rounded-pill form-input-background activity-medicine-input" type="time" placeholder="Time"
                                name="time" value={x.time} onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                }
                                required={activityItem.activityItem.value ==="Doctor's Schedule"? "required": ""}/>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-xl-2 col-xl-form-size d-xl-none">
                                <Form.Label className={"d-block text-center " +(i > 0 ? "d-xl-none" : "")}>Notification</Form.Label>
                                <Select styles={customStyles} name="notificationTimeState" value={x.notificationTimeState} onChange={(newValue) =>
                                  handleSelectInputChangeInDoctorsScheduleList("notificationTimeState",newValue,i)
                                } options={notificationTimeStateOptions}/>
                              </div>
                            <div className={"col-6 col-sm-6 col-md-6 col-xl-form-size d-block d-md-none " +(i === 0 ? "mt-2" : "mt-0")}></div>
                            <ButtonGroup className={'col-xl-1 d-none d-xl-flex justify-content-xl-start pl-5 ' +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {doctorsScheduleInputList.length - 1 === i && (
                                <i className={"fas fa-plus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={
                                  handleAddClickInDoctorsScheduleList
                                }></i>
                              )}
                              {doctorsScheduleInputList.length !== 1 && (
                                <i className={"fas fa-minus-circle minus-icon-button "+ (i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={() =>
                                  handleRemoveClickInDoctorsScheduleList(i)
                                }></i>
                              )}
                            </ButtonGroup>
                            <ButtonGroup className={'d-xl-none justify-content-xl-center ' +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                              {doctorsScheduleInputList.length - 1 === i && (
                                <i className={"fas fa-plus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={
                                  handleAddClickInDoctorsScheduleList
                                }></i>
                              )}
                              {doctorsScheduleInputList.length !== 1 && (<i className={"fas fa-minus-circle minus-icon-button "+(i === 0 ? "mt-3" : "mt-2")} aria-hidden="true" onClick={() =>
                                  handleRemoveClickInDoctorsScheduleList(i)
                                }></i>
                              )}
                            </ButtonGroup>
                          </Form.Row>
                        </Form.Group>
                      )
                    })*/}
                </Form.Row>
              </Form.Group>
              <Form.Group>
                {/* <Form.Row>
                  <Col>
                    <Form.Label className="mr-2 mr-xl-5">Send notification to:</Form.Label>
                    <Form.Check inline label="Self"
                      type="checkbox" id="self" value="Self" checked={selfCheckBox ? "checked" : ""} onChange={(e) => {
                      if (e.target.checked) {
                        setselfCheckBox(true)
                        if (guardianCheckBox) {
                          setAllCheckBox(true)
                        }
                      } else {
                        setAllCheckBox(false)
                        setselfCheckBox(false)
                      }
                    }}/>
                    <Form.Check inline label="Guardian" type="checkbox" id="guardian" value="Guardian" checked={guardianCheckBox ? "checked" : ""} onChange={(e) => {
                      if (e.target.checked) {
                        setGuardianCheckBox(true)
                        if (selfCheckBox) {
                          setAllCheckBox(true)
                        }
                      } else {
                        setAllCheckBox(false)
                        setGuardianCheckBox(false)
                      }
                    }}/>
                    <Form.Check inline label="All" type="checkbox" id="all" value="All" checked={allCheckBox ? "checked" : ""} onChange={(e) => {
                      if (e.target.checked) {
                        setAllCheckBox(true)
                        setselfCheckBox(true)
                        setGuardianCheckBox(true)
                      } else {
                        setAllCheckBox(false)
                        setselfCheckBox(false)
                        setGuardianCheckBox(false)
                      }
                    }}/>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Label className="mr-2 mr-xl-5">Notification Type:</Form.Label>
                    <Form.Check className="ml-3"
                      inline label="SMS"  type="checkbox" id="SMS" value="SMS" checked={notificationTypeCheckBox ? "checked" : ""} onChange={(e) => {
                        if (e.target.checked) {
                          setNotificationTypeCheckBox(true)
                        } else {
                          setNotificationTypeCheckBox(false)
                        }
                      }}/>
                  </Col>
                </Form.Row> */}
              </Form.Group>
              <div className="col-6 offset-3 col-sm-4 col-md-3 col-xl-2 offset-sm-4 offset-md-4 offset-xl-5">
                <Button type="submit" block style={{ borderRadius: "1em", backgroundColor: "#0C0C52" }}>Activate</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ActivityManagementForm
