import { 
  IslandProfile, 
  StoryMilestone, 
  AvatarIcon, 
  SpecialCalendarEvent, 
  IslandVillager, 
  DailyMission,
  Weather 
} from '../types';

export const DEFAULT_PROFILE: IslandProfile = {
  userId: '',
  playerName: 'Aldeano',
  islandName: 'Isla Paraíso',
  nativeFruit: 'Melocotones',
  hemisphere: 'Norte',
  birthdayDay: 15,
  birthdayMonth: 7,
  experience: 450,
  activeIconId: 'icon-apple',
  unlockedIconIds: ['icon-apple', 'icon-fossil'],
  totakekeUnlocked: false,
  islandRating: 2,
};

export const INITIAL_STORY_STEPS: Omit<StoryMilestone, 'id' | 'userId'>[] = [
  {
    stepNumber: 1,
    title: 'Desembarco en la Isla Desierta',
    subtitle: 'Primeros pasos y paquete de mudanza Nook',
    description: 'Llegas a una isla deshabitada contratada con el Plan de Asentamiento en Islas Desiertas de Nook Inc.',
    hint: 'Habla con Tom Nook en la carpa central, coloca tu tienda de campaña y la de tus 2 vecinos iniciales.',
    rewardXp: 200,
    completed: true,
    tasks: [
      { id: 's1-t1', text: 'Instalar tu tienda de campaña en la playa o pradera', done: true },
      { id: 's1-t2', text: 'Ayudar a tus 2 vecinos pioneros a colocar sus tiendas', done: true },
      { id: 's1-t3', text: 'Participar en la fogata nocturna y bautizar la isla', done: true },
      { id: 's1-t4', text: 'Pagar las 5,000 Millas Nook a Tom Nook por los gastos de mudanza', done: true },
      { id: 's1-t5', text: 'Solicitar la hipoteca para construir tu primera casa de piedra', done: true },
    ]
  },
  {
    stepNumber: 2,
    title: 'Construir la Tienda Mini Nook',
    subtitle: 'Comercio local con Tendo y Nendo',
    description: 'Los pequeños gemelos mapache quieren fundar su propia tienda para ofrecer muebles, herramientas y comprar nabos.',
    hint: 'Recolecta materiales golpeando rocas con la pala y talando árboles con un hacha de piedra.',
    rewardXp: 300,
    completed: true,
    tasks: [
      { id: 's2-t1', text: 'Reunir 30 piezas de Madera Normal', done: true },
      { id: 's2-t2', text: 'Reunir 30 piezas de Madera Flexible', done: true },
      { id: 's2-t3', text: 'Reunir 30 piezas de Madera Rígida', done: true },
      { id: 's2-t4', text: 'Reunir 30 Pepitas de Hierro picando las rocas de la isla', done: true },
      { id: 's2-t5', text: 'Elegir la parcela para Mini Nook y cortar la cinta de inauguración', done: true },
    ]
  },
  {
    stepNumber: 3,
    title: 'La Gran Apertura del Museo de Sócrates',
    subtitle: 'Preservando la fauna, flora y fósiles insulares',
    description: 'El apasionado búho Sócrates desea fundar un museo de categoría mundial en tu isla.',
    hint: 'Pesca peces en ríos y mar, atrapa insectos y desentierra fósiles marcados con una cruz en la tierra.',
    rewardXp: 350,
    completed: false,
    tasks: [
      { id: 's3-t1', text: 'Donar 5 criaturas diferentes a Tom Nook para que invite a Sócrates', done: true },
      { id: 's3-t2', text: 'Ubicar la tienda de campaña temporal de Sócrates', done: true },
      { id: 's3-t3', text: 'Desentierra y dona 15 especímenes (fósiles, insectos o peces)', done: false },
      { id: 's3-t4', text: 'Esperar a la construcción y asistir a la ceremonia del Museo oficial', done: false },
    ]
  },
  {
    stepNumber: 4,
    title: 'El Primer Puente y Tres Parcelas Residenciales',
    subtitle: 'Expandiendo los horizontes de la comunidad',
    description: 'Tom Nook recibe solicitudes de 3 nuevos vecinos para mudarse a la isla, pero necesitan casas y cruzar el río.',
    hint: 'Consigue la pértiga y la escalera de mano para alcanzar las terrazas altas y buscar flores silvestres.',
    rewardXp: 450,
    completed: false,
    tasks: [
      { id: 's4-t1', text: 'Fabricar y colocar el kit del primer puente de madera sobre el río', done: false },
      { id: 's4-t2', text: 'Seleccionar los solares para las parcelas 1, 2 y 3', done: false },
      { id: 's4-t3', text: 'Craftear y colocar los 3 muebles de interior de cada casa', done: false },
      { id: 's4-t4', text: 'Craftear y colocar los 3 muebles de exterior frente a cada casa', done: false },
      { id: 's4-t5', text: 'Dar la bienvenida a los 3 nuevos residentes al mudarse', done: false },
    ]
  },
  {
    stepNumber: 5,
    title: 'Ampliación del Ayuntamiento y Llegada de Canela',
    subtitle: 'De simple carpa a centro cívico moderno',
    description: 'El campamento de Tom Nook se transforma en el imponente edificio del Ayuntamiento con la llegada de Canela (Isabelle).',
    hint: 'Canela se encargará de evaluar la reputación de la isla, el himno y la bandera.',
    rewardXp: 400,
    completed: false,
    tasks: [
      { id: 's5-t1', text: 'Esperar las obras de remodelación del Centro de Gestión Vecinal', done: false },
      { id: 's5-t2', text: 'Conocer a Canela y escuchar sus anuncios matutinos en la radio', done: false },
      { id: 's5-t3', text: 'Diseñar la bandera oficial de la isla con un diseño personalizado', done: false },
      { id: 's5-t4', text: 'Componer una melodía insular propia en el mostrador de Canela', done: false },
    ]
  },
  {
    stepNumber: 6,
    title: 'Instalación de la Zona de Acampada',
    subtitle: 'Atracción turística y nuevos amigos',
    description: 'Tom Nook planea el "Proyecto K" para atraer al músico más famoso del mundo: Totakeke.',
    hint: 'La zona de acampada traerá campistas al azar. El primer campista es obligatorio que se mude.',
    rewardXp: 450,
    completed: false,
    tasks: [
      { id: 's6-t1', text: 'Fabricar el kit de la Zona de Acampada (madera, arcilla y pepitas)', done: false },
      { id: 's6-t2', text: 'Colocar la acampada en un rincón natural o junto a la playa', done: false },
      { id: 's6-t3', text: 'Esperar la llegada del primer campista y jugar a las cartas con él', done: false },
      { id: 's6-t4', text: 'Convencer al primer campista de mudarse y edificar su parcela', done: false },
    ]
  },
  {
    stepNumber: 7,
    title: 'Expansión Vecinal: 7 a 8 Habitantes',
    subtitle: 'El murmullo de una auténtica metrópoli insular',
    description: 'Para que Totakeke se fije en tu isla, necesitas una comunidad activa y suficiente público en la plaza.',
    hint: 'Compra parcelas residenciales adicionales a Tom Nook por 10,000 bayas cada una.',
    rewardXp: 500,
    completed: false,
    tasks: [
      { id: 's7-t1', text: 'Comprar al menos 2 solares adicionales en el Ayuntamiento', done: false },
      { id: 's7-t2', text: 'Viajar a islas de Millas Nook para reclutar vecinos con personalidad única', done: false },
      { id: 's7-t3', text: 'Alcanzar al menos 7 residentes animales viviendo en la isla', done: false },
      { id: 's7-t4', text: 'Entablar conversación diaria con cada uno de ellos', done: false },
    ]
  },
  {
    stepNumber: 8,
    title: 'Proyecto K: Embellecimiento y Paisajismo',
    subtitle: 'Limpieza, jardinería y decoración exterior',
    description: 'Canela exige una isla cuidada: flores híbridas, árboles frutales, mobiliario al aire libre y cero basura.',
    hint: 'Coloca muebles de exterior, vallas, limpia todas las malezas y no dejes objetos tirados por el suelo.',
    rewardXp: 600,
    completed: false,
    tasks: [
      { id: 's8-t1', text: 'Retirar toda la maleza y hierbajos sueltos de los sectores principales', done: false },
      { id: 's8-t2', text: 'Plantar al menos 50 flores de diversas especies y regarlas', done: false },
      { id: 's8-t3', text: 'Construir y colocar al menos 50 tramos de valla perimetral', done: false },
      { id: 's8-t4', text: 'Colocar al menos 20 objetos y muebles decorativos en el exterior', done: false },
      { id: 's8-t5', text: 'Construir una rampa o un puente adicional para mejorar el acceso', done: false },
    ]
  },
  {
    stepNumber: 9,
    title: '¡La Codiciada Evaluación de 3 Estrellas!',
    subtitle: 'El veredicto de Canela y la carta misteriosa',
    description: 'Habla con Canela sobre la reputación de la isla. Si cumples con el aforo y la decoración, ¡alcanzarás 3 estrellas!',
    hint: 'Si Canela te dice que faltan flores o muebles, añádelos y vuelve a preguntarle el mismo día.',
    rewardXp: 800,
    completed: false,
    tasks: [
      { id: 's9-t1', text: 'Preguntar a Canela en el Ayuntamiento por la evaluación de la isla', done: false },
      { id: 's9-t2', text: 'Alcanzar formalmente la calificación de 3 Estrellas insulares', done: false },
      { id: 's9-t3', text: 'Escuchar la lectura de la crítica anónima firmada por el músico \'K\'', done: false },
      { id: 's9-t4', text: 'Presenciar la llamada telefónica triunfal de Tom Nook invitando a Totakeke', done: false },
    ]
  },
  {
    stepNumber: 10,
    title: '¡El Gran Concierto de Totakeke (K.K. Slider)!',
    subtitle: 'El clímax de Animal Crossing y desbloqueo de Obras Públicas',
    description: '¡El legendario Totakeke llega a la plaza con su guitarra acústica para tocar en directo frente a todos tus vecinos!',
    hint: 'Al día siguiente de conseguir las 3 estrellas, Totakeke tocará "Nuevo Horizonte". Verás los créditos oficiales y desbloquearás la app de terraformar la isla.',
    rewardXp: 1500,
    completed: false,
    tasks: [
      { id: 's10-t1', text: 'Reunirte en la plaza del Ayuntamiento frente al escenario de Totakeke', done: false },
      { id: 's10-t2', text: 'Escuchar el concierto acústico de la canción \'Nuevo Horizonte\'', done: false },
      { id: 's10-t3', text: 'Disfrutar de los créditos del juego celebrando tu logro', done: false },
      { id: 's10-t4', text: 'Recibir el disco musical exclusivo y el permiso de Terraformación de Tom Nook', done: false },
      { id: 's10-t5', text: '¡Desbloquear el modo creador de caminos, acantilados y cascadas!', done: false },
    ]
  }
];

