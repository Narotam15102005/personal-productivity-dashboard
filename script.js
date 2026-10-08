```javascript
/* =========================================================
   SMARTLIFE - PRODUCTIVITY DASHBOARD
   script.js
   ========================================================= */


/* =========================================================
   1. APPLICATION DATA
   ========================================================= */

let tasks = JSON.parse(localStorage.getItem("smartlife_tasks")) || [];

let notes = JSON.parse(localStorage.getItem("smartlife_notes")) || [];

let habits = JSON.parse(localStorage.getItem("smartlife_habits")) || [];

let userName = localStorage.getItem("smartlife_name") || "Student";

let darkMode =
    localStorage.getItem("smartlife_darkmode") === "true";


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const body = document.body;

const preloader = document.getElementById("preloader");

const sidebar = document.getElementById("sidebar");

const mobileMenu = document.getElementById("mobileMenu");

const pageTitle = document.getElementById("pageTitle");

const currentDate = document.getElementById("currentDate");

const profileName = document.getElementById("profileName");

const profileInitial = document.getElementById("profileInitial");

const welcomeName = document.getElementById("welcomeName");

const nameInput = document.getElementById("nameInput");

const themeToggle = document.getElementById("themeToggle");

const darkModeSwitch =
    document.getElementById("darkModeSwitch");

const totalTasksElement =
    document.getElementById("totalTasks");

const completedTasksElement =
    document.getElementById("completedTasks");

const pendingTasksElement =
    document.getElementById("pendingTasks");

const productivityValue =
    document.getElementById("productivityValue");

const progressPercentage =
    document.getElementById("progressPercentage");

const progressRing =
    document.getElementById("progressRing");

const progressMessage =
    document.getElementById("progressMessage");

const dashboardTasks =
    document.getElementById("dashboardTasks");

const taskList =
    document.getElementById("taskList");

const taskSearch =
    document.getElementById("taskSearch");

const taskFilter =
    document.getElementById("taskFilter");

const globalSearch =
    document.getElementById("globalSearch");

const habitList =
    document.getElementById("habitList");

const notesGrid =
    document.getElementById("notesGrid");

const analyticsProgress =
    document.getElementById("analyticsProgress");

const analyticsPercentage =
    document.getElementById("analyticsPercentage");

const analyticsTotal =
    document.getElementById("analyticsTotal");

const analyticsCompleted =
    document.getElementById("analyticsCompleted");

const analyticsPending =
    document.getElementById("analyticsPending");

const analyticsRate =
    document.getElementById("analyticsRate");

const motivationalText =
    document.getElementById("motivationalText");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const closeToast =
    document.getElementById("closeToast");


/* =========================================================
   3. MODALS
   ========================================================= */

const taskModal =
    document.getElementById("taskModal");

const noteModal =
    document.getElementById("noteModal");

const habitModal =
    document.getElementById("habitModal");

const confirmModal =
    document.getElementById("confirmModal");


/* =========================================================
   4. FORMS
   ========================================================= */

const taskForm =
    document.getElementById("taskForm");

const noteForm =
    document.getElementById("noteForm");

const habitForm =
    document.getElementById("habitForm");


/* =========================================================
   5. INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});


function initializeApplication() {

    applyTheme();

    updateUserInterface();

    updateDate();

    renderTasks();

    renderHabits();

    renderNotes();

    updateDashboard();

    setupNavigation();

    setupEvents();

    setMotivationalMessage();

}


/* =========================================================
   6. PRELOADER
   ========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (preloader) {

            preloader.classList.add("hidden");

        }

    }, 700);

});


/* =========================================================
   7. DATE & TIME
   ========================================================= */

function updateDate() {

    const now = new Date();

    const dateText =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    const timeText =
        now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

    if (currentDate) {

        currentDate.textContent =
            `${dateText} • ${timeText}`;

    }

}


/* Update every minute */

setInterval(updateDate, 60000);


/* =========================================================
   8. USER PROFILE
   ========================================================= */

function updateUserInterface() {

    if (profileName) {

        profileName.textContent =
            userName;

    }


    if (welcomeName) {

        welcomeName.textContent =
            userName;

    }


    if (nameInput) {

        nameInput.value =
            userName === "Student"
                ? ""
                : userName;

    }


    if (profileInitial) {

        profileInitial.textContent =
            userName.charAt(0).toUpperCase();

    }

}


/* =========================================================
   9. SAVE USER NAME
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("change", () => {

        const value =
            nameInput.value.trim();

        if (value === "") {

            userName = "Student";

        } else {

            userName = value;

        }

        localStorage.setItem(
            "smartlife_name",
            userName
        );

        updateUserInterface();

        showToast(
            "Profile Updated",
            `Welcome, ${userName}!`
        );

    });

}


/* =========================================================
   10. THEME SYSTEM
   ========================================================= */

function applyTheme() {

    if (darkMode) {

        body.classList.add("dark-mode");

        if (darkModeSwitch) {

            darkModeSwitch.checked = true;

        }

        updateThemeIcon();

    } else {

        body.classList.remove("dark-mode");

        if (darkModeSwitch) {

            darkModeSwitch.checked = false;

        }

        updateThemeIcon();

    }

}


function toggleTheme() {

    darkMode =
        !darkMode;

    localStorage.setItem(
        "smartlife_darkmode",
        darkMode
    );

    applyTheme();

    showToast(
        darkMode
            ? "Dark Mode Enabled"
            : "Light Mode Enabled",
        darkMode
            ? "Your eyes will thank you."
            : "Welcome back to light mode."
    );

}


function updateThemeIcon() {

    if (!themeToggle) return;

    themeToggle.innerHTML =
        darkMode
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


if (darkModeSwitch) {

    darkModeSwitch.addEventListener(
        "change",
        toggleTheme
    );

}


/* =========================================================
   11. NAVIGATION
   ========================================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const section =
                    item.dataset.section;

                navigateTo(section);

                sidebar.classList.remove(
                    "mobile-open"
                );

            }
        );

    });


    /* Buttons that navigate */

    document
        .querySelectorAll(
            "[data-section-target]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    navigateTo(
                        button.dataset.sectionTarget
                    );

                }
            );

        });

}


function navigateTo(sectionName) {

    const sections =
        document.querySelectorAll(
            ".page-section"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    navItems.forEach(item => {

        item.classList.remove(
            "active"
        );

    });


    const targetSection =
        document.getElementById(
            `${sectionName}Section`
        );


    const targetNav =
        document.querySelector(
            `.nav-item[data-section="${sectionName}"]`
        );


    if (targetSection) {

        targetSection.classList.add(
            "active-section"
        );

    }


    if (targetNav) {

        targetNav.classList.add(
            "active"
        );

    }


    const titles = {

        dashboard: "Dashboard",

        tasks: "Task Manager",

        habits: "Habit Tracker",

        notes: "My Notes",

        analytics: "Productivity Analytics",

        settings: "Settings"

    };


    pageTitle.textContent =
        titles[sectionName] ||
        "SmartLife";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   12. MOBILE SIDEBAR
   ========================================================= */

if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================================
   13. EVENT SETUP
   ========================================================= */

function setupEvents() {

    /* Task buttons */

    document
        .getElementById("quickTaskButton")
        ?.addEventListener(
            "click",
            () => openModal(taskModal)
        );


    document
        .getElementById("addTaskButton")
        ?.addEventListener(
            "click",
            () => openModal(taskModal)
        );


    document
        .getElementById("addTaskAction")
        ?.addEventListener(
            "click",
            () => openModal(taskModal)
        );


    /* Note buttons */

    document
        .getElementById("addNoteButton")
        ?.addEventListener(
            "click",
            () => openModal(noteModal)
        );


    document
        .getElementById("addNoteAction")
        ?.addEventListener(
            "click",
            () => openModal(noteModal)
        );


    /* Habit buttons */

    document
        .getElementById("addHabitButton")
        ?.addEventListener(
            "click",
            () => openModal(habitModal)
        );


    document
        .getElementById("addHabitAction")
        ?.addEventListener(
            "click",
            () => openModal(habitModal)
        );


    /* Analytics */

    document
        .getElementById("viewAnalyticsAction")
        ?.addEventListener(
            "click",
            () => navigateTo("analytics")
        );


    /* Forms */

    taskForm?.addEventListener(
        "submit",
        handleTaskSubmit
    );


    noteForm?.addEventListener(
        "submit",
        handleNoteSubmit
    );


    habitForm?.addEventListener(
        "submit",
        handleHabitSubmit
    );


    /* Search */

    taskSearch?.addEventListener(
        "input",
        renderTasks
    );


    taskFilter?.addEventListener(
        "change",
        renderTasks
    );


    globalSearch?.addEventListener(
        "input",
        handleGlobalSearch
    );


    /* Close modal */

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modalId =
                        button.dataset.close;

                    closeModal(
                        document.getElementById(
                            modalId
                        )
                    );

                }
            );

        });


    /* Click outside modal */

    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        closeModal(overlay);

                    }

                }
            );

        });


    /* Toast */

    closeToast?.addEventListener(
        "click",
        hideToast
    );


    /* Reset */

    document
        .getElementById("resetButton")
        ?.addEventListener(
            "click",
            confirmReset
        );


    /* Confirmation */

    document
        .getElementById("confirmCancel")
        ?.addEventListener(
            "click",
            () => closeModal(confirmModal)
        );


    document
        .getElementById("confirmAction")
        ?.addEventListener(
            "click",
            resetApplication
        );

}


/* =========================================================
   14. MODAL FUNCTIONS
   ========================================================= */

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("active");

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

}


/* =========================================================
   15. TASK SYSTEM
   ========================================================= */

function handleTaskSubmit(event) {

    event.preventDefault();


    const title =
        document
            .getElementById("taskTitle")
            .value
            .trim();

    const category =
        document
            .getElementById("taskCategory")
            .value;

    const priority =
        document
            .getElementById("taskPriority")
            .value;

    const date =
        document
            .getElementById("taskDate")
            .value;


    if (!title) {

        showToast(
            "Task Required",
            "Please enter a task name."
        );

        return;

    }


    const newTask = {

        id: Date.now(),

        title: title,

        category: category,

        priority: priority,

        date: date,

        completed: false,

        createdAt:
            new Date().toISOString()

    };


    tasks.unshift(newTask);

    saveTasks();

    renderTasks();

    updateDashboard();

    taskForm.reset();

    closeModal(taskModal);


    showToast(
        "Task Created",
        "Your new task has been added."
    );

}


function saveTasks() {

    localStorage.setItem(
        "smartlife_tasks",
        JSON.stringify(tasks)
    );

}


/* =========================================================
   16. RENDER TASKS
   ========================================================= */

function renderTasks() {

    const search =
        taskSearch?.value
            .toLowerCase()
            .trim() || "";

    const filter =
        taskFilter?.value || "all";


    let filteredTasks =
        [...tasks];


    /* Search */

    if (search) {

        filteredTasks =
            filteredTasks.filter(task =>
                task.title
                    .toLowerCase()
                    .includes(search)
            );

    }


    /* Filter */

    if (filter === "pending") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.completed
            );

    }


    if (filter === "completed") {

        filteredTasks =
            filteredTasks.filter(
                task => task.completed
            );

    }


    if (filter === "high") {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.priority === "High"
            );

    }


    if (!taskList) return;


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-list-check"></i>

                </div>

                <h4>No tasks found</h4>

                <p>
                    Create a task or change your search/filter.
                </p>

            </div>

        `;

        return;

    }


    taskList.innerHTML =
        filteredTasks
            .map(createTaskHTML)
            .join("");


    addTaskListeners();

}


