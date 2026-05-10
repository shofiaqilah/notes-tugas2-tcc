// Tambahkan /api/v1/notes di ujung URL-nya
const API = "https://be-rest-521926891872.us-central1.run.app/api/v1/notes";

async function getNotes() {
  const res = await fetch(API);
  const result = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  // Pastikan mengambil dari result.data jika ada, atau gunakan result langsung
  const notes = result.data || result;

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
  <h3>${note.judul}</h3>
  <p>${note.isi}</p>
  <small>${new Date(note.tanggal_dibuat).toLocaleString()}</small>

  <div style="margin-top:10px;">
    <button onclick="editNote(${note.id}, '${note.judul}', '${note.isi}')">
      Edit
    </button>

    <button onclick="hapus(${note.id})">
      Hapus
    </button>
  </div>
`;
    list.appendChild(div);
  });
}

async function tambahNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ judul, isi }),
  });

  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  getNotes();
}

async function hapus(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log(data);

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

  if (id) {
    // UPDATE
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi }),
    });
  } else {
    // CREATE
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi }),
    });
  }

  // reset form
  document.getElementById("editId").value = "";
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  getNotes();
}

getNotes();
