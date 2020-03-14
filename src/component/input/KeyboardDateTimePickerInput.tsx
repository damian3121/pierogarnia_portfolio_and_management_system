import React, { Dispatch } from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

interface Props {
  name: string;
  labelContent: string
  selectedDate: any;
  handleDateChange: React.Dispatch<any>;
  inputVariant: "standard" | "outlined" | "filled" | undefined;
  formatDate: string;
  fullWidth: boolean;
}

export function KeyboardDateTimePickerInput(props: Props) {
  return (
    <KeyboardDateTimePicker
      value={props.selectedDate}
      onChange={props.handleDateChange}
      inputVariant={props.inputVariant}
      name={props.name}
      label={props.labelContent}
      minDate={new Date("2018-01-01T00:00")}
      format={props.formatDate}
      fullWidth={props.fullWidth}
    />
  )
}