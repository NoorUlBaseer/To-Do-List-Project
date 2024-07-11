// Create the main container
const container = document.createElement('div');
container.style.background = 'white';
container.style.padding = '20px';
container.style.borderRadius = '10px';
container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; 
container.style.width = '400px';
container.style.margin = 'auto';
container.style.marginTop = '100px';
container.style.fontFamily = 'Arial, sans-serif';

// Create the input container
const inputContainer = document.createElement('div');
inputContainer.style.display = 'flex';
inputContainer.style.alignItems = 'center';
inputContainer.style.border = '1px solid #ddd';
inputContainer.style.borderRadius = '5px';
inputContainer.style.padding = '10px';
inputContainer.style.marginBottom = '20px';

// Create the input icon
const inputIcon = document.createElement('span');
inputIcon.innerHTML = '&#9998;'; // Use HTML entity for input icon
inputIcon.style.marginRight = '10px';
inputIcon.style.color = '#aaa';
inputIcon.style.fontSize = '25px';

// Create the input field
const newTaskInput = document.createElement('input');
newTaskInput.type = 'text';
newTaskInput.placeholder = 'Add a New Task + Enter';
newTaskInput.style.fontSize = '15px';
newTaskInput.style.marginLeft = '5px';
newTaskInput.style.border = 'none';
newTaskInput.style.flexGrow = '1';
newTaskInput.style.outline = 'none';

// Append the input icon and input field to the input container
inputContainer.appendChild(inputIcon);
inputContainer.appendChild(newTaskInput);

// Create the tabs container
const tabsContainer = document.createElement('div');
tabsContainer.style.display = 'flex';
tabsContainer.style.justifyContent = 'space-between';
tabsContainer.style.marginBottom = '20px';

// Style for tabs
const tabStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#aaa',
    fontSize: '18px',
    margin: '0 10px' // Adjust the margin to reduce spacing
};

// Create the "All" tab
const allTab = document.createElement('button');
allTab.textContent = 'All';
Object.assign(allTab.style, tabStyle, { color: '#ff8a00' }); // Set active tab style

// Create the "Pending" tab
const pendingTab = document.createElement('button');
pendingTab.textContent = 'Pending';
Object.assign(pendingTab.style, tabStyle);

// Create the "Completed" tab
const completedTab = document.createElement('button');
completedTab.textContent = 'Completed';
Object.assign(completedTab.style, tabStyle);

// Create the "Clear All" button
const clearAllBtn = document.createElement('button');
clearAllBtn.textContent = 'Clear All';
clearAllBtn.style.background = 'linear-gradient(135deg, #ff8a00, #e52e71)';
clearAllBtn.style.border = 'none';
clearAllBtn.style.borderRadius = '5px';
clearAllBtn.style.color = 'white';
clearAllBtn.style.padding = '10px';
clearAllBtn.style.cursor = 'pointer';
clearAllBtn.style.marginLeft = 'auto';

// Append tabs and clear all button to the tabs container
tabsContainer.appendChild(allTab);
tabsContainer.appendChild(pendingTab);
tabsContainer.appendChild(completedTab);
tabsContainer.appendChild(clearAllBtn);

// Append input container and tabs container to the main container
container.appendChild(inputContainer);
container.appendChild(tabsContainer);

// Create a horizontal line below the tabs
const line = document.createElement('hr');
line.style.border = 'none';
line.style.borderTop = '1px solid #ddd';
line.style.margin = '10px 0';
line.style.width = 'calc(100% + 40px)';
line.style.marginLeft = '-20px';

// Append the line to the container
container.appendChild(line);

// Create the tasks list
const tasksList = document.createElement('ul');
tasksList.style.listStyle = 'none';
tasksList.style.padding = '0';
tasksList.style.fontSize = '18px';

let tasks = []; // Array to store tasks
let currentOpenMenu = null; // Track the currently open menu

// Sample tasks
const sampleTasks = ['Complete your Assignment', 'Order your Dinner'];
sampleTasks.forEach(task => {
    const taskElement = createTaskElement(task);
    tasks.push({ element: taskElement, completed: false });
    tasksList.appendChild(taskElement);
});

