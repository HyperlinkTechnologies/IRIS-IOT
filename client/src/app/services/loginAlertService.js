import emailjs from "@emailjs/browser";

export async function sendLoginAlert(user) {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_LOGIN_ALERT_TEMPLATE_ID,
    {
      to_name: user.fullName || user.username,
      to_email: user.email,
      login_time: new Date().toLocaleString(),
      device: navigator.userAgent,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}