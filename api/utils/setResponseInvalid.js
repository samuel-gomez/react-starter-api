const setResponseInvalid = ({ errors = [], code = 500, detail = '', label = '' }) => ({
  anomaly: {
    errors,
    code,
    label,
    detail,
  },
});

export default setResponseInvalid;
