export const users = [
  {
    id: 1,
    name: "vivek",
    email: "krvivi28@gmail.com",
    password: "vivek28@",
    usertype: "recruiter",
  },
];

export const userRegisteration = (user) => {
  users.push({ ...user, id: users.length + 1 });
  return true;
};

export const userAuthentication = (reqUser) => {
  let isAuth = false;
  users.forEach((user) => {
    if (
      user.email === reqUser.email &&
      user.password === reqUser.password &&
      user.usertype === reqUser.usertype
    ) {
      isAuth = true;
    }
  });
  return isAuth;
};

export const getProfession = (reqUser) => {
  return users.find(
    (user) =>
      user.email === reqUser.email && {
        id: user.id,
        name: user.name,
        email: user.email,
        usertype: user.usertype,
      }
  );
};
