// Calendar and Todo List Code
        const currentMonthElement = document.getElementById('currentMonth');
        const calendarDaysElement = document.getElementById('calendarDays');
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');
        const selectedDateElement = document.getElementById('selectedDate');
        const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');

        let currentDate = new Date();
        let selectedDate = new Date();
        let todos = {};

        function updateCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

            calendarDaysElement.innerHTML = '';

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                calendarDaysElement.innerHTML += '<div></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('day');
                dayElement.textContent = day;

                if (year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate()) {
                    dayElement.classList.add('current');
                }

                if (year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate()) {
                    dayElement.classList.add('selected');
                }

                dayElement.addEventListener('click', () => selectDate(new Date(year, month, day)));
                calendarDaysElement.appendChild(dayElement);
            }
        }

        function selectDate(date) {
            selectedDate = date;
            updateCalendar();
            updateTodoList();
        }

        function updateTodoList() {
            const dateString = selectedDate.toDateString();
            selectedDateElement.textContent = dateString;
            todoList.innerHTML = '';

            if (todos[dateString]) {
                todos[dateString].forEach((todo, index) => {
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('todo-item');
                    todoItem.innerHTML = `
                        ${todo}
                        <button onclick="removeTodo(${index})">Remove</button>
                    `;
                    todoList.appendChild(todoItem);
                });
            }
        }

        function addTodo() {
            const todo = todoInput.value.trim();
            if (todo) {
                const dateString = selectedDate.toDateString();
                if (!todos[dateString]) {
                    todos[dateString] = [];
                }
                todos[dateString].push(todo);
                todoInput.value = '';
                updateTodoList();
            }
        }

        function removeTodo(index) {
            const dateString = selectedDate.toDateString();
            if (todos[dateString]) {
                todos[dateString].splice(index, 1);
                updateTodoList();
            }
        }

        function showApp(appName) {
            console.log(`Showing ${appName} app`);
        }

        prevMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });

        nextMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });

        updateCalendar();
        updateTodoList();

        // Snake Game Code
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const scale = 20;
        const rows = canvas.height / scale;
        const columns = canvas.width / scale;

        let snake;

        (function setup() {
            snake = new Snake();
            fruit = new Fruit();
            fruit.pickLocation();

            window.setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                fruit.draw();
                snake.update();
                snake.draw();

                if (snake.eat(fruit)) {
                    fruit.pickLocation();
                }

                snake.checkCollision();
            }, 250);
        }());

        window.addEventListener('keydown', ((evt) => {
            const direction = evt.key.replace('Arrow', '');
            snake.changeDirection(direction);
        }));

        function Snake() {
            this.x = 0;
            this.y = 0;
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
            this.total = 0;
            this.tail = [];

            this.draw = function() {
                ctx.fillStyle = "#00FF00";
                for (let i=0; i<this.tail.length; i++) {
                    ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
                }

                ctx.fillRect(this.x, this.y, scale, scale);
            }

            this.update = function() {
                for (let i=0; i<this.tail.length - 1; i++) {
                    this.tail[i] = this.tail[i+1];
                }

                this.tail[this.total - 1] = { x: this.x, y: this.y };

                this.x += this.xSpeed;
                this.y += this.ySpeed;

                if (this.x > canvas.width) {
                    this.x = 0;
                }

                if (this.y > canvas.height) {
                    this.y = 0;
                }

                if (this.x < 0) {
                    this.x = canvas.width;
                }

                if (this.y < 0) {
                    this.y = canvas.height;
                }
            }

            this.changeDirection = function(direction) {
                switch(direction) {
                    case 'Up':
                        this.xSpeed = 0;
                        this.ySpeed = -scale * 1;
                        break;
                    case 'Down':
                        this.xSpeed = 0;
                        this.ySpeed = scale * 1;
                        break;
                    case 'Left':
                        this.xSpeed = -scale * 1;
                        this.ySpeed = 0;
                        break;
                    case 'Right':
                        this.xSpeed = scale * 1;
                        this.ySpeed = 0;
                        break;
                }
            }

            this.eat = function(fruit) {
                if (this.x === fruit.x && this.y === fruit.y) {
                    this.total++;
                    return true;
                }

                return false;
            }

            this.checkCollision = function() {
                for (var i=0; i<this.tail.length; i++) {
                    if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                        this.total = 0;
                        this.tail = [];
                    }
                }
            }
        }

        function Fruit() {
            this.x;
            this.y;

            this.pickLocation = function() {
                this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
                this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
            }

            this.draw = function() {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(this.x, this.y, scale, scale)
            }
        }