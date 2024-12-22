const containerParticipantes = document.querySelector('.container__participantes')

var participantes = [
    "Lucas",
    "Mariana",
    "Marina",
    "Luiz Henrique",
    "Maelle",
    "Luiz Filipe",
    "Lorena",
    "Rodrigo",
    "Tati"
]

participantes.forEach(participante => {
    containerParticipantes.innerHTML += `
    <div class="container__individual">
        <input type="radio" id="candidato1" name="candidato" value="${participante}" required>
        <label for="candidato1">${participante}</label>
    </div>
    `
})

document.getElementById('votacaoForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtem o candidato selecionado
    const candidato = document.querySelector('input[name="candidato"]:checked').value;

    try {
        // Envia o voto ao servidor
        const response = await fetch('http://localhost:3000/votar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ candidato }),
        });

        const data = await response.json();

        if (response.ok) {
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.textContent = data.message;
            mensagemDiv.style.display = 'block';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao enviar o voto:', error);
    }
});
