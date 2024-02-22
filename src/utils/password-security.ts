export function getPasswordSecurity(password: string): number {
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  let points = 0;

  if (hasUppercase) {
    points += 1;
  }
  if (hasLowercase) {
    points += 1;
  }
  if (hasNumber) {
    points += 1;
  }
  if (hasSpecialChar) {
    points += 1;
  }
  if (length > 12) {
    points += 1;
  }

  if (length < 6) points = 0;

  return points > 0 ? Math.round((points / 5) * 100) : 0;
}