// Create a task element
function createTaskElement(task) {
    // Create the list item
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '10px';
    li.style.borderBottom = '1px solid #ddd';
    li.style.position = 'relative';
    
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.textContent = task;
    taskSpan.style.flexGrow = '1';
    taskSpan.style.marginLeft = '15px';

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px';
    
    // Add event listener to the checkbox
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.color = '#aaa';
        } 
        else {
            taskSpan.style.textDecoration = 'none';
            taskSpan.style.color = 'black';
        }
        filterTasks();
    });

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '...';
    deleteBtn.style.fontSize = '30px';
    deleteBtn.style.marginBottom = '15px';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = 'black';
    deleteBtn.style.cursor = 'pointer';

    // Create the menu box
    const menuBox = document.createElement('div');
    menuBox.style.position = 'absolute';
    menuBox.style.top = '50%';
    menuBox.style.left = '100%';
    menuBox.style.transform = 'translateY(-50%)';
    menuBox.style.background = 'orange';
    menuBox.style.border = '1px solid #ddd';
    menuBox.style.borderRadius = '5px';
    menuBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    menuBox.style.padding = '5px';
    menuBox.style.display = 'none'; // Hide the menu box by default

    // Create the delete option
    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Delete';
    deleteOption.style.padding = '10px';
    deleteOption.style.cursor = 'pointer';

    // Add event listener to the delete option
    deleteOption.addEventListener('click', () => {
        tasksList.removeChild(li);
        tasks = tasks.filter(t => t.element !== li);
        filterTasks();
        menuBox.style.display = 'none';
        currentOpenMenu = null;
    });

    // Append the delete option to the menu box
    menuBox.appendChild(deleteOption);

    // Append event listener to the delete button
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentOpenMenu && currentOpenMenu !== menuBox) {
            currentOpenMenu.style.display = 'none'; // Close the currently open menu
        }
        menuBox.style.display = menuBox.style.display === 'none' ? 'block' : 'none';
        currentOpenMenu = menuBox.style.display === 'block' ? menuBox : null;
    });

    // Close the menu box when clicked outside
    document.addEventListener('click', (e) => {
        if (currentOpenMenu && !menuBox.contains(e.target) && e.target !== deleteBtn) {
            currentOpenMenu.style.display = 'none';
            currentOpenMenu = null;
        }
    });

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    li.appendChild(menuBox);

    return li;
}

// Add new task
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && newTaskInput.value.trim()) {
        const task = newTaskInput.value.trim();
        const taskElement = createTaskElement(task);
        tasks.push({ element: taskElement, completed: false });
        tasksList.appendChild(taskElement);
        newTaskInput.value = '';
        filterTasks();
    }
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    tasksList.innerHTML = '';
    tasks = [];
    currentOpenMenu = null; // Reset the open menu
});

// Filter tasks based on the active tab
function filterTasks() {
    // Get the active tab
    const activeTab = document.querySelector('.active-tab');
    tasksList.innerHTML = '';

    // Append tasks based on the active tab
    tasks.forEach(task => {
        const checkbox = task.element.querySelector('input[type="checkbox"]');
        task.completed = checkbox.checked;

        if (activeTab === allTab) {
            tasksList.appendChild(task.element);
        } 
        else if (activeTab === pendingTab && !task.completed) {
            tasksList.appendChild(task.element);
        } 
        else if (activeTab === completedTab && task.completed) {
            tasksList.appendChild(task.element);
        }
    });
}

// Set the active tab
function setActiveTab(tab) {
    // Reset the active tab styles
    allTab.classList.remove('active-tab');
    allTab.style.color = '#aaa';
    pendingTab.classList.remove('active-tab');
    pendingTab.style.color = '#aaa';
    completedTab.classList.remove('active-tab');
    completedTab.style.color = '#aaa';

    // Set the active tab styles
    tab.classList.add('active-tab');
    tab.style.color = '#ff8a00';

    // Filter tasks based on the active tab
    filterTasks();
}

// Add event listeners to the tabs
allTab.addEventListener('click', () => setActiveTab(allTab));
pendingTab.addEventListener('click', () => setActiveTab(pendingTab));
completedTab.addEventListener('click', () => setActiveTab(completedTab));

// Set the "All" tab as active by default
allTab.classList.add('active-tab');
allTab.style.color = '#ff8a00';

// Append the tasks list to the container
container.appendChild(tasksList);

// Append the container to the body
document.body.style.background = 'linear-gradient(135deg, #ff8a00, #e52e71)';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.height = '100vh';
document.body.style.margin = '0';
document.body.appendChild(container);
