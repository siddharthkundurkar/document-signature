const captureIp = (
  req,
  res,
  next
) => {
  req.clientIp =
    req.headers[
      "x-forwarded-for"
    ] ||
    req.socket.remoteAddress ||
    req.ip;

  next();
};

module.exports = {
  captureIp,
};