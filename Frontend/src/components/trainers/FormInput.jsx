import React, { useRef, useEffect } from 'react';

function FormInput({ type, id, name, value, onChange, onKeyDown, ...props }) {
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [value]);
  
  const commonProps = {
    ref: inputRef,
    id: id,
    name: name,
    value: value,
    onChange: onChange,
    onKeyDown: onKeyDown,
    onFocus: () => {
      if (inputRef.current) {
        inputRef.current.dataset.hasFocus = 'true';
      }
    },
    onBlur: () => {
      if (inputRef.current) {
        inputRef.current.dataset.hasFocus = 'false';
      }
    },
    ...props
  };
  
  if (type === 'textarea') {
    return <textarea {...commonProps} />;
  } else if (type === 'select') {
    return (
      <select {...commonProps}>
        {props.children}
      </select>
    );
  } else {
    return <input type={type} {...commonProps} />;
  }
}

export default FormInput; 