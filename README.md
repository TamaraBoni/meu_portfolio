📚 Nosso Portfólio Acadêmico
Este projeto é um portfólio acadêmico desenvolvido com Next.js e TypeScript para armazenar e visualizar as avaliações realizadas durante o curso de Análise e Desenvolvimento de Sistemas (1º ano) na FIAP, dos alunos Anderson Silva de Souza [RM 554900], Tamara Pantarotto Boni [RM 555647] e Vinicius Banciela Breda Lopes [RM 558117], da turma 1TDSPW. O portfólio é organizado em três categorias principais: CheckPoints, Global Solution, e Challenger Sprints.

📋 Índice
Sobre o Projeto
Funcionalidades
Recursos
Tecnologias Utilizadas
Pré-requisitos
Instalação
Uso
Estrutura de Pastas
Contribuindo
Licença

Sobre o Projeto
Este portfólio acadêmico foi desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas e tem como objetivo exibir, de maneira organizada, as avaliações e notas de cada categoria de trabalho, permitindo também a adição de novos registros por meio de formulários.

Funcionalidades
Visualização de Avaliações: Listagem de avaliações nas categorias de CheckPoints, Global Solution e Challenger Sprints.
Detalhes da Avaliação: Exibição de detalhes como nota, feedback e data para cada avaliação.
Inserção e Edição: Formulários para adicionar novas avaliações e editar avaliações existentes.
Rotas Dinâmicas: Navegação entre páginas e acesso aos detalhes de cada avaliação individualmente.

Recursos
Este projeto utiliza as principais funcionalidades do Next.js:
Rotas Dinâmicas: Acesso direto a detalhes de avaliações.
Estilização com Tailwind CSS: Interface responsiva e estilizada.
Componentes do Next.js: Uso de Image e Link para otimização.
Navegação com useRouter: Navegação entre páginas do portfólio.

Tecnologias Utilizadas
Next.js - Framework React para aplicações web.
TypeScript - Superset do JavaScript que adiciona tipagem estática.
Tailwind CSS - Framework utilitário CSS para estilização rápida.
Framer Motion - Biblioteca para animações no React.

Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
Node.js
Git
Além disso, é recomendável o uso de um editor como o Visual Studio Code.

Instalação
Clone o repositório:
git clone https://github.com/TamaraBoni/meu_portfolio.git
Abra o projeto:
cd meu_portfolio
Instale as dependências:
npm install
Inicie o servidor de desenvolvimento:
npm run dev
Abra seu navegador e acesse http://localhost:3000 para ver o projeto em execução.

Uso
Após iniciar o servidor de desenvolvimento, você poderá navegar entre as páginas principais:
Página Inicial: Mostra o resumo das categorias de avaliações.
CheckPoints: Lista de todas as avaliações intermediárias realizadas.
Global Solution: Exibe projetos integradores e detalhes.
Challenger Sprints: Lista os desafios realizados e os resultados.
Para adicionar uma nova avaliação ou editar uma existente, basta acessar os formulários disponíveis em cada seção.

Estrutura de Pastas
meu_portfolio/
├── pages/
│ ├── index.tsx # Página inicial (Dashboard)
│ ├── checkpoints.tsx # Página de CheckPoints
│ ├── globalsolution.tsx # Página de Global Solution
│ ├── challengersprints.tsx # Página de Challenger Sprints
│ ├── checkpoints/[id].tsx # Detalhe dinâmico de CheckPoint
│ ├── globalsolution/[id].tsx # Detalhe dinâmico de Global Solution
│ └── challengersprints/[id].tsx# Detalhe dinâmico de Challenger Sprints
├── components/
│ ├── Header.tsx # Cabeçalho do site
│ └── Footer.tsx # Rodapé do site
├── styles/
│ └── globals.css # Estilos globais (Tailwind CSS)
├── public/
│ └── images/ # Imagens das categorias
└── package.json # Configurações e scripts do projeto

Contribuindo
Contribuições são sempre bem-vindas! Sinta-se à vontade para enviar pull requests e relatar issues.
Como Contribuir?
Fork o projeto.
Crie uma nova branch com sua funcionalidade (git checkout -b minha-nova-funcionalidade).
Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade').
Faça o push para a branch (git push origin minha-nova-funcionalidade).
Abra um Pull Request.

Licença
Distribuído sob a licença MIT. Consulte LICENSE para mais informações.

Observações
Para qualquer dúvida sobre a configuração ou o uso do projeto, consulte a documentação do Next.js e a documentação do Tailwind CSS.

Link para o site (Vercel):
https://meu-portfolio-cvrtskeox-vinibancielas-projects.vercel.app
https://vercel.com/vinibancielas-projects/meu-portfolio
