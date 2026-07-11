export type Media =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

export type Case = {
  slug: string;
  client: string;
  title: string;
  brief: string;
  solution: string;
  tags: string[];
  media: Media[];
  accent: "roxo" | "teal";
};

const img = (src: string): Media => ({ type: "image", src });

export const cases: Case[] = [
  {
    slug: "panobianco",
    client: "Panobianco Americana II",
    title:
      "Identidade de conteúdo para uma academia que precisava parecer tão forte quanto treina.",
    brief:
      "Uma unidade de franquia perdida no meio do feed genérico do nicho fitness. Sem direção de arte, sem voz, competindo em região disputada.",
    solution:
      "Sistema editorial de carrosséis e reels com headline massivo, alto contraste e a energia do treino no frame. Calendário estruturado e produção acelerada com craft.",
    tags: ["Identidade de conteúdo", "Direção de arte", "Social"],
    media: [
      img("/work/panobianco-1.jpg"),
      img("/work/panobianco-2.jpg"),
      img("/work/panobianco-3.jpg"),
      img("/work/panobianco-4.jpg"),
      img("/work/panobianco-5.jpg"),
      img("/work/panobianco-6.jpg"),
    ],
    accent: "roxo",
  },
  {
    slug: "barelli",
    client: "Barelli Oftalmologia",
    title:
      "Campanha emocional para uma clínica de oftalmologia — porque a visão guarda memórias.",
    brief:
      "Consultório que precisava de presença digital com sensibilidade e autoridade médica, sem a frieza clínica genérica do segmento de saúde.",
    solution:
      "Direção editorial em tons de azul profundo: retrato humano, luz suave e tipografia delicada. Cada peça com uma declaração que conecta cuidado e afeto — 'a visão merece cuidado'.",
    tags: ["Direção de arte", "Saúde", "Campanha", "Social"],
    media: [img("/work/barelli-1.jpg"), img("/work/barelli-2.jpg")],
    accent: "teal",
  },
  {
    slug: "barbearia",
    client: "Barbearia Bemvenutti",
    title:
      "Direção de arte premium para uma barbearia que queria parecer um ritual, não um corte.",
    brief:
      "Barbearia de bairro que precisava de presença digital à altura do serviço — sem cara de panfleto, com peso e sofisticação.",
    solution:
      "Linguagem cinematográfica em tons quentes e dourados: retrato, textura e tipografia editorial. Cada peça com a mesma assinatura premium.",
    tags: ["Direção de arte", "Campanha", "Social"],
    media: [
      img("/work/barbearia-4.jpg"),
      img("/work/barbearia-2.jpg"),
      img("/work/barbearia-3.jpg"),
      img("/work/barbearia-5.jpg"),
      img("/work/barbearia-6.jpg"),
    ],
    accent: "roxo",
  },
  {
    slug: "pizzaria",
    client: "Aurora Pizzaria",
    title:
      "Um sistema visual que faz a pizza derreter na tela — e transforma a pizzaria em ponto de encontro.",
    brief:
      "Pizzaria precisando de peças de alto apelo de desejo e de lifestyle, sem cara de panfleto e sem stock photo reconhecível.",
    solution:
      "Still de produto cinematográfico (forno a lenha, macro de queijo, top-down) somado a cenas de convívio. Imagem gerada e captada, finalizada no Photoshop — a assinatura humana da última camada.",
    tags: ["Still de produto", "Lifestyle", "Campanha", "Food"],
    media: [
      img("/work/pizzaria-1.jpg"),
      img("/work/pizzaria-2.jpg"),
      img("/work/pizzaria-3.jpg"),
      img("/work/pizzaria-4.jpg"),
      img("/work/pizzaria-5.jpg"),
      img("/work/pizzaria-6.jpg"),
      img("/work/pizzaria-7.jpg"),
      img("/work/pizzaria-8.jpg"),
      img("/work/pizzaria-9.jpg"),
    ],
    accent: "teal",
  },
  {
    slug: "studio-aurora",
    client: "STUDIO Aurora",
    title:
      "Conteúdo editorial sobre os limites honestos da IA — a frase que o concorrente não teria coragem de publicar.",
    brief:
      "Posicionar a marca no território que ninguém ocupa: falar abertamente do que a IA faz e não faz, com visual de autoridade.",
    solution:
      "Linha editorial de carrosséis com declaração própria em cada peça. Fundo abissal, gradiente aurora como assinatura, tipografia de display com calor e autoridade.",
    tags: ["Editorial", "Estratégia", "Carrossel"],
    media: [
      img("/work/aurora-1.jpg"),
      img("/work/aurora-2.jpg"),
      img("/work/aurora-3.jpg"),
      img("/work/aurora-4.jpg"),
      img("/work/aurora-5.jpg"),
      img("/work/aurora-6.jpg"),
      img("/work/aurora-7.jpg"),
      img("/work/aurora-8.jpg"),
      img("/work/aurora-10.jpg"),
    ],
    accent: "roxo",
  },
];