/* =========================================================
   17. TASK HTML
   ========================================================= */

function createTaskHTML(task) {

    const priorityClass =
        task.priority.toLowerCase();


    const dateText =
        task.date
            ? formatDate(task.date)
            : "No due date";


    return `

        <div
            class="task-item
            ${task.completed ? "completed" : ""}"
            data-task-id="${task.id}"
        >

            <button
                class="task-check"
                data-action="complete"
                data-id="${task.id}"
                title="Mark complete"
            >

                <i class="fa-solid fa-check"></i>

            </button>


            <div class="task-item-content">

                <span class="task-item-title">
                    ${escapeHTML(task.title)}
                </span>


                <div class="task-item-meta">

                    <span class="task-badge priority-${priorityClass}">
                        ${task.priority}
                    </span>

                    <span class="task-badge">
                        ${escapeHTML(task.category)}
                    </span>

                    <span class="task-date">
                        <i class="fa-regular fa-calendar"></i>
                        ${dateText}
                    </span>

                </div>

            </div>


            <button
                class="task-delete"
                data-action="delete"
                data-id="${task.id}"
                title="Delete task"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

    `;

}


/* =========================================================
   18. TASK EVENT LISTENERS
   ========================================================= */

function addTaskListeners() {

    document
        .querySelectorAll(
            "[data-action='complete']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    toggleTask(
                        Number(button.dataset.id)
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-action='delete']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteTask(
                        Number(button.dataset.id)
                    );

                }
            );

        });

}


