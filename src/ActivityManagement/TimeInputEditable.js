import React from 'react';

const TimeInputEditable = props => {
    const timeFormat = (timeString) => {
        var time = timeString.split(':');
        var hour = time[0] % 12 || 12;
        var minute = time[1];
        var ampm = (time[0] < 12 || time[0] === 24) ? "AM" : "PM";
        return hour+':'+minute +' '+ ampm;
    }
    const { value, onUpdate } = props;
      return <React.Fragment>
        <input type="time" name="time" value={value} onChange={(e) => {
            onUpdate(timeFormat(e.target.value))
        }}/>
    </React.Fragment> ;
}

export default TimeInputEditable;