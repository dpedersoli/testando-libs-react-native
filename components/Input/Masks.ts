import { Masks as MaskInputMasks } from 'react-native-mask-input';

const US_LANDLINE = [
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const US_MOBILE = [
  '+',
  '1',
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const BRL_PHONEFIX = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const US_PHONE_DYNAMIC = (text?: string) => {
  const rawValue = text?.replace(/\D+/g, '') || '';

  if (rawValue.length === 11 && rawValue.startsWith('1')) {
    return US_MOBILE;
  }

  return rawValue.length <= 10 ? US_LANDLINE : US_MOBILE;
};

const BRL_PHONEFIX_PHONECEL = (text?: string) => {
  const rawValue = text?.replace(/\D+/g, '') || '';
  return rawValue.length <= 10 ? BRL_PHONEFIX : MaskInputMasks.BRL_PHONE;
};

const Masks = {
  ...MaskInputMasks,
  US_LANDLINE,
  US_MOBILE,
  US_PHONE_DYNAMIC,
  BRL_PHONEFIX,
  BRL_PHONEFIX_PHONECEL,
};

export default Masks;