/* =========================================================
   19. TOGGLE TASK
   ========================================================= */

function toggleTask(id) {

    const task =
        tasks.find(
            item => item.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveTasks();

    renderTasks();

    updateDashboard();


    showToast(
        task.completed
            ? "Task Completed 🎉"
            : "Task Reopened",
        task.completed
            ? "Excellent work! Keep going."
            : "The task has been moved back to pending."
    );

}


/* =========================================================
   20. DELETE TASK
   ========================================================= */

function deleteTask(id) {

    const task =
        tasks.find(
            item => item.id === id
        );


    if (!task) return;


    tasks =
        tasks.filter(
            item => item.id !== id
        );


    saveTasks();

    renderTasks();

    updateDashboard();


    showToast(
        "Task Deleted",
        `"${task.title}" was removed.`
    );

}


/* =========================================================
   21. DASHBOARD TASK PREVIEW
   ========================================================= */

function renderDashboardTasks() {

    if (!dashboardTasks) return;


    const latestTasks =
        tasks.slice(0, 5);


    if (latestTasks.length === 0) {

        dashboardTasks.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-clipboard-check"></i>

                </div>

                <h4>No tasks yet</h4>

                <p>
                    Add your first task to get started.
                </p>

            </div>

        `;

        return;

    }


    dashboardTasks.innerHTML =
        latestTasks
            .map(createTaskHTML)
            .join("");


    addDashboardTaskListeners();

}


/* =========================================================
   22. DASHBOARD TASK LISTENERS
   ========================================================= */

function addDashboardTaskListeners() {

    dashboardTasks
        .querySelectorAll(
            "[data-action='complete']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    toggleTask(
                        Number(button.dataset.id)
                    );

                    renderDashboardTasks();

                }
            );

        });


    dashboardTasks
        .querySelectorAll(
            "[data-action='delete']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteTask(
                        Number(button.dataset.id)
                    );

                    renderDashboardTasks();

                }
            );

        });

}


/* =========================================================
   23. UPDATE DASHBOARD
   ========================================================= */

function updateDashboard() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    /* Statistics */

    animateNumber(
        totalTasksElement,
        total
    );


    animateNumber(
        completedTasksElement,
        completed
    );


    animateNumber(
        pendingTasksElement,
        pending
    );


    animateNumber(
        productivityValue,
        percentage
    );


    /* Progress */

    if (progressPercentage) {

        progressPercentage.textContent =
            `${percentage}%`;

    }


    if (progressRing) {

        const degrees =
            percentage * 3.6;

        progressRing.style.background =
            `conic-gradient(
                var(--primary) ${degrees}deg,
                var(--border) ${degrees}deg
            )`;

    }


    updateProgressMessage(
        percentage
    );


    /* Analytics */

    if (analyticsProgress) {

        analyticsProgress.style.width =
            `${percentage}%`;

    }


    if (analyticsPercentage) {

        analyticsPercentage.textContent =
            `${percentage}%`;

    }


    if (analyticsTotal) {

        analyticsTotal.textContent =
            total;

    }


    if (analyticsCompleted) {

        analyticsCompleted.textContent =
            completed;

    }


    if (analyticsPending) {

        analyticsPending.textContent =
            pending;

    }


    if (analyticsRate) {

        analyticsRate.textContent =
            `${percentage}%`;

    }


    renderDashboardTasks();

}


/* =========================================================
   24. ANIMATED NUMBERS
   ========================================================= */

function animateNumber(element, target) {

    if (!element) return;


    const start =
        Number(
            element.textContent
        ) || 0;


    if (start === target) {

        element.textContent =
            target;

        return;

    }


    const duration = 500;

    const startTime =
        performance.now();


    function updateNumber(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const value =
            Math.floor(
                start +
                (target - start) *
                progress
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                updateNumber
            );

        }

    }


    requestAnimationFrame(
        updateNumber
    );

}


/* =========================================================
   25. PROGRESS MESSAGE
   ========================================================= */

function updateProgressMessage(
    percentage
) {

    if (!progressMessage) return;


    if (tasks.length === 0) {

        progressMessage.textContent =
            "Start adding tasks to track your productivity.";

        return;

    }


    if (percentage === 100) {

        progressMessage.textContent =
            "Amazing! You completed everything for today! 🎉";

        return;

    }


    if (percentage >= 75) {

        progressMessage.textContent =
            "You're almost there. Finish strong! 🚀";

        return;

    }


    if (percentage >= 50) {

        progressMessage.textContent =
            "Great progress! Keep the momentum going.";

        return;

    }


    if (percentage >= 25) {

        progressMessage.textContent =
            "Good start. Keep completing your tasks.";

        return;

    }


    progressMessage.textContent =
        "Start completing tasks to improve your score.";

}


/* =========================================================
   26. HABIT SYSTEM
   ========================================================= */

function handleHabitSubmit(event) {

    event.preventDefault();


    const title =
        document
            .getElementById("habitTitle")
            .value
            .trim();


    const icon =
        document
            .getElementById("habitIcon")
            .value;


    if (!title) {

        showToast(
            "Habit Required",
            "Please enter a habit name."
        );

        return;

    }


    const habit = {

        id: Date.now(),

        title: title,

        icon: icon,

        streak: 0,

        completedToday: false,

        lastCompleted: null

    };


    habits.unshift(habit);


    saveHabits();

    renderHabits();

    habitForm.reset();

    closeModal(habitModal);


    showToast(
        "Habit Created",
        "Your new habit is ready."
    );

}


function saveHabits() {

    localStorage.setItem(
        "smartlife_habits",
        JSON.stringify(habits)
    );

}


/* =========================================================
   27. RENDER HABITS
   ========================================================= */

function renderHabits() {

    if (!habitList) return;


    if (habits.length === 0) {

        habitList.innerHTML = `

            <div
                class="dashboard-card"
                style="grid-column:1/-1;"
            >

                <div class="empty-state">

                    <div class="empty-icon">

                        <i class="fa-solid fa-fire"></i>

                    </div>

                    <h4>No habits yet</h4>

                    <p>
                        Add a habit and start building your streak.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    habitList.innerHTML =
        habits
            .map(habit => `

                <div
                    class="habit-card
                    ${habit.completedToday ? "completed" : ""}"
                    data-habit-id="${habit.id}"
                >

                    <div class="habit-icon">

                        <i class="fa-solid ${habit.icon}"></i>

                    </div>


                    <h3>
                        ${escapeHTML(habit.title)}
                    </h3>


                    <p>
                        Stay consistent every day.
                    </p>


                    <div class="habit-streak">

                        <strong>
                            🔥 ${habit.streak} day
                            ${habit.streak === 1 ? "" : "s"}
                        </strong>


                        <button
                            class="habit-complete"
                            data-habit-id="${habit.id}"
                            title="Complete habit"
                        >

                            <i class="fa-solid fa-check"></i>

                        </button>

                    </div>

                </div>

            `)
            .join("");


    document
        .querySelectorAll(
            ".habit-complete"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    completeHabit(
                        Number(
                            button.dataset.habitId
                        )
                    );

                }
            );

        });

}


