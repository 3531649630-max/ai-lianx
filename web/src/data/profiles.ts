import type { BodyAnalysis, ContentItem, FaceAnalysis, Platform, PostureCheck, StyleOption } from '../types'

const m = (label: string, value: string, score: number) => ({ label, value, score })

export const FACE_SEEDS = ['oval', 'round', 'square', 'long', 'heart', 'diamond'] as const

type FaceSeed = (typeof FACE_SEEDS)[number]

interface FaceProfile {
  id: FaceSeed
  name: string
  enName: string
  blurb: string
  summary: string
  metrics: ReturnType<typeof m>[]
  pros: string[]
  tweaks: string[]
  keywords: string[]
  advice: string[]
}

export const FACE_PROFILES: FaceProfile[] = [
  {
    id: 'oval',
    name: '瓜子脸 · 椭圆脸',
    enName: 'Oval Face',
    blurb: '面部长度约为宽度的 1.5 倍，下颌流畅收窄、比例均衡，是传统美学里最标准的上镜脸。',
    summary: '整体比例均衡、妆容可塑性高。建议把“优点”做加法：突出眉眼立体感，避免过度修容改变原生轮廓。',
    metrics: [
      m('脸型长宽比', '≈ 1.5 : 1', 93),
      m('三庭均衡度', '均衡', 95),
      m('下颌线流畅度', '流畅柔和', 90),
      m('五官和谐度', '高', 91),
    ],
    pros: ['三庭比例标准，几乎适合所有主流眉形', '下颌收窄，侧脸轮廓耐看', '发型的试错成本最低'],
    tweaks: ['额头偏宽时可加一点碎发修饰发际线', '长中庭用户避免把眉头画得过平', '唇形偏薄时可适当外扩唇线增加量感'],
    keywords: ['瓜子脸妆容教程', '鹅蛋脸日常妆', '瓜子脸修容', '椭圆形脸眉形'],
    advice: ['用修容粉轻扫下颌角外侧，保持天生收窄感', '把妆容重心放在眉眼，眼线轻微拉长提升精致度', '口红可选玫瑰豆沙这类“原生感”色系', '避免全脸铺满高光，T 区局部提亮即可'],
  },
  {
    id: 'round',
    name: '圆脸',
    enName: 'Round Face',
    blurb: '面部长度与宽度接近，脸颊饱满、下颌轮廓圆润，整体亲和力强、显年轻。',
    summary: '妆容主线是“视觉拉长”：通过挑眉、立体侧影与露额发型，把饱满感转化为柔和的纵向线条。',
    metrics: [
      m('脸型长宽比', '接近 1 : 1', 72),
      m('脸颊饱满度', '偏高', 85),
      m('下颌线条', '圆润', 74),
      m('减龄感', '强', 90),
    ],
    pros: ['自带幼态感与亲和力', '苹果肌饱满，笑起来的感染力强', '适合甜美系妆容风格'],
    tweaks: ['齐刘海会进一步缩短脸长，慎用', '两侧贴头直发容易显脸圆，可用蓬松卷度破开', '腮红不要横涂在苹果肌中间，改为斜向上扫'],
    keywords: ['圆脸修容教程', '圆脸挑眉画法', '圆脸显瘦发型', '圆脸日常妆'],
    advice: ['用挑眉/小欧美眉形拉长脸型，眉尾略上扬', '颧骨斜下到下颌做 C 型修容，视觉收窄', 'T 区和下巴提亮，把视觉中心拉回中庭', '拍照时微微侧脸 30°，轮廓会更显瘦'],
  },
  {
    id: 'square',
    name: '方脸',
    enName: 'Square Face',
    blurb: '下颌角偏方、轮廓线条硬朗，面部长宽接近，带有独立、高级的气场。',
    summary: '妆容重点是“柔化”：用弯眉与圆弧腮红平衡硬朗感，修容只放在下颌转折处而非整片涂黑。',
    metrics: [
      m('下颌角明显度', '较明显', 76),
      m('气场强度', '强', 92),
      m('长宽比', '接近 1 : 1', 70),
      m('骨相立体度', '高', 88),
    ],
    pros: ['骨相撑得起镜头，越简约越显高级', '适合知性、复古、欧美系风格', '佩戴耳饰的修饰空间大'],
    tweaks: ['过粗的平直眉会强化方正感', '厚齐刘海压住额头会显得下颌更宽', '下颌修容不可整片涂黑，会显脏'],
    keywords: ['方脸修容教程', '方脸适合的眉形', '方脸发型推荐', '方脸气质妆容'],
    advice: ['眉形选有弧度的标准眉/弯眉，眉峰微靠外侧', '修容沿下颌转折处斜扫并充分晕开，衔接脖子', '腮红用圆弧形从颧骨扫向太阳穴，柔化线条', '发型优先选择中长卷发或侧分，遮挡部分下颌'],
  },
  {
    id: 'long',
    name: '长脸',
    enName: 'Long Face',
    blurb: '面部纵向比例大于横向，常见额头偏长或中庭偏长，整体有知性与成熟气质。',
    summary: '妆容主线是“缩短面中、横向拉宽”：平眉与卧蚕缩短比例，横向腮红与齐下巴发长平衡长度。',
    metrics: [
      m('脸长占比', '偏高', 74),
      m('额头/中庭', '偏长', 72),
      m('气质成熟度', '偏高', 82),
      m('立体感', '中上', 80),
    ],
    pros: ['中庭长通常鼻梁立体，侧脸耐看', '自带成熟知性气质', '适合清冷、轻熟风格'],
    tweaks: ['挑眉会把脸拉得更长，避开高挑眉峰', '发际线过高时用胎毛碎发或刘海缩短上庭', '修容不要纵向延伸，避免强化长度'],
    keywords: ['长脸妆容教程', '长中庭妆容思路', '长脸适合的发型', '缩短面中化妆'],
    advice: ['眉形以平缓一字眉为主，横向延展眉尾', '强调卧蚕与下眼影，视觉上缩短中庭', '腮红横向轻扫在面中，切分纵向比例', '上庭长可用空气刘海、发际线粉修饰'],
  },
  {
    id: 'heart',
    name: '心形脸',
    enName: 'Heart Face',
    blurb: '额头与颧骨偏宽、下巴尖小，呈倒三角轮廓，上宽下窄，非常适合上镜。',
    summary: '妆容重点是“平衡上下量感”：提亮下颌与下巴、用眉眼妆容弱化额头宽度，让视线聚焦五官。',
    metrics: [
      m('额头宽度', '偏宽', 68),
      m('下巴宽度', '窄小', 90),
      m('上镜感', '高', 91),
      m('眉眼表现力', '高', 88),
    ],
    pros: ['下巴尖小、轮廓上镜', '眉眼区域空间充足，可玩妆范围大', '适合精致、混血感妆容'],
    tweaks: ['厚重的平刘海会压住上半张脸', '太抢眼的下唇色会把视线拉向下巴', '太阳穴凹陷者避免两侧修容过重'],
    keywords: ['心形脸妆容教程', '倒三角脸修容', '心形脸适合的眉形', '宽额头发型'],
    advice: ['眉形避开粗平眉，用柔和弯眉收窄额头观感', '腮红斜扫在苹果肌外缘，衔接下颌阴影', '下颌与下巴轻扫高光，增加下半张脸量感', '发型用侧分卷发修饰太阳穴与宽额头'],
  },
  {
    id: 'diamond',
    name: '菱形脸',
    enName: 'Diamond Face',
    blurb: '颧骨是全脸最宽处，太阳穴与下颌向内收窄，骨骼感强、辨识度高。',
    summary: '妆容重点是“补凹陷、收颧骨”：太阳穴与面中提亮，颧骨下方轻修容，让轮廓更饱满协调。',
    metrics: [
      m('颧骨宽度', '全脸最宽', 66),
      m('太阳穴饱满度', '偏凹陷', 68),
      m('轮廓辨识度', '高', 93),
      m('欧美妆适配度', '很高', 90),
    ],
    pros: ['骨骼结构立体，高级感强', '适合欧美妆、轻泰妆', '戴帽子与高颅顶造型优势明显'],
    tweaks: ['完全遮住额头的贴头皮造型会放大颧骨', '太阳穴凹陷处不要用深色修容', '妆面过脏的深色侧影会让面部显刻薄'],
    keywords: ['菱形脸妆容教程', '菱形脸修容', '颧骨高修容教程', '太阳穴凹陷修饰'],
    advice: ['太阳穴与眼下三角提亮，补足凹陷处饱满度', '颧骨最高点下方轻扫修容，边缘充分晕开', '眉形略带弧度的挑眉可平衡颧骨宽度', '卷发或蓬松侧分发在颧骨处做遮挡修饰'],
  },
]

