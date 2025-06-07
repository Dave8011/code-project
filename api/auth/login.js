// api/auth/login.js

export default function handler(req, res) {
  const { username, password } = req.query;

  if (username === "Dave8011" && password === "Qwerty@1.1") {
    res.status(200).json({ admin: true });
  } else {
    res.status(401).json({ admin: false });
  }
}
