export default async function handler(req, res) {
  const { username, password } = req.query;

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    return res.status(200).json({ admin: true });
  }

  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = `${req.headers.origin}/api/auth/callback`;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`;
  res.redirect(githubAuthUrl);
}