export const BODY_SEEDS = ['rectangle', 'hourglass', 'pear', 'apple', 'slender'] as const

type BodySeed = (typeof BODY_SEEDS)[number]

interface BodyProfile {
  id: BodySeed
  name: string
  enName: string
  blurb: string
  summary: string
  metrics: ReturnType<typeof m>[]
  traits: string[]
  postures: Omit<PostureCheck, 'score'>[]
  keywords: string[]
  advice: string[]
  coaches: Array<{ name: string; focus: string; fans: string }>
}

export const BODY_PROFILES: BodyProfile[] = [
  {
    id: 'rectangle',
    name: 'H 型 · 矩形身材',
    enName: 'Rectangle Body',
    blurb: '肩、腰、臀的宽度比较接近，身体呈直线感，通常腰腹没有明显内收，是清瘦、中性的基础身形。',
    summary: '穿搭重点是“制造腰线”，训练重点是“增宽肩背+收紧核心”，用线条感替代曲线感同样好看。',
    metrics: [
      m('肩腰宽度差', '较小', 70),
      m('腰臀差', '较小', 68),
      m('直线感', '明显', 90),
      m('穿衣中性风适配', '高', 88),
    ],
    traits: ['肩、腰、臀接近等宽', '腰线偏直，曲线起伏小', '通常四肢匀称、显瘦'],
    postures: [
      { name: '圆肩 / 含胸', desc: '长时间伏案容易让肩胛前引，影响背型线条' },
      { name: '头前伸（探颈）', desc: '屏幕使用时长偏长时常见，会弱化体态气质' },
      { name: '骨盆前后倾', desc: '久坐人群骨盆状态不稳定，需要核心训练平衡' },
    ],
    keywords: ['H型身材显瘦穿搭', '背薄训练教程', '直角肩训练', 'H型身材健身计划'],
    advice: ['优先建立“背薄+肩线”训练：划船、面拉、肩外旋', '穿搭选高腰收腰款，人为制造腰线', '避免上下同样宽松的直筒搭配', '每天做胸椎灵活度与肩胛归位练习'],
    coaches: [
      { name: '体态设计师·Lina', focus: 'H 型直线感塑形与体态矫正', fans: '86.2w' },
      { name: '阿Mo的直角肩计划', focus: '肩背线条与核心稳定训练', fans: '43.7w' },
      { name: '普拉提教练Zoey', focus: '脊柱灵活与整体线条拉伸', fans: '128.4w' },
    ],
  },
  {
    id: 'hourglass',
    name: 'X 型 · 沙漏身材',
    enName: 'Hourglass Body',
    blurb: '肩宽与臀宽接近，腰围明显内收，正面呈 X 型曲线。胸、腰、臀比例本身协调，是公认的“衣架子”身型。',
    summary: '穿搭重点是“贴曲线不遮曲线”，训练重点是“保腰臀比、强化臀腿支撑”，避免脂肪分布改变腰线。',
    metrics: [
      m('腰臀比', '低（曲线明显）', 92),
      m('肩臀宽度比', '接近', 90),
      m('曲线感', '很强', 95),
      m('上衣版型适配度', '高', 88),
    ],
    traits: ['肩与臀接近等宽', '腰围明显小于胸围与臀围', '侧看立体曲线明显'],
    postures: [
      { name: '骨盆前倾', desc: '腰曲过大容易伴随骨盆前倾，让腰部代偿' },
      { name: '膝超伸', desc: '重心靠前时常见，站姿久后膝盖压力偏大' },
      { name: '核心力量偏弱', desc: '曲线型腰背需要深层核心维持稳定' },
    ],
    keywords: ['沙漏身材穿搭', '腰臀比训练', '蜜桃臀居家教程', '沙漏型身材健身'],
    advice: ['臀部与大腿训练为主（髋推、保加利亚蹲），维持臀线', '每天做核心平板支撑类训练，稳定骨盆', '穿搭选收腰连衣裙、高腰裤，凸显腰线', '避免腰部过度束紧的坐姿习惯，保护腰椎'],
    coaches: [
      { name: '腰臀比教练 Mia', focus: '沙漏身材臀腿塑形', fans: '205.1w' },
      { name: '蜜桃臀工程·大旗', focus: '居家臀部训练与骨盆稳定', fans: '72.8w' },
      { name: 'Yoga凡凡', focus: '核心与腰背柔韧训练', fans: '39.5w' },
    ],
  },
  {
    id: 'pear',
    name: 'A 型 · 梨形身材',
    enName: 'Pear Body',
    blurb: '上半身偏瘦，肩窄腰细，脂肪更容易囤积在臀部与大腿，形成上窄下宽的 A 型。',
    summary: '穿搭思路是“上繁下简、提亮上半身”；训练思路是“上肢加量+臀部提拉+下肢拉伸”，而不是盲目少吃饭。',
    metrics: [
      m('肩宽相对值', '偏窄', 66),
      m('臀腿量感', '偏大', 80),
      m('腰线清晰度', '清晰', 88),
      m('裙装适配度', '高', 90),
    ],
    traits: ['上半身偏纤细', '胯部与大腿量感较明显', '腰臀差偏大、曲线在下半身'],
    postures: [
      { name: '假胯宽 / 股骨内旋', desc: '久坐与髋外旋肌弱时常见，视觉加宽大腿根' },
      { name: '腿型轻微 O/X', desc: '膝踝排列不稳定会放大腿部线条问题' },
      { name: '臀部肌群失忆', desc: '臀部不发力时，走路容易用大腿代偿' },
    ],
    keywords: ['梨形身材显瘦穿搭', '梨形身材瘦腿教程', '假胯宽矫正', '梨形身材健身计划'],
    advice: ['先矫正髋关节位置：蚌式开合、臀桥激活臀部', '上肢加练肩背，平衡上下比例', '穿搭用垫肩、泡泡袖加宽肩线，下装选直筒/伞裙', '避免紧身浅色牛仔裤集中视线在胯部'],
    coaches: [
      { name: '梨形自救·Kiki', focus: '梨形身材穿搭与臀腿塑形', fans: '94.6w' },
      { name: '下肢塑形小梁', focus: '假胯宽矫正与腿部拉伸', fans: '58.3w' },
      { name: '周周练肩背', focus: '上肢线条训练，平衡 H 形比例', fans: '31.2w' },
    ],
  },
  {
    id: 'apple',
    name: 'O 型 · 苹果型身材',
    enName: 'Apple Body',
    blurb: '脂肪更集中在腰腹与中段，四肢相对纤细，身体中段呈 O 型或圆形轮廓。',
    summary: '核心不是“练哪瘦哪”，而是全身有氧+力量结合，先提升代谢，再做腰腹紧致与体态矫正。',
    metrics: [
      m('腰腹量感', '偏大', 78),
      m('四肢纤细度', '较高', 86),
      m('胸围量感', '中上', 82),
      m('穿衣显瘦潜力', '高（选对版型时）', 84),
    ],
    traits: ['脂肪集中于腰腹与胸背', '四肢与肩相对纤细', '整体线条偏圆润'],
    postures: [
      { name: '骨盆前倾 / 小腹突出', desc: '久坐加核心无力时常见，让小腹看起来更大' },
      { name: '腹横肌无力', desc: '深层核心弱会造成腰围维持困难' },
      { name: '圆肩含胸', desc: '中段量感大时容易不自觉含胸代偿' },
    ],
    keywords: ['苹果型身材显瘦穿搭', '腰腹紧致训练', '苹果型身材减脂', '骨盆前倾矫正'],
    advice: ['把全身力量训练排在局部训练前面，先提升代谢', '每天呼吸式核心训练激活腹横肌（真空腹练习）', '穿搭选 V 领与高腰 A 字裙，避开腰部束带', '体态上挺胸沉肩，能立刻改善中段视觉效果'],
    coaches: [
      { name: '核心燃脂·阿泰', focus: '苹果型身材减脂与核心训练', fans: '167.9w' },
      { name: '体态矫正师老周', focus: '骨盆前倾与深层核心激活', fans: '211.3w' },
      { name: 'Sally的轻食健身', focus: '饮食搭配与全身减脂', fans: '76.5w' },
    ],
  },
  {
    id: 'slender',
    name: 'I 型 · 纤细型身材',
    enName: 'Slender Body',
    blurb: '整体骨架纤细、四肢修长，曲线起伏小，身体呈细长直线。属于高挑清冷、擅长线条感的类型。',
    summary: '健身目标是“长线条+紧致度”：用柔韧训练与轻力量增加肌肉细节，而不是追求围度暴涨。',
    metrics: [
      m('整体纤细度', '很高', 94),
      m('四肢修长度', '长', 92),
      m('曲线起伏', '小', 72),
      m('柔韧性潜力', '高', 85),
    ],
    traits: ['骨架纤细、线条细长', '肌肉量偏低时容易显单薄', '体态挺拔时自带清冷气质'],
    postures: [
      { name: '圆肩 / 翼状肩胛', desc: '背部力量不足时肩胛容易翘起' },
      { name: '头前伸（探颈）', desc: '纤细型人群更需要注意头部排列' },
      { name: '背部肌群薄弱', desc: '缺乏拉力训练时上半身线条缺乏细节' },
    ],
    keywords: ['纤细身材线条训练', '普拉提拉伸教程', 'I型身材穿搭', '小骨架塑形'],
    advice: ['以普拉提、瑜伽配合轻重量背部训练为主', '优先练肩背小肌群（划船、面拉、倒立撑辅助）', '穿搭适合叠穿与垂坠感长线条，避免过度宽大', '营养上保证蛋白质，避免一味节食'],
    coaches: [
      { name: '柔韧普拉提·Suki', focus: '纤细身材线条与体态训练', fans: '62.9w' },
      { name: '小骨架增肌日记', focus: '低体重人群轻力量塑形', fans: '28.6w' },
      { name: 'Zoey美背计划', focus: '背部细节与肩胛稳定', fans: '44.1w' },
    ],
  },
]

