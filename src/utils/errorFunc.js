const errorFunc = (res, messageContent, status) => {
  return res.status(status).json({
    message: messageContent,
  });
};

export default errorFunc;
