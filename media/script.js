const posters = JSON.parse(localStorage.getItem("posters")) || [];
const notification = document.getElementById("notification");
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");

toggleBtn.onclick = () => sidebar.classList.toggle("show");

function showNotification(msg, error = false) {
  notification.textContent = msg;
  notification.className = `notification${error ? " error" : ""} show`;
  setTimeout(() => notification.classList.remove("show"), 3000);
}

function addPoster() {
  const posterUrl = document.getElementById("posterUrl").value.trim();
  const linkUrl = document.getElementById("linkUrl").value.trim();
  if (!posterUrl || !linkUrl) return showNotification("Fill in both fields!", true);
  posters.push({ posterUrl, linkUrl });
  localStorage.setItem("posters", JSON.stringify(posters));
  document.getElementById("posterUrl").value = "";
  document.getElementById("linkUrl").value = "";
  sidebar.classList.remove("show");
  showNotification("Item added!");
  displayPosters();
}

function displayPosters() {
  const grid = document.getElementById("grid");
  if (!posters.length) {
    grid.innerHTML = `<div class="empty-state"><p>No media added yet.</p></div>`;
    return;
  }
  grid.innerHTML = "";
  posters.forEach((p, i) => {
    const container = document.createElement("div");
    container.className = "poster-container";
    const img = Object.assign(document.createElement("img"), {
      src: p.posterUrl, className: "poster"
    });
    const overlay = document.createElement("div");
    overlay.className = "poster-overlay";

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    const createBtn = (cls, icon, fn) => {
      const btn = document.createElement("button");
      btn.className = `action-btn ${cls}`;
      btn.innerHTML = `<i class="fas fa-${icon}"></i>`;
      btn.onclick = fn;
      return btn;
    };
    btnGroup.append(
      createBtn("btn-view", "eye", () => window.open(p.linkUrl, "_blank")),
      createBtn("btn-edit", "edit", () => editPoster(i)),
      createBtn("btn-delete", "trash", () => removePoster(i))
    );
    overlay.appendChild(btnGroup);
    container.append(img, overlay);
    grid.appendChild(container);
  });
}

function editPoster(i) {
  const newPosterUrl = prompt("New Image URL:", posters[i].posterUrl);
  if (newPosterUrl === null) return;
  const newLinkUrl = prompt("New Link URL:", posters[i].linkUrl);
  if (newLinkUrl === null) return;
  posters[i] = { posterUrl: newPosterUrl, linkUrl: newLinkUrl };
  localStorage.setItem("posters", JSON.stringify(posters));
  showNotification("Item updated!");
  displayPosters();
}

function removePoster(i) {
  if (!confirm("Remove this item?")) return;
  posters.splice(i, 1);
  localStorage.setItem("posters", JSON.stringify(posters));
  showNotification("Item removed.");
  displayPosters();
}

window.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

displayPosters();


function submitMediaName() {
  const name = document.getElementById('mediaNameInput').value;
  if (name) {
    alert("Media Name Added: " + name);
    document.getElementById('mediaNameInput').value = '';
    document.getElementById('addNameSection').style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("button");
  if (addButton) {
    addButton.addEventListener("click", () => {
      const section = document.getElementById("addNameSection");
      if (section.style.display === "none") {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }
});
