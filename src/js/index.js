        let tabuleiro = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        let jogadorAtual = 'X';
        let pontosX = 0;
        let pontosO = 0;
        let pontosVelha = 0;
        let mensagemElement = document.getElementById('mensagem');
        let pontosXElement = document.getElementById('pontosX');
        let pontosOElement = document.getElementById('pontosO');
        let pontosVelhaElement = document.getElementById('pontosVelha');
	let modoIA = false;

    function jogar(linha, coluna) {
        if (tabuleiro[linha][coluna] === '' && !jogoFinalizado()) {
            tabuleiro[linha][coluna] = jogadorAtual;
            atualizarTabuleiro();
            if (verificarVitoria()) {
                mensagemElement.textContent = `Jogador ${jogadorAtual} venceu!`;
                atualizarPontuacao();
            } else if (verificarVelha()) {
                mensagemElement.textContent = 'Empate (velha)!';
                pontosVelha++;
                pontosVelhaElement.textContent = pontosVelha;
            } else {
                jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
            }
        }
    }

        function reiniciarJogo() {
            tabuleiro = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            jogadorAtual = 'X';
            mensagemElement.textContent = '';
            atualizarTabuleiro();
        }

        function atualizarTabuleiro() {
            let tabuleiroElement = document.getElementById('tabuleiro');
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    tabuleiroElement.rows[i].cells[j].textContent = tabuleiro[i][j];
                }
            }
        }

        function verificarVitoria() {
            for (let i = 0; i < 3; i++) {
                if (tabuleiro[i][0] !== '' && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) {
                    return true;
                }
                if (tabuleiro[0][i] !== '' && tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i]) {
                    return true;
                }
            }

            if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
                return true;
            }
            if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
                return true;
            }

            return false;
        }

        function verificarVelha() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (tabuleiro[i][j] === '') {
                        return false;
                    }
                }
            }
            return true;
        }

        function jogoFinalizado() {
            return verificarVitoria() || verificarVelha();
        }

        function atualizarPontuacao() {
            if (jogadorAtual === 'X') {
                pontosX++;
                pontosXElement.textContent = pontosX;
            } else {
                pontosO++;
                pontosOElement.textContent = pontosO;
            }
        }

	function verificarVitoria() {
	    for (let i = 0; i < 3; i++) {
	        if (tabuleiro[i][0] !== '' && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) {
	            return [{ linha: i, coluna: 0 }, { linha: i, coluna: 1 }, { linha: i, coluna: 2 }];
	        }
	        if (tabuleiro[0][i] !== '' && tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i]) {
	            return [{ linha: 0, coluna: i }, { linha: 1, coluna: i }, { linha: 2, coluna: i }];
	        }
	    }

	    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
	        return [{ linha: 0, coluna: 0 }, { linha: 1, coluna: 1 }, { linha: 2, coluna: 2 }];
	    }
	    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
	        return [{ linha: 0, coluna: 2 }, { linha: 1, coluna: 1 }, { linha: 2, coluna: 0 }];
	    }

	    return null;
	}

	function atualizarTabuleiro() {
	    let tabuleiroElement = document.getElementById('tabuleiro');
	    let linhaVencedora = verificarVitoria();

	    for (let i = 0; i < 3; i++) {
	        for (let j = 0; j < 3; j++) {
	            let celula = tabuleiroElement.rows[i].cells[j];
	            celula.textContent = tabuleiro[i][j];

	            // Adicione a classe "vencedor" se a célula estiver na linha vencedora
	            if (linhaVencedora && linhaVencedora.some(coords => coords.linha === i && coords.coluna === j)) {
	                celula.classList.add('vencedor');
	            }
	        }
	    }
	}

	function reiniciarJogo() {
	    tabuleiro = [
	        ['', '', ''],
	        ['', '', ''],
	        ['', '', '']
	    ];
	    jogadorAtual = 'X';
	    mensagemElement.textContent = '';

	    // Remova a classe "vencedor" de todas as células
	    limparClassesVencedor();

	    atualizarTabuleiro();
	}

	function limparClassesVencedor() {
	    let tabuleiroElement = document.getElementById('tabuleiro');
	    for (let i = 0; i < 3; i++) {
	        for (let j = 0; j < 3; j++) {
	            let celula = tabuleiroElement.rows[i].cells[j];
	            celula.classList.remove('vencedor');
	        }
	    }
	}

// IA FUNCTION

    function alternarModoJogo() {
        modoIA = !modoIA;
        reiniciarJogo();
        const modoBtn = document.getElementById('modoBtn');
        modoBtn.textContent = modoIA ? 'Player vs Player' : 'Player vs IA';
    }

    function jogadaMaquina() {
        if (!jogoFinalizado() && jogadorAtual === 'O') {
            // Implemente a lógica para a jogada da máquina (IA) aqui
            // Por enquanto, a jogada será aleatória
    
            // Adicione um atraso de 500 milissegundos antes da jogada da máquina
            setTimeout(() => {
                let linha, coluna;
                do {
                    linha = Math.floor(Math.random() * 3);
                    coluna = Math.floor(Math.random() * 3);
                } while (tabuleiro[linha][coluna] !== '');
    
                tabuleiro[linha][coluna] = 'O';
                atualizarTabuleiro();
    
                if (verificarVitoria()) {
                    mensagemElement.textContent = 'A máquina venceu!';
                    atualizarPontuacao();
                } else if (verificarVelha()) {
                    mensagemElement.textContent = 'Empate (velha)!';
                    pontosVelha++;
                    pontosVelhaElement.textContent = pontosVelha;
                } else {
                    jogadorAtual = 'X';
                }
            }, 150); // 500 milissegundos de atraso
        }
    }

function quadradoClicado(linha, coluna) {
    if (modoIA && jogadorAtual === 'O') {
        // Se estiver no modo IA e for o turno da máquina, chama a função da jogada da máquina
        jogadaMaquina();
    } else {
        // Caso contrário, chama a função jogar normalmente
        jogar(linha, coluna);
    }
}

let tabuleiroElement = document.getElementById('tabuleiro');
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        tabuleiroElement.rows[i].cells[j].addEventListener('click', function() {
            quadradoClicado(i, j);
        });
    }
}
