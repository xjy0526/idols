const dimensionOrder = [
  'V1', 'V2',
  'S1', 'S2',
  'M1', 'M2',
  'F1', 'F2',
  'C1', 'C2',
  'I1', 'I2'
];

const dimensionMeta = {
  V1: { name: 'V1 甜感亮度', model: '视觉偏好' },
  V2: { name: 'V2 冷感气场', model: '视觉偏好' },
  S1: { name: 'S1 舞台爆发', model: '舞台吸引' },
  S2: { name: 'S2 舞蹈张力', model: '舞台吸引' },
  M1: { name: 'M1 声线质感', model: '音乐取向' },
  M2: { name: 'M2 作品叙事', model: '音乐取向' },
  F1: { name: 'F1 时尚品牌感', model: '镜头审美' },
  F2: { name: 'F2 镜头表现力', model: '镜头审美' },
  C1: { name: 'C1 亲近感', model: '性格氛围' },
  C2: { name: 'C2 团队感', model: '性格氛围' },
  I1: { name: 'I1 Solo 主角感', model: '偶像叙事' },
  I2: { name: 'I2 经典滤镜', model: '偶像叙事' }
};

const dimExplanations = {
  V1: {
    L: '你更想拥有清冷、克制、带一点距离感的美。',
    M: '你想在甜感和冷感之间自由切换，整体氛围要成立。',
    H: '你想成为明亮、灵动、像会发光的甜感代表。'
  },
  V2: {
    L: '你想保留柔和自然的气质，不追求强压迫感。',
    M: '你想拥有可甜可酷的切换感，风格弹性很重要。',
    H: '冷脸、强气场、走出来就有主角压迫感，是你的目标。'
  },
  S1: {
    L: '你想做舒服耐看的表演，不一定要每秒都炸场。',
    M: '舞台要有层次，能稳住也能在副歌点燃。',
    H: '你想拥有开场就抓人、ending 能出圈的舞台爆发。'
  },
  S2: {
    L: '你更看表情、氛围和站姿，舞蹈技术不是第一优先。',
    M: '舞蹈线条、节奏和整体完成度都要在线。',
    H: '力量、卡点、身体控制和舞蹈存在感会强烈加分。'
  },
  M1: {
    L: '你不一定追求大 vocal，更在意音色是否舒服、有辨识度。',
    M: '音色和唱功都要看，最好能贴合歌曲情绪。',
    H: '稳定高光、live 感和能撑起副歌的声线会明显加分。'
  },
  M2: {
    L: '你更容易被单曲瞬间、hook 和轻快氛围打动。',
    M: '你既看单曲爽感，也会在意回归概念是否完整。',
    H: '你想走能长期陪伴、能讲故事、能形成作品宇宙的路线。'
  },
  F1: {
    L: '你更在意舞台造型和日常穿搭，高奢光环不是必要条件。',
    M: '时尚资源是加分项，但不能盖过人本身。',
    H: '品牌感、红毯、杂志封面和高定适配度会很吸引你。'
  },
  F2: {
    L: '你想拥有生活感和松弛感，不需要每张图都像大片。',
    M: '自然镜头和精修大片你都能接受，看状态和氛围。',
    H: '直拍、机场、红毯、封面都能一秒抓镜头，是你的重点。'
  },
  C1: {
    L: '你想保留一点神秘感和距离感，少说话也很有魅力。',
    M: '你能接受距离感，也会被偶尔露出的反差可爱打动。',
    H: '亲切、好笑、会互动、有综艺感的人更容易让你上头。'
  },
  C2: {
    L: '你更吃个人主角叙事，团体关系不是第一吸引点。',
    M: '个人魅力和团队化学反应你都会看。',
    H: '团魂、队内关系、舞台配合和成员间氛围会给你加很多分。'
  },
  I1: {
    L: '你更想在组合里拥有独特位置，不急着强调 solo 野心。',
    M: '组合舞台和个人舞台都可以，关键是气质要鲜明。',
    H: '独自站出来也能撑满画面的人，会让你觉得很有命定感。'
  },
  I2: {
    L: '你偏爱新鲜感和当下正在上升的青春势能。',
    M: '新生代和经典前辈都能打动你，主要看作品和状态。',
    H: '资历、代表作、时代记忆和传奇感会让你的路线更有传奇感。'
  }
};