export const AVATAR_ICONS: AvatarIcon[] = [
  // --- Nivel 1: COMÚN (100 - 300 EXP) ---
  {
    id: 'icon-apple',
    name: 'Manzana Dulce',
    character: 'Fruta Nativa',
    category: 'item',
    rarity: 'Común',
    rarityOrder: 1,
    priceXp: 100,
    emoji: '🍎',
    bgGradient: 'from-red-100 to-rose-200',
    borderColor: 'border-red-300',
    description: 'La fruta favorita de los vecinos golosos. Ideal para recuperar energía.'
  },
  {
    id: 'icon-flower',
    name: 'Cosmos Rosa',
    character: 'Flor Insular',
    category: 'item',
    rarity: 'Común',
    rarityOrder: 1,
    priceXp: 150,
    emoji: '🌸',
    bgGradient: 'from-pink-100 to-rose-100',
    borderColor: 'border-pink-300',
    description: 'Híbrido delicado que brota en las praderas de primavera.'
  },
  {
    id: 'icon-fossil',
    name: 'Fósil Misterioso',
    character: 'Pieza de Colección',
    category: 'item',
    rarity: 'Común',
    rarityOrder: 1,
    priceXp: 200,
    emoji: '🦴',
    bgGradient: 'from-amber-100 to-yellow-200',
    borderColor: 'border-amber-300',
    description: 'Desenterrado con pala en una grieta del suelo. ¡Llévaselo a Sócrates!'
  },
  {
    id: 'icon-rod',
    name: 'Caña de Pescar',
    character: 'Herramienta Clásica',
    category: 'item',
    rarity: 'Común',
    rarityOrder: 1,
    priceXp: 250,
    emoji: '🎣',
    bgGradient: 'from-blue-100 to-cyan-200',
    borderColor: 'border-blue-300',
    description: 'El fiel instrumento de madera para atrapar lubinas y lucios.'
  },
  {
    id: 'icon-axe',
    name: 'Hacha de Piedra',
    character: 'Herramienta de Madera',
    category: 'item',
    rarity: 'Común',
    rarityOrder: 1,
    priceXp: 300,
    emoji: '🪓',
    bgGradient: 'from-stone-100 to-emerald-100',
    borderColor: 'border-stone-300',
    description: 'Extrae hasta 3 piezas de madera sin talar el árbol por completo.'
  },

  // --- Nivel 2: POCO COMÚN (450 - 800 EXP) ---
  {
    id: 'icon-froggy',
    name: 'Gorro de Ranita',
    character: 'Accesorio Kawaii',
    category: 'item',
    rarity: 'Poco Común',
    rarityOrder: 2,
    priceXp: 450,
    emoji: '🐸',
    bgGradient: 'from-emerald-100 to-teal-200',
    borderColor: 'border-emerald-400',
    description: 'El accesorio más viral y querido de todo el archipiélago.'
  },
  {
    id: 'icon-bells',
    name: 'Saco de Bayas',
    character: 'Moneda Insular',
    category: 'item',
    rarity: 'Poco Común',
    rarityOrder: 2,
    priceXp: 550,
    emoji: '💰',
    bgGradient: 'from-yellow-100 to-amber-200',
    borderColor: 'border-amber-400',
    description: 'Un reluciente saco con 10,000 bayas con el logo de la estrella dorada.'
  },
  {
    id: 'icon-butterfly',
    name: 'Mariposa Celeste',
    character: 'Bicho Exótico',
    category: 'item',
    rarity: 'Poco Común',
    rarityOrder: 2,
    priceXp: 650,
    emoji: '🦋',
    bgGradient: 'from-cyan-100 to-blue-200',
    borderColor: 'border-cyan-400',
    description: 'Revolotea grácilmente entre las flores azules en días despejados.'
  },
  {
    id: 'icon-koi',
    name: 'Pez Koi',
    character: 'Criatura del Estanque',
    category: 'item',
    rarity: 'Poco Común',
    rarityOrder: 2,
    priceXp: 750,
    emoji: '🐠',
    bgGradient: 'from-orange-100 to-amber-200',
    borderColor: 'border-orange-400',
    description: 'Un pez de vivos colores orientales valorado en 4,000 bayas.'
  },

  // --- Nivel 3: RARO (1000 - 1800 EXP) ---
  {
    id: 'icon-nooklings',
    name: 'Tendo y Nendo',
    character: 'Aprendices Mapache',
    category: 'character',
    rarity: 'Raro',
    rarityOrder: 3,
    priceXp: 1000,
    emoji: '🦝',
    bgGradient: 'from-amber-200 to-orange-200',
    borderColor: 'border-amber-500',
    description: '¡Bienvenidos a Mini Nook!... (...a Mini Nook!). Compradores de nabos.'
  },
  {
    id: 'icon-blathers',
    name: 'Sócrates (Blathers)',
    character: 'Director del Museo',
    category: 'character',
    rarity: 'Raro',
    rarityOrder: 3,
    priceXp: 1250,
    emoji: '🦉',
    bgGradient: 'from-emerald-200 to-teal-300',
    borderColor: 'border-teal-500',
    description: 'Búho nocturno amante de los fósiles con pánico atroz a los insectos.'
  },
  {
    id: 'icon-isabelle',
    name: 'Canela (Isabelle)',
    character: 'Secretaria Municipal',
    category: 'character',
    rarity: 'Raro',
    rarityOrder: 3,
    priceXp: 1500,
    emoji: '🐕',
    bgGradient: 'from-yellow-200 to-amber-300',
    borderColor: 'border-yellow-500',
    description: 'Siempre sonriente en el Ayuntamiento dando las noticias matutinas.'
  },
  {
    id: 'icon-daisy-mae',
    name: 'Juliana (Daisy Mae)',
    character: 'Mercader de Nabos',
    category: 'character',
    rarity: 'Raro',
    rarityOrder: 3,
    priceXp: 1800,
    emoji: '🐗',
    bgGradient: 'from-red-200 to-pink-300',
    borderColor: 'border-red-400',
    description: 'Aparece los domingos por la mañana vendiendo nabos de la abuela Juana.'
  },

  // --- Nivel 4: ÉPICO (2200 - 3500 EXP) ---
  {
    id: 'icon-tom-nook',
    name: 'Tom Nook',
    character: 'Presidente de Nook Inc.',
    category: 'character',
    rarity: 'Épico',
    rarityOrder: 4,
    priceXp: 2200,
    emoji: '🦝',
    bgGradient: 'from-teal-200 to-emerald-300',
    borderColor: 'border-emerald-600',
    description: 'Visionario financiero del archipiélago y cobrador de hipotecas sin intereses.'
  },
  {
    id: 'icon-kappn',
    name: 'Capitán (Kapp\'n)',
    character: 'Lobo de Mar Marino',
    category: 'character',
    rarity: 'Épico',
    rarityOrder: 4,
    priceXp: 2600,
    emoji: '🐢',
    bgGradient: 'from-cyan-200 to-blue-400',
    borderColor: 'border-blue-500',
    description: 'Navega en su bote cantando baladas marinas hacia islas con clima secreto.'
  },
  {
    id: 'icon-flick',
    name: 'Kamilo (Flick)',
    character: 'Artesano de Bichos',
    category: 'character',
    rarity: 'Épico',
    rarityOrder: 4,
    priceXp: 2900,
    emoji: '🦎',
    bgGradient: 'from-rose-300 to-red-400',
    borderColor: 'border-rose-600',
    description: 'Camaleón gótico apasionado por los insectos que compra al 150% de valor.'
  },
  {
    id: 'icon-wisp',
    name: 'Buh el Fantasma',
    character: 'Espíritu Asustadizo',
    category: 'character',
    rarity: 'Épico',
    rarityOrder: 4,
    priceXp: 3200,
    emoji: '👻',
    bgGradient: 'from-indigo-200 to-purple-300',
    borderColor: 'border-indigo-400',
    description: 'Se asusta al verte en la noche y dispersa sus 5 briznas de espíritu.'
  },
  {
    id: 'icon-celeste',
    name: 'Estela (Celeste)',
    character: 'Astrónoma de Estrellas',
    category: 'character',
    rarity: 'Épico',
    rarityOrder: 4,
    priceXp: 3500,
    emoji: '✨',
    bgGradient: 'from-violet-200 to-fuchsia-300',
    borderColor: 'border-purple-500',
    description: 'Aparece durante lluvias de estrellas fugaces para regalarte recetas del zodiaco.'
  },

  // --- Nivel 5: LEGENDARIO (4200 - 6000 EXP) ---
  {
    id: 'icon-totakeke',
    name: 'Totakeke (K.K. Slider)',
    character: 'Músico Legendario',
    category: 'special',
    rarity: 'Legendario',
    rarityOrder: 5,
    priceXp: 4500,
    emoji: '🎸',
    bgGradient: 'from-amber-200 via-rose-200 to-purple-200',
    borderColor: 'border-amber-500',
    description: 'El cantautor errante. Con su guitarra acústica llenará tu isla de melodías eternas.'
  },
  {
    id: 'icon-gold-trophy',
    name: 'Trofeo de Oro Insular',
    character: 'Galardón Máximo',
    category: 'special',
    rarity: 'Legendario',
    rarityOrder: 5,
    priceXp: 5000,
    emoji: '🏆',
    bgGradient: 'from-yellow-200 via-amber-300 to-yellow-400',
    borderColor: 'border-amber-600',
    description: 'Entregado únicamente a los campeones con maestría absoluta en pesca y caza.'
  },
  {
    id: 'icon-gold-rose',
    name: 'Rosa de Oro Puro',
    character: 'Flor Mítica',
    category: 'special',
    rarity: 'Legendario',
    rarityOrder: 5,
    priceXp: 5500,
    emoji: '👑',
    bgGradient: 'from-amber-200 via-yellow-300 to-emerald-200',
    borderColor: 'border-yellow-600',
    description: 'Brota al regar rosas negras marchitas con una regadera dorada de 5 estrellas.'
  },
  {
    id: 'icon-royal-crown',
    name: 'Corona Real de 1.2M',
    character: 'Joyel Supremo',
    category: 'special',
    rarity: 'Legendario',
    rarityOrder: 5,
    priceXp: 6000,
    emoji: '💎',
    bgGradient: 'from-blue-200 via-indigo-200 to-purple-300',
    borderColor: 'border-indigo-600',
    description: 'El atuendo más codiciado de las Hermanas Manitas. Símbolo supremo de estatus insular.'
  }
];

