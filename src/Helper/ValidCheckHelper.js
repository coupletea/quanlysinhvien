// Hàm tối ưu kiểm tra tính hợp lệ
export const validCheck = (data, existingNames = []) => {
  const errors = Object.entries(data).flatMap(([key, field]) => {
    if (field.rules && field.rules.length > 0) {
      for (const rule of field.rules) {
        const result = typeof rule === "function" 
          ? rule(field.value, existingNames) 
          : rule[0](field.value, rule[1]);

        if (!result.valid) {
          return { key, error: result.error };
        }
      }
    }
    return [];
  });

  errors.forEach(({ key, error }) => data[key].error = error);

  return errors.length > 0;
};

// Hàm kiểm tra giá trị bắt buộc
export const validRequired = (value) => ({
  valid: value != null && value.length > 0,
  error: "This field is required.",
});

// Hàm kiểm tra độ dài tối đa
export const validMaxlength = (value, length) => ({
  valid: value != null && value.length <= length,
  error: `Độ dài tói đa ${length}.`,
});

// Hàm kiểm tra độ dài tối thiểu
export const validMinlength = (value, length) => ({
  valid: value != null && value.length >= length,
  error: `Độ dài tối thiểu ${length}.`,
});

// Hàm kiểm tra tên lớp học không trùng lặp
export const validUnique = (value, existingNames) => ({
  valid: !existingNames.includes(value),
  error: "Lớp đã tồn tại.",
});
