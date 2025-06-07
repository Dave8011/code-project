let token = null;

async function adminLogin() {
  const username = document.getElementById('user').value;
  const password = document.getElementById('pass').value;

  try {
    const res = await fetch(`/api/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error("Login failed: " + text);
    }

    const data = await res.json();
    
    if (data.admin) {
      token = 'ADMIN';
      document.getElementById('login').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      loadFolders();
    } else {
      alert("Invalid login.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Error logging in. See console.");
  }
}

function loadFolders() {
  const tree = document.getElementById("file-tree");
  tree.innerHTML = "<p>📁 Codes/</p><ul><li>📁 fba_planning</li><li>📁 img_codes</li><li>📁 naturtint_site</li><li>📁 ptfs_site</li><li>📁 vitashop_site</li></ul>";
}