export const POPULAR_VILLAGERS_DB: Omit<IslandVillager, 'id' | 'userId' | 'talkedToday' | 'giftGivenToday' | 'isFavorite' | 'friendshipLevel'>[] = [
  {
    villagerKey: 'raymond',
    name: 'Narciso (Raymond)',
    species: 'Gato',
    personality: 'Esnob',
    catchphrase: 'elegán',
    birthday: '1 de Octubre',
    avatarUrl: '🐱'
  },
  {
    villagerKey: 'marshal',
    name: 'Munchi (Marshal)',
    species: 'Ardilla',
    personality: 'Esnob',
    catchphrase: 'puchis',
    birthday: '29 de Septiembre',
    avatarUrl: '🐿️'
  },
  {
    villagerKey: 'marina',
    name: 'Marina',
    species: 'Pulpo',
    personality: 'Dulce',
    catchphrase: 'borbotón',
    birthday: '26 de Junio',
    avatarUrl: '🐙'
  },
  {
    villagerKey: 'sherb',
    name: 'Morfeo (Sherb)',
    species: 'Cabra',
    personality: 'Perezoso',
    catchphrase: 'báaa',
    birthday: '18 de Enero',
    avatarUrl: '🐐'
  },
  {
    villagerKey: 'judy',
    name: 'Misuzu (Judy)',
    species: 'Oso cachorro',
    personality: 'Altanera',
    catchphrase: 'palomi',
    birthday: '10 de Marzo',
    avatarUrl: '🐻'
  },
  {
    villagerKey: 'ankha',
    name: 'Patri (Ankha)',
    species: 'Gato',
    personality: 'Altanera',
    catchphrase: 'miau-miau',
    birthday: '22 de Septiembre',
    avatarUrl: '🐈'
  },
  {
    villagerKey: 'sasha',
    name: 'Noel (Sasha)',
    species: 'Conejo',
    personality: 'Perezoso',
    catchphrase: 'orejitas',
    birthday: '19 de Mayo',
    avatarUrl: '🐰'
  },
  {
    villagerKey: 'shino',
    name: 'Shino',
    species: 'Ciervo',
    personality: 'Vivaz',
    catchphrase: 'corni',
    birthday: '31 de Octubre',
    avatarUrl: '🦌'
  },
  {
    villagerKey: 'fauna',
    name: 'Fauna',
    species: 'Ciervo',
    personality: 'Normal',
    catchphrase: 'bambi',
    birthday: '26 de Marzo',
    avatarUrl: '🦌'
  },
  {
    villagerKey: 'roald',
    name: 'Reinaldo (Roald)',
    species: 'Pingüino',
    personality: 'Atlético',
    catchphrase: 'brr',
    birthday: '5 de Enero',
    avatarUrl: '🐧'
  },
  {
    villagerKey: 'bob',
    name: 'Arándano (Bob)',
    species: 'Gato',
    personality: 'Perezoso',
    catchphrase: 'chisgarabís',
    birthday: '1 de Enero',
    avatarUrl: '🐱'
  },
  {
    villagerKey: 'dom',
    name: 'Fígaro (Dom)',
    species: 'Oveja',
    personality: 'Atlético',
    catchphrase: 'lanitas',
    birthday: '18 de Marzo',
    avatarUrl: '🐑'
  }
];

