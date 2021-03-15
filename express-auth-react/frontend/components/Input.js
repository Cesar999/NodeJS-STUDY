function Input({label, type, name, htmlID, handleChange, value}){
    return (
        <>
            <label htmlFor={htmlID}>{label}</label>
            <input type={type} name={name} id={htmlID} onChange={handleChange} value={value}></input>
        </>
    )
}
export default Input;