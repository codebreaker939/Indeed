
let jobs = [
    { id: '1', title: 'Software Engineer', location: 'New York, NY', salary: 120000, postedDate: '2025-06-10', applications: 15, status: 'Active' },
    { id: '2', title: 'Product Manager', location: 'San Francisco, CA', salary: 150000, postedDate: '2025-06-08', applications: 8, status: 'Active' },
    { id: '3', title: 'Data Analyst', location: 'Remote', salary: 90000, postedDate: '2025-05-15', applications: 22, status: 'Closed' },
    { id: '4', title: 'UX Designer', location: 'Chicago, IL', salary: 100000, postedDate: '2025-06-01', applications: 10, status: 'Active' },
    { id: '5', title: 'DevOps Engineer', location: 'Remote', salary: 130000, postedDate: '2025-05-15', applications: 12, status: 'Active' }
];

let users = [
    { id: '1', name: 'Alice Brown', email: 'alice@example.com', role: 'Recruiter', status: 'Active' },
    { id: '2', name: 'Bob Wilson', email: 'bob@example.com', role: 'Hiring Manager', status: 'Active' }
];

let candidates = [
    { id: '1', name: 'Jane Smith', role: 'Software Engineer', date: '2025-06-10', status: 'Under Review', email: 'jane@example.com' },
    { id: '2', name: 'Mike Johnson', role: 'Product Manager', date: '2025-06-08', status: 'Interview Scheduled', email: 'mike@example.com' }
];

let interviews = [
    { id: '1', candidate: 'Jane Smith', date: '2025-06-17', time: '10:00 AM' },
    { id: '2', candidate: 'Mike Johnson', date: '2025-06-19', time: '2:00 PM' }
];

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('hidden');
    }
}

// Dropdown Toggles
function toggleJobsDropdown() {
    const dropdown = document.getElementById('jobs-dropdown');
    dropdown.classList.toggle('show');
}

function toggleDropdown() {
    const dropdown = document.getElementById('interview-dropdown');
    dropdown.classList.toggle('show');
}

// Load Page Content
async function loadPage(pageId, title) {
    try {
        const response = await fetch(`${pageId}.html`);
        if (!response.ok) throw new Error('Page not found');
        const content = await response.text();
        document.getElementById('page-content').innerHTML = content;
        document.getElementById('page-title').textContent = title;

        // Initialize page-specific content
        if (pageId === 'dashboard') initDashboard();
        if (pageId === 'job-postings') renderJobPostings();
        if (pageId === 'admin') renderUsers();
        if (pageId === 'candidates') renderCandidates();
        if (pageId === 'interviews') renderInterviews();
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('page-content').innerHTML = '<p>Error loading page.</p>';
    }
}

// Page Switching
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.sidebar a.active')?.classList.remove('active');
        this.classList.add('active');

        const pageId = this.getAttribute('data-page');
        const title = this.textContent.trim();
        loadPage(pageId, title);
    });
});

// Animated Counters
function animateCounter(id, end) {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const element = document.getElementById(id);
    const step = () => {
        start++;
        element.textContent = start;
        if (start < end) {
            setTimeout(step, stepTime);
        }
    };
    step();
}

// Initialize Dashboard
function initDashboard() {
    animateCounter('active-jobs', 12);
    animateCounter('applications', 45);
    animateCounter('views', 1234);
    renderDashboardJobs();
}

// Render Dashboard Jobs
function renderDashboardJobs() {
    const tbody = document.getElementById('job-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    jobs.slice(0, 3).forEach(job => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', job.id);
        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.location}</td>
            <td>${job.applications}</td>
            <td>${job.status}</td>
            <td><button onclick="viewJob('${job.id}')">View</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Search Dashboard Jobs
function searchJobs() {
    const query = document.getElementById('job-search').value.toLowerCase();
    const table = document.getElementById('job-table').getElementsByTagName('tbody')[0];
    jobs.slice(0, 3).forEach(job => {
        const row = table.querySelector(`tr[data-id="${job.id}"]`);
        if (row) {
            row.style.display = job.title.toLowerCase().includes(query) || job.location.toLowerCase().includes(query) ? '' : 'none';
        }
    });
}

// Render Job Postings
function renderJobPostings() {
    const tbody = document.getElementById('job-postings-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    jobs.forEach(job => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', job.id);
        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.location}</td>
            <td>$${job.salary.toLocaleString()}</td>
            <td>${job.postedDate}</td>
            <td>${job.status}</td>
            <td>
                <button onclick="openJobForm('edit', '${job.id}')">Edit</button>
                <button onclick="confirmDeleteJob('${job.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filter Job Postings