export const SPECIAL_EVENTS_CALENDAR: SpecialCalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Torneo de Pesca de Primavera',
    dateStr: 'Segundo sábado de Abril',
    month: 4,
    day: 11,
    category: 'Torneo',
    description: 'CJ organiza el torneo de pesca en la plaza. ¡Atrapa la mayor cantidad en 3 minutos para ganar trofeos!'
  },
  {
    id: 'evt-2',
    title: 'Festival del Cerezo en Flor',
    dateStr: '1 al 10 de Abril',
    month: 4,
    day: 5,
    category: 'Estacional',
    description: 'Los árboles de hoja caduca se tiñen de rosa pastel y caen pétalos de cerezo flotando con la brisa.'
  },
  {
    id: 'evt-3',
    title: 'Caza de Bichos (Bug-Off)',
    dateStr: 'Cuarto sábado de Junio',
    month: 6,
    day: 27,
    category: 'Torneo',
    description: 'Kamilo visita la plaza para medir tu destreza con la red. ¡Canjea puntos por muebles exclusivos de insectos!'
  },
  {
    id: 'evt-4',
    title: 'Festival de Fuegos Artificiales',
    dateStr: 'Todos los domingos de Agosto',
    month: 8,
    day: 16,
    category: 'Festividad',
    description: 'A las 19:00h el cielo se ilumina con fuegos artificiales. ¡Ladino vende boletos de rifa y Canela regala diademas!'
  },
  {
    id: 'evt-5',
    title: 'Noche de Brujas (Halloween)',
    dateStr: '31 de Octubre',
    month: 10,
    day: 31,
    category: 'Festividad',
    description: 'Soponcio llega a la plaza a las 17:00h. Reparte chuches a los vecinos disfrazados o te gastarán bromas.'
  },
  {
    id: 'evt-6',
    title: 'Día del Pavo (Harvest Festival)',
    dateStr: 'Cuarto jueves de Noviembre',
    month: 11,
    day: 26,
    category: 'Festividad',
    description: 'El chef Guindo monta su cocina al aire libre en la plaza. Consíguele ingredientes locales para sus 4 platillos.'
  },
  {
    id: 'evt-7',
    title: 'Día de los Juguetes (Toy Day)',
    dateStr: '24 de Diciembre',
    month: 12,
    day: 24,
    category: 'Festividad',
    description: 'Renato el reno te encomienda repartir los regalos del saco mágico a cada habitante de tu isla.'
  },
  {
    id: 'evt-8',
    title: 'Nochevieja y Concierto de Año Nuevo',
    dateStr: '31 de Diciembre',
    month: 12,
    day: 31,
    category: 'Festividad',
    description: 'Cuenta atrás con el reloj gigante en la plaza, gorros de fiesta, sidra con burbujas y fuegos artificiales.'
  }
];

