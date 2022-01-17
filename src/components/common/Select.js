import React from "react";

export default function Select({label, value, options, onChange, className, appendNone = true, ...rest}) {

  return (
      <label className={className}>
        <div>{label}</div>
        <select className="col-12" value={value}
                onChange={onChange} {...rest}>
          {appendNone && <option value=""/>}
          {options.map(opt => <option selected={opt.key === value} value={opt.key} key={opt.key}>{opt.title}</option>)}
        </select>
      </label>
  )
}