const FACE_HAIRSTYLES: Record<FaceSeed, StyleOption[]> = {
  oval: [
    {
      id: 'oval-h1',
      title: '轻盈锁骨发',
      note: '长度落在锁骨、发尾微微内收，正好突出流畅的下颌比例。',
      tags: ['显气质', '好打理', '不压身高'],
    },
    {
      id: 'oval-h2',
      title: '高颅顶长直发',
      note: '让视觉重心上移，把五官作为整张脸的绝对焦点。',
      tags: ['极简', '大女主', '垂顺'],
    },
    {
      id: 'oval-h3',
      title: '法式慵懒卷',
      note: '大而柔的弧度增加空气感，不遮盖眉眼，风格松弛高级。',
      tags: ['法式', '松弛感', '氛围卷'],
    },
  ],
  round: [
    {
      id: 'round-h1',
      title: '露额空气刘海长卷',
      note: '用纵向波浪拉长脸部比例，避免齐刘海进一步压低视觉重心。',
      tags: ['显脸长', '甜美', '纵向拉长'],
    },
    {
      id: 'round-h2',
      title: '高颅顶直发',
      note: '头顶蓬松、脸颊两侧保留 S 形弧度，让圆润感变成亲和力。',
      tags: ['清爽', '显窄', '通勤'],
    },
    {
      id: 'round-h3',
      title: '八字刘海锁骨卷',
      note: '两侧弧线向脸颊内收，露出额头，轻盈又不幼稚。',
      tags: ['八字刘海', '减龄', '空气感'],
    },
  ],
  square: [
    {
      id: 'square-h1',
      title: '侧分大波浪',
      note: '卷度放在颧骨以下，用弧度柔化偏硬朗的下颌线。',
      tags: ['柔化轮廓', '复古', '气场'],
    },
    {
      id: 'square-h2',
      title: '高层次锁骨发',
      note: '轻盈碎发层叠，把视线从下颌角转移到发丝线条。',
      tags: ['利落', '显轻盈', '都市感'],
    },
    {
      id: 'square-h3',
      title: '复古微卷中长发',
      note: '弧度柔和、不贴头皮，恰好平衡方脸的独立气质。',
      tags: ['复古', '温柔', '中长发'],
    },
  ],
  long: [
    {
      id: 'long-h1',
      title: '空气刘海 + 齐下巴发',
      note: '在中段横向切分面长，让偏长的脸部比例立刻变柔和。',
      tags: ['缩短脸长', '空气刘海', '日系'],
    },
    {
      id: 'long-h2',
      title: '法式短卷',
      note: '压低发顶高度并用弧度增加两侧宽度，横向平衡纵向比例。',
      tags: ['复古', '加宽两侧', '俏皮'],
    },
    {
      id: 'long-h3',
      title: '微卷锁骨发',
      note: '在中段增加视觉宽度，让长脸线条更有节奏感。',
      tags: ['显比例', '轻盈', '层次感'],
    },
  ],
  heart: [
    {
      id: 'heart-h1',
      title: '侧分大卷发',
      note: '用发量平衡上宽下窄的轮廓，同时修饰额头与太阳穴。',
      tags: ['平衡量感', '上镜', '大气'],
    },
    {
      id: 'heart-h2',
      title: '碎发修饰发际',
      note: '少量碎发弱化额宽，把亮点留给你小巧的下巴。',
      tags: ['自然', '修饰额头', '易打理'],
    },
    {
      id: 'heart-h3',
      title: '法式刘海 + 锁骨卷',
      note: '柔和整体轮廓，同时突出眉眼，是心形脸的上镜组合。',
      tags: ['法式', '甜美', '氛围感'],
    },
  ],
  diamond: [
    {
      id: 'diamond-h1',
      title: '蓬松侧分发',
      note: '在颧骨外侧形成自然遮挡，弱化全脸最宽点。',
      tags: ['遮颧骨', '御姐', '高辨识度'],
    },
    {
      id: 'diamond-h2',
      title: '高颅顶波浪卷',
      note: '增加顶部高度，用纵向比例平衡偏宽的颧骨。',
      tags: ['增高颅顶', '欧美感', '气质'],
    },
    {
      id: 'diamond-h3',
      title: '层次大卷发',
      note: '弧度覆盖太阳穴与颧骨区域，让棱角分明的脸型更饱满。',
      tags: ['层次感', '丰盈', '港风'],
    },
  ],
}

