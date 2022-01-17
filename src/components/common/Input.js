import React from "react";
import cx from "../../utils/cx";

export default function Input({label, value, type = "text", onChange, className, ...rest}) {
  return (
      <label className={cx("block", className)}>
        <div>{label}</div>
        <input type={type} onChange={onChange} value={value} className="col-12" {...rest}/>
      </label>
  )
}