export const validateEmail = (email) => {
  // what the... 👇 1. the variable name is bad, what is re? what is it doing. 2. put this logic into a single purpose helper function, it can be stored in folder called helpers or utils which is short for utilities. 3. on big project you might use 3rd party validation lib all good ;-)
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};