const BODY_OUTFITS: Record<BodySeed, StyleOption[]> = {
  rectangle: [
    {
      id: 'rectangle-o1',
      title: '高腰收腰穿搭',
      note: '用高腰裤、收腰上衣或系带外套人为制造腰线，让直线身材更有节奏。',
      tags: ['制造腰线', '通勤', '干练'],
    },
    {
      id: 'rectangle-o2',
      title: '上繁下简层次',
      note: '垫肩、泡泡袖搭配垂感直筒下装，让肩背更立体、比例更均衡。',
      tags: ['平衡比例', '显肩线', '韩系'],
    },
    {
      id: 'rectangle-o3',
      title: '西装式 A 字裙',
      note: '利落的直线剪裁延续 H 型优势，穿出中性高级感。',
      tags: ['中性风', '高级感', '利落'],
    },
  ],
  hourglass: [
    {
      id: 'hourglass-o1',
      title: '收腰连衣裙',
      note: '贴合曲线但不勒身，用一条裙子放大腰臀比优势。',
      tags: ['突出腰线', '约会', '优雅'],
    },
    {
      id: 'hourglass-o2',
      title: '高腰微喇裤 + 贴身针织',
      note: '上装扎进高腰裤，让曲线在纵向线条里更明显。',
      tags: ['复古', '显比例', '日常'],
    },
    {
      id: 'hourglass-o3',
      title: '法式 V 领开衩裙',
      note: '纵向留白加开衩设计，优雅显瘦又不浪费曲线。',
      tags: ['法式', '显瘦', '女人味'],
    },
  ],
  pear: [
    {
      id: 'pear-o1',
      title: '上繁下简，视线向上',
      note: '垫肩、亮色或印花上衣搭配直筒、A 字下装，让注意力集中在上半身。',
      tags: ['显上半身', '平衡比例', '通勤'],
    },
    {
      id: 'pear-o2',
      title: '垂感阔腿裤 + 短上衣',
      note: '用纵向垂坠线条收窄下半身，同时露出纤细腰线。',
      tags: ['遮胯', '显腿长', '休闲'],
    },
    {
      id: 'pear-o3',
      title: '长款外套 H 型叠穿',
      note: '外套用直线轮廓遮蔽胯宽，内搭再强调腰线，藏肉又立体。',
      tags: ['叠穿', '秋冬', '显瘦'],
    },
  ],
  apple: [
    {
      id: 'apple-o1',
      title: 'V 领 + A 字高腰',
      note: '纵向线条从领口延伸，避开腰腹的同时露出锁骨优势。',
      tags: ['显瘦', '遮小腹', '清爽'],
    },
    {
      id: 'apple-o2',
      title: '垂感宽松连衣裙',
      note: '不束腰的垂坠面料自然下坠，藏住腰腹又显高。',
      tags: ['藏腹', '度假', '松弛'],
    },
    {
      id: 'apple-o3',
      title: '衬衫 + 高腰直筒裤',
      note: '衬衫下摆自然垂放或只塞一角，干净利落、不强调中段。',
      tags: ['通勤', '利落', '基础款'],
    },
  ],
  slender: [
    {
      id: 'slender-o1',
      title: '叠穿 + 垂坠长线条',
      note: '外套、长裙、针织披肩叠加量感，又不压缩高挑比例。',
      tags: ['增加量感', '清冷', '秋冬'],
    },
    {
      id: 'slender-o2',
      title: '垫肩收腰上衣',
      note: '小骨架也能撑出轮廓，一件就能改变纤细单薄感。',
      tags: ['撑气场', '上镜', '通勤'],
    },
    {
      id: 'slender-o3',
      title: '修身高腰套装',
      note: '强化细长比例，穿出利落、高智感的清冷风格。',
      tags: ['高智感', '修身', '都市'],
    },
  ],
}

