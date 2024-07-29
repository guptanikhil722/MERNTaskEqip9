import React from 'react';
import '../styles/Form.css'; // For custom form styles


const InputField=({label, type, value, setFunction})=> {
    return (
        <div className="mb-3 form-group column">
            <div className="label">
                <label htmlFor="email">
                    <strong>{label}</strong>
                </label>
            </div>
            <div>
                <input
                    type={type}
                    placeholder={`Enter ${label}`}
                    value={value}
                    onChange={(e) => setFunction(e.target.value)}
                    className='form-control rounded-0'
                />
            </div>
        </div>
    )
}

export default InputField