export const DAILY_MISSION_TEMPLATES = [
  {
    missionKey: 'm-talk-villagers',
    title: 'Saluda a tus vecinos',
    description: 'Habla con al menos 3 vecinos diferentes hoy en tu isla para estrechar lazos.',
    xpReward: 150
  },
  {
    missionKey: 'm-catch-fish',
    title: 'Pesca ribereña o marina',
    description: 'Atrapa 5 peces en el río, cascada o mar utilizando tu caña.',
    xpReward: 180
  },
  {
    missionKey: 'm-hit-rocks',
    title: 'Geología insular',
    description: 'Golpea las 6 rocas de tu isla con la pala para extraer arcilla, piedra y pepitas.',
    xpReward: 200
  },
  {
    missionKey: 'm-check-turnips',
    title: 'Consultar bolsa de nabos',
    description: 'Entra a Mini Nook y pregunta a Tendo y Nendo por el precio de compra del nabo.',
    xpReward: 120
  },
  {
    missionKey: 'm-dig-fossils',
    title: 'Arqueología con Sócrates',
    description: 'Desentierra los 4 fósiles del día y llévalos a identificar al Museo.',
    xpReward: 220
  },
  {
    missionKey: 'm-water-flowers',
    title: 'Jardinería matutina',
    description: 'Riega los parterres de flores o tu huerto de calabazas para obtener híbridos brillantes.',
    xpReward: 160
  },
  {
    missionKey: 'm-miles-ticket',
    title: 'Aventura con Cupones Nook',
    description: 'Visita el aeródromo de Dodo Airlines o canjea millas en la terminal Nook.',
    xpReward: 250
  }
];

export const WEATHER_OPTIONS: { label: Weather; emoji: string }[] = [
  { label: 'Soleado', emoji: '☀️' },
  { label: 'Nublado', emoji: '⛅' },
  { label: 'Lluvia', emoji: '🌧️' },
  { label: 'Tormenta', emoji: '⛈️' },
  { label: 'Cerezos en flor', emoji: '🌸' },
  { label: 'Nieve', emoji: '❄️' },
  { label: 'Aurora boreal', emoji: '🌌' }
];

export const SPECIAL_VISITORS = [
  'Ninguno / Día tranquilo',
  'CJ (Castor de pesca)',
  'Kamilo (Flick - Escarabajos)',
  'Ladino (Redd - Galería de Arte)',
  'Alcatifa (Saharah - Alfombras)',
  'Estela (Celeste - Lluvia de estrellas)',
  'Gulliver (Gaviota naufragada)',
  'Gullivarrr (Pirata naufragado)',
  'Gandulio (Leif - Arbustos y flores)',
  'Betunio (Kicks - Zapatos y bolsos)',
  'Trini (Label - Reto de moda)',
  'Buh (Wisp - Espíritu)',
  'Juliana (Daisy Mae - Nabos)'
];
