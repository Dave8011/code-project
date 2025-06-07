export default async function handler(req, res) {
  const { path, content, message, token } = req.body;

  const getFile = await fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${path}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const fileData = await getFile.json();
  const sha = fileData.sha;

  const response = await fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