function filterJobPostings() {
    const query = document.getElementById('job-postings-search').value.toLowerCase();
    const status = document.getElementById('job-status-filter').value;
    const location = document.getElementById('job-location-filter').value;
    const table = document.getElementById('job-postings-table').getElementsByTagName('tbody')[0];
    jobs.forEach(job => {
        const row = table.querySelector(`tr[data-id="${job.id}"]`);
        if (row) {
            const queryMatch = job.title.toLowerCase().includes(query) || job.location.toLowerCase().includes(query);
            const statusMatch = status === 'all' || job.status === status;
            const locationMatch = location === 'all' || job.location === location;
            row.style.display = queryMatch && statusMatch && locationMatch ? '' : 'none';
        }
    });
}

// Render Users
function renderUsers() {
    const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', user.id);
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="openUserForm('edit', '${user.id}')">Edit</button>
                <button onclick="confirmDeactivateUser('${user.id}')">${user.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filter Users
function filterUsers() {
    const query = document.getElementById('user-search').value.toLowerCase();
    const role = document.getElementById('user-role-filter').value;
    const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    users.forEach(user => {
        const row = table.querySelector(`tr[data-id="${user.id}"]`);
        if (row) {
            const queryMatch = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
            const roleMatch = role === 'all' || user.role === role;
            row.style.display = queryMatch && roleMatch ? '' : 'none';
        }
    });
}

// Render Candidates
function renderCandidates() {
    const tbody = document.getElementById('candidate-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    candidates.forEach(candidate => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', candidate.id);
        row.innerHTML = `
            <td>${candidate.name}</td>
            <td>${candidate.role}</td>
            <td>${candidate.date}</td>
            <td>${candidate.status}</td>
            <td><button onclick="viewCandidate('${candidate.id}')">View</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Filter Candidates
function filterCandidates() {
    const status = document.getElementById('status-filter').value;
    const role = document.getElementById('role-filter').value;
    const table = document.getElementById('candidate-table').getElementsByTagName('tbody')[0];
    candidates.forEach(candidate => {
        const row = table.querySelector(`tr[data-id="${candidate.id}"]`);
        if (row) {
            const statusMatch = status === 'all' || candidate.status === status;
            const roleMatch = role === 'all' || candidate.role === role;
            row.style.display = statusMatch && roleMatch ? '' : 'none';
        }
    });
}

// Calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const div = document.createElement('div');
        div.className = 'day-name';
        div.textContent = day;
        calendarGrid.appendChild(div);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.textContent = i;
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const interview = interviews.find(int => int.date === dateStr);
        if (interview) {
            div.className = 'interview';
            div.innerHTML = `${i}<br>${interview.candidate} (${interview.time})`;
            div.onclick = () => showInterviewDetails(interview.id);
        }
        calendarGrid.appendChild(div);
    }
}

function renderInterviews() {
    renderCalendar();
    const tbody = document.getElementById('interview-list');
    tbody.innerHTML = '';
    interviews.forEach(interview => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${interview.candidate}</td>
            <td>${interview.date}</td>
            <td>${interview.time}</td>
            <td><button onclick="showInterviewDetails('${interview.id}')">View</button></td>
        `;
        tbody.appendChild(row);
    });
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Modal Functions
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Job Functions
function viewJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    alert(`Job: ${job.title}\nLocation: ${job.location}\nSalary: $${job.salary.toLocaleString()}\nStatus: ${job.status}`);
}

function openJobForm(mode, jobId = '') {
    document.getElementById('job-modal-title').textContent = mode === 'create' ? 'Create Job' : 'Edit Job';
    if (mode === 'edit') {
        const job = jobs.find(j => j.id === jobId);
        document.getElementById('job-title').value = job.title;
        document.getElementById('job-location').value = job.location;
        document.getElementById('job-salary').value = job.salary;
        document.getElementById('job-status').value = job.status;
        document.getElementById('job-form').dataset.id = jobId;
    } else {
        document.getElementById('job-form').reset();
        document.getElementById('job-form').dataset.id = '';
    }
    openModal('job-modal');
}

