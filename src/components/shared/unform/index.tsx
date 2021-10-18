import React, { useEffect, useRef } from 'react'
import {useField} from '@unform/core'

type Props ={
  name: string
  label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props


export default function Input({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])
  return (
    <>
       <input
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span className="label_error">{error}</span>}
    </>
  )
}