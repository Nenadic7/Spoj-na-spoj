const firebaseConfig = {
  apiKey: "AIzaSyDkZTq6hHOnaC3STTSOVM4O5bZa4gN_gU4",
  authDomain: "spoj-na-spoj.firebaseapp.com",
  databaseURL:
    "https://spoj-na-spoj-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spoj-na-spoj",
  storageBucket: "spoj-na-spoj.firebasestorage.app",
  messagingSenderId: "1017482186864",
  appId: "1:1017482186864:web:17a59b598cacdfbd0c24b5",
  measurementId: "G-8BXLHEKRZ7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const formaPrijava = document.getElementById("formaPrijava");
const formaRegistracija = document.getElementById("formaRegistracija");

function prikaziRegistraciju() {
  formaPrijava.classList.remove("aktivna");
  formaRegistracija.classList.add("aktivna");
}

function prikaziPrijavu() {
  formaRegistracija.classList.remove("aktivna");
  formaPrijava.classList.add("aktivna");
}

window.addEventListener("load", function () {
  document.querySelector(".okvir-forme").classList.add("animiraj");

  // Prikaži ispravnu formu na osnovu hash-a
  if (window.location.hash === "#register") {
    prikaziRegistraciju();
  } else {
    prikaziPrijavu();
  }
});

function prikaziModal() {
  document.getElementById("modal").style.display = "block";
}

function zatvoriModal() {
  document.getElementById("modal").style.display = "none";
}

// Registracija
formaRegistracija.addEventListener("submit", function (e) {
  e.preventDefault();

  const korisnickoIme = document.getElementById("regKorisnickoIme").value;
  const email = document.getElementById("regEmail").value;
  const lozinka = document.getElementById("regLozinka").value;

  auth
    .createUserWithEmailAndPassword(email, lozinka)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      // Spremi dodatne podatke
      return database.ref("korisnici/" + userId).set({
        korisnickoIme: korisnickoIme,
        email: email,
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

// Prijava
formaPrijava.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("prijavaKorisnickoIme").value;
  const password = document.getElementById("prijavaLozinka").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Dohvati korisničko ime iz baze
      return database
        .ref("korisnici/" + user.uid)
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          const korisnickoIme = data?.korisnickoIme || "Korisnik";

          // Ažuriraj navigaciju
          document.getElementById("navPrijava").style.display = "none";
          const navRacun = document.getElementById("navRacun");
          navRacun.innerHTML = `<a href="#" class="poveznica">👤 ${korisnickoIme}</a>`;
          navRacun.style.display = "inline-block";
          document.getElementById("navOdjava").style.display = "inline-block";

          // Redirect nakon prijave
          window.location.href = "index.html";
        });
    })
    .catch((error) => {
      alert("Greška kod prijave: " + error.message);
    });
});

// Prati login stanje
auth.onAuthStateChanged((user) => {
  const navPrijava = document.getElementById("navPrijava");
  const navRacun = document.getElementById("navRacun");
  const navOdjava = document.getElementById("navOdjava");

  if (user) {
    navPrijava.style.display = "none";
    navRacun.style.display = "inline-block";
    navOdjava.style.display = "inline-block";

    // Prikaz imena korisnika
    database
      .ref("korisnici/" + user.uid)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        if (data && data.korisnickoIme) {
          navRacun.innerHTML = `<a href="#" class="poveznica">👤 ${data.korisnickoIme}</a>`;
        }
      });
  } else {
    navPrijava.style.display = "inline-block";
    navRacun.style.display = "none";
    navOdjava.style.display = "none";
  }
});

// Klik izvan modala zatvara modal
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Odjava korisnika
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
