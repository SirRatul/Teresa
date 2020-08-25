import React, {forwardRef} from 'react';

const TimeInputEditable = forwardRef((props, ref) => {
    const { value, onUpdate } = props;
    const timeFormat = (timeString) => {
        var time = timeString.split(':');
        var hour = time[0] % 12 || 12;
        var minute = time[1];
        var ampm = (time[0] < 12 || time[0] === 24) ? "am" : "pm";
        return hour < 10 ? '0'+hour +':'+minute +' '+ ampm : hour +':'+minute +' '+ ampm;
    }
    return <React.Fragment>
        <input className='rounded-pill' type="time" name="time" value={value} onChange={(e) => {
            onUpdate(timeFormat(e.target.value))
        }}/>
    </React.Fragment> ;
})

export default TimeInputEditable;