const API = "http://localhost:3000/api/v1/notes";

async function getNotes() {
  const res = await fetch(API);
  const result = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  result.data.forEach(note => {
    console.log(note);
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h3>${note.judul}</h3>
      <p>${note.isi}</p>

      <div class="actions">
        <button onclick='editNote(${note.id}, ${JSON.stringify(note.judul)}, ${JSON.stringify(note.isi)})'>Edit</button>
        <button class="delete" onclick="hapus(${Number(note.id)})">Hapus</button>
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ judul, isi })
  });

  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  getNotes();
}

async function hapus(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();
  console.log(data);

  getNotes();
}

function editNote(id, judul, isi) {
  const newJudul = prompt("Edit judul:", judul);
  const newIsi = prompt("Edit isi:", isi);

  if (!newJudul || !newIsi) return;

  updateNote(id, newJudul, newIsi);
}

async function updateNote(id, judul, isi) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ judul, isi })
  });

  getNotes();
}

getNotes();