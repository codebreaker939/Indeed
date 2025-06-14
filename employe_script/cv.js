document.getElementById("cv-form").addEventListener("input", updatePreview);

function updatePreview() {
  document.getElementById("preview-name").textContent = document.getElementById("name").value || "Your Name";
  document.getElementById("preview-contact").textContent = 
    `${document.getElementById("email").value || "Email"} | ` +
    `${document.getElementById("phone").value || "Phone"} | ` +
    `${document.getElementById("address").value || "Address"}`;


  const eduItems = document.querySelectorAll(".edu-item");
  const eduPreview = document.getElementById("preview-education");
  eduPreview.innerHTML = "";
  eduItems.forEach(item => {
    const degree = item.querySelector(".degree").value;
    const school = item.querySelector(".school").value;
    const year = item.querySelector(".year").value;
    eduPreview.innerHTML += `<li>${degree}, ${school} (${year})</li>`;
  });


  const expItems = document.querySelectorAll(".exp-item");
  const expPreview = document.getElementById("preview-experience");
  expPreview.innerHTML = "";
  expItems.forEach(item => {
    const role = item.querySelector(".role").value;
    const company = item.querySelector(".company").value;
    const duration = item.querySelector(".duration").value;
    expPreview.innerHTML += `<li>${role} at ${company} (${duration})</li>`;
  });


  const skillItems = document.querySelectorAll(".skill-item");
  const skillPreview = document.getElementById("preview-skills");
  skillPreview.innerHTML = "";
  skillItems.forEach(item => {
    skillPreview.innerHTML += `<li>${item.value}</li>`;
  });
}

function addEducation() {
  const container = document.getElementById("education-container");
  const div = document.createElement("div");
  div.className = "edu-item";
  div.innerHTML = `
    <input type="text" class="degree" placeholder="Degree" />
    <input type="text" class="school" placeholder="Institution" />
    <input type="text" class="year" placeholder="Year" />
    <button type="button" onclick="this.parentElement.remove(); updatePreview()">Remove</button>
  `;
  container.appendChild(div);
}

function addExperience() {
  const container = document.getElementById("experience-container");
  const div = document.createElement("div");
  div.className = "exp-item";
  div.innerHTML = `
    <input type="text" class="role" placeholder="Job Title" />
    <input type="text" class="company" placeholder="Company" />
    <input type="text" class="duration" placeholder="Years" />
    <button type="button" onclick="this.parentElement.remove(); updatePreview()">Remove</button>
  `;
  container.appendChild(div);
}

function addSkill() {
  const container = document.getElementById("skills-container");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "skill-item";
  input.placeholder = "Skill";
  input.oninput = updatePreview;
  container.appendChild(input);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(document.getElementById("cv-preview"), {
    callback: function (pdf) {
      pdf.save("My_CV.pdf");
    },
    x: 10,
    y: 10,
    width: 180
  });
}