const questions = [
  {
    id: 'q1',
    dim: 'V1',
    text: '如果你出道，最想拥有哪种第一眼氛围？',
    options: [
      { label: '清冷、克制，不用很甜也很有记忆点。', value: 1 },
      { label: '甜酷刚刚好，换个表情就像切换概念。', value: 2 },
      { label: '明亮甜感，笑起来像把屏幕点亮。', value: 3 }
    ]
  },
  {
    id: 'q2',
    dim: 'V1',
    text: '你最想被人记住的漂亮是哪一种？',
    options: [
      { label: '像月光一样干净，有点疏离更好。', value: 1 },
      { label: '可爱和高级都沾一点，越耐看越好。', value: 2 },
      { label: '一眼公主感，精致、亮、让人反复看。', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'V2',
    text: '拍概念照时，你更想走哪种出场路线？',
    options: [
      { label: '自然、柔和，像朋友镜头里的漂亮女孩。', value: 1 },
      { label: '今天甜，明天酷，风格切换越多越好。', value: 2 },
      { label: '高冷女王感，眼神一压就有故事。', value: 3 }
    ]
  },
  {
    id: 'q4',
    dim: 'V2',
    text: '作为 idol，你想要哪种反差？',
    options: [
      { label: '私下和台上都柔和，不需要太凶。', value: 1 },
      { label: '甜和酷都能切换，越多面越好。', value: 2 },
      { label: '平时可爱没关系，上台必须有压场气势。', value: 3 }
    ]
  },
  {
    id: 'q5',
    dim: 'S1',
    text: '如果你站上打歌舞台，最想用哪一秒出圈？',
    options: [
      { label: '整体舒服耐看，越看越顺眼。', value: 1 },
      { label: '副歌、bridge、ending 都有记忆点。', value: 2 },
      { label: '开头一个眼神就把观众按在屏幕前。', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'S1',
    text: '你理想中的舞台存在感更像？',
    options: [
      { label: '稳稳地发光，不抢也能被看到。', value: 1 },
      { label: '该收的时候收，该炸的时候炸。', value: 2 },
      { label: '镜头一给就像主舞台，气势直接拉满。', value: 3 }
    ]
  },
  {
    id: 'q7',
    dim: 'S2',
    text: '你的舞蹈直拍最想被夸什么？',
    options: [
      { label: '表情管理和整体氛围，动作不用最猛。', value: 1 },
      { label: '线条、节奏、走位都要舒服。', value: 2 },
      { label: '卡点、力度、身体控制，看完想倒回去。', value: 3 }
    ]
  },
  {
    id: 'q8',
    dim: 'S2',
    text: '如果你被夸“舞台很会跳”，你希望那是因为？',
    options: [
      { label: '很会用表情和氛围讲故事。', value: 1 },
      { label: '动作干净，整体完成度高。', value: 2 },
      { label: '力量感和节奏感太明显，站位边缘也抢眼。', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'M1',
    text: '如果你开麦，最想让人记住哪种声音？',
    options: [
      { label: '音色特别，哪怕一句也能认出来。', value: 1 },
      { label: '音色和唱功都舒服，贴歌最重要。', value: 2 },
      { label: 'live 稳、爆发强，副歌能扛起来。', value: 3 }
    ]
  },
  {
    id: 'q10',
    dim: 'M1',
    text: '你更想成为哪种 vocal 定位？',
    options: [
      { label: '声音有角色感就够了，不必每首都炫技。', value: 1 },
      { label: '稳定、好听、适合团队歌曲。', value: 2 },
      { label: '最好能单独开麦也很有说服力。', value: 3 }
    ]
  },
  {
    id: 'q11',
    dim: 'M2',
    text: '如果有代表曲，你更想留下哪种记忆？',
    options: [
      { label: '一听就上头，hook 洗脑就赢了。', value: 1 },
      { label: '旋律好听，概念也能被记住。', value: 2 },
      { label: '越听越有情绪，像一段长期陪伴。', value: 3 }
    ]
  },
  {
    id: 'q12',
    dim: 'M2',
    text: '你想要的回归路线更像？',
    options: [
      { label: '每次都给一个新鲜爽点。', value: 1 },
      { label: '好听、好看、概念完整就行。', value: 2 },
      { label: '能持续讲故事，有自己的音乐世界。', value: 3 }
    ]
  },
  {
    id: 'q13',
    dim: 'F1',
    text: '你的机场图或品牌活动，最想被夸哪一点？',
    options: [
      { label: '穿得舒服好看，有自己的味道。', value: 1 },
      { label: '造型和本人适配，不硬凹。', value: 2 },
      { label: '高奢、封面、红毯，越有品牌感越好。', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'F1',
    text: '如果你拿到大牌合作，你更希望它代表什么？',
    options: [
      { label: '挺好，但舞台和作品才是底盘。', value: 1 },
      { label: '是加分项，说明个人风格被认可。', value: 2 },
      { label: '是魅力版图的一部分，越有品牌感越好。', value: 3 }
    ]
  },
  {
    id: 'q15',
    dim: 'F2',
    text: '你最想产出哪类神图？',
    options: [
      { label: '生活感随拍，越松弛越好。', value: 1 },
      { label: '自然图和精修大片都会存。', value: 2 },
      { label: '红毯、封面、直拍神图，镜头感要强。', value: 3 }
    ]
  },
  {
    id: 'q16',
    dim: 'F2',
    text: '你觉得自己的“神图体质”最应该靠什么成立？',
    options: [
      { label: '状态自然，不像在被镜头绑架。', value: 1 },
      { label: '五官、造型、氛围都要刚好。', value: 2 },
      { label: '每个角度都知道怎么抓光和表情。', value: 3 }
    ]
  },
  {
    id: 'q17',
    dim: 'C1',
    text: '拍团综和物料时，你更想呈现哪种性格氛围？',
    options: [
      { label: '少说一点也没关系，保持神秘更好。', value: 1 },
      { label: '有距离感，但偶尔露出反差可爱。', value: 2 },
      { label: '亲切、好笑、很会互动，像能一起聊天。', value: 3 }
    ]
  },
  {
    id: 'q18',
    dim: 'C1',
    text: '如果靠综艺出圈，你希望原因是什么？',
    options: [
      { label: '保持一点神秘感，主要靠舞台和照片。', value: 1 },
      { label: '偶尔露出反差，给人一点惊喜。', value: 2 },
      { label: '亲切好笑，会互动，越看越想追。', value: 3 }
    ]
  },
  {
    id: 'q19',
    dim: 'C2',
    text: '在团体舞台里，你更想被怎样看见？',
    options: [
      { label: '个人亮点必须被凸显出来。', value: 1 },
      { label: '个人亮点和团队配合都要有。', value: 2 },
      { label: '成员之间的化学反应和团魂很重要。', value: 3 }
    ]
  },
  {
    id: 'q20',
    dim: 'C2',
    text: '队内关系物料里，你更想留下哪种印象？',
    options: [
      { label: '个人魅力很强，不靠关系线也成立。', value: 1 },
      { label: '互动自然，好看的关系线会加分。', value: 2 },
      { label: '团感非常强，是大家追随你的快乐来源。', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'I1',
    text: '你最想拥有哪种主角感？',
    options: [
      { label: '在组合里有独特位置就够了。', value: 1 },
      { label: '组合和个人都能成立。', value: 2 },
      { label: '一个人站出来也能撑满舞台。', value: 3 }
    ]
  },
  {
    id: 'q22',
    dim: 'I1',
    text: '如果你发 solo，你更希望外界怎么评价？',
    options: [
      { label: '不急，组合舞台里的定位已经很适合我。', value: 1 },
      { label: '可以试试，风格对就行。', value: 2 },
      { label: '必须有，我天生就该有个人舞台。', value: 3 }
    ]
  },
  {
    id: 'q23',
    dim: 'I2',
    text: '你想要自己的时代感来自哪里？',
    options: [
      { label: '新鲜、正在上升，陪我一路变强。', value: 1 },
      { label: '当下状态好，代际标签不用太重。', value: 2 },
      { label: '代表作、名场面和传奇滤镜都要有。', value: 3 }
    ]
  },
  {
    id: 'q24',
    dim: 'I2',
    text: '你更想走哪种职业路线？',
    options: [
      { label: '新生代，一路往上走。', value: 1 },
      { label: '当下状态好就可以，不被代际限制。', value: 2 },
      { label: '有资历、有经典舞台、有很多故事的前辈。', value: 3 }
    ]
  }
];

const localImagePath = (file) => `./images/idols/${encodeURIComponent(file)}`;

const commonsImage = (file, width = 760) =>
  file.startsWith('http') || file.startsWith('./') || file.startsWith('/')
    ? file
    : localImagePath(file);

const idolInfo = {
  '张元英': {
    displayName: 'Wonyoung 장원영 张元英',
    achievement: 'IVE 门面与中心位，时尚、美妆和杂志资源持续在线。'
  },
  '柳智敏': {
    displayName: 'Karina 카리나 柳智敏',
    achievement: 'aespa 队长，冷感视觉和舞台中心感长期出圈。'
  },
  Jennie: {
    displayName: 'Jennie 제니 金珍妮',
    achievement: 'BLACKPINK 成员，个人曲和时尚影响力都很强。'
  },
  Jisoo: {
    displayName: 'Jisoo 지수 金智秀',
    achievement: 'BLACKPINK 成员，solo 曲 FLOWER 与演员路线关注度高。'
  },
  'Rosé': {
    displayName: 'Rosé 로제 朴彩英',
    achievement: 'BLACKPINK 主唱，solo 音乐和全球舞台表现亮眼。'
  },
  IU: {
    displayName: 'IU 아이유 李知恩',
    achievement: '国民 solo 歌手，多首音源代表作和影视成绩都很稳。'
  },
  '泫雅': {
    displayName: 'HyunA 현아 金泫雅',
    achievement: 'solo 代表作和强烈舞台风格让她成为性感 icon。'
  },
  '名井南': {
    displayName: 'Mina ミナ 名井南',
    achievement: 'TWICE 成员，优雅舞线、芭蕾气质和安静高级感很突出。'
  },
  Lisa: {
    displayName: 'Lisa 리사 莉莎',
    achievement: 'BLACKPINK 主舞与 rapper，solo 曲和全球时尚影响力都很强。'
  },
  '金泰妍': {
    displayName: 'Taeyeon 태연 金泰妍',
    achievement: '少女时代队长，solo、OST 和主唱口碑长期稳定。'
  },
  '林允儿': {
    displayName: 'Yoona 윤아 林允儿',
    achievement: '少女时代门面，演员、广告和国民好感度长期在线。'
  },
  '金秋天': {
    displayName: 'Gaeul 가을 金秋天',
    achievement: 'IVE 成员，rap、舞蹈线条和清冷成熟的队内色彩鲜明。'
  },
  Suzy: {
    displayName: 'Suzy 수지 裴秀智',
    achievement: 'miss A 出身，国民初恋标签和演员路线都很有影响力。'
  },
  Sunmi: {
    displayName: 'Sunmi 선미 李宣美',
    achievement: 'solo 概念代表，Gashina、Siren 等舞台记忆点很强。'
  },
  '安宥真': {
    displayName: 'Yujin 유진 安宥真',
    achievement: 'IVE 队长，舞台、综艺和品牌活动表现都很稳定。'
  },
  Winter: {
    displayName: 'Winter 윈터 金旼炡',
    achievement: 'aespa 成员，vocal 高光和清冷视觉兼具。'
  },
  '朴志效': {
    displayName: 'Jihyo 지효 朴志效',
    achievement: 'TWICE 队长主唱，现场唱跳能量和 solo 表现突出。'
  },
  Rei: {
    displayName: 'Rei レイ 直井怜',
    achievement: 'IVE 成员，独特色彩、rap 和声线辨识度很高。'
  },
  Liz: {
    displayName: 'Liz 리즈 金志垣',
    achievement: 'IVE 主唱线，甜美音色和 live 稳定感突出。'
  },
  '金采源': {
    displayName: 'Chaewon 채원 金采源',
    achievement: 'LE SSERAFIM 队长，vocal、舞台和短发标识度鲜明。'
  },
  '凑崎纱夏': {
    displayName: 'Sana サナ 凑崎纱夏',
    achievement: 'TWICE 成员，亲和力、话题名场面和品牌感都很强。'
  },
  '娜琏': {
    displayName: 'Nayeon 나연 林娜琏',
    achievement: 'TWICE 开场中心，solo 曲 POP! 辨识度很高。'
  },
  '平井桃': {
    displayName: 'Momo モモ 平井桃',
    achievement: 'TWICE 主舞，身体控制和舞蹈实力是代表标签。'
  },
  Tzuyu: {
    displayName: 'Tzuyu 쯔위 周子瑜',
    achievement: 'TWICE 门面，清甜视觉和长期成长线持续受关注。'
  }
};

const display = (name) => idolInfo[name]?.displayName ?? name;
const achievement = (name) => idolInfo[name]?.achievement ?? '';
const galleryImage = (name, file) => ({
  key: name,
  name: display(name),
  achievement: achievement(name),
  src: commonsImage(file, 640)
});

export const idolGalleryImages = [
  galleryImage('张元英', 'Jang Won-young IVE Marie Claire Korea.jpg'),
  galleryImage('张元英', 'Jang Won-young at Music Bank attending a fan meet on September 16, 2022.jpg'),
  galleryImage('张元英', 'Jang Won-young at Rimowa event on 13052023 (7).png'),
  galleryImage('柳智敏', '250111 aespa Karina 03.jpg'),
  galleryImage('柳智敏', "20250226 Aespa's Karina 카리나 02.jpg"),
  galleryImage('柳智敏', 'KARINA - AESPA - 2025.01.28.jpg'),
  galleryImage('Jennie', 'Jennie Kim 2023.jpg'),
  galleryImage('Jennie', 'Jennie Kim 2020.jpg'),
  galleryImage('Jennie', 'Jennie Kim 2024 (facecrop).png'),
  galleryImage('Jisoo', 'Jisoo for Marie Claire Korea X Dior on 21092022 (11).png'),
  galleryImage('Jisoo', 'Kim Ji-Soo in 2020 PUBG (2).png'),
  galleryImage('Jisoo', 'Kim Ji-Soo in 2020 Dior (15).png'),
  galleryImage('Rosé', 'Blackpink Rosé Rimowa 1.jpg'),
  galleryImage('Rosé', 'Rosé at a fan signing event on September 25, 2022 (cropped).jpg'),
  galleryImage('Rosé', '200221 BLACKPINK Rosé leaving Incheon International Airport.jpg'),
  galleryImage('IU', 'IU posing for Marie Claire Korea March 2022 issue 01.jpg'),
  galleryImage('IU', '230428 백상예술대상 IU (5).jpg'),
  galleryImage('IU', '250718 Lee Ji-eun (이지은).png'),
  galleryImage('泫雅', 'HYUNA (현아) – INCHEON AIRPORT – 2023.07.20.jpg'),
  galleryImage('泫雅', '20230720 Kim HyunA in July 2023 07.jpg'),
  galleryImage('泫雅', 'HyunA from acrofan.jpg'),
  galleryImage('名井南', "20230711 TWICE's Mina Myoui 01.png"),
  galleryImage('名井南', 'Mina Myoui for Pearly Gates Korea.jpg'),
  galleryImage('名井南', 'Mina Sharon Myoui 名井 南 2024 08.jpg'),
  galleryImage('金泰妍', 'TAEYEON 2023.06.09 (cropped).jpg'),
  galleryImage('金泰妍', 'Kim Taeyeon in 2023.png'),
  galleryImage('金泰妍', 'SNSD Taeyeon.jpg'),
  galleryImage('林允儿', '20230720 Im Yoona on July 2023 05.png'),
  galleryImage('林允儿', '240226 YOONA 210 (53606128090).jpg'),
  galleryImage('林允儿', 'YOONA (윤아) – 2ND BLUE DRAGON SERIES AWARDS.jpg'),
  galleryImage('Lisa', '20240314 Lisa Manoban 03.jpg'),
  galleryImage('Lisa', '180819 블랙핑크 팬싸인회 코엑스 라이브프라자 리사.jpg'),
  galleryImage('Lisa', 'Blackpink Lisa GMP 240622.png'),
  galleryImage('金秋天', 'IVE Gaeul in 2023.jpg'),
  galleryImage('金秋天', 'IVE Gaeul on the way to Music Bank - October 13, 2023 01.jpg'),
  galleryImage('金秋天', 'Ive Gaeul at Seoul Fashion Week, 1 September 2025 01.png'),
  galleryImage('Suzy', "Bae Suzy at OB Beer Hanmac 'As Smooth As Possible' campaign, 3 April 2024 01.jpg"),
  galleryImage('Suzy', 'Bae Suzy 2nd Blue Dragon Series Awards 2.jpg'),
  galleryImage('Suzy', '20190501 Bae Suzy 배수지 Baeksang Arts Awards (1).jpg'),
  galleryImage('Sunmi', 'Sunmi March 2022.jpg'),
  galleryImage('Sunmi', 'Sunmi at a fanmeeting on July 9, 2022.jpg'),
  galleryImage('Sunmi', 'Lee Sunmi 이선미 2024 02.jpg'),
  galleryImage('安宥真', 'MMA 2023 IVE Yujin 1.jpg'),
  galleryImage('安宥真', 'IVE An Yujin in Marie Claire Korea Feb 23, 2023.jpg'),
  galleryImage('安宥真', '20230918 An Yu-jin (안유진).jpg'),
  galleryImage('Winter', 'WINTER (윈터) – POLO RALPH LAUREN – 2025.03.26 – P6.jpg'),
  galleryImage('Winter', '250315-16 aespa Winter 03.jpg'),
  galleryImage('Winter', '250111 aespa Winter 01.jpg'),
  galleryImage('朴志效', 'JIHYO (지효) – FANCAM – 2023.08.26 – P1.png'),
  galleryImage('朴志效', 'Jihyo in 2017(2).jpg'),
  galleryImage('朴志效', 'Park Jihyo for Pearly Gates Korea 01.jpg'),
  galleryImage('Rei', "20231202 IVE's Naoi Rei at the MAMA2023 07.jpg"),
  galleryImage('Rei', 'Rei for Longines, February 2025 01.png'),
  galleryImage('Rei', 'Rei of Ive at the Valentino event, March 20, 2026 (1).png'),
  galleryImage('Liz', 'Ive Liz at Rimowa event on 13052023.jpg'),
  galleryImage('Liz', 'IVE Liz in December 2021.jpg'),
  galleryImage('Liz', 'IVE Liz on the way to Music Bank - October 13, 2023.jpg'),
  galleryImage('金采源', '221127 Kim Chae-won (LE SSERAFIM).jpg'),
  galleryImage('金采源', '20230306 Kim Chae-won for Marie Claire Korea.png'),
  galleryImage('金采源', '240329 Kim Chae-won (1).jpg'),
  galleryImage('凑崎纱夏', 'Sana Minatozaki 湊﨑 紗夏 20250118 02.jpg'),
  galleryImage('凑崎纱夏', 'Sana Minatozaki 2022 (2) (cropped).jpg'),
  galleryImage('凑崎纱夏', 'Sana Minatozaki.jpg'),
  galleryImage('娜琏', 'NAYEON 2023.jpg'),
  galleryImage('娜琏', '20230310 Im Nayeon 07.png'),
  galleryImage('娜琏', '20250417 Im Nayeon 02.jpg'),
  galleryImage('平井桃', '20230918 Momo Hirai 平井 もも 2023 09.jpg'),
  galleryImage('平井桃', 'Momo TWICE Jul 2022 (3).jpg'),
  galleryImage('平井桃', 'TWICE MOMO April 2024.jpg'),
  galleryImage('Tzuyu', '20240305 Chou Tzuyu 周子瑜 02.jpg'),
  galleryImage('Tzuyu', '20230817 Chou Tzuyu for pearly gates 01.jpg'),
  galleryImage('Tzuyu', 'Chou Tzuyu at the Golden Disc Awards 2019.png')
];

const preferredResultImageFiles = {
  '张元英': './images/idols/wonyoung-white-sailor.jpg',
  '柳智敏': './images/idols/karina-black-beret-white-hair.jpg',
  Jennie: 'Kim Jennie (김제니) 05.jpg',
  Jisoo: './images/idols/jisoo-250219.jpg',
  'Rosé': '221120 Rosé “Hard to Love” during Born Pink World Tour (cropped 2).jpg',
  IU: 'IU at The Golden Hour concert in Seoul, 17 September 2022 03.jpg',
  '泫雅': './images/idols/hyuna-20230720-cropped.jpg',
  '名井南': 'Mina performing at SAC 2016.jpg',
  Lisa: './images/idols/lisa-bulgari-2024.jpg',
  '金泰妍': 'Taeyeon Airport Departure 2023 6.jpg',
  '林允儿': '20230720 Im Yoona on July 2023 03.jpg',
  '金秋天': 'MMA 2023 IVE Gaeul 2.jpg',
  Suzy: '20241128 Bae Suzy CELINE photocall.jpg',
  Sunmi: './images/idols/sunmi-2024.jpg',
  '安宥真': './images/idols/yujin-fendi.jpg',
  Winter: './images/idols/winter-polo-2025.jpg',
  '朴志效': './images/idols/jihyo-fancam-2023.jpg',
  Rei: './images/idols/rei-mma-2023.jpg',
  Liz: './images/idols/liz-221112.jpg',
  '金采源': '220428 Le Sserafim Kim Chae-won (1).jpg',
  '凑崎纱夏': 'Sana Minatozaki for Pearly Gates Korea 01.jpg',
  '娜琏': '20250417 Im Nayeon 01.jpg',
  '平井桃': '20230918 Momo Hirai (모모).jpg',
  Tzuyu: './images/idols/tzuyu-2023.jpg'
};

const img = (name) => {
  const preferredFile = preferredResultImageFiles[name];

  if (preferredFile) {
    return commonsImage(preferredFile);
  }

  return idolGalleryImages.find((item) => item.key === name)?.src ?? idolGalleryImages[0].src;
};

const outcomeProfiles = {
  WONYOUNG: {
    cn: display('张元英'),
    group: 'IVE',
    achievement: achievement('张元英'),
    intro: '张元英型画像：明亮、精致，镜头一给就有公主主角感。',
    desc: '“漂亮得很明确”的偶像吸引力。她不需要把力量感推到最满，只要站在那里，比例、表情、造型和镜头感就能形成完整叙事。甜感不是幼态甜，而是带着自信管理和高级完成度的甜。',
    image: img('张元英'),
    oneLiner: '公主感和镜头体质双满分',
    commentary: '成为目标落在精致视觉、时尚适配和稳定主角光。',
    background: 'IVE 成员，常被讨论的关键词包括视觉中心、时尚资源、舞台表情管理和新生代代表性。',
    tags: ['公主感', '神图体质', '新生代']
  },
  KARINA: {
    cn: display('柳智敏'),
    group: 'aespa',
    achievement: achievement('柳智敏'),
    intro: 'Karina 型画像：冷感、强气场，高级感美貌里带一点反差可爱。',
    desc: '一眼有压迫感的门面型偶像。上台时要稳、要锋利、要像概念本身；下台偶尔露出的软萌反差，会让这份高冷更有层次。视觉冲击和舞台控制力缺一不可。',
    image: img('柳智敏'),
    oneLiner: 'AI 冷脸和舞台压场感',
    commentary: '冷感大女主气质很强，突然变软的那一秒也很加分。',
    background: 'aespa 队长，代表标签包括冷感视觉、舞台中心、概念适配和反差魅力。',
    tags: ['冷感', '强气场', '反差']
  },
  JENNIE: {
    cn: display('Jennie'),
    group: 'BLACKPINK',
    achievement: achievement('Jennie'),
    intro: 'Jennie 型画像：松弛、锋利，时尚感和 solo 主角感都很强。',
    desc: '一种“不用解释也很贵”的气质。舞台上有攻击性，生活照里又有松弛感；她可以是 girl crush，也可以是甜酷猫系。个人风格和品牌识别度突出，独自站出来也能改变画面。',
    image: img('Jennie'),
    oneLiner: '猫系松弛感和高奢主角光',
    commentary: '轻轻一抬眼就能把氛围带走。',
    background: 'BLACKPINK 成员，常见标签包括时尚影响力、solo 代表作、舞台反差和猫系气质。',
    tags: ['猫系', '时尚', 'solo']
  },
  JISOO: {
    cn: display('Jisoo'),
    group: 'BLACKPINK',
    achievement: achievement('Jisoo'),
    intro: 'Jisoo 型画像：端正漂亮、亲近自然，带着很稳的队内温度。',
    desc: '不需要过度用力的美。她的吸引力来自稳定、舒服、亲切和一种很端正的漂亮。照片里有视觉记忆点，物料里也能靠性格留住人：好笑、可靠、温柔，但不是没有主见。',
    image: img('Jisoo'),
    oneLiner: '端正美貌和温柔综艺感',
    commentary: '漂亮之外，还有漂亮背后那种很有人味的稳定感。',
    background: 'BLACKPINK 成员，代表标签包括视觉、演员路线、亲近感和团队氛围。',
    tags: ['端正美', '亲近感', '稳定']
  },
  ROSE: {
    cn: display('Rosé'),
    group: 'BLACKPINK',
    achievement: achievement('Rosé'),
    intro: 'Rosé 型画像：声线、氛围、时尚大片和舞台情绪都要有。',
    desc: '声音和情绪的牵引力很强。比起单纯甜或酷，她更重要的是自己的音乐颜色、舞台叙事和时尚氛围。纤细但有力量的表达，越能把歌唱成个人故事，越有辨识度。',
    image: img('Rosé'),
    oneLiner: '声线氛围感和大片体质',
    commentary: '不只是脸，“她一开口，气氛就变了”才是核心吸引力。',
    background: 'BLACKPINK 成员，常被讨论的关键词包括独特声线、solo 音乐表达、时尚封面和舞台情绪。',
    tags: ['声线', '氛围', '大片']
  },
  IU: {
    cn: display('IU'),
    group: 'Solo',
    achievement: achievement('IU'),
    intro: 'IU 型画像：作品能陪很久，声音和叙事比瞬间热闹更重要。',
    desc: '长期主义的吸引力。漂亮当然重要，但真正留下来的是作品、歌词、声音和成长故事。温柔里有韧性，可以轻声唱，也可以用代表作建立自己的世界。',
    image: img('IU'),
    oneLiner: '作品陪伴型国民 solo',
    commentary: '能把歌、故事和人生阶段都串起来。',
    background: '韩国代表性 solo 歌手与演员，代表标签包括国民度、唱作叙事、长期作品生命力。',
    tags: ['作品', '声线', '国民度']
  },
  HYUNA: {
    cn: display('泫雅'),
    group: 'Solo',
    achievement: achievement('泫雅'),
    intro: 'HyunA 型画像：性感、自由，舞台一开就不准备低调。',
    desc: '鲜明到不可替代的人。她可以争议、可以强烈、可以不走安全路线，但必须有自己的风格。身体表现、舞台火花和很直接的个人表达是核心吸引力。',
    image: img('泫雅'),
    oneLiner: '自由张扬的性感舞台派',
    commentary: '风格锋利度很高：别人学得像，但很难学成她。',
    background: '以强烈舞台风格和 solo 代表作闻名，关键词包括性感、舞台表现和个人表达。',
    tags: ['张扬', '性感', '自由']
  },
  MINA: {
    cn: display('名井南'),
    group: 'TWICE',
    achievement: achievement('名井南'),
    intro: 'Mina 型画像：优雅、安静，芭蕾舞线和高级气质都很明显。',
    desc: '柔和但不单薄的吸引力。她的漂亮不靠强压迫感，而是靠线条、姿态、眼神和稳定的氛围感慢慢留下来。舞台上克制干净，镜头里有一种安静又贵气的存在。',
    image: img('名井南'),
    oneLiner: '优雅舞线和安静高级感',
    commentary: '芭蕾底色、清冷气质和温柔稳定的镜头存在感很突出。',
    background: 'TWICE 成员，代表标签包括优雅舞线、安静气质、芭蕾底色和团队里的清冷色彩。',
    tags: ['优雅', '舞线', '清冷']
  },
  LISA: {
    cn: display('Lisa'),
    group: 'BLACKPINK / Solo',
    achievement: achievement('Lisa'),
    intro: 'Lisa 型画像：主舞气场、强节奏感，舞台一开就有全球 star 感。',
    desc: '动起来最有说服力的类型。她的吸引力来自身体控制、节奏、表情和镜头统治力，也来自时尚大片里很锋利的个人风格。甜酷之外，更重要的是一站出来就能把舞台变成自己的主场。',
    image: img('Lisa'),
    oneLiner: '主舞统治力和全球时尚感',
    commentary: '舞蹈爆发、镜头压场和独自撑满画面的能力都很强。',
    background: 'BLACKPINK 成员与 solo 歌手，代表标签包括主舞、rap、全球时尚影响力和 solo 舞台传播度。',
    tags: ['主舞', '全球感', 'solo']
  },
  TAEYEON: {
    cn: display('金泰妍'),
    group: '少女时代 / Solo',
    achievement: achievement('金泰妍'),
    intro: 'Taeyeon 型画像：声音是核心，经典团体记忆和 solo 作品都很硬。',
    desc: 'vocal 的可信度很高。她不一定每次都靠最外放的舞台气势取胜，但一开口就能让人进入情绪。时代记忆和长期 solo 生命力同样突出。',
    image: img('金泰妍'),
    oneLiner: '声音、情绪和二代经典滤镜',
    commentary: '能用声线建立安全感，也能用作品持续更新自己。',
    background: '少女时代队长与代表性 solo 歌手，标签包括主唱、OST/solo 作品和二代女团记忆。',
    tags: ['主唱', '经典', 'solo']
  },
  YOONA: {
    cn: display('林允儿'),
    group: '少女时代',
    achievement: achievement('林允儿'),
    intro: 'Yoona 型画像：清透、亲切、镜头漂亮，也有长期国民好感。',
    desc: '干净、自然、耐看的美。她的魅力不是压迫式的，而是越看越舒服：有门面记忆，也有演员路线和综艺亲近感。美貌里带一点温和的生命力。',
    image: img('林允儿'),
    oneLiner: '清透门面和国民好感',
    commentary: '长久耐看的漂亮和让人愿意靠近的亲和力并存。',
    background: '少女时代成员与演员，关键词包括门面、国民度、清透气质和长期曝光度。',
    tags: ['清透', '门面', '国民度']
  },
  GAEUL: {
    cn: display('金秋天'),
    group: 'IVE',
    achievement: achievement('金秋天'),
    intro: 'Gaeul 型画像：清冷成熟、线条利落，rap 和舞蹈色彩都很鲜明。',
    desc: '成熟但不厚重的队内色彩。她的美偏清冷、干净、带一点猫系距离感；舞台上靠线条、节奏和表情完成记忆点。不是最吵闹的存在，但一给到镜头就很有风格。',
    image: img('金秋天'),
    oneLiner: '清冷成熟的 IVE 色彩',
    commentary: '线条利落、气质冷静，舞台里有很清楚的个人风格。',
    background: 'IVE 成员，代表标签包括rap、舞蹈线条、清冷成熟气质和队内大姐姐感。',
    tags: ['清冷', '舞线', 'rap']
  },
  SUZY: {
    cn: display('Suzy'),
    group: 'miss A / Actor',
    achievement: achievement('Suzy'),
    intro: 'Suzy 型画像：初恋感、演员氛围、国民好感和漂亮完成度。',
    desc: '干净明亮、但不幼稚的吸引力。她可以是舞台偶像，也可以是演员镜头里的故事主角。大众好感、自然美和温柔氛围都很稳。',
    image: img('Suzy'),
    oneLiner: '国民初恋感和演员镜头',
    commentary: '漂亮之外，还有那种不费力的好感度。',
    background: 'miss A 出身歌手与演员，代表标签包括国民初恋、演员路线、广告好感度。',
    tags: ['初恋感', '演员感', '好感度']
  },
  SUNMI: {
    cn: display('Sunmi'),
    group: 'Solo',
    achievement: achievement('Sunmi'),
    intro: 'Sunmi 型画像：概念、氛围、solo 风格和一点危险的迷人感。',
    desc: '完整概念的打动力很强。她不只是漂亮，而是能把歌曲、妆造、动作和表情变成一个故事。奇妙、成熟、带一点危险边缘的舞台美学很突出。',
    image: img('Sunmi'),
    oneLiner: '概念型 solo 氛围玩家',
    commentary: '“这首歌只有她能这样演”的独特感很强。',
    background: 'Wonder Girls 出身 solo 歌手，代表标签包括概念消化、舞台氛围和个人音乐风格。',
    tags: ['概念', '氛围', 'solo']
  },
  YUJIN: {
    cn: display('安宥真'),
    group: 'IVE',
    achievement: achievement('安宥真'),
    intro: 'Yujin 型画像：健康明亮、队长感、舞台和综艺都能打。',
    desc: '很有生命力的人。她不是单一甜美或单一高冷，而是明亮、可靠、会带队，也能在综艺里自然放开。舞台上有力，性格上也好亲近。',
    image: img('安宥真'),
    oneLiner: '明亮队长感和综艺生命力',
    commentary: '元气、可靠和越看越喜欢的成长感都很明显。',
    background: 'IVE 队长，代表标签包括队长气质、舞台表现、综艺感和新生代上升势能。',
    tags: ['队长', '元气', '综艺']
  },
  WINTER: {
    cn: display('Winter'),
    group: 'aespa',
    achievement: achievement('Winter'),
    intro: 'Winter 型画像：清冷小猫脸、声线高光和舞台反差。',
    desc: '外表清冷、声音有亮点、上台能突然变锋利的类型。她的吸引力在于反差：看起来小只、干净，但舞台和 vocal 高光都能让人一下记住。',
    image: img('Winter'),
    oneLiner: '清冷小猫和高光声线',
    commentary: '反差感很强：越像安静雪天，爆发时越惊喜。',
    background: 'aespa 成员，关键词包括清冷视觉、vocal 高光、舞台反差和概念适配。',
    tags: ['清冷', '声线', '反差']
  },
  JIHYO: {
    cn: display('朴志效'),
    group: 'TWICE',
    achievement: achievement('朴志效'),
    intro: 'Jihyo 型画像：主唱实力、队长能量和健康爆发的舞台。',
    desc: '“可靠”是她的关键词。她的魅力来自强 vocal、强舞台、强责任感，也来自长期在团队里撑住中心的能量。热烈、正向，能把现场唱跳点燃。',
    image: img('朴志效'),
    oneLiner: '能量型主唱队长',
    commentary: '实力和生命力都很足，尤其是现场一开麦就让人安心。',
    background: 'TWICE 队长与主唱，代表标签包括 vocal、舞台能量、领导力和长期团队核心。',
    tags: ['主唱', '队长', '能量']
  },
  REI: {
    cn: display('Rei'),
    group: 'IVE',
    achievement: achievement('Rei'),
    intro: 'Rei 型画像：软糯可爱、独特声线和队内氛围感。',
    desc: '轻巧、可爱、有点特别的存在感。她不一定要用最强气场压场，但只要开口或给到表情，就有自己的颜色。软软的可爱里带着很清楚的辨识度。',
    image: img('Rei'),
    oneLiner: '软糯可爱和独特色彩',
    commentary: '小表情、小声线、小反差积累出独特存在感。',
    background: 'IVE 成员，代表标签包括可爱氛围、rap/声线辨识度和队内独特定位。',
    tags: ['可爱', '声线', '队内色彩']
  },
  LIZ: {
    cn: display('Liz'),
    group: 'IVE',
    achievement: achievement('Liz'),
    intro: 'Liz 型画像：甜美、主唱感和温柔稳定的队内存在。',
    desc: '温柔又有实力的类型。她的吸引力来自甜美视觉、声音稳定和不抢但很重要的团队位置。慢慢升温、越了解越喜欢。',
    image: img('Liz'),
    oneLiner: '甜美主唱和温柔稳定感',
    commentary: '不吵闹的可爱之外，也有真正能把歌唱稳的实力。',
    background: 'IVE 成员，代表标签包括主唱、甜美视觉、团队声线和温柔氛围。',
    tags: ['甜美', '主唱', '温柔']
  },
  CHAEWON: {
    cn: display('金采源'),
    group: 'LE SSERAFIM',
    achievement: achievement('金采源'),
    intro: 'Chaewon 型画像：短发元气、舞台锐度、队长感和可爱反差。',
    desc: '看起来可爱但上台很利落的人。她有元气，也有纪律；能唱能跳，还带一点让人想反复看的短发标识度。团队核心感和反差舞台都很突出。',
    image: img('金采源'),
    oneLiner: '元气队长和利落舞台',
    commentary: '可爱外壳下藏着很强的完成度。',
    background: 'LE SSERAFIM 队长，代表标签包括短发识别度、舞台完成度、vocal 和团队核心。',
    tags: ['元气', '队长', '反差']
  },
  SANA: {
    cn: display('凑崎纱夏'),
    group: 'TWICE',
    achievement: achievement('凑崎纱夏'),
    intro: 'Sana 型画像：甜、软、会撒娇，但镜头感和时尚感也很强。',
    desc: '亲近感很容易击中人。她的甜不是单薄的可爱，而是有互动能力、镜头意识和成熟美的一整套魅力。能把氛围变软，也能在大片里突然变得高级。',
    image: img('凑崎纱夏'),
    oneLiner: '甜软亲近感和成熟镜头',
    commentary: '会互动、会放电，越看越难移开眼。',
    background: 'TWICE 成员，代表标签包括撒娇名场面、甜美亲近感、时尚活动和队内化学反应。',
    tags: ['甜软', '亲近感', '镜头']
  },
  NAYEON: {
    cn: display('娜琏'),
    group: 'TWICE',
    achievement: achievement('娜琏'),
    intro: 'Nayeon 型画像：兔系元气、开场中心和明亮 vocal。',
    desc: '让人心情变好的偶像。她的魅力很直接：笑容、元气、开场抓人、声线明亮。“她一出来，舞台就开机了”的感觉很强。',
    image: img('娜琏'),
    oneLiner: '兔系元气和开场中心',
    commentary: '明亮、好听，也能把气氛拉起来。',
    background: 'TWICE 成员与 solo 歌手，代表标签包括开场中心、兔系笑容、vocal 和元气感。',
    tags: ['元气', '中心', '兔系']
  },
  MOMO: {
    cn: display('平井桃'),
    group: 'TWICE',
    achievement: achievement('平井桃'),
    intro: 'Momo 型画像：舞蹈机器、身体控制和舞台力量感。',
    desc: '硬实力很具体地击中人。她的吸引力来自舞蹈张力、卡点、身体控制和强烈的舞台记忆点。可爱可以有，但最重要的是动起来那一下。',
    image: img('平井桃'),
    oneLiner: '舞蹈张力和身体控制',
    commentary: '会跳的人很有吸引力，尤其是动作一出就知道练过很多年的类型。',
    background: 'TWICE 成员，代表标签包括主舞、舞蹈实力、舞台身体表现和队内反差。',
    tags: ['主舞', '力量', '反差']
  },
  TZUYU: {
    cn: display('Tzuyu'),
    group: 'TWICE',
    achievement: achievement('Tzuyu'),
    intro: 'Tzuyu 型画像：清甜门面、安静气质和长线养成感。',
    desc: '安静、干净、耐看的漂亮。她的美不需要一直外放，反而越是克制越有余韵。清甜视觉、成长变化和团队里稳定的温柔存在感都很鲜明。',
    image: img('Tzuyu'),
    oneLiner: '清甜门面和安静成长线',
    commentary: '干净漂亮之外，还有那种不争不抢但一直在变好的感觉。',
    background: 'TWICE 成员，代表标签包括门面、清甜气质、成长线和团队稳定感。',
    tags: ['清甜', '门面', '成长']
  }
};

const outcomePatterns = [
  { code: 'WONYOUNG', pattern: 'LMLLHMLMHMHH' },
  { code: 'KARINA', pattern: 'MLMMLHHLHHMM' },
  { code: 'JENNIE', pattern: 'HLLHMMHHLLMH' },
  { code: 'JISOO', pattern: 'LMLHMLHHLLLL' },
  { code: 'ROSE', pattern: 'LLLMLLLLHMLH' },
  { code: 'IU', pattern: 'HHMMLLLHMMML' },
  { code: 'HYUNA', pattern: 'HLHLHHMHMHLH' },
  { code: 'MINA', pattern: 'MHLHMMLLLLLM' },
  { code: 'LISA', pattern: 'HHMLHLLLMHHH' },
  { code: 'TAEYEON', pattern: 'HLLMHMHHLHMM' },
  { code: 'YOONA', pattern: 'MHHLMLMMHMHH' },
  { code: 'GAEUL', pattern: 'MMHLHMHLMHML' },
  { code: 'SUZY', pattern: 'MMHMLMLHMLLH' },
  { code: 'SUNMI', pattern: 'LMMHHHLMHHHM' },
  { code: 'YUJIN', pattern: 'HHLHLLMMHMLL' },
  { code: 'WINTER', pattern: 'MLMHMLMHLLLH' },
  { code: 'JIHYO', pattern: 'LLHLLHLMMLMM' },
  { code: 'REI', pattern: 'LMMLLMMMLLHM' },
  { code: 'LIZ', pattern: 'HMHMLHMLLLHM' },
  { code: 'CHAEWON', pattern: 'MLMMMLHHHMHM' },
  { code: 'SANA', pattern: 'HHHHMMHLHMHL' },
  { code: 'NAYEON', pattern: 'LMMLMHHLMMML' },
  { code: 'MOMO', pattern: 'LHLMHHMMLHML' },
  { code: 'TZUYU', pattern: 'MHHHHHMMMHLL' }
];

export const homeIdolOrder = [
  'WONYOUNG', 'KARINA',
  'JISOO', 'JENNIE', 'ROSE', 'LISA',
  'GAEUL', 'YUJIN', 'REI', 'LIZ',
  'WINTER',
  'NAYEON', 'MOMO', 'SANA', 'JIHYO', 'MINA', 'TZUYU',
  'CHAEWON',
  'TAEYEON', 'YOONA',
  'SUZY',
  'IU', 'HYUNA', 'SUNMI'
];

function buildVector(pattern) {
  const levels = pattern.replace(/-/g, '').split('');

  if (levels.length !== dimensionOrder.length) {
    throw new Error(`Invalid outcome pattern length: ${pattern}`);
  }

  return dimensionOrder.map((dimensionId, index) => ({
    dim: dimensionId,
    model: dimensionMeta[dimensionId].model,
    name: dimensionMeta[dimensionId].name,
    level: levels[index],
    explanation: dimExplanations[dimensionId][levels[index]]
  }));
}

const outcomes = outcomePatterns.map(({ code, pattern }) => ({
  code,
  pattern: `${pattern.slice(0, 2)}-${pattern.slice(2, 4)}-${pattern.slice(4, 6)}-${pattern.slice(6, 8)}-${pattern.slice(8, 10)}-${pattern.slice(10)}`,
  isSpecial: false,
  vector: buildVector(pattern),
  ...outcomeProfiles[code]
}));

export const quizData = {
  source: 'custom-k-idol-becoming-v2',
  questionCount: questions.length,
  specialQuestionCount: 0,
  dimensionMeta,
  questions,
  specialQuestions: [],
  dimensionOrder,
  dimExplanations
};

export const outcomesData = {
  meta: {
    title: '你更想成为谁',
    subtitle: '测你的韩国女 idol 成为型画像。',
    note: '这是粉丝向成为型测试，不是业务能力排名。结果只代表你更想拥有哪种舞台、镜头、性格和作品气质。'
  },
  dimensionOrder,
  dimensionMeta,
  dimExplanations,
  specialTriggers: {},
  outcomes
};