function saveJob() {
    const title = document.getElementById('job-title').value;
    const location = document.getElementById('job-location').value;
    const salary = parseInt(document.getElementById('job-salary').value);
    const status = document.getElementById('job-status').value;
    const jobId = document.getElementById('job-form').dataset.id;

    if (!title || !location || isNaN(salary) || salary < 0) {
        alert('Please fill all required fields with valid data.');
        return;
    }

    if (jobId) {
        const job = jobs.find(j => j.id === jobId);
        job.title = title;
        job.location = location;
        job.salary = salary;
        job.status = status;
        alert(`Job ${title} updated!`);
    } else {
        jobs.push({
            id: String(jobs.length + 1),
            title,
            location,
            salary,
            postedDate: new Date().toISOString().split('T')[0],
            applications: 0,
            status
        });
        alert(`Job ${title} created!`);
    }

    renderJobPostings();
    renderDashboardJobs();
    closeModal('job-modal');
}

function confirmDeleteJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    document.getElementById('confirm-title').textContent = 'Confirm Delete Job';
    document.getElementById('confirm-message').textContent = `Are you sure you want to delete the job "${job.title}"?`;
    document.getElementById('confirm-action').onclick = () => {
        jobs = jobs.filter(j => j.id !== jobId);
        renderJobPostings();
        renderDashboardJobs();
        closeModal('confirm-modal');
        alert(`Job ${job.title} deleted`);
    };
    openModal('confirm-modal');
}

// User Functions
function openUserForm(mode, userId = '') {
    document.getElementById('user-modal-title').textContent = mode === 'create' ? 'Add User' : 'Edit User';
    if (mode === 'edit') {
        const user = users.find(u => u.id === userId);
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-role').value = user.role;
        document.getElementById('user-status').value = user.status;
        document.getElementById('user-form').dataset.id = userId;
    } else {
        document.getElementById('user-form').reset();
        document.getElementById('user-form').dataset.id = '';
    }
    openModal('user-modal');
}

function saveUser() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const role = document.getElementById('user-role').value;
    const status = document.getElementById('user-status').value;
    const userId = document.getElementById('user-form').dataset.id;

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please fill all required fields with a valid email.');
        return;
    }

    if (userId) {
        const user = users.find(u => u.id === userId);
        user.name = name;
        user.email = email;
        user.role = role;
        user.status = status;
        alert(`User ${name} updated!`);
    } else {
        users.push({
            id: String(users.length + 1),
            name,
            email,
            role,
            status
        });
        alert(`User ${name} added!`);
    }

    renderUsers();
    closeModal('user-modal');
}

function confirmDeactivateUser(userId) {
    const user = users.find(u => u.id === userId);
    const action = user.status === 'Active' ? 'Deactivate' : 'Activate';
    document.getElementById('confirm-title').textContent = `Confirm ${action} User`;
    document.getElementById('confirm-message').textContent = `Are you sure you want to ${action.toLowerCase()} ${user.name}?`;
    document.getElementById('confirm-action').onclick = () => {
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
        renderUsers();
        closeModal('confirm-modal');
        alert(`User ${user.name} ${action.toLowerCase()}d`);
    };
    openModal('confirm-modal');
}

// Candidate Functions
function viewCandidate(candidateId) {
    const candidate = candidates.find(c => c.id === candidateId);
    document.getElementById('candidate-name').textContent = candidate.name;
    document.getElementById('candidate-role').textContent = candidate.role;
    document.getElementById('candidate-status').textContent = candidate.status;
    document.getElementById('candidate-email').textContent = candidate.email;
    openModal('candidate-modal');
}

// Interview Functions
function showInterviewDetails(interviewId) {
    const interview = interviews.find(i => i.id === interviewId);
    document.getElementById('interview-candidate').textContent = interview.candidate;
    document.getElementById('interview-date').textContent = interview.date;
    document.getElementById('interview-time').textContent = interview.time;
    openModal('interview-modal');
}

// Analytics Functions
function exportAnalytics() {
    alert('Exporting analytics data as CSV...');
}

// Settings Functions
function saveSettings() {
    alert('Settings saved');
}

function toggleTheme() {
    const theme = document.getElementById('theme-toggle').value;
    document.body.classList.toggle('dark-theme', theme === 'dark');
}

// Initialize
async function init() {
    // Load modals
    try {
        const modalsResponse = await fetch('modals.html');
        if (modalsResponse.ok) {
            document.getElementById('modals').innerHTML = await modalsResponse.text();
        }
    } catch (error) {
        console.error('Error loading modals:', error);
    }

    // Load default page (Dashboard)
    loadPage('dashboard', 'Dashboard');
}

init();
