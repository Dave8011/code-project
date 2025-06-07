const token = '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'; // Keep secret!
const username = 'Dave8011';
const repo = 'code-project';
const basePath = 'Codes';

const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json'
};

const foldersDiv = document.getElementById('folders');
const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');
const fileNameDisplay = document.getElementById('filename');
let currentFileSHA = '';
let currentFilePath = '';

async function listFolders() {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${basePath}`, { headers });
  const data = await res.json();

  data.forEach(item => {
    if (item.type === 'dir') {
      const div = document.createElement('div');
      div.className = 'folder';
      div.textContent = '📁 ' + item.name;
      div.onclick = () => listFiles(item.path);
      foldersDiv.appendChild(div);
    }
  });
}

async function listFiles(folderPath) {
  foldersDiv.innerHTML = ''; // clear view
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folderPath}`, { headers });
  const data = await res.json();

  data.forEach(file => {
    if (file.type === 'file') {
      const div = document.createElement('div');
      div.className = 'folder';
      div.textContent = '📄 ' + file.name;
      div.onclick = () => loadFile(file.path);
      foldersDiv.appendChild(div);
    }
  });

  // back button
  const back = document.createElement('div');
  back.className = 'folder';
  back.textContent = '⬅️ Back';
  back.onclick = () => {
    foldersDiv.innerHTML = '';
    listFolders();
  };
  foldersDiv.insertBefore(back, foldersDiv.firstChild);
}

async function loadFile(filePath) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${filePath}`, { headers });
  const data = await res.json();
  const content = atob(data.content);
  editor.value = content;
  currentFileSHA = data.sha;
  currentFilePath = filePath;
  fileNameDisplay.textContent = 'Editing: ' + filePath.split('/').pop();
  document.getElementById('file-content').style.display = 'block';
}

saveBtn.onclick = async () => {
  const content = btoa(editor.value);
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${currentFilePath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'Updated via web editor',
      content,
      sha: currentFileSHA
    })
  });

  if (res.ok) {
    alert('✅ File saved!');
  } else {
    alert('❌ Save failed.');
  }
};

listFolders();
