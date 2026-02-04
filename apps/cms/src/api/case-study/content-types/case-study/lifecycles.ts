const JSON_FIELDS = ['results', 'technologies'];

function sanitizeJsonFields(data: Record<string, unknown>) {
  if (!data) return;
  for (const field of JSON_FIELDS) {
    if (field in data) {
      const value = data[field];
      if (value === '' || value === undefined) {
        data[field] = null;
      } else if (typeof value === 'string') {
        try {
          data[field] = JSON.parse(value);
        } catch {
          data[field] = null;
        }
      }
    }
  }
}

export default {
  beforeCreate(event) {
    sanitizeJsonFields(event.params.data);
  },
  beforeUpdate(event) {
    sanitizeJsonFields(event.params.data);
  },
};
