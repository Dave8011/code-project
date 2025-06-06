// ✅ Define your folder structure
const folders = {
  "fba_planning": ["plan.css"],
  "img_codes": ["check.html"],
  "naturtint_site": ["index.html", "faq.css"],
  "ptfs_site": ["table.css"],
  "vitashop_site": ["script.js", "style.css"]
};

const explorer = document.getElementById("explorer");
const editor = document.getElementById("editor");
const filenameLabel = document.getElementById("filename");
const editorSection = document.getElementById("editorSection");

// Loop through folders
Object.entries(folders).forEach(([folder, files]) => {
  const folderDiv = document.createElement("div");
  const folderLabel = document.createElement("div");
  folderLabel.textContent = "📁 " + folder;
  folderLabel.className = "folder";

  const fileList = document.createElement("ul");
  fileList.className = "file-list";

  files.forEach(file => {
    const li = document.createElement("li");
    li.textContent = file;
    li.className = "file";
    li.onclick = () => {
      const path = `${folder}/${file}`;
      fetch(path)
        .then(res => {
          if (!res.ok) throw new Error("Not found");
          return res.text();
        })
        .then(text => {
          editor.value = text;
          filenameLabel.textContent = `📝 Editing: ${path}`;
          editorSection.classList.remove("hidden");
        })
        .catch(() => {
          editor.value = "// Error loading file.";
          filenameLabel.textContent = `❌ Could not open: ${path}`;
        });
    };
    fileList.appendChild(li);
  });

  folderLabel.onclick = () => {
    fileList.classList.toggle("active");
  };

  folderDiv.appendChild(folderLabel);
  folderDiv.appendChild(fileList);
  explorer.appendChild(folderDiv);
});
