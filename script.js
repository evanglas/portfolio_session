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

      // Get all sections that have an ID defined
      const sections = document.querySelectorAll("section[id]");

      // Add an event listener listening for scroll
      window.addEventListener("scroll", function () {
        // Get the current scroll position
        const scrollY = window.scrollY;

        // Loop through sections to get height, top and ID values for each
        sections.forEach(function (current) {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 50; // Subtract 50 pixels for fixed header offset
          const sectionId = current.getAttribute("id");

          // Compare the scroll position with the section top and bottom
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Add active class to the corresponding sidebar link
            document
              .querySelector(".sidebar a[href*=" + sectionId + "]")
              .classList.add("active");
          } else {
            // Remove active class from the sidebar link that is not currently viewed
            document
              .querySelector(".sidebar a[href*=" + sectionId + "]")
              .classList.remove("active");
          }
        });
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
