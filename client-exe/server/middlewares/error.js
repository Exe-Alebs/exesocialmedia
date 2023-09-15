export const handleServerError = (res, error) => {
  console.log(error);
  res.status(500).json({
    error: 'Internal server error',
  });
};

export const handleValidationErrors = (res, errors) => {
  res.status(400).json({ errors });
};

export const handleUnauthorizedError = (res, message = 'Unauthorized') => {
  res.status(401).json({ message });
};

export const handleNotFoundError = (res, message = 'Not Found') => {
  res.status(404).json({ error: message });
};

export const handleBadRequestError = (res, message = 'Bad Request') => {
  res.status(400).json({ error: message });
};
