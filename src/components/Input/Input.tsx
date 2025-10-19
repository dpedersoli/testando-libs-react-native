import React, { forwardRef } from 'react';
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  Controller,
  Control,
  FieldValues,
  Path,
} from 'react-hook-form';
import { TextInput, Text } from 'react-native-paper';
import Masks from './Masks';
import { View, type TextInput as RNTextInputType } from 'react-native';
import useAppTheme from '@/hooks/useAppTheme';
import MaskInput from 'react-native-mask-input';

export type MasksTypes = keyof typeof Masks;
export type RNPaperTextInputProps = Omit<React.ComponentProps<typeof TextInput>, 'error'>;

export type InputProps<TFieldValues extends FieldValues> = RNPaperTextInputProps & {
  name: string;
  control: Control<TFieldValues>;
  identifier: Path<TFieldValues>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  mask?: MasksTypes;
  required?: boolean;
  mode?: 'outlined' | 'flat';
  lightBackground?: boolean;
  helperText?: string;
  maxLength?: number;
  multiline?: boolean;
  onSubmit?: () => void;
  onSubmitEditing?: () => void;
  onChangeValue?: (value: string) => void;
  customOnChange?: (value: string) => string;
};

function InputComponent<TFieldValues extends FieldValues>(
  props: InputProps<TFieldValues>,
  ref: React.ForwardedRef<RNTextInputType>
) {
  const {
    name,
    control,
    identifier,
    error,
    mask,
    required = false,
    mode = 'outlined',
    lightBackground = false,
    helperText,
    maxLength,
    multiline = false,
    onSubmit,
    onSubmitEditing,
    onChangeValue = () => {},
    customOnChange,
    ...config
  } = props;

  const { colors } = useAppTheme();

  function onChangeComponent(value: string, onChange: (...args: any[]) => void) {
    const processed = customOnChange ? customOnChange(value) : value;
    onChangeValue(processed);
    onChange(processed);
  }

  const backgroundColor =
    mode === 'outlined' ? (lightBackground ? colors.background : colors.surface) : colors.surface;

  return (
    <Controller
      control={control}
      name={identifier}
      render={({ field: { onChange, value } }) => (
        <View>
          <TextInput
            ref={ref}
            render={inputProps => (
              <MaskInput {...inputProps} mask={mask ? Masks[mask] : undefined} />
            )}
            label={`${name}${required ? ' *' : ''}`}
            mode={mode}
            multiline={multiline}
            maxLength={maxLength}
            value={value}
            onChangeText={v => onChangeComponent(v, onChange)}
            textColor={colors.onSurface}
            placeholderTextColor={colors.onSurfaceVariant}
            underlineColor={colors.outline}
            activeUnderlineColor={error ? colors.error : colors.primary}
            outlineColor={error ? colors.error : colors.outline}
            activeOutlineColor={error ? colors.error : colors.primary}
            theme={{ roundness: mode === 'outlined' ? 12 : 4 }}
            style={{ backgroundColor }}
            returnKeyType={onSubmit ? 'done' : 'next'}
            onSubmitEditing={onSubmit || onSubmitEditing}
            {...config}
          />
          {helperText && !error && (
            <Text variant='bodySmall' theme={{ colors: { secondary: colors.secondary } }}>
              {helperText}
            </Text>
          )}
          {error?.message && (
            <Text variant='labelMedium' theme={{ colors: { error: colors.error } }}>
              {error.message as string}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const Input = forwardRef(InputComponent) as <TFieldValues extends FieldValues = FieldValues>(
  props: InputProps<TFieldValues> & { ref?: React.ForwardedRef<RNTextInputType> }
) => React.ReactElement;

export default Input;
