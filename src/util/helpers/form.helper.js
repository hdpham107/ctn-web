const fileMinSize = 0; // 1MB
const fileMaxSize = 50 * 1000 * 1000; // 50MB

export const validateFileInput = (value) => {
  if (value && value.length > 0) {
    const file = value[0];
    if (
      !file.name.endsWith('.png')
      && !file.name.endsWith('.jpg')
      && !file.name.endsWith('.pdf')
      && !file.name.endsWith('.doc')
      && !file.name.endsWith('.docx')
      && !file.name.endsWith('.xls')
      && !file.name.endsWith('.xlsx')
      && !file.name.endsWith('.zip')
      && !file.name.endsWith('.tar')
    ) {
      return ' Chỉ hỗ trợ tải lên file có phần mở rộng là : .PNG, .JPG, .PDF, .DOC, .DOCX, .XLS, .XLSX, .ZIP, .TAR';
    } else if (file.size < fileMinSize) {
      return ' File có ít nhất 0 MB';
    } else if (file.size > fileMaxSize) {
      return ' File không được vượt quá 50MB';
    }
  }
  return undefined;
};
export const required = value =>
  (value ? undefined : 'Vui lòng điền thông tin');

export const maxLength = max => value =>
  (value && value.length > max ? `Vui lòng điền nhỏ hơn ${max} ký tự` : undefined);

export const minLength = min => value =>
  (value && value.length < min ? `Vui lòng điền tối thiểu ${min} ký tự` : undefined);

export const number = value =>
  (value && isNaN(Number(value)) ? 'Vui lòng điền số' : undefined);

export const minValue = min => value =>
  (value && value < min ? `Vui lòng điền giá trị lớn hơn ${min}` : undefined);

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email không hợp lệ'
    : undefined);

export const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Chỉ cho phép alphanumeric'
    : undefined);

export const phoneNumber = value =>
  (value && !/^(01[2689]|09)[0-9]{8}$/i.test(value)
    ? 'Số điện thoại không hợp lệ'
    : undefined);

export const getStateValidateContainer = (touched, error, warning) => {
  if (touched) {
    if (warning) {
      return 'has-warning';
    }
    if (error) {
      return 'has-danger';
    }
  }
  return '';
};
export const getStateValidateInput = (touched, error, warning) => {
  if (touched) {
    if (warning) {
      return ' form-control-warning';
    } else if (error) {
      return ' form-control-danger';
    }
  }
  return '';
};
