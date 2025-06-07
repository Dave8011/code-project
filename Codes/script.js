let token = '';
let currentPath = '';

async function adminLogin() {
  const username = document.getElementById('user').value;
  const password = document.getElementById('pass').value;
  const res = await fetch(`/api/auth/login?username=${username}&password=${password}`);
  const data = await res.json();
  if (data.admin) {
    token = 'ADMIN'; // use token from environment or secure backend call
    loadFolders();
  } else {
    window.location.href = res.url;
  }
}

async function loadFolders(path = 'Codes') {
  const res = await fetch(`https://api.github.com/repos/Dave8011/code-project/contents/${path}`, {
    headers: { Authorization: `token ${token}` }
  });
  const files = await res.json();
  const explorer = document.getElementById('explorer');
  explorer.innerHTML = '';

  files.forEach(f => {
    const div = document.createElement('div');
    div.textContent = f.name;
    if (f.type === 'dir') {
      div.onclick = () => loadFolders(f.path);
    } else {
      div.onclick = () => loadFile(f.path);
    }
    explorer.appendChild(div);
  });
}

async function loadFile(path) {
  currentPath = path;
  const res = await fetch(`/api/read?path=${path}&token=${token}`);
  const code = await res.text();
  document.getElementById('editor').style.display = 'block';
  document.getElementById('codeArea').value = code;
}

async function saveFile() {
  const content = document.getElementById('codeArea').value;
  const res = await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: currentPath,
      content,
      message: `Update ${currentPath}`,
      token,
    })
  });

  const result = await res.json();
  alert('✅ Saved!');
}
