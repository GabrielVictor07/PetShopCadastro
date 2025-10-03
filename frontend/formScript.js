
// Selecionar o formulário
const form = document.getElementById('cadastroForm');


// se não tem um fescurinha no front, não sou eu :)

// Criar container de notificações se não existir
let notificationsContainer = document.querySelector('.notifications');
if (!notificationsContainer) {
    notificationsContainer = document.createElement('div');
    notificationsContainer.classList.add('notifications');
    document.body.appendChild(notificationsContainer);
}

// Função para mostrar notificação
function showNotification(message) {
    const card = document.createElement('div');
    card.classList.add('notification-card');
    card.textContent = message;

    notificationsContainer.appendChild(card);

    // Remover card após 5 segundos
    setTimeout(() => {
        card.remove();
    }, 5000);
}

// Evento de submit do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Dados do dono
    const donoData = {
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value
    };

    // Dados do pet
    const petData = {
        nome_pet: document.getElementById('nome_pet').value,
        especie: document.getElementById('especie').value,
        raca: document.getElementById('raca').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        observacoes: document.getElementById('observacoes').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dono: donoData, pet: petData })
        });

        const result = await response.json();

        if (response.ok) {
            form.reset();
            showNotification(`Cadastro de ${donoData.nome_completo} e ${petData.nome_pet} realizado com sucesso!`);
        } else {
            showNotification('Erro ao cadastrar: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        showNotification('Erro ao cadastrar, veja o console.');
    }
});
