import { Lesson, Kana } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "第一课 艺术之秋",
    words: [
      { jp: "待ち合せる", cn: "等候、碰头", kana: "まちあわせる", tone: "⑤", pos: "动2", group: 2, transitivity: "他" },
      { jp: "美術館", cn: "美术馆", kana: "びじゅつかん", tone: "③", pos: "名" },
      { jp: "歩く", cn: "走", kana: "あるく", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "見る", cn: "看", kana: "みる", tone: "①", pos: "动2", group: 2, transitivity: "他" },
      { jp: "都内", cn: "东京都内", kana: "とない", tone: "①", pos: "名" },
      { jp: "真っすぐ", cn: "笔直", kana: "まっすぐ", tone: "③", pos: "副/名" },
      { jp: "交差点", cn: "十字路口", kana: "こうさてん", tone: "◎", pos: "名" },
      { jp: "曲がる", cn: "拐弯", kana: "まがる", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "左", cn: "左边", kana: "ひだり", tone: "◎", pos: "名" },
      { jp: "掛かる", cn: "花费、悬挂", kana: "かかる", tone: "②", pos: "动1", group: 1, transitivity: "自" }
    ],
    grammar: [
      {
        title: "动词假定形 (～ば)",
        construction: "五段: u->eba | 一段: ru->reba | サ变: sureba | カ变: kureba",
        explanation: "动词的活用形之一。主要用法是后接接续助词「ば」，表示假定条件。",
        examples: ["書く → 書けば", "起きる → 起きれば", "する → すれば", "くる → くれば"]
      },
      {
        title: "～ことがある",
        construction: "Vた形/V辞書形 + ことがある",
        explanation: "接动词过去式后：表示曾经有过某种经历（“曾经……”）。接动词现在时连体形后：表示有时发生某种情况（“有时……”）。",
        examples: ["わたしは東京でアルバイトをすることがあります。（我有时在东京打工。）"]
      },
      {
        title: "～ながら",
        construction: "Vます形(去掉ます) + ながら",
        explanation: "表示同一主体同时进行两个动作（“一边……一边……”），或表示后项是在前项的状态下进行的动作、行为。",
        examples: ["歩きながら話しましょう。（边走边说吧。）"]
      },
      {
        title: "～つもり",
        construction: "V连体形/Nの + つもり",
        explanation: "表示想法、打算、计划。否定时通常用「～つもりはない」。",
        examples: ["その試験を受けるつもりはない。（我不想参加那个考试。）"]
      },
      {
        title: "～ばいい",
        construction: "V假定形 + ばいい",
        explanation: "表示劝诱或提议对方采取某种特定行为（“……就可以”，“……就行”）。",
        examples: ["分らない時は、この辞典を使えばいい。（不懂时，查阅这本词典就可以了。）"]
      },
      {
        title: "～と",
        construction: "V终止形 + と",
        explanation: "表示前后两个动作、行为相继发生或几乎同时进行。前者多为后者的条件或前提（“一……就……”）。",
        examples: ["その道をまっすぐ行くと左側に見えますよ。（顺着那条路一直走，在左侧就可以看到。）"]
      }
    ]
  },
  {
    id: 2,
    title: "第二课 日本人的中国留学",
    words: [
      { jp: "珍しい", cn: "稀奇", kana: "めずらしい", tone: "④", pos: "形1" },
      { jp: "増える", cn: "增加", kana: "ふえる", tone: "②", pos: "动2", group: 2, transitivity: "自" },
      { jp: "経済", cn: "经济", kana: "けいざい", tone: "①", pos: "名" },
      { jp: "関心", cn: "关心", kana: "かんしん", tone: "◎", pos: "名" },
      { jp: "持つ", cn: "持有", kana: "もつ", tone: "①", pos: "动1", group: 1, transitivity: "他" },
      { jp: "一生懸命", cn: "拼命地", kana: "いっしょうけんめい", tone: "⑤", pos: "副/名" },
      { jp: "書く", cn: "写", kana: "かく", tone: "①", pos: "动1", group: 1, transitivity: "他" },
      { jp: "思う", cn: "想", kana: "おもう", tone: "②", pos: "动1", group: 1, transitivity: "他" },
      { jp: "正しい", cn: "正确的", kana: "ただしい", tone: "③", pos: "形1" },
      { jp: "困難", cn: "困难", kana: "こんなん", tone: "①", pos: "名/形2" },
      { jp: "交流", cn: "交流", kana: "こうりゅう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "親しい", cn: "亲密的", kana: "したしい", tone: "③", pos: "形1" },
      { jp: "早い", cn: "早/快", kana: "はやい", tone: "②", pos: "形1" },
      { jp: "上達", cn: "进步", kana: "じょうたつ", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "大変", cn: "够呛/严重", kana: "たいへん", tone: "◎", pos: "形2/副" },
      { jp: "元気", cn: "精神", kana: "げんき", tone: "①", pos: "名/形2" },
      { jp: "学期", cn: "学期", kana: "がっき", tone: "◎", pos: "名" },
      { jp: "悪い", cn: "坏", kana: "わるい", tone: "②", pos: "形1" },
      { jp: "交換", cn: "交换", kana: "こうかん", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "成績", cn: "成绩", kana: "せいせき", tone: "◎", pos: "名" },
      { jp: "無理だ", cn: "勉强", kana: "むりだ", tone: "①", pos: "形2" },
      { jp: "努力", cn: "努力", kana: "どりょく", tone: "①", pos: "名/动3", group: 3 },
      { jp: "大丈夫", cn: "没关系", kana: "だいじょうぶ", tone: "③", pos: "形2" }
    ],
    grammar: [
      {
        title: "动词推量形 (意志形)",
        construction: "五段: u->ou | 一段: ru->you | サ变: shiyou | カ变: koyou",
        explanation: "表示说话人要进行该动作、行为的决心、意志，或是向对方进行号召、劝诱。",
        examples: ["書く → 書こう", "起きる → 起きよう"]
      },
      {
        title: "～てくる・～ていく",
        construction: "Vて形 + くる/いく",
        explanation: "「～てくる」：表示由远及近，或从过去到现在（“……起来/过来”）。「～ていく」：表示由近及远，或从现在到以后（“……下去”）。",
        examples: []
      },
      {
        title: "～にとって",
        construction: "N + にとって",
        explanation: "表示判断或评价的基准（“对……来说”）。",
        examples: ["勉強は子供にとって、大切です。（学习对于孩子来说很重要。）"]
      },
      {
        title: "～ようだ",
        construction: "V连体形/Nの + ようだ",
        explanation: "1. 比喻（像……）。2. 列举（像……那样的）。3. 推测（委婉判断）。",
        examples: ["まるで春のようだ。", "彼女のような……", "かなり困難なようです。"]
      },
      {
        title: "形式体言 こと・もの・の（ん）",
        construction: "",
        explanation: "「こと」泛指事情。「もの」多指物/人，表示必然结果或常识。「の」泛指人物事，口语为「ん」。",
        examples: ["赤ん坊は泣くものだ。（婴儿是会哭的。）"]
      },
      {
        title: "～（よ）うと思う",
        construction: "V推量形 + （よ）うと思う",
        explanation: "表示想要做某事的愿望（“想……”，“打算……”）。",
        examples: ["日本若者と交流しようと思いませんか。（想和日本年轻人交流吗？）"]
      }
    ]
  },
  {
    id: 3,
    title: "第三课 日本是男尊女卑的国家吗？",
    words: [
      { jp: "男尊女卑", cn: "男尊女卑", kana: "だんそんじょひ", tone: "⑤", pos: "名" },
      { jp: "古い", cn: "旧的", kana: "ふるい", tone: "②", pos: "形1" },
      { jp: "威張る", cn: "摆架子", kana: "いばる", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "大人しい", cn: "老实/温顺", kana: "おとなしい", tone: "④", pos: "形1" },
      { jp: "仕事", cn: "工作", kana: "しごと", tone: "◎", pos: "名" },
      { jp: "帰る", cn: "回家", kana: "かえる", tone: "①", pos: "动1", group: 1, transitivity: "自" },
      { jp: "必ず", cn: "务必/一定", kana: "かならず", tone: "◎", pos: "副" },
      { jp: "入る", cn: "进入", kana: "はいる", tone: "①", pos: "动1", group: 1, transitivity: "自" },
      { jp: "可哀そうだ", cn: "可怜", kana: "かわいそうだ", tone: "④", pos: "形2" },
      { jp: "結婚", cn: "结婚", kana: "けっこん", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "聞く", cn: "听/问", kana: "きく", tone: "◎", pos: "动1", group: 1, transitivity: "他" },
      { jp: "世代", cn: "世代", kana: "せだい", tone: "◎", pos: "名" },
      { jp: "考える", cn: "思考", kana: "かんがえる", tone: "④", pos: "动2", group: 2, transitivity: "他" },
      { jp: "違う", cn: "不同", kana: "ちがう", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "取り合えず", cn: "暂且", kana: "とりあえず", tone: "◎", pos: "副" },
      { jp: "乾杯", cn: "干杯", kana: "かんぱい", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "後輩", cn: "后辈", kana: "こうはい", tone: "◎", pos: "名" },
      { jp: "紹介", cn: "介绍", kana: "しょうかい", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "上手", cn: "擅长", kana: "じょうず", tone: "③", pos: "形2" },
      { jp: "頑張る", cn: "加油", kana: "がんばる", tone: "③", pos: "动1", group: 1, transitivity: "自" },
      { jp: "上下", cn: "上下", kana: "じょうげ", tone: "①", pos: "名" },
      { jp: "関係", cn: "关系", kana: "かんけい", tone: "◎", pos: "名" }
    ],
    grammar: [
      {
        title: "日语的简体",
        construction: "用言/助动词终止形",
        explanation: "相对于「です/ます」，用于上对下、亲密关系或书面语（日记、论文）。",
        examples: []
      },
      {
        title: "动词命令形",
        construction: "五段: u->e | 一段: ru->ro/yo | サ变: shiro/seyo | カ变: koi",
        explanation: "表示强硬的指示或命令，不能对上级、长辈使用。",
        examples: ["歌う → 歌え", "起きる → 起きろ"]
      },
      {
        title: "～という～",
        construction: "N/句子 + という + N",
        explanation: "表示归纳要叙述或说明的内容（“这种……”，“称作……的”）。",
        examples: ["「風呂に入る」という意味です。（意思是“我要洗澡”。）"]
      },
      {
        title: "～かもしれない",
        construction: "简体形 + かもしれない",
        explanation: "表示对事物不确定的判断（“也许……”，“说不定……”）。",
        examples: ["雨が降るかもしれません。（或许会下雨。）"]
      },
      {
        title: "～ため（に）",
        construction: "V连体形/Nの + ため（に）",
        explanation: "1. 目的（为了……）。2. 原因（因为……）。",
        examples: ["夕べ徹夜をしたため、頭がふらふらしています。（因为昨晚熬夜，现在头晕。）"]
      },
      {
        title: "～だけ",
        construction: "N/V连体形 + だけ",
        explanation: "表示限定某种范围（“只……”，“仅……”）。",
        examples: []
      }
    ]
  },
  {
    id: 4,
    title: "第四课 桃太郎的故事",
    words: [
      { jp: "面白い", cn: "有趣的", kana: "おもしろい", tone: "④", pos: "形1" },
      { jp: "物語", cn: "故事", kana: "ものがたり", tone: "③", pos: "名" },
      { jp: "伝説", cn: "传说", kana: "でんせつ", tone: "◎", pos: "名" },
      { jp: "特に", cn: "特别", kana: "とくに", tone: "①", pos: "副" },
      { jp: "生まれる", cn: "出生", kana: "うまれる", tone: "◎", pos: "动2", group: 2, transitivity: "自" },
      { jp: "鬼", cn: "鬼", kana: "おに", tone: "②", pos: "名" },
      { jp: "戦う", cn: "战斗", kana: "たたかう", tone: "③", pos: "动1", group: 1, transitivity: "自" },
      { jp: "誰", cn: "谁", kana: "だれ", tone: "①", pos: "名" },
      { jp: "戦争", cn: "战争", kana: "せんそう", tone: "◎", pos: "名" },
      { jp: "解釈", cn: "解释", kana: "かいしゃく", tone: "①", pos: "名/动3", group: 3 },
      { jp: "勇気", cn: "勇气", kana: "ゆうき", tone: "①", pos: "名" },
      { jp: "人間", cn: "人类", kana: "にんげん", tone: "◎", pos: "名" },
      { jp: "以外", cn: "以外", kana: "いがい", tone: "①", pos: "名" },
      { jp: "生む", cn: "生", kana: "うむ", tone: "◎", pos: "动1", group: 1, transitivity: "他" },
      { jp: "共通", cn: "共同", kana: "きょうつう", tone: "◎", pos: "名" },
      { jp: "是非", cn: "务必", kana: "ぜひ", tone: "①", pos: "副" },
      { jp: "勿論", cn: "当然", kana: "もちろん", tone: "②", pos: "副" },
      { jp: "猿", cn: "猴子", kana: "さる", tone: "①", pos: "名" },
      { jp: "役", cn: "角色", kana: "やく", tone: "②", pos: "名" },
      { jp: "もったいない", cn: "可惜/浪费", kana: "もったいない", tone: "⑤", pos: "形1" }
    ],
    grammar: [
      {
        title: "授受动词 (あげる/くれる/もらう)",
        construction: "",
        explanation: "あげる: 我给别人/内给外。くれる: 别人给我/外给内。もらう: 我从别人那里得到。",
        examples: []
      },
      {
        title: "授受补助动词 (～てあげる/くれる/もらう)",
        construction: "Vて形 + あげる/くれる/もらう",
        explanation: "～てあげる: 我帮别人做。～てくれる: 别人帮我做。～てもらう: 请别人做。",
        examples: []
      },
      {
        title: "～とは（～というのは）",
        construction: "N + とは",
        explanation: "表示提出主题，对其加定义性说明（“所谓……”）。",
        examples: ["人生とはこういうものだよ。（人生就是这样的啊。）"]
      },
      {
        title: "～なら（ば）",
        construction: "N/V连体形 + なら（ば）",
        explanation: "表示假定的前提条件（“如果……”，“要是……的话”）。",
        examples: ["飲んだら乗るな、乗るなら飲むな。（喝酒不开车，开车不喝酒。）"]
      },
      {
        title: "终助词 ～の",
        construction: "句末",
        explanation: "多为女性、儿童使用。1. 疑问（怎么了？）。2. 轻微判断（不，不是的）。",
        examples: ["どうしたの？", "いいえ、違がうの。"]
      },
      {
        title: "终助词 ～な（あ）",
        construction: "句末",
        explanation: "1. 感叹（太可惜了）。2. 愿望（好想去...）。",
        examples: ["それはもったいないなあ！", "ハワイへ行きたいなあ。"]
      },
      {
        title: "接尾词 ～さ",
        construction: "形容词词干 + さ",
        explanation: "使其名词化，表示性质、程度。",
        examples: ["明るさ (亮度)"]
      }
    ]
  },
  {
    id: 5,
    title: "第五课 日本人和宠物",
    words: [
      { jp: "飼う", cn: "饲养", kana: "かう", tone: "①", pos: "动1", group: 1, transitivity: "他" },
      { jp: "最も", cn: "最", kana: "もっとも", tone: "③", pos: "副" },
      { jp: "調査", cn: "调查", kana: "ちょうさ", tone: "①", pos: "名/动3", group: 3 },
      { jp: "単なる", cn: "单纯的", kana: "たんなる", tone: "①", pos: "连体" },
      { jp: "一員", cn: "一员", kana: "いちいん", tone: "◎", pos: "名" },
      { jp: "扱う", cn: "对待/操作", kana: "あつかう", tone: "③", pos: "动1", group: 1, transitivity: "他" },
      { jp: "殆ど", cn: "几乎", kana: "ほとんど", tone: "②", pos: "副" },
      { jp: "飼い主", cn: "饲主", kana: "かいぬし", tone: "③", pos: "名" },
      { jp: "名前", cn: "名字", kana: "なまえ", tone: "◎", pos: "名" },
      { jp: "つける", cn: "起名/安上", kana: "つける", tone: "②", pos: "动2", group: 2, transitivity: "他" },
      { jp: "同じ", cn: "相同", kana: "おなじ", tone: "◎", pos: "形2" },
      { jp: "屋根", cn: "屋顶", kana: "やね", tone: "①", pos: "名" },
      { jp: "暮らす", cn: "生活", kana: "くらす", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "亀", cn: "乌龟", kana: "かめ", tone: "①", pos: "名" },
      { jp: "好む", cn: "喜好", kana: "このむ", tone: "②", pos: "动1", group: 1, transitivity: "他" },
      { jp: "世話", cn: "照顾", kana: "せわ", tone: "②", pos: "名/动3", group: 3 },
      { jp: "癒す", cn: "治愈", kana: "いやす", tone: "②", pos: "动1", group: 1, transitivity: "他" },
      { jp: "求める", cn: "追求/寻求", kana: "もとめる", tone: "③", pos: "动2", group: 2, transitivity: "他" },
      { jp: "怒る", cn: "生气", kana: "おこる", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "叱る", cn: "批评", kana: "しかる", tone: "◎", pos: "动1", group: 1, transitivity: "他" },
      { jp: "寝坊", cn: "睡懒觉", kana: "ねぼう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "大事だ", cn: "重要", kana: "だいじだ", tone: "①", pos: "形2" },
      { jp: "会議", cn: "会议", kana: "かいぎ", tone: "①", pos: "名" },
      { jp: "まずい", cn: "糟糕/难吃", kana: "まずい", tone: "②", pos: "形1" },
      { jp: "なんか", cn: "之类", kana: "なんか", tone: "①", pos: "副助" },
      { jp: "一昨日", cn: "前天", kana: "おととい", tone: "③", pos: "名" },
      { jp: "ずっと", cn: "一直", kana: "ずっと", tone: "◎", pos: "副" },
      { jp: "泣く", cn: "哭", kana: "なく", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "眠る", cn: "睡", kana: "ねむる", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "近所", cn: "邻居", kana: "きんじょ", tone: "①", pos: "名" },
      { jp: "死ぬ", cn: "死", kana: "しぬ", tone: "◎", pos: "动1", group: 1, transitivity: "自" }
    ],
    grammar: [
      {
        title: "动词被动态",
        construction: "五段: u->areru | 一段: ru->rareru | サ变: sareru | カ变: korareru",
        explanation: "表示直接承受某种动作（“被……”）。包括主宾换位、定语被动、受害被动等。",
        examples: ["読む → 読まれる", "見る → 見られる"]
      },
      {
        title: "なぜなら～から（だ）",
        construction: "",
        explanation: "解释原因（“之所以……是因为……”）。",
        examples: []
      },
      {
        title: "～による（～によって...）",
        construction: "N + による",
        explanation: "表示事物发生、发展的依据、手段或原因（“根据……”，“依靠……”，“由于……”）。",
        examples: ["彼女の話によれば……（据她说……）"]
      },
      {
        title: "～てしまう",
        construction: "Vて形 + しまう",
        explanation: "表示动作结束或完成。常伴有遗憾、无奈（口语：～ちゃう）。",
        examples: []
      },
      {
        title: "终助词 ～ぞ",
        construction: "句末",
        explanation: "男性对同辈或晚辈使用。强调主张、提醒、警告或决断。",
        examples: []
      },
      {
        title: "终助词 ～かな",
        construction: "句末",
        explanation: "用于自言自语时的疑问（“是不是……呢”）或愿望。",
        examples: []
      }
    ]
  },
  {
    id: 6,
    title: "第六课 现代都市",
    words: [
      { jp: "不思議", cn: "不可思议", kana: "ふしぎ", tone: "◎", pos: "名/形2" },
      { jp: "空間", cn: "空间", kana: "くうかん", tone: "◎", pos: "名" },
      { jp: "集まる", cn: "聚集", kana: "あつまる", tone: "③", pos: "动1", group: 1, transitivity: "自" },
      { jp: "想像", cn: "想象", kana: "そうぞう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "身の回り", cn: "身边", kana: "みのまわり", tone: "◎", pos: "名" },
      { jp: "水道", cn: "自来水", kana: "すいどう", tone: "◎", pos: "名" },
      { jp: "ガス", cn: "煤气", kana: "がす", tone: "①", pos: "名" },
      { jp: "電気", cn: "电", kana: "でんき", tone: "①", pos: "名" },
      { jp: "公共", cn: "公共", kana: "こうきょう", tone: "◎", pos: "名" },
      { jp: "設備", cn: "设备", kana: "せつび", tone: "①", pos: "名" },
      { jp: "住宅", cn: "住宅", kana: "じゅうたく", tone: "◎", pos: "名" },
      { jp: "渋滞", cn: "堵车", kana: "じゅうたい", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "問題", cn: "问题", kana: "もんだい", tone: "◎", pos: "名" },
      { jp: "地震", cn: "地震", kana: "じしん", tone: "◎", pos: "名" },
      { jp: "発生", cn: "发生", kana: "はっせい", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "場合", cn: "场合", kana: "ばあい", tone: "◎", pos: "名" },
      { jp: "止まる", cn: "停", kana: "とまる", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "作る", cn: "做", kana: "つくる", tone: "②", pos: "动1", group: 1, transitivity: "他" },
      { jp: "工夫", cn: "设法/窍门", kana: "くふう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "しかも", cn: "而且", kana: "しかも", tone: "②", pos: "接续" },
      { jp: "やっぱり", cn: "果然", kana: "やっぱり", tone: "③", pos: "副" },
      { jp: "大人", cn: "大人", kana: "おとな", tone: "◎", pos: "名" },
      { jp: "言葉", cn: "语言", kana: "ことば", tone: "③", pos: "名" },
      { jp: "なるほど", cn: "原来如此", kana: "なるほど", tone: "◎", pos: "副" },
      { jp: "急ぐ", cn: "急", kana: "いそぐ", tone: "②", pos: "动1", group: 1, transitivity: "自" }
    ],
    grammar: [
      {
        title: "～である",
        construction: "N + である",
        explanation: "书面语形式的断定助动词，相当于「だ/です」。",
        examples: []
      },
      {
        title: "～てはならない",
        construction: "Vて形 + はならない",
        explanation: "表示禁止、在道理上不允许那样做（“不要……”，“不可以……”）。",
        examples: []
      },
      {
        title: "～とは言え",
        construction: "终止形/N + とは言え",
        explanation: "表示语气的转折（“虽然……但是……”，“尽管……却……”）。",
        examples: []
      },
      {
        title: "～やすい（～にくい）",
        construction: "Vます形(去ます) + やすい/にくい",
        explanation: "「やすい」表示容易……；「にくい」表示难于……。",
        examples: []
      },
      {
        title: "～って",
        construction: "",
        explanation: "口语表达。1. 引用/主题（叫...的）。2. 确认/反问。3. 传闻（听说）。",
        examples: ["……って……", "～だって"]
      },
      {
        title: "～かい",
        construction: "句末",
        explanation: "男性终助词。表示亲切的提问或强烈的反问。",
        examples: []
      }
    ]
  },
  {
    id: 7,
    title: "第七课 透明的力量",
    words: [
      { jp: "透明", cn: "透明", kana: "とうめい", tone: "◎", pos: "名/形2" },
      { jp: "力", cn: "力量", kana: "ちから", tone: "③", pos: "名" },
      { jp: "日常", cn: "日常", kana: "にちじょう", tone: "◎", pos: "名" },
      { jp: "触る", cn: "触摸", kana: "さわる", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "存在", cn: "存在", kana: "そんざい", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "例外", cn: "例外", kana: "れいがい", tone: "◎", pos: "名" },
      { jp: "情報", cn: "信息", kana: "じょうほう", tone: "◎", pos: "名" },
      { jp: "伝える", cn: "传达", kana: "つたえる", tone: "◎", pos: "动2", group: 2, transitivity: "他" },
      { jp: "相手", cn: "对象", kana: "あいて", tone: "③", pos: "名" },
      { jp: "気づく", cn: "察觉", kana: "きづく", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "火事", cn: "火灾", kana: "かじ", tone: "①", pos: "名" },
      { jp: "挙げる", cn: "举起/列举", kana: "あげる", tone: "◎", pos: "动2", group: 2, transitivity: "他" },
      { jp: "届く", cn: "送达", kana: "とどく", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "助ける", cn: "帮助", kana: "たすける", tone: "③", pos: "动2", group: 2, transitivity: "他" },
      { jp: "ペラペラだ", cn: "流利", kana: "ぺらぺらだ", tone: "①", pos: "形2/副" },
      { jp: "練習", cn: "练习", kana: "れんしゅう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "方言", cn: "方言", kana: "ほうげん", tone: "③", pos: "名" },
      { jp: "旅行", cn: "旅行", kana: "りょこう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "奇跡", cn: "奇迹", kana: "きせき", tone: "◎", pos: "名" }
    ],
    grammar: [
      {
        title: "～しか（ない）",
        construction: "N + しか（ない）",
        explanation: "与否定式呼应，表示限定（“只……”，“光……”）。有时带有“数量少”含义。",
        examples: []
      },
      {
        title: "～がち",
        construction: "N/Vます形(去ます) + がち",
        explanation: "表示容易产生前项所示状态，通常用于负面评价（“容易……”，“往往……”）。",
        examples: []
      },
      {
        title: "～てみる",
        construction: "Vて形 + みる",
        explanation: "表示尝试做某事（“试着……”，“做……看看”）。",
        examples: []
      },
      {
        title: "～ば～ほど",
        construction: "V假定 + V连体 + ほど",
        explanation: "表示随着前项的变化，后项也相应地发生变化（“越……越……”）。",
        examples: []
      },
      {
        title: "～限り",
        construction: "V连体/Nの + 限り",
        explanation: "表示事物在前项限定的条件下必定会产生后项的结果（“只要……就……”）。",
        examples: []
      },
      {
        title: "～し～",
        construction: "V终止形 + し",
        explanation: "表示并列或理由（“既……又……”，“因为……而且……”）。",
        examples: []
      },
      {
        title: "～たら",
        construction: "V连用形 + たら",
        explanation: "表示假定、既定条件（“如果……的话”）；也表示前提条件（“……之后”）。",
        examples: []
      }
    ]
  },
  {
    id: 8,
    title: "第八课 健步走",
    words: [
      { jp: "動く", cn: "动", kana: "うごく", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "歩行", cn: "步行", kana: "ほこう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "ウォーキング", cn: "健步走", kana: "うぉーきんぐ", tone: "②", pos: "名" },
      { jp: "習得", cn: "习得", kana: "しゅうとく", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "手軽に", cn: "简便地", kana: "てがるに", tone: "◎", pos: "副" },
      { jp: "泳ぐ", cn: "游泳", kana: "およぐ", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "始める", cn: "开始", kana: "はじめる", tone: "◎", pos: "动2", group: 2, transitivity: "他" },
      { jp: "穏やかに", cn: "平稳地", kana: "おだやかに", tone: "②", pos: "副" },
      { jp: "散歩", cn: "散步", kana: "さんぽ", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "会う", cn: "见面", kana: "あう", tone: "①", pos: "动1", group: 1, transitivity: "自" },
      { jp: "見知らぬ", cn: "陌生的", kana: "みしらぬ", tone: "◎", pos: "连体" },
      { jp: "明るい", cn: "明亮/开朗", kana: "あかるい", tone: "◎", pos: "形1" },
      { jp: "挨拶", cn: "寒暄", kana: "あいさつ", tone: "①", pos: "名/动3", group: 3 },
      { jp: "始まる", cn: "开始", kana: "はじまる", tone: "◎", pos: "动1", group: 1, transitivity: "自" },
      { jp: "素晴らしい", cn: "极好的", kana: "すばらしい", tone: "④", pos: "形1" },
      { jp: "向こう", cn: "对面", kana: "むこう", tone: "②", pos: "名" },
      { jp: "展望台", cn: "展望台", kana: "てんぼうだい", tone: "◎", pos: "名" },
      { jp: "景色", cn: "景色", kana: "けしき", tone: "①", pos: "名" },
      { jp: "静かに", cn: "安静地", kana: "しずかに", tone: "①", pos: "副" },
      { jp: "波", cn: "波浪", kana: "なみ", tone: "◎", pos: "名" },
      { jp: "人生", cn: "人生", kana: "じんせい", tone: "①", pos: "名" },
      { jp: "健康", cn: "健康", kana: "けんこう", tone: "◎", pos: "名/形2" },
      { jp: "神様", cn: "神", kana: "かみさま", tone: "①", pos: "名" },
      { jp: "将来", cn: "将来", kana: "しょうらい", tone: "①", pos: "名" }
    ],
    grammar: [
      {
        title: "动词可能表达",
        construction: "五段: u->eru | 一段: ru->rareru | サ变: dekiru",
        explanation: "表示能力或可能性。注意：他动词变可能态时，宾语助词「を」通常变为「が」。",
        examples: ["読む → 読める", "起きる → 起きられる"]
      },
      {
        title: "～として",
        construction: "N + として",
        explanation: "表示具有某种身份、地位、资格或立场（“以……身份”，“作为……”）。",
        examples: []
      },
      {
        title: "～というか",
        construction: "N/V终止形 + というか",
        explanation: "表示选项略带疑问语气（“是说……呢，还是……”）。",
        examples: []
      },
      {
        title: "～ばかり",
        construction: "Vた+ばかり / N+ばかり",
        explanation: "Vた+ばかり：动作刚刚结束。N+ばかり：限定，排除其他（尽……光……）。",
        examples: []
      },
      {
        title: "～ようになる",
        construction: "V连体形 + ようになる",
        explanation: "表示事物的发展趋势或转变的结果（“变得……”，“能够……了”）。",
        examples: []
      }
    ]
  },
  {
    id: 9,
    title: "第九课 即食食品",
    words: [
      { jp: "ファストフード", cn: "快餐", kana: "ふぁすとふーど", tone: "④", pos: "名" },
      { jp: "見かける", cn: "目睹/看见", kana: "みかける", tone: "◎", pos: "动2", group: 2, transitivity: "他" },
      { jp: "長い", cn: "长", kana: "ながい", tone: "②", pos: "形1" },
      { jp: "魅力", cn: "魅力", kana: "みりょく", tone: "◎", pos: "名" },
      { jp: "太る", cn: "发胖", kana: "ふとる", tone: "②", pos: "动1", group: 1, transitivity: "自" },
      { jp: "体", cn: "身体", kana: "からだ", tone: "◎", pos: "名" },
      { jp: "我慢", cn: "忍耐", kana: "がまん", tone: "①", pos: "名/动3", group: 3 },
      { jp: "情緒", cn: "情绪/情趣", kana: "じょうちょ", tone: "①", pos: "名" },
      { jp: "影響", cn: "影响", kana: "えいきょう", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "放置", cn: "放置/置之不理", kana: "ほうち", tone: "◎", pos: "名/动3", group: 3 },
      { jp: "疲れる", cn: "疲劳", kana: "つかれる", tone: "③", pos: "动2", group: 2, transitivity: "自" },
      { jp: "うまい", cn: "美味/高明", kana: "うまい", tone: "②", pos: "形1" },
      { jp: "続ける", cn: "继续", kana: "つづける", tone: "◎", pos: "动2", group: 2, transitivity: "他" }
    ],
    grammar: [
      {
        title: "～たまま",
        construction: "Vた形/Nの + まま",
        explanation: "表示保持着某种状态去做另一件事（“……着”）。",
        examples: ["テレビをつけたまま寝てしまった。（开着电视睡着了。）"]
      },
      {
        title: "～きり",
        construction: "Vた形 + きり",
        explanation: "表示动作完成后，一直保持某种状态（“一……就再没……”）。",
        examples: ["彼とは去年会ったきりです。（和他去年见过后就再没见。）"]
      },
      {
        title: "～ず（に）",
        construction: "Vない形(去ない) + ず（に）",
        explanation: "表示不做某事而做另一件事（“不……而……”）。",
        examples: ["朝ご飯を食べずに学校へ行きました。（没吃早饭就去学校了。）"]
      }
    ]
  }
];

export const KANA_CHART_DATA: (Kana | null)[][] = [
  [{ h: 'あ', k: 'ア', r: 'a' }, { h: 'い', k: 'イ', r: 'i' }, { h: 'う', k: 'ウ', r: 'u' }, { h: 'え', k: 'エ', r: 'e' }, { h: 'お', k: 'オ', r: 'o' }],
  [{ h: 'か', k: 'カ', r: 'ka' }, { h: 'き', k: 'キ', r: 'ki' }, { h: 'く', k: 'ク', r: 'ku' }, { h: 'け', k: 'ケ', r: 'ke' }, { h: 'こ', k: 'コ', r: 'ko' }],
  [{ h: 'さ', k: 'サ', r: 'sa' }, { h: 'し', k: 'シ', r: 'shi' }, { h: 'す', k: 'ス', r: 'su' }, { h: 'せ', k: 'セ', r: 'se' }, { h: 'そ', k: 'ソ', r: 'so' }],
  [{ h: 'た', k: 'タ', r: 'ta' }, { h: 'ち', k: 'チ', r: 'chi' }, { h: 'つ', k: 'ツ', r: 'tsu' }, { h: 'て', k: 'テ', r: 'te' }, { h: 'と', k: 'ト', r: 'to' }],
  [{ h: 'な', k: 'ナ', r: 'na' }, { h: 'に', k: 'ニ', r: 'ni' }, { h: 'ぬ', k: 'ヌ', r: 'nu' }, { h: 'ね', k: 'ネ', r: 'ne' }, { h: 'の', k: 'ノ', r: 'no' }],
  [{ h: 'は', k: 'ハ', r: 'ha' }, { h: 'ひ', k: 'ヒ', r: 'hi' }, { h: 'ふ', k: 'フ', r: 'fu' }, { h: 'へ', k: 'ヘ', r: 'he' }, { h: 'ほ', k: 'ホ', r: 'ho' }],
  [{ h: 'ま', k: 'マ', r: 'ma' }, { h: 'み', k: 'ミ', r: 'mi' }, { h: 'む', k: 'ム', r: 'mu' }, { h: 'め', k: 'メ', r: 'me' }, { h: 'も', k: 'モ', r: 'mo' }],
  [{ h: 'や', k: 'ヤ', r: 'ya' }, null, { h: 'ゆ', k: 'ユ', r: 'yu' }, null, { h: 'よ', k: 'ヨ', r: 'yo' }],
  [{ h: 'ら', k: 'ラ', r: 'ra' }, { h: 'り', k: 'リ', r: 'ri' }, { h: 'る', k: 'ル', r: 'ru' }, { h: 'れ', k: 'レ', r: 're' }, { h: 'ろ', k: 'ロ', r: 'ro' }],
  [{ h: 'わ', k: 'ワ', r: 'wa' }, null, null, null, { h: 'を', k: 'ヲ', r: 'o' }],
  [{ h: 'ん', k: 'ン', r: 'n' }, null, null, null, null]
];