/* =========================================================
   28. COMPLETE HABIT
   ========================================================= */

function completeHabit(id) {

    const habit =
        habits.find(
            item => item.id === id
        );


    if (!habit) return;


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if (habit.lastCompleted === today) {

        showToast(
            "Already Completed",
            "You already completed this habit today."
        );

        return;

    }


    habit.streak += 1;

    habit.completedToday = true;

    habit.lastCompleted = today;


    saveHabits();

    renderHabits();


    showToast(
        "Habit Completed 🔥",
        `${habit.streak} day streak! Keep going.`
    );

}


/* =========================================================
   29. NOTES SYSTEM
   ========================================================= */

function handleNoteSubmit(event) {

    event.preventDefault();


    const title =
        document
            .getElementById("noteTitle")
            .value
            .trim();


    const content =
        document
            .getElementById("noteContent")
            .value
            .trim();


    if (!title || !content) {

        showToast(
            "Missing Information",
            "Please enter both title and content."
        );

        return;

    }


    const note = {

        id: Date.now(),

        title: title,

        content: content,

        createdAt:
            new Date().toISOString()

    };


    notes.unshift(note);


    saveNotes();

    renderNotes();

    noteForm.reset();

    closeModal(noteModal);


    showToast(
        "Note Saved",
        "Your note has been saved locally."
    );

}


