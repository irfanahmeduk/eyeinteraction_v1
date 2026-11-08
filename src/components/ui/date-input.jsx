"use client"

import * as React from "react"
import { Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function DateInput({ control, name, error }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          type="date"
          ref={field.ref}
          name={field.name}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          className={cn(error && "error")}
        />
      )}
    />
  )
}
