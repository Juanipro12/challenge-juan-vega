export function parseFields(formData: FormData): Record<string, any> {
  const fields: Record<string, any> = {};
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      continue;
    }

  
    if (key === 'billingInfo') {
      try {
        fields[key] = JSON.parse(value as string);
      } catch (error) {
        console.error('Error parsing billingInfo JSON:', error);
      }
    } else {
      fields[key] = value;
    }
  }

  return fields;
}
