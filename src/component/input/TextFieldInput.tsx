import * as React from 'react';
import MuiTextField, {
	TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField';
import { FieldProps, getIn } from 'formik';

export type TextFieldProps = FieldProps &
	Omit<MuiTextFieldProps, 'error' | 'name' | 'onChange' | 'value'> & {
		variant: 'standard' | 'filled' | 'outlined' | undefined;
	};

export const fieldToTextField = ({
	field,
	form,
	disabled,
	...props
}: TextFieldProps): MuiTextFieldProps => {
	const { name } = field;
	const { touched, errors, isSubmitting } = form;

	const fieldError = getIn(errors, name);
	const showError = getIn(touched, name) && !!fieldError;

	return {
		...props,
		...field,
		error: showError,
		helperText: showError ? fieldError : props.helperText,
		disabled: disabled != undefined ? disabled : isSubmitting,
	};
};

export const TextFieldInput: React.ComponentType<TextFieldProps> = ({
	children,
	...props
}: TextFieldProps) => (
		<MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>
	);