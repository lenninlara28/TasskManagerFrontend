export default function CheckPassword(password) {
  const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (password.match(decimal)) {
    return true;
  } else {
    return false;
  }
}