const DOUYIN_FACE_TEMPLATES = [
  (q: string) => `${q}｜保姆级教学`,
  (q: string) => `新手也能学会：${q}`,
  (q: string) => `实测有效的${q}，跟练就对了`,
  (q: string) => `化妆师逐帧讲解：${q}`,
]

const XHS_FACE_TEMPLATES = [
  (q: string) => `${q}｜亲测干货`,
  (q: string) => `刷到就是赚到：${q}`,
  (q: string) => `照着学就变好看！${q}合集`,
  (q: string) => `妆容拆解：${q}`,
]

const DOUYIN_FACE_AUTHORS = ['Niki化妆日记', '小A的化妆台', 'Momo美妆研究所', '清野化妆师']
const XHS_FACE_AUTHORS = ['一颗奶糖妆', 'Jelly美妆', '晚晚的梳妆台', 'Mia的变美笔记']

const FACE_EMOJIS = ['💄', '✨', '🎨', '👁️']
const BODY_EMOJIS = ['🏋️', '🧘', '🔥', '💪']

const seedInt = (seed: number, salt: number, min: number, max: number) => {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453
  return min + Math.floor((x - Math.floor(x)) * (max - min + 1))
}

const likesOf = (n: number) => (n >= 10 ? `${n.toFixed(1)}w` : `${n * 1000}`.replace(/000$/, 'k'))

