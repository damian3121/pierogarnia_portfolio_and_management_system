import React from 'react';
import { Button } from '@material-ui/core';

interface Props {
  fieldText: string;
  isSubmitting: boolean;
  submitForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function SubmitButton(props: Props) {

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={props.isSubmitting}
      onClick={() => props.submitForm}
    >
      {props.fieldText}
    </Button>
  )
}