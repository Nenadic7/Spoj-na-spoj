// ✅ Elementi forme
const formaPrijava = document.getElementById("formaPrijava");
const formaRegistracija = document.getElementById("formaRegistracija");
const okvirForme = document.querySelector(".okvir-forme");

// ✅ Prikaz registracije
function prikaziRegistraciju() {
  if (formaPrijava && formaRegistracija) {
    formaPrijava.classList.remove("aktivna");
    formaRegistracija.classList.add("aktivna");
  }
}
window.prikaziRegistraciju = prikaziRegistraciju;

// ✅ Prikaz prijave
function prikaziPrijavu() {
  if (formaRegistracija && formaPrijava) {
    formaRegistracija.classList.remove("aktivna");
    formaPrijava.classList.add("aktivna");
  }
}
window.prikaziPrijavu = prikaziPrijavu;

// ✅ Animacija forme pri učitavanju
window.addEventListener("load", function () {
  if (okvirForme) {
    okvirForme.classList.add("animiraj");

    if (window.location.hash === "#register") {
      prikaziRegistraciju();
    } else {
      prikaziPrijavu();
    }
  }
});

// ✅ Modal prikaz
function prikaziModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "block";
}
function zatvoriModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}
window.zatvoriModal = zatvoriModal;

// ✅ REGISTRACIJA
if (formaRegistracija) {
  formaRegistracija.addEventListener("submit", function (e) {
    e.preventDefault();

    const korisnickoIme = document.getElementById("regKorisnickoIme").value;
    const email = document.getElementById("regEmail").value;
    const lozinka = document.getElementById("regLozinka").value;

    auth
      .createUserWithEmailAndPassword(email, lozinka)
      .then((userCredential) => {
        const user = userCredential.user;

        return database.ref("korisnici/" + user.uid).set({
          korisnickoIme,
          email,
        });
      })
      .then(() => {
        prikaziModal();
        formaRegistracija.reset();
        prikaziPrijavu();
      })
      .catch((error) => {
        alert("Greška kod registracije: " + error.message);
      });
  });
}

// ✅ PRIJAVA PREKO KORISNIČKOG IMENA
if (formaPrijava) {
  formaPrijava.addEventListener("submit", function (e) {
    e.preventDefault();

    const korisnickoImeUneseno = document.getElementById(
      "prijavaKorisnickoIme"
    ).value;
    const lozinka = document.getElementById("prijavaLozinka").value;

    database
      .ref("korisnici")
      .orderByChild("korisnickoIme")
      .equalTo(korisnickoImeUneseno)
      .once("value")
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Korisničko ime nije pronađeno.");
        }

        const korisnici = snapshot.val();
        const userId = Object.keys(korisnici)[0];
        const email = korisnici[userId].email;

        return auth.signInWithEmailAndPassword(email, lozinka);
      })
      .then((userCredential) => {
        const user = userCredential.user;

        return database.ref("korisnici/" + user.uid).once("value");
      })
      .then((snapshot) => {
        const data = snapshot.val();
        const korisnickoIme = data?.korisnickoIme || "Korisnik";

        const navRacun = document.getElementById("navRacun");
        const navPrijava = document.getElementById("navPrijava");
        const navOdjava = document.getElementById("navOdjava");

        if (navRacun) {
          navRacun.innerHTML = `<a href="#" class="poveznica">👤 ${korisnickoIme}</a>`;
          navRacun.style.display = "inline-block";
        }
        if (navPrijava) navPrijava.style.display = "none";
        if (navOdjava) navOdjava.style.display = "inline-block";

        // Redirect
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Greška kod prijave: " + error.message);
      });
  });
}

// ✅ PRIKAZ NAVIGACIJE NA OSNOVU AUTENTIFIKACIJE
auth.onAuthStateChanged((user) => {
  const navPrijava = document.getElementById("navPrijava");
  const navRacun = document.getElementById("navRacun");
  const navOdjava = document.getElementById("navOdjava");

  if (user) {
    if (navPrijava) navPrijava.style.display = "none";
    if (navOdjava) navOdjava.style.display = "inline-block";

    if (navRacun) {
      navRacun.style.display = "inline-block";

      database
        .ref("korisnici/" + user.uid)
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          const korisnickoIme = data?.korisnickoIme || "Korisnik";
          navRacun.innerHTML = `<a href="#" class="poveznica">👤 ${korisnickoIme}</a>`;
        });
    }
  } else {
    if (navPrijava) navPrijava.style.display = "inline-block";
    if (navRacun) navRacun.style.display = "none";
    if (navOdjava) navOdjava.style.display = "none";
  }
});

// ✅ ODJAVA
function odjava() {
  auth
    .signOut()
    .then(() => {
      alert("Odjavljeni ste.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Greška prilikom odjave: " + error.message);
    });
}
window.odjava = odjava;
