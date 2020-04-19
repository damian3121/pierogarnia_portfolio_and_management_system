import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
  name: string;
  labelContent: string
  selectedDate: any;
  handleDateChange: React.Dispatch<any>;
  inputVariant: "standard" | "outlined" | "filled" | undefined;
  formatDate: string;
  disabled: boolean;
  fullWidth: boolean;
}

export function KeyboardDatePickerInput(props: Props) {
  return (
    <KeyboardDatePicker
      value={props.selectedDate}
      onChange={props.handleDateChange}
      inputVariant={props.inputVariant}
      name={props.name}
      disabled={props.disabled}
      label={props.labelContent}
      minDate={new Date("2018-01-01T00:00")}
      format={props.formatDate}
      fullWidth={props.fullWidth}
    />
  )
}