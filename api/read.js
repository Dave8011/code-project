export default async function handler(req, res) {
  const { path, token } = req.query;

  const response = await fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${path}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  });

  const content = await response.text();
  res.status(200).send(content);
}
