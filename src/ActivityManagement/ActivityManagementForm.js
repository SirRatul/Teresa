import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Model from "../shared/component/Modal";
import Modal from "react-bootstrap/Modal";
import "./ActivityManagementForm.css";

const ActivityManagementForm = () => {
  const formRef = useRef(null);

  const [activityItem, setActivityItem] = useState({
    activityItem: {
      value: "Medicine",
      label: "Medicine",
    },
  });
  const [activityItemChangeValue, setActivityItemChangeValue] = useState("");
  const [activityFor, setActivityFor] = useState({
    activityFor: {
      value: "Ayon Mahmud",
      label: "Ayon Mahmud",
    },
  });
  const mealState = {
    mealState: {
      value: "Before",
      label: "Before",
    },
  };

  const notificationTimeState = {
    notificationTimeState: {
      value: "Before 15 mins",
      label: "Before 15 mins",
    },
  };
  const [selfCheckBox, setselfCheckBox] = useState(false);
  const [guardianCheckBox, setGuardianCheckBox] = useState(false);
  const [allCheckBox, setAllCheckBox] = useState(false);
  const [notificationTypeCheckBox, setNotificationTypeCheckBox] = useState(
    false
  );

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
    },
  ]);
  const [dietInputList, setDietInputList] = useState([
    {
      item: "",
      startDate: "",
      endDate: "",
      continuity: "",
      time: "",
      unit: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    },
  ]);
  const [exerciseInputList, setExerciseInputList] = useState([
    {
      item: "",
      startDate: "",
      endDate: "",
      continuity: "",
      time: "",
      duration: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    },
  ]);
  const [doctorsScheduleInputList, setDoctorsScheduleInputList] = useState([
    {
      doctorsName: "",
      place: "",
      date: "",
      time: "",
      notificationTimeState: notificationTimeState.notificationTimeState,
    },
  ]);

  const activityItemOptions = [
    { value: "Medicine", label: "Medicine" },
    { value: "Diet", label: "Diet" },
    { value: "Exercise", label: "Exercise" },
    { value: "Doctor's Schedule", label: "Doctor's Schedule" },
  ];
  const activityForOptions = [
    { value: "Ayon Mahmud", label: "Ayon Mahmud" },
    { value: "Samsul Islam", label: "Samsul Islam" },
    { value: "Abu Ubaida Akash", label: "Abu Ubaida Akash" },
  ];

  const mealStateOptions = [
    { value: "Before", label: "Before" },
    { value: "After", label: "After" },
  ];

  const notificationTimeStateOptions = [
    { value: "Before 15 mins", label: "Before 15 mins" },
    { value: "Before 30 mins", label: "Before 30 mins" },
    { value: "Before 1 hour", label: "Before 1 hour" },
  ];

  const [errorModal, setErrorModal] = useState(false);
  const [requiredModal, setRequiredModal] = useState(false);

  const selectActivityItem = (value) => {
    setActivityItem({
      ...activityItem,
      activityItem: value,
    });
  };

  const selectActivityFor = (value) => {
    setActivityFor({
      ...activityFor,
      activityFor: value,
    });
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      "&:hover": {
        backgroundColor: "#0C0C52",
        color: "white",
      },
    }),
    control: (base) => ({
      ...base,
      backgroundColor: "#E6E6E6",
      borderRadius: "50rem",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(activityItem.activityItem.value);
    console.log(activityFor.activityFor.value);
    if (activityItem.activityItem.value === "Medicine") {
      console.log("Medicine Input List");
      console.log(medicineInputList);
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
      ]);
    } else if (activityItem.activityItem.value === "Diet") {
      console.log("Diet Input List");
      console.log(dietInputList);
      setDietInputList([
        {
          item: "",
          startDate: "",
          endDate: "",
          continuity: "",
          time: "",
          unit: "",
          notificationTimeState: notificationTimeState.notificationTimeState,
        },
      ]);
    } else if (activityItem.activityItem.value === "Exercise") {
      console.log("Exercise Input List");
      console.log(exerciseInputList);
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
      ]);
    } else if (activityItem.activityItem.value === "Doctor's Schedule") {
      console.log("Doctor's Schedule Input List");
      console.log(doctorsScheduleInputList);
      setDoctorsScheduleInputList([
        {
          doctorsName: "",
          place: "",
          date: "",
          time: "",
          notificationTimeState: notificationTimeState.notificationTimeState,
        },
      ]);
    }
  };

  const activityItemChangeSubmitHandler = async (event) => {
    event.preventDefault();
    if (activityItem.activityItem.value === "Medicine") {
      var submitForm = false;
      medicineInputList.forEach(function (medicineInputList) {
        if (
          medicineInputList.item === "" ||
          medicineInputList.startDate === "" ||
          medicineInputList.endDate === "" ||
          medicineInputList.continuity === "" ||
          medicineInputList.time === "" ||
          medicineInputList.unit === ""
        ) {
          console.log("required");
          setRequiredModal(true);
        } else {
          submitForm = true;
        }
      });
      if (submitForm) {
        console.log(activityItem.activityItem.value);
        console.log(activityFor.activityFor.value);
        console.log("Medicine Input List");
        console.log(medicineInputList);
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
        ]);
        selectActivityItem(activityItemChangeValue);
      }
    }
    if (activityItem.activityItem.value === "Diet") {
      submitForm = false;
      dietInputList.forEach(function (dietInputList) {
        if (
          dietInputList.item === "" ||
          dietInputList.startDate === "" ||
          dietInputList.endDate === "" ||
          dietInputList.continuity === "" ||
          dietInputList.time === "" ||
          dietInputList.unit === ""
        ) {
          console.log("required");
          setRequiredModal(true);
        } else {
          submitForm = true;
        }
      });
      if (submitForm) {
        console.log(activityItem.activityItem.value);
        console.log(activityFor.activityFor.value);
        console.log("Diet Input List");
        console.log(dietInputList);
        setDietInputList([
          {
            item: "",
            startDate: "",
            endDate: "",
            continuity: "",
            time: "",
            unit: "",
            notificationTimeState: notificationTimeState.notificationTimeState,
          },
        ]);
        selectActivityItem(activityItemChangeValue);
      }
    }
    if (activityItem.activityItem.value === "Exercise") {
      submitForm = false;
      exerciseInputList.forEach(function (exerciseInputList) {
        if (
          exerciseInputList.item === "" ||
          exerciseInputList.startDate === "" ||
          exerciseInputList.endDate === "" ||
          exerciseInputList.continuity === "" ||
          exerciseInputList.time === "" ||
          exerciseInputList.duration === ""
        ) {
          console.log("required");
          setRequiredModal(true);
        } else {
          submitForm = true;
        }
      });
      if (submitForm) {
        console.log(activityItem.activityItem.value);
        console.log(activityFor.activityFor.value);
        console.log("Exercise Input List");
        console.log(exerciseInputList);
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
        ]);
        selectActivityItem(activityItemChangeValue);
      }
    }
    if (activityItem.activityItem.value === "Doctor's Schedule") {
      submitForm = false;
      doctorsScheduleInputList.forEach(function (doctorsScheduleInputList) {
        if (
          doctorsScheduleInputList.doctorsName === "" ||
          doctorsScheduleInputList.place === "" ||
          doctorsScheduleInputList.date === "" ||
          doctorsScheduleInputList.time === ""
        ) {
          console.log("required");
          setRequiredModal(true);
        } else {
          console.log("Not required");
          submitForm = true;
        }
      });
      if (submitForm) {
        console.log("this");
        console.log(activityItem.activityItem.value);
        console.log(activityFor.activityFor.value);
        console.log("Doctor's Schedule Input List");
        console.log(doctorsScheduleInputList);
        setDoctorsScheduleInputList([
          {
            doctorsName: "",
            place: "",
            date: "",
            time: "",
            notificationTimeState: notificationTimeState.notificationTimeState,
          },
        ]);
        selectActivityItem(activityItemChangeValue);
      }
    }
  };

  const handleInputChangeInMedicineList = (e, index) => {
    const { name, value } = e.target;
    const list = [...medicineInputList];
    list[index][name] = value;
    setMedicineInputList(list);
  };

  const handleSelectInputChangeInMedicineList = (name, newValue, index) => {
    const list = [...medicineInputList];
    list[index][name] = newValue;
    setMedicineInputList(list);
  };

  const handleRemoveClickInMedicineList = (index) => {
    const list = [...medicineInputList];
    list.splice(index, 1);
    setMedicineInputList(list);
  };

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
    ]);
  };

  const handleInputChangeInDietList = (e, index) => {
    const { name, value } = e.target;
    const list = [...dietInputList];
    list[index][name] = value;
    setDietInputList(list);
  };

  const handleSelectInputChangeInDietList = (name, newValue, index) => {
    const list = [...dietInputList];
    list[index][name] = newValue;
    setDietInputList(list);
  };

  const handleRemoveClickInDietList = (index) => {
    const list = [...dietInputList];
    list.splice(index, 1);
    setDietInputList(list);
  };

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
    ]);
  };

  const handleInputChangeInExerciseList = (e, index) => {
    const { name, value } = e.target;
    const list = [...exerciseInputList];
    list[index][name] = value;
    setExerciseInputList(list);
  };

  const handleSelectInputChangeInExerciseList = (name, newValue, index) => {
    const list = [...exerciseInputList];
    list[index][name] = newValue;
    setExerciseInputList(list);
  };

  const handleRemoveClickInExerciseList = (index) => {
    const list = [...exerciseInputList];
    list.splice(index, 1);
    setExerciseInputList(list);
  };

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
    ]);
  };

  const handleInputChangeInDoctorsScheduleList = (e, index) => {
    const { name, value } = e.target;
    const list = [...doctorsScheduleInputList];
    list[index][name] = value;
    setDoctorsScheduleInputList(list);
  };

  const handleSelectInputChangeInDoctorsScheduleList = (
    name,
    newValue,
    index
  ) => {
    const list = [...doctorsScheduleInputList];
    list[index][name] = newValue;
    setDoctorsScheduleInputList(list);
  };

  const handleRemoveClickInDoctorsScheduleList = (index) => {
    const list = [...doctorsScheduleInputList];
    list.splice(index, 1);
    setDoctorsScheduleInputList(list);
  };

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
    ]);
  };

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };

  const modalHandler = () => {
    setRequiredModal(false);
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          {requiredModal ? (
            <Model
              message="Please fill all the input field to submit your form"
              onClear={modalHandler.bind(this)}
            />
          ) : null}
          <div className="col-12 mt-4 mb-4">
            <Form onSubmit={submitHandler} ref={formRef}>
              {errorModal ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header style={{ backgroundColor: "#0C0C52" }}>
                    <Modal.Title style={{ color: "white" }}>
                      Modal heading
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Please save the form</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={function (e) {
                        activityItemChangeSubmitHandler(e);
                        setErrorModal(false);
                      }}
                    >
                      Okay
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : null}
              <Form.Group as={Row}>
                <Form.Label className="h4 ml-3 mr-5" htmlFor="activityItem">
                  Activity Item
                </Form.Label>
                <div className="col-6 col-md-3 col-lg-3 ml-n5 mb-3 mb-lg-0">
                  <Select
                    id="activityItem"
                    styles={customStyles}
                    name={"activityItem"}
                    value={activityItem.activityItem}
                    onChange={function (newValue, e) {
                      if (activityItem.activityItem.value !== newValue.value) {
                        if (activityItem.activityItem.value === "Medicine") {
                          console.log(
                            "Previuos Value: " + activityItem.activityItem.value
                          );
                          console.log("New Value: " + newValue.value);
                          var changeActivityItemValue = false;
                          for (let medicineInputListItem of medicineInputList) {
                            if (
                              medicineInputListItem.item === "" &&
                              medicineInputListItem.startDate === "" &&
                              medicineInputListItem.endDate === "" &&
                              medicineInputListItem.continuity === "" &&
                              medicineInputListItem.time === "" &&
                              medicineInputListItem.unit === ""
                            ) {
                              console.log("All Input Field Empty");
                              changeActivityItemValue = true;
                              break;
                            }
                            if (
                              medicineInputListItem.item !== "" ||
                              medicineInputListItem.startDate !== "" ||
                              medicineInputListItem.endDate !== "" ||
                              medicineInputListItem.continuity !== "" ||
                              medicineInputListItem.time !== "" ||
                              medicineInputListItem.unit !== ""
                            ) {
                              console.log("Change If");
                              setErrorModal(true);
                              changeActivityItemValue = false;
                              break;
                            } else {
                              console.log("Change Else");
                              // setErrorModal(true)
                              changeActivityItemValue = true;
                            }
                          }
                          console.log(
                            "Change Activity Item: " + changeActivityItemValue
                          );
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue);
                          }
                        }
                        if (activityItem.activityItem.value === "Diet") {
                          console.log(
                            "Previuos Value: " + activityItem.activityItem.value
                          );
                          console.log("New Value: " + newValue.value);
                          changeActivityItemValue = false;
                          for (let dietInputListItem of dietInputList) {
                            if (
                              dietInputListItem.item === "" &&
                              dietInputListItem.startDate === "" &&
                              dietInputListItem.endDate === "" &&
                              dietInputListItem.continuity === "" &&
                              dietInputListItem.time === "" &&
                              dietInputListItem.unit === ""
                            ) {
                              console.log("All Input Field Empty");
                              changeActivityItemValue = true;
                              break;
                            }
                            if (
                              dietInputListItem.item !== "" ||
                              dietInputListItem.startDate !== "" ||
                              dietInputListItem.endDate !== "" ||
                              dietInputListItem.continuity !== "" ||
                              dietInputListItem.time !== "" ||
                              dietInputListItem.unit !== ""
                            ) {
                              console.log("Change If");
                              setErrorModal(true);
                              changeActivityItemValue = false;
                              break;
                            } else {
                              console.log("Change Else");
                              // setErrorModal(true)
                              changeActivityItemValue = true;
                            }
                          }
                          console.log(
                            "Change Activity Item: " + changeActivityItemValue
                          );
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue);
                          }
                        }
                        if (activityItem.activityItem.value === "Exercise") {
                          console.log(
                            "Previuos Value: " + activityItem.activityItem.value
                          );
                          console.log("New Value: " + newValue.value);
                          changeActivityItemValue = false;
                          for (let exerciseInputListItem of exerciseInputList) {
                            if (
                              exerciseInputListItem.item === "" &&
                              exerciseInputListItem.startDate === "" &&
                              exerciseInputListItem.endDate === "" &&
                              exerciseInputListItem.continuity === "" &&
                              exerciseInputListItem.time === "" &&
                              exerciseInputListItem.duration === ""
                            ) {
                              console.log("All Input Field Empty");
                              changeActivityItemValue = true;
                              break;
                            }
                            if (
                              exerciseInputListItem.item !== "" ||
                              exerciseInputListItem.startDate !== "" ||
                              exerciseInputListItem.endDate !== "" ||
                              exerciseInputListItem.continuity !== "" ||
                              exerciseInputListItem.time !== "" ||
                              exerciseInputListItem.duration !== ""
                            ) {
                              console.log("Change If");
                              setErrorModal(true);
                              changeActivityItemValue = false;
                              break;
                            } else {
                              console.log("Change Else");
                              // setErrorModal(true)
                              changeActivityItemValue = true;
                            }
                          }
                          console.log(
                            "Change Activity Item: " + changeActivityItemValue
                          );
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue);
                          }
                        }
                        if (
                          activityItem.activityItem.value ===
                          "Doctor's Schedule"
                        ) {
                          console.log(
                            "Previuos Value: " + activityItem.activityItem.value
                          );
                          console.log("New Value: " + newValue.value);
                          changeActivityItemValue = false;
                          for (let doctorsScheduleInputListItem of doctorsScheduleInputList) {
                            if (
                              doctorsScheduleInputListItem.doctorsName === "" &&
                              doctorsScheduleInputListItem.place === "" &&
                              doctorsScheduleInputListItem.date === "" &&
                              doctorsScheduleInputListItem.time === ""
                            ) {
                              console.log("All Input Field Empty");
                              changeActivityItemValue = true;
                              break;
                            }
                            if (
                              doctorsScheduleInputListItem.doctorsName !== "" ||
                              doctorsScheduleInputListItem.place !== "" ||
                              doctorsScheduleInputListItem.date !== "" ||
                              doctorsScheduleInputListItem.time !== ""
                            ) {
                              console.log("Change If");
                              setErrorModal(true);
                              changeActivityItemValue = false;
                              break;
                            } else {
                              console.log("Change Else");
                              // setErrorModal(true)
                              changeActivityItemValue = true;
                            }
                          }
                          console.log(
                            "Change Activity Item: " + changeActivityItemValue
                          );
                          if (changeActivityItemValue) {
                            selectActivityItem(newValue);
                          }
                        }
                      }
                      setActivityItemChangeValue(newValue);
                    }}
                    options={activityItemOptions}
                  />
                </div>
                <div className="col-12 col-md-1 col-lg-2"></div>
                <Form.Label className="h4 ml-3" htmlFor="activityFor">
                  Activity For
                </Form.Label>
                <div className="col-6 col-md-3 col-lg-3 ml-2">
                  <Select
                    id="activityFor"
                    styles={customStyles}
                    name={"activityFor"}
                    value={activityFor.activityFor}
                    onChange={(newValue) => selectActivityFor(newValue)}
                    options={activityForOptions}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Row>
                  {activityItem.activityItem.value === "Medicine" &&
                    medicineInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Item
                              </Form.Label>
                              <Form.Control
                                className="form-control rounded-pill form-input-background activity-medicine-input"
                                type="text"
                                placeholder="Item"
                                name="item"
                                value={x.item}
                                onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Medicine"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Start Date
                              </Form.Label>
                              <Form.Control
                                className="form-control rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="Start Date"
                                name="startDate"
                                value={x.startDate}
                                onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Medicine"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                End Date
                              </Form.Label>
                              <Form.Control
                                className="form-control rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="End Date"
                                name="endDate"
                                value={x.endDate}
                                onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Medicine"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Continuity
                              </Form.Label>
                              <Form.Control
                                className="form-control rounded-pill form-input-background activity-medicine-input"
                                type="number"
                                placeholder="Continuity"
                                name="continuity"
                                value={x.continuity}
                                onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Medicine"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Meal
                              </Form.Label>
                              <Select
                                styles={customStyles}
                                name="mealState"
                                value={x.mealState}
                                onChange={(newValue) =>
                                  handleSelectInputChangeInMedicineList(
                                    "mealState",
                                    newValue,
                                    i
                                  )
                                }
                                options={mealStateOptions}
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Time
                              </Form.Label>
                              <Form.Control
                                className="form-control rounded-pill form-input-background activity-medicine-input"
                                type="time"
                                placeholder="Time"
                                name="time"
                                value={x.time}
                                onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Medicine"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Unit
                              </Form.Label>
                              <Form.Control
                                className="form-control rounded-pill form-input-background activity-medicine-input"
                                type="number"
                                placeholder="Unit"
                                name="unit"
                                value={x.unit}
                                onChange={(e) =>
                                  handleInputChangeInMedicineList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Medicine"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Notification
                              </Form.Label>
                              <Select
                                styles={customStyles}
                                name="notificationTimeState"
                                value={x.notificationTimeState}
                                onChange={(newValue) =>
                                  handleSelectInputChangeInMedicineList(
                                    "notificationTimeState",
                                    newValue,
                                    i
                                  )
                                }
                                options={notificationTimeStateOptions}
                              />
                            </div>
                            <div
                              className={
                                "col-6 col-sm-6 col-md-6 col-lg-form-size d-block d-lg-none " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            ></div>
                            {/* <div
                              className={
                                "col-6 col-sm-4 col-md-3 col-lg-form-size " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            > */}
                            <ButtonGroup
                              className={
                                " " +
                                  (i === 0 ? "mt-4" : "mt-0")
                              }
                              aria-label="Basic example"
                            >
                              {medicineInputList.length - 1 === i && (
                                <i
                                  className={"fas fa-plus-circle plus-icon-button-font-awesome "+( +
                                    i ===
                                  0
                                    ? "mt-3"
                                    : "mt-2")}
                                  aria-hidden="true"
                                  onClick={handleAddClickInMedicineList}
                                ></i>
                              )}
                              {medicineInputList.length !== 1 && (
                                <i
                                  className={"fas fa-minus-circle minus-icon-button "+( +
                                    i ===
                                  0
                                    ? "mt-3"
                                    : "mt-2")}
                                  aria-hidden="true"
                                  onClick={() =>
                                    handleRemoveClickInMedicineList(i)
                                  }
                                ></i>
                              )}
                            </ButtonGroup>
                            {/* </div> */}
                          </Form.Row>
                        </Form.Group>
                      );
                    })}
                  {activityItem.activityItem.value === "Diet" &&
                    dietInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Item
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="text"
                                placeholder="Item"
                                name="item"
                                value={x.item}
                                onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Diet"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Start Date
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="Start Date"
                                name="startDate"
                                value={x.startDate}
                                onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Diet"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                End Date
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="End Date"
                                name="endDate"
                                value={x.endDate}
                                onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Diet"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Continuity
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="number"
                                placeholder="Continuity"
                                name="continuity"
                                value={x.continuity}
                                onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Diet"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Time
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="time"
                                placeholder="Time"
                                name="time"
                                value={x.time}
                                onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Diet"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Unit
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="number"
                                placeholder="Unit"
                                name="unit"
                                value={x.unit}
                                onChange={(e) =>
                                  handleInputChangeInDietList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Diet"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Notification
                              </Form.Label>
                              <Select
                                styles={customStyles}
                                name="notificationTimeState"
                                value={x.notificationTimeState}
                                onChange={(newValue) =>
                                  handleSelectInputChangeInDietList(
                                    "notificationTimeState",
                                    newValue,
                                    i
                                  )
                                }
                                options={notificationTimeStateOptions}
                              />
                            </div>
                            <div
                              className={
                                "col-6 col-sm-6 col-md-6 col-lg-form-size d-block d-lg-none " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            ></div>
                            {/* <div
                              className={
                                "col-6 col-sm-4 col-md-3 col-lg-form-size " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            > */}
                              <ButtonGroup
                              className={
                                " " +
                                  (i === 0 ? "mt-4" : "mt-0")
                              }
                              aria-label="Basic example"
                            >
                                {dietInputList.length - 1 === i && (
                                  <i
                                    className={"fas fa-plus-circle minus-icon-button "+
                                    (i === 0 ? "mt-3" : "mt-2")}
                                    aria-hidden="true"
                                    onClick={handleAddClickInDietList}
                                  ></i>
                                )}
                                {dietInputList.length !== 1 && (
                                  <i
                                    className={"fas fa-minus-circle minus-icon-button "+
                                    (i === 0 ? "mt-3" : "mt-2")}
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleRemoveClickInDietList(i)
                                    }
                                  ></i>
                                )}
                              </ButtonGroup>
                            {/* </div> */}
                          </Form.Row>
                        </Form.Group>
                      );
                    })}
                  {activityItem.activityItem.value === "Exercise" &&
                    exerciseInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Item
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="text"
                                placeholder="Item"
                                name="item"
                                value={x.item}
                                onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Exercise"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Start Date
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="Start Date"
                                name="startDate"
                                value={x.startDate}
                                onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Exercise"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                End Date
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="End Date"
                                name="endDate"
                                value={x.endDate}
                                onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Exercise"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Continuity
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="number"
                                placeholder="Continuity"
                                name="continuity"
                                value={x.continuity}
                                onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Exercise"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Time
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="time"
                                placeholder="Time"
                                name="time"
                                value={x.time}
                                onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Exercise"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Duration
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="text"
                                placeholder="Duration"
                                name="duration"
                                value={x.duration}
                                onChange={(e) =>
                                  handleInputChangeInExerciseList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value === "Exercise"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Notification
                              </Form.Label>
                              <Select
                                styles={customStyles}
                                name="notificationTimeState"
                                value={x.notificationTimeState}
                                onChange={(newValue) =>
                                  handleSelectInputChangeInExerciseList(
                                    "notificationTimeState",
                                    newValue,
                                    i
                                  )
                                }
                                options={notificationTimeStateOptions}
                              />
                            </div>
                            <div
                              className={
                                "col-6 col-sm-6 col-md-6 col-lg-form-size d-block d-lg-none " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            ></div>
                            {/* <div
                              className={
                                "col-6 col-sm-4 col-md-3 col-lg-form-size " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            > */}
                              <ButtonGroup
                              className={
                                " " +
                                  (i === 0 ? "mt-4" : "mt-0")
                              }
                              aria-label="Basic example"
                            >
                                {exerciseInputList.length - 1 === i && (
                                  <i
                                    className={"fas fa-plus-circle minus-icon-button "+
                                    (i === 0 ? "mt-3" : "mt-2")}
                                    aria-hidden="true"
                                    onClick={handleAddClickInExerciseList}
                                  ></i>
                                )}
                                {exerciseInputList.length !== 1 && (
                                  <i
                                    className={"fas fa-minus-circle minus-icon-button "+
                                    (i === 0 ? "mt-3" : "mt-2")}
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleRemoveClickInExerciseList(i)
                                    }
                                  ></i>
                                )}
                              </ButtonGroup>
                            {/* </div> */}
                          </Form.Row>
                        </Form.Group>
                      );
                    })}
                  {activityItem.activityItem.value === "Doctor's Schedule" &&
                    doctorsScheduleInputList.map((x, i) => {
                      return (
                        <Form.Group key={i}>
                          <Form.Row>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Doctor's Name
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="text"
                                placeholder="Doctor's Name"
                                name="doctorsName"
                                value={x.doctorsName}
                                onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value ===
                                  "Doctor's Schedule"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Place
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="text"
                                placeholder="Place"
                                name="place"
                                value={x.place}
                                onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value ===
                                  "Doctor's Schedule"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size mb-4 mb-lg-0">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Date
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="date"
                                placeholder="Date"
                                name="date"
                                value={x.date}
                                onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value ===
                                  "Doctor's Schedule"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Time
                              </Form.Label>
                              <Form.Control
                                className="rounded-pill form-input-background activity-medicine-input"
                                type="time"
                                placeholder="Time"
                                name="time"
                                value={x.time}
                                onChange={(e) =>
                                  handleInputChangeInDoctorsScheduleList(e, i)
                                }
                                required={
                                  activityItem.activityItem.value ===
                                  "Doctor's Schedule"
                                    ? "required"
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-form-size">
                              <Form.Label
                                className={
                                  "d-block text-center " +
                                  (i > 0 ? "d-lg-none" : "")
                                }
                              >
                                Notification
                              </Form.Label>
                              <Select
                                styles={customStyles}
                                name="notificationTimeState"
                                value={x.notificationTimeState}
                                onChange={(newValue) =>
                                  handleSelectInputChangeInDoctorsScheduleList(
                                    "notificationTimeState",
                                    newValue,
                                    i
                                  )
                                }
                                options={notificationTimeStateOptions}
                              />
                            </div>
                            <div
                              className={
                                "col-6 col-sm-6 col-md-6 col-lg-form-size d-block d-lg-none " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            ></div>
                            {/* <div
                              className={
                                "col-6 col-sm-4 col-md-3 col-lg-form-size " +
                                (i === 0 ? "mt-2" : "mt-0")
                              }
                            > */}
                              <ButtonGroup className={" " +(i === 0 ? "mt-4" : "mt-0")} aria-label="Basic example">
                                {doctorsScheduleInputList.length - 1 === i && (
                                  <i
                                    className={"fas fa-plus-circle minus-icon-button "+
                                    (i === 0 ? "mt-3" : "mt-2")}
                                    aria-hidden="true"
                                    onClick={
                                      handleAddClickInDoctorsScheduleList
                                    }
                                  ></i>
                                )}
                                {doctorsScheduleInputList.length !== 1 && (
                                  <i
                                    className={"fas fa-minus-circle minus-icon-button "+
                                    (i === 0 ? "mt-3" : "mt-2")}
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleRemoveClickInDoctorsScheduleList(i)
                                    }
                                  ></i>
                                )}
                              </ButtonGroup>
                            {/* </div> */}
                          </Form.Row>
                        </Form.Group>
                      );
                    })}
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Label className="mr-2 mr-lg-5">
                      Send notification to:
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Self"
                      type="checkbox"
                      id="self"
                      value="Self"
                      checked={selfCheckBox ? "checked" : ""}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setselfCheckBox(true);
                          if (guardianCheckBox) {
                            setAllCheckBox(true);
                          }
                        } else {
                          setAllCheckBox(false);
                          setselfCheckBox(false);
                        }
                      }}
                    />
                    <Form.Check
                      inline
                      label="Guardian"
                      type="checkbox"
                      id="guardian"
                      value="Guardian"
                      checked={guardianCheckBox ? "checked" : ""}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGuardianCheckBox(true);
                          if (selfCheckBox) {
                            setAllCheckBox(true);
                          }
                        } else {
                          setAllCheckBox(false);
                          setGuardianCheckBox(false);
                        }
                      }}
                    />
                    <Form.Check
                      inline
                      label="All"
                      type="checkbox"
                      id="all"
                      value="All"
                      checked={allCheckBox ? "checked" : ""}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAllCheckBox(true);
                          setselfCheckBox(true);
                          setGuardianCheckBox(true);
                        } else {
                          setAllCheckBox(false);
                          setselfCheckBox(false);
                          setGuardianCheckBox(false);
                        }
                      }}
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Label className="mr-2 mr-lg-5">
                      Notification Type:
                    </Form.Label>
                    <Form.Check
                      className="ml-3"
                      inline
                      label="SMS"
                      type="checkbox"
                      id="SMS"
                      value="SMS"
                      checked={notificationTypeCheckBox ? "checked" : ""}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNotificationTypeCheckBox(true);
                        } else {
                          setNotificationTypeCheckBox(false);
                        }
                      }}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <div className="col-6 offset-3 col-sm-4 col-md-3 col-lg-2 offset-sm-4 offset-md-4 offset-lg-5">
                <Button
                  type="submit"
                  block
                  style={{ borderRadius: "1em", backgroundColor: "#0C0C52" }}
                >
                  Activate
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActivityManagementForm;
