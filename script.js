document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").textContent = data.profile.name;
      document.getElementById("profileImage").src = data.profile.image;
      document.getElementById("resumeLink").href = data.profile.resume;
      document.getElementById("linkedinLink").href = data.profile.linkedin;
      document.getElementById("aboutContent").textContent = data.aboutMe;

      const educationList = document.getElementById("educationList");
      data.education.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${item.degree}</strong>`;
        let ul = document.createElement("ul");
        let school = document.createElement("li");
        school.innerHTML = `${item.school}`;
        ul.appendChild(school);
        let year = document.createElement("li");
        year.innerHTML = `${item.year}`;
        ul.appendChild(year);
        li.appendChild(ul);
        educationList.appendChild(li);
      });

      const experienceList = document.getElementById("experienceList");
      data.experience.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = `
    <strong>${item.role}</strong>
    <ul>
      <li>${item.company}</li>
      <li>${item.year}</li>
      <li>${item.description}</li>
    </ul>
  `;
        experienceList.appendChild(li);
      });

      const projectsList = document.getElementById("projectsList");
      data.projects.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = `
    <strong>${item.title}</strong>: ${item.description} 
    <br>
    <div style="text-align: center; margin-bottom: 20px; margin-top: 20px;">
      <img class="project-image" src="${item.image}" alt="${item.title}" style="max-width: 500px; border-radius: 10px;">
    </div>
  `;
        projectsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error loading the JSON data:", error));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