const durationOf = (n: number) => {
  const minutes = 1 + Math.floor(n % 5)
  const seconds = (n * 7) % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const buildFaceItems = (profile: FaceProfile, platform: Platform, seed: number): ContentItem[] => {
  const templates = platform === 'douyin' ? DOUYIN_FACE_TEMPLATES : XHS_FACE_TEMPLATES
  const authors = platform === 'douyin' ? DOUYIN_FACE_AUTHORS : XHS_FACE_AUTHORS
  return profile.keywords.map((query, i) => {
    const n = seedInt(seed, i, 1, 120)
    return {
      id: `face-${platform}-${profile.id}-${i}`,
      platform,
      title: templates[i](query),
      author: authors[seedInt(seed, i * 3 + 7, 0, authors.length - 1)],
      duration: durationOf(n),
      likes: likesOf(n),
      emoji: FACE_EMOJIS[seedInt(seed, i * 5 + 3, 0, FACE_EMOJIS.length - 1)],
      query,
    }
  })
}

const buildBodyItems = (profile: BodyProfile, platform: Platform, seed: number): ContentItem[] => {
  const q = profile.keywords
  const posts = platform === 'douyin'
    ? [
        `${q[0]}，教练带你练`,
        `${q[1]}｜跟练 7 天版`,
        `别瞎练！${q[2]}的思路是这样的`,
        `${q[3]}｜新手友好`,
      ]
    : [
        `${q[0]}｜干货清单`,
        `${q[1]}，亲测变化很大`,
        `答应我看完：${q[2]}`,
        `${q[3]}｜收藏慢慢练`,
      ]
  return posts.map((title, i) => {
    const coach = profile.coaches[seedInt(seed, i * 9 + 1, 0, profile.coaches.length - 1)]
    const n = seedInt(seed, i * 4 + 2, 1, 180)
    return {
      id: `body-${platform}-${profile.id}-${i}`,
      platform,
      title,
      author: coach.name,
      duration: durationOf(n),
      likes: likesOf(n),
      emoji: BODY_EMOJIS[seedInt(seed, i * 2 + 5, 0, BODY_EMOJIS.length - 1)],
      query: q[i] ?? q[0],
    }
  })
}

export const toFaceAnalysis = (profile: FaceProfile, seed: number): FaceAnalysis => ({
  ...profile,
  hairstyles: FACE_HAIRSTYLES[profile.id],
  contents: [
    ...buildFaceItems(profile, 'douyin', seed),
    ...buildFaceItems(profile, 'xhs', seed + 101),
  ],
})

export const toBodyAnalysis = (profile: BodyProfile, seed: number): BodyAnalysis => ({
  ...profile,
  outfits: BODY_OUTFITS[profile.id],
  postures: profile.postures.map((p, i) => ({
    ...p,
    score: seedInt(seed, i + 13, 58, 86),
  })),
  contents: [
    ...buildBodyItems(profile, 'douyin', seed + 37),
    ...buildBodyItems(profile, 'xhs', seed + 211),
  ],
})

export const findFaceProfile = (id: string) => FACE_PROFILES.find((p) => p.id === id) ?? FACE_PROFILES[0]
export const findBodyProfile = (id: string) => BODY_PROFILES.find((p) => p.id === id) ?? BODY_PROFILES[0]
