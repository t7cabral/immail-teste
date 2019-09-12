# Quake log parser

## Task 1

Construa um parser para o arquivo de log games.log utilizando Node.js.

O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem morreu pq caiu no vazio, quem morreu machucado, entre outros.

O parser deve ser capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte.

### Exemplo

  	21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
  
  O player "Isgalamido" morreu pois estava ferido e caiu de uma altura que o matou.

  	2:22 Kill: 3 2 10: Isgalamido killed Dono da Bola by MOD_RAILGUN
  
  O player "Isgalamido" matou o player Dono da Bola usando a arma Railgun.
  
Para cada jogo o parser deve gerar algo como:

    game_1: {
	    total_kills: 45;
	    players: ["Dono da bola", "Isgalamido", "Zeh"]
	    kills: {
	      "Dono da bola": 5,
	      "Isgalamido": 18,
	      "Zeh": 20
	    }
	  }

### Observações

1. Quando o `<world>` mata o player ele perde -1 kill.
2. `<world>` não é um player e não deve aparecer na lista de players e nem no dicionário de kills.
3. `total_kills` são os kills dos games, isso inclui mortes do `<world>`.

## Task 2

Após construir o parser, salve as informações no MongoDB. Fique a vontade pra construir o modelo de dados que achar mais adequado.

## Task 3

Crie uma API RESTful simples com apenas um endpoint que retorne uma lista com os resultados vindos do Banco de Dados.

## Task 4

Crie uma interface React JS simples que consuma essa informação e apresente na tela um relatório de cada jogo e um ranking geral de kills por jogador em formato de lista, tabela ou o que achar mais adequado. 

Causas de morte (retirado do [código fonte](https://github.com/id-Software/Quake-III-Arena/blob/master/code/game/bg_public.h))

	// means of death
	typedef enum {
		MOD_UNKNOWN,
		MOD_SHOTGUN,
		MOD_GAUNTLET,
		MOD_MACHINEGUN,
		MOD_GRENADE,
		MOD_GRENADE_SPLASH,
		MOD_ROCKET,
		MOD_ROCKET_SPLASH,
		MOD_PLASMA,
		MOD_PLASMA_SPLASH,
		MOD_RAILGUN,
		MOD_LIGHTNING,
		MOD_BFG,
		MOD_BFG_SPLASH,
		MOD_WATER,
		MOD_SLIME,
		MOD_LAVA,
		MOD_CRUSH,
		MOD_TELEFRAG,
		MOD_FALLING,
		MOD_SUICIDE,
		MOD_TARGET_LASER,
		MOD_TRIGGER_HURT,
	#ifdef MISSIONPACK
		MOD_NAIL,
		MOD_CHAINGUN,
		MOD_PROXIMITY_MINE,
		MOD_KAMIKAZE,
		MOD_JUICED,
	#endif
		MOD_GRAPPLE
	} meansOfDeath_t;

Exemplo:

	"game-1": {
		kills_by_means: {
			"MOD_SHOTGUN": 10,
			"MOD_RAILGUN": 2,
			"MOD_GAUNTLET": 1,
			"XXXX": N
		}
	}

# Requisitos

1. Use a linguagem Javascript, no backend utilize a plataforma do NodeJS, no frontend utilize React JS. Como banco de dados utilize MongoDB.
2. Faça testes unitários, suite de testes bem organizados.
3. Use git e tente fazer commits pequenos e bem descritos.
4. Faça pelo menos um README explicando como fazer o setup, uma explicação da solução proposta, o mínimo de documentação para outro desenvolvedor entender seu código.
5. Siga o que considera boas práticas de programação, coisas que um bom desenvolvedor olhe no seu código e não ache "feio" ou "ruim".
6. Após concluir o teste faça um zip e mande anexado no email de contato ou envie o link do repositório do github.

HAVE FUN :)