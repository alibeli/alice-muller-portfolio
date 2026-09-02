/** Portfolio owner inboxes — same env shape as friendapp `AILO_SUPPORT_ADMINS`. */
export function portfolioNotifyEmails(): string[] {
  return (process.env.AILO_SUPPORT_ADMINS ?? "")
    .split(",")
    .map((entry) => {
      const separator = entry.indexOf("=");
      if (separator < 1) return null;
      const email = entry.slice(separator + 1).trim().toLowerCase();
      return email.includes("@") ? email : null;
    })
    .filter((email): email is string => Boolean(email));
}
