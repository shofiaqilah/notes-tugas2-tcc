const API = "https://be-rest-521926891872.us-central1.run.app/api/v1/notes";

async function getNotes() {
  const res = await fetch(API);
  const result = await res.json();
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  list.innerHTML = "";
  const notes = result.data || result;

  if (!notes || notes.length === 0) {
    empty.classList.add("visible");
    return;
  }

  empty.classList.remove("visible");

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <h3>${note.judul}</h3>
      <p>${note.isi}</p>
      <small>${new Date(note.tanggal_dibuat).toLocaleString("id-ID")}</small>
      <div class="note-actions">
        <button class="btn-edit" onclick='editNote(${note.id}, ${JSON.stringify(note.judul)}, ${JSON.stringify(note.isi)})'>Edit</button>
        <button class="btn-delete" onclick="hapus(${note.id})">Hapus</button>
      </div>
    `;
    list.appendChild(div);
  });
}

async function hapus(id) {
  if (!confirm("Hapus catatan ini?")) return;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  getNotes();
}

function editNote(id, judul, isi) {
  document.getElementById("editId").value = id;
  document.getElementById("judul").value = judul;
  document.getElementById("isi").value = isi;
}

async function submitNote() {
  const id = document.getElementById("editId").value;
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  if (!judul || !isi) return alert("Judul dan isi tidak boleh kosong!");

  if (id) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi }),
    });
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi }),
    });
  }

  document.getElementById("editId").value = "";
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  getNotes();
}

getNotes();