function saveNotes() {

    localStorage.setItem(
        "smartlife_notes",
        JSON.stringify(notes)
    );

}


/* =========================================================
   30. RENDER NOTES
   ========================================================= */

function renderNotes() {

    if (!notesGrid) return;


    if (notes.length === 0) {

        notesGrid.innerHTML = `

            <div
                class="dashboard-card"
                style="grid-column:1/-1;"
            >

                <div class="empty-state">

                    <div class="empty-icon">

                        <i class="fa-solid fa-note-sticky"></i>

                    </div>

                    <h4>No notes yet</h4>

                    <p>
                        Save your ideas and important reminders here.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    notesGrid.innerHTML =
        notes
            .map(note => `

                <article
                    class="note-card"
                    data-note-id="${note.id}"
                >

                    <i class="fa-solid fa-thumbtack note-pin"></i>


                    <h3>
                        ${escapeHTML(note.title)}
                    </h3>


                    <p>
                        ${escapeHTML(note.content)}
                    </p>


                    <div class="note-actions">

                        <button
                            data-note-delete="${note.id}"
                            title="Delete note"
                        >

                            <i class="fa-solid fa-trash"></i>
                            Delete

                        </button>

                    </div>

                </article>

            `)
            .join("");


    document
        .querySelectorAll(
            "[data-note-delete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteNote(
                        Number(
                            button.dataset.noteDelete
                        )
                    );

                }
            );

        });

}


/* =========================================================
   31. DELETE NOTE
   ========================================================= */

function deleteNote(id) {

    const note =
        notes.find(
            item => item.id === id
        );


    notes =
        notes.filter(
            item => item.id !== id
        );


    saveNotes();

    renderNotes();


    showToast(
        "Note Deleted",
        note
            ? `"${note.title}" was removed.`
            : "Note removed."
    );

}


/* =========================================================
   32. GLOBAL SEARCH
   ========================================================= */

function handleGlobalSearch(event) {

    const value =
        event.target.value
            .toLowerCase()
            .trim();


    if (!value) return;


    const matchingTask =
        tasks.find(
            task =>
                task.title
                    .toLowerCase()
                    .includes(value)
        );


    if (matchingTask) {

        navigateTo("tasks");

        if (taskSearch) {

            taskSearch.value =
                value;

            renderTasks();

        }

    } else {

        navigateTo("tasks");

        if (taskSearch) {

            taskSearch.value =
                value;

            renderTasks();

        }

    }

}


/* =========================================================
   33. MOTIVATIONAL MESSAGES
   ========================================================= */

function setMotivationalMessage() {

    const messages = [

        "Small progress is still progress. Keep moving forward.",

        "Your future self will thank you for what you do today.",

        "Focus on progress, not perfection.",

        "One productive day can change your entire week.",

        "Start where you are. Use what you have. Do what you can.",

        "Consistency beats motivation.",

        "You've got this. Make today count.",

        "Every completed task is one step closer to your goal."

    ];


    const randomIndex =
        Math.floor(
            Math.random() *
            messages.length
        );


    if (motivationalText) {

        motivationalText.textContent =
            messages[randomIndex];

    }

}


/* =========================================================
   34. TOAST NOTIFICATION
   ========================================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    if (!toast) return;


    toastTitle.textContent =
        title;


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            hideToast,
            3500
        );

}


function hideToast() {

    toast?.classList.remove(
        "show"
    );

}


/* =========================================================
   35. CONFIRM RESET
   ========================================================= */

function confirmReset() {

    const confirmTitle =
        document.getElementById(
            "confirmTitle"
        );

    const confirmMessage =
        document.getElementById(
            "confirmMessage"
        );


    confirmTitle.textContent =
        "Reset SmartLife?";


    confirmMessage.textContent =
        "All tasks, notes, habits and settings will be deleted from this browser.";


    openModal(confirmModal);

}


/* =========================================================
   36. RESET APPLICATION
   ========================================================= */

function resetApplication() {

    localStorage.removeItem(
        "smartlife_tasks"
    );

    localStorage.removeItem(
        "smartlife_notes"
    );

    localStorage.removeItem(
        "smartlife_habits"
    );

    localStorage.removeItem(
        "smartlife_name"
    );

    localStorage.removeItem(
        "smartlife_darkmode"
    );


    tasks = [];

    notes = [];

    habits = [];

    userName = "Student";

    darkMode = false;


    applyTheme();

    updateUserInterface();

    renderTasks();

    renderNotes();

    renderHabits();

    updateDashboard();

    closeModal(confirmModal);


    showToast(
        "Application Reset",
        "All SmartLife data has been cleared."
    );

}


/* =========================================================
   37. DATE FORMATTER
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "No due date";

    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   38. HTML SECURITY HELPER
   ========================================================= */

function escapeHTML(value) {

    if (!value) return "";


    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   39. KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Ctrl + K */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            globalSearch?.focus();

        }


        /* Escape */

        if (event.key === "Escape") {

            document
                .querySelectorAll(
                    ".modal-overlay.active"
                )
                .forEach(modal => {

                    closeModal(modal);

                });

        }

    }
);


/* =========================================================
   40. AUTO REFRESH DATA
   ========================================================= */

setInterval(() => {

    updateDashboard();

}, 30000);


/* =========================================================
   41. WELCOME ANIMATION
   ========================================================= */

setTimeout(() => {

    document
        .querySelectorAll(
            ".stat-card"
        )
        .forEach((card, index) => {

            card.style.animationDelay =
                `${index * 0.08}s`;

        });

}, 100);


/* =========================================================
   SMARTLIFE INITIALIZATION COMPLETE
   ========================================================= */

console.log(
    "%cSmartLife loaded successfully 🚀",
    "color:#6c5ce7;font-size:18px;font-weight:bold;"
);

console.log(
    "All application data is stored locally using LocalStorage."
);
```
