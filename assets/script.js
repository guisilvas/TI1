document.addEventListener('DOMContentLoaded', () => {
    addMessage('bot', 'Olá, eu sou o GuardBot. Irei te ajudar a manter-se mais seguro(a) na internet!\nSelecione uma das opções abaixo:\n1. Ataque DDoS\n\n2. Injeção SQL\n3. Spam\n4. Phishing');
});

document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (isValidInput(userInput)) {
        addMessage('user', userInput);
        document.getElementById('user-input').value = '';
        getResponse(userInput);
    } else {
        alert('Por favor, digite um número válido.');
        document.getElementById('user-input').value = '';
    }
});

function isValidInput(input) {
    const validNumbers = ['1', '2', '3', '4', '5'];
    return validNumbers.includes(input);
}

function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.className = `message ${sender}`;

    const img = document.createElement('img');
    img.src = sender === 'bot' ? 'bot.png' : 'user.png';
    img.alt = sender === 'bot' ? 'Bot' : 'Usuário';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = text;

    message.appendChild(img);
    message.appendChild(messageContent);
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getResponse(userInput) {
    const response = await fetch('responses.json');
    const data = await response.json();
    const reply = data.responses[userInput] || 'Desculpe, mensagem inválida.';
    setTimeout(() => {
        addMessage('bot', reply);
    }, 500);
}