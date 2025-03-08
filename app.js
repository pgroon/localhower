// JavaScript to handle drag-and-drop functionality

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const inputField = document.getElementById('todo-input');
    
    addButton.addEventListener('click', () => {
        const todoText = inputField.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            inputField.value = ''; // Clear the input field
        }
    });

    function addTodoItem(text) {
        // Create the list item
        const todoItem = document.createElement('li');
        todoItem.textContent = text;
        todoItem.setAttribute('draggable', 'true');
        
        // Add event listener for drag events
        todoItem.addEventListener('dragstart', dragStart);
        todoItem.addEventListener('dragend', dragEnd);

        // Append the item to the "Inbox"
        const inbox = document.getElementById('droppable-inbox');
        inbox.appendChild(todoItem);
    }

    function dragStart(e) {
        // Store the dragged item in the dataTransfer object
        e.dataTransfer.setData('text', e.target.textContent);
        e.target.style.opacity = 0.5; // Make the item semi-transparent while dragging
    }

    function dragEnd(e) {
        e.target.style.opacity = 1; // Restore the item's opacity
    }

    // Add drop events to each droppable area
    const droppables = document.querySelectorAll('.droppable');
    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('drop', dropItem);
    });

    function dragOver(e) {
        e.preventDefault(); // Allow the item to be dropped
    }

    function dropItem(e) {
        e.preventDefault();

        const todoText = e.dataTransfer.getData('text');
        const targetContainer = e.target;

        if (targetContainer && targetContainer.tagName === 'UL') {
            // Create a new list item in the target container
            const newItem = document.createElement('li');
            newItem.textContent = todoText;
            newItem.setAttribute('draggable', 'true');
            newItem.addEventListener('dragstart', dragStart);
            newItem.addEventListener('dragend', dragEnd);

            targetContainer.appendChild(newItem);
        }
    }
});
