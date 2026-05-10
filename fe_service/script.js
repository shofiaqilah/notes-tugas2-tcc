const API = "https://be-rest-521926891872.us-central1.run.app/api/v1/notes";

async function getNotes() {
  try {
    const res = await fetch(API);
    const result = await res.json();
    const list = document.getElementById("list");
    const empty = document.getElementById("empty");
    const count = document.getElementById("notesCount");

    list.innerHTML = "";

    const notes = result.data || result;

    if (!notes || notes.length === 0) {
      empty.classList.add("visible");
      count.textContent = "0";
      return;
    }

    empty.classList.remove("visible");
    count.textContent = notes.length;

    notes.forEach((note, i) => {
      const div = document.createElement("div");
      div.className = "note";
      div.style.animationDelay = `${i * 0.06}s`;

      const tanggal = new Date(note.tanggal_dibuat).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      div.innerHTML = `
        <h3>${note.judul}</h3>
        <p>${note.isi}</p>
        <small>📅 ${tanggal}</small>
        <div class="note-actions">
          <button class="btn-edit" onclick='editNote(
            ${note.id},
            ${JSON.stringify(note.judul)},
            ${JSON.stringify(note.isi)}
          )'>✏️ Edit</button>
          <button class="btn-delete" onclick="hapus(${note.id})">🗑️ Hapus</button>
        </div>
      `;

      list.appendChild(div);
    });
  } catch (err) {
    console.error("Gagal mengambil notes:", err);
  }
}

async function hapus(id) {
  if (!confirm("Yakin ingin menghapus catatan ini?")) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    const data = await res.json();
    console.log(data);
    getNotes();
  } catch (err) {
    console.error("Gagal menghapus:", err);
  }
}

function editNote(id, judul, isi) {
  document.getElementById("editId").value = id;
  document.getElementById("judul").value = judul;
  document.getElementById("isi").value = isi;

  // Update button visual to edit mode
  const btn = document.querySelector(".btn-save");
  btn.classList.add("edit-mode");
  document.getElementById("btnIcon").textContent = "✎";
  document.getElementById("btnLabel").textContent = "Simpan Perubahan";

  // Scroll to form
  document
    .querySelector(".form-card")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
  document.getElementById("editId").value = "";
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  const btn = document.querySelector(".btn-save");
  btn.classList.remove("edit-mode");
  document.getElementById("btnIcon").textContent = "＋";
  document.getElementById("btnLabel").textContent = "Simpan Catatan";
}

async function submitNote() {
  const id = document.getElementById("editId").value;
  const judul = document.getElementById("judul").value.trim();
  const isi = document.getElementById("isi").value.trim();

  if (!judul || !isi) {
    alert("Judul dan isi catatan tidak boleh kosong.");
    return;
  }

  try {
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

    resetForm();
    getNotes();
  } catch (err) {
    console.error("Gagal menyimpan:", err);
  }
}

getNotes();
