class JoinView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="page">
              <div class="card">
                <h1 class="title">Bienvenido</h1>
                <p class="helper">Elegi un nombre para entrar a la sala.</p>

                <form class="form" id="join-form">
                  <input
                    class="input"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Tu nombre"
                    autocomplete="nickname"
                    required
                  />
                  <button class="button primary" type="submit">Entrar</button>
                </form>
              </div>
            </div>
        `;

        const form = this.querySelector('#join-form');
        const input = this.querySelector('#username');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = input.value.trim();
            if (!name) {
                return;
            }
            sessionStorage.setItem('chat.username', name);
            window.location.href = '/chat';
        });
    }
}

class ChatView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="page">
              <header>
                <div>
                  <h1 class="title">Sala de Chat</h1>
                </div>
                <div class="header-meta">
                  <span class="user-pill" id="user-pill">Usuario</span>
                  <div class="status" id="status">
                    <span class="status-dot" id="status-dot"></span>
                    <span id="status-text">Conectando...</span>
                  </div>
                </div>
              </header>

              <div class="layout">
                <aside class="panel">
                  <h2>Usuarios conectados</h2>
                  <ul class="users" id="users">
                    <li>Esperando usuarios...</li>
                  </ul>
                </aside>

                <section class="panel chat">
                  <ul class="messages" id="messages"></ul>

                  <form class="chat-form" id="chat-form">
                    <input
                      class="input"
                      id="message"
                      name="message"
                      type="text"
                      placeholder="Escribi tu mensaje"
                      autocomplete="off"
                      disabled
                      required
                    />
                    <button class="button secondary" type="submit" disabled>
                      Enviar
                    </button>
                  </form>
                </section>
              </div>
            </div>
        `;

        this.initializeChat();
    }

    initializeChat() {
        const statusText = this.querySelector('#status-text');
        const statusDot = this.querySelector('#status-dot');
        const usersList = this.querySelector('#users');
        const messagesList = this.querySelector('#messages');
        const chatForm = this.querySelector('#chat-form');
        const messageInput = this.querySelector('#message');
        const sendButton = chatForm.querySelector('button');
        const userPill = this.querySelector('#user-pill');

        const currentUser = sessionStorage.getItem('chat.username');

        if (!currentUser) {
            window.location.href = '/';
            return;
        }

        userPill.textContent = currentUser;

        const socket = io({
            transports: ['websocket', 'polling']
        });

        const setStatus = (text, color) => {
            statusText.textContent = text;
            statusDot.style.background = color;
            statusDot.style.boxShadow = `0 0 0 3px ${color}33`;
        };

        const addMessage = (data) => {
            const item = document.createElement('li');
            item.className = 'message';

            if (data.type === 'system') {
                item.classList.add('system');
                item.textContent = data.message;
                messagesList.appendChild(item);
                messagesList.scrollTop = messagesList.scrollHeight;
                return;
            }

            if (data.username === currentUser) {
                item.classList.add('own');
            }

            const header = document.createElement('div');
            header.className = 'message-header';

            const name = document.createElement('span');
            name.textContent = data.username;

            const time = document.createElement('span');
            time.textContent = data.timestamp || '';

            header.appendChild(name);
            header.appendChild(time);

            const body = document.createElement('div');
            body.className = 'message-body';
            body.textContent = data.message;

            item.appendChild(header);
            item.appendChild(body);

            messagesList.appendChild(item);
            messagesList.scrollTop = messagesList.scrollHeight;
        };

        const setUsers = (users) => {
            usersList.innerHTML = '';
            if (!users.length) {
                const empty = document.createElement('li');
                empty.textContent = 'Solo vos por ahora.';
                usersList.appendChild(empty);
                return;
            }

            users.forEach((user) => {
                const item = document.createElement('li');
                item.textContent = user;
                usersList.appendChild(item);
            });
        };

        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const message = messageInput.value.trim();
            if (!message) {
                return;
            }

            socket.emit('chat_message', {
                message,
                timestamp: new Date().toLocaleTimeString()
            });

            messageInput.value = '';
            messageInput.focus();
        });

        socket.on('connect', () => {
            setStatus('Conectado', '#16a34a');
            socket.emit('set_username', { username: currentUser });
            messageInput.disabled = false;
            sendButton.disabled = false;
            messageInput.focus();
        });

        socket.on('disconnect', () => {
            setStatus('Desconectado', '#dc2626');
            addMessage({ type: 'system', message: 'Se perdio la conexion con el servidor.' });
            messageInput.disabled = true;
            sendButton.disabled = true;
        });

        socket.on('user_joined', (data) => {
            addMessage({ type: 'system', message: `${data.username} se unio al chat.` });
        });

        socket.on('user_left', (data) => {
            addMessage({ type: 'system', message: `${data.username} salio del chat.` });
        });

        socket.on('user_list', (users) => {
            setUsers(users);
        });

        socket.on('chat_message', (data) => {
            addMessage(data);
        });
    }
}

customElements.define('join-view', JoinView);
customElements.define('chat-view', ChatView);
