export default (required = true) => ({
    type: {
      _id: false,
      country_code: { type: 'String', required },
      number: { type: 'String', required }
    },
    required
  });
