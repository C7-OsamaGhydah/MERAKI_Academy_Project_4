const authenticateToken = (token) => {
    const parsedToken = jwt.verify(token, SECRET);
  };