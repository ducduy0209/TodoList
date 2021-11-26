const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $('#input');
const addBtn = $('.icon-add');
const clearBtn = $('.delete-all');
const listBlock = $('.list-todo');
const Quantity = $('.quantity');

const dataString = localStorage.getItem('todoList');
const todoList = {
    listTodo: dataString ? JSON.parse(dataString) : [],
    renderList() {
        const { listTodo } = this;
        const htmls = listTodo.map((todo, index) => {
            return `
                <li class="todo-item">
                    <span>${index + 1}. ${todo}</span>
                    <i class="delete-icon fas fa-trash"></i>
                </li>
            `
        });
        listBlock.innerHTML = htmls.join('');
        Quantity.innerHTML = listTodo.length;
    },
    setData(value) {
        localStorage.setItem('todoList', JSON.stringify(value));
        this.start();
    },
    addTodo() {
        const { listTodo } = this;
        if (input.value) {
            listTodo.push(input.value);
            input.value = '';
            this.setData(listTodo);
        }
    },
    removeTodo(index) {
        const { listTodo } = this;
        listTodo.splice(index, 1);
        this.setData(listTodo);
    },
    removeAll() {
        const { listTodo } = this;
        listTodo.splice(0, listTodo.length);
        this.setData(listTodo);
    },
    handleTodo() {
        // Delete todo
        const deleteBtn = $$('.delete-icon');
        deleteBtn.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.removeTodo(index);
            });
        })

        // Clear All to do list
        clearBtn.addEventListener('click', () => {
            this.removeAll();
        });

        // Add when click addBtn
        addBtn.addEventListener('click', () => {
            this.addTodo();
        });

        // Add When press Enter in keyboard
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        })
    },
    start() {
        // Render todo
        this.renderList();
        // Handle todo
        this.handleTodo();
    }
}

todoList.start();