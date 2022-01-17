import React from "react";
import cx from "../../utils/cx";

export default function Input({label, value, name, type = "text", textArea = false, onChange, className, ...rest}) {
  return (
      <label className={cx("block", className)}>
        <div>{label}</div>
        {textArea
            ? <textarea onChange={onChange} {...rest} rows={3}
                        name={name} value={value}/>
            : <input type={type} onChange={onChange} value={value}
                     name={name} className="col-12" {...rest}/>}
      </label>
  )
}