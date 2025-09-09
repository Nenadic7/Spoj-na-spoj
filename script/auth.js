// const auth = firebase.auth();
// const database = firebase.database();

// // Prikaz korisničkog imena u navigaciji
// auth.onAuthStateChanged((user) => {
//   const navPrijava = document.getElementById("navPrijava");
//   const navRacun = document.getElementById("navRacun");
//   const navOdjava = document.getElementById("navOdjava");

//   if (user) {
//     // Sakrij Prijava
//     if (navPrijava) navPrijava.style.display = "none";
//     if (navRacun) navRacun.style.display = "inline-block";
//     if (navOdjava) navOdjava.style.display = "inline-block";

//     // Dohvati korisničko ime iz baze
//     database
//       .ref("korisnici/" + user.uid)
//       .once("value")
//       .then((snapshot) => {
//         const data = snapshot.val();
//         const korisnickoIme = data?.korisnickoIme || "Korisnik";
//         if (navRacun)
//           navRacun.innerHTML = `<a href="#" class="poveznica">👤 ${korisnickoIme}</a>`;
//       });
//   } else {
//     // Nema korisnika - prikaži Prijava
//     if (navPrijava) navPrijava.style.display = "inline-block";
//     if (navRacun) navRacun.style.display = "none";
//     if (navOdjava) navOdjava.style.display = "none";
//   }
// });

// // Funkcija odjave
// function odjava() {
//   auth
//     .signOut()
//     .then(() => {
//       alert("Odjavljeni ste.");
//       window.location.href = "index.html";
//     })
//     .catch((error) => {
//       alert("Greška prilikom odjave: " + error.message);
//     });
// }
