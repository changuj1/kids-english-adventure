
const grammarQuestions = [

    // Question Words（疑問詞）10 題
    {
        id: "G001", category: "Question Words", level: "Beginner",
        question: "_____ is your name?",
        questionMeaning: "你叫什麼名字？",
        options: ["How", "What", "Where", "When"],
        answer: "What",
        explanation: "What 用來詢問事物或名字。"
    },
    {
        id: "G002", category: "Question Words", level: "Beginner",
        question: "_____ old are you?",
        questionMeaning: "你幾歲？",
        options: ["What", "Who", "How", "Where"],
        answer: "How",
        explanation: "How old 用來詢問年齡。"
    },
    {
        id: "G003", category: "Question Words", level: "Beginner",
        question: "_____ do you live?",
        questionMeaning: "你住在哪裡？",
        options: ["Where", "When", "Who", "What"],
        answer: "Where",
        explanation: "Where 用來詢問地點。"
    },
    {
        id: "G004", category: "Question Words", level: "Beginner",
        question: "_____ is your birthday?",
        questionMeaning: "你的生日是什麼時候？",
        options: ["Who", "When", "Where", "How"],
        answer: "When",
        explanation: "When 用來詢問時間。"
    },
    {
        id: "G005", category: "Question Words", level: "Beginner",
        question: "_____ is that boy?",
        questionMeaning: "那個男孩是誰？",
        options: ["What", "Where", "Who", "When"],
        answer: "Who",
        explanation: "Who 用來詢問人物。"
    },
    // {
    //     id: "G006", category: "Question Words", level: "Intermediate",
    //     question: "_____ do you go to school?",
    //     questionMeaning: "你如何去上學？",
    //     options: ["How", "Who", "What", "Where"],
    //     answer: "How",
    //     explanation: "How 可以用來詢問方式。"
    // },
    {
        id: "G007", category: "Question Words", level: "Intermediate",
        question: "_____ is your favorite color?",
        questionMeaning: "你最喜歡的顏色是什麼？",
        options: ["When", "What", "Who", "Where"],
        answer: "What",
        explanation: "詢問喜歡的事物使用 What。"
    },
    // {
    //     id: "G008", category: "Question Words", level: "Intermediate",
    //     question: "_____ many apples do you have?",
    //     questionMeaning: "你有多少顆蘋果？",
    //     options: ["How", "What", "Who", "When"],
    //     answer: "How",
    //     explanation: "How many 用來詢問可數物品的數量。"
    // },
    // {
    //     id: "G009", category: "Question Words", level: "Intermediate",
    //     question: "_____ is your English teacher?",
    //     questionMeaning: "誰是你的英文老師？",
    //     options: ["Where", "Who", "How", "When"],
    //     answer: "Who",
    //     explanation: "詢問人物使用 Who。"
    // },
    {
        id: "G010", category: "Question Words", level: "Intermediate",
        question: "_____ do you get up?",
        questionMeaning: "你幾點起床？",
        options: ["What time", "Who", "Where", "How many"],
        answer: "What time",
        explanation: "What time 用來詢問具體時間。"
    },

    // Be Verbs（be 動詞）10 題
    {
        id: "G011", category: "Be Verbs", level: "Beginner",
        question: "I _____ a student.",
        questionMeaning: "我是一名學生。",
        options: ["am", "is", "are", "be"],
        answer: "am",
        explanation: "主詞 I 搭配 am。"
    },
    // {
    //     id: "G012", category: "Be Verbs", level: "Beginner",
    //     question: "She _____ my sister.",
    //     questionMeaning: "她是我的姊妹。",
    //     options: ["am", "are", "is", "be"],
    //     answer: "is",
    //     explanation: "She 是第三人稱單數，搭配 is。"
    // },
    // {
    //     id: "G013", category: "Be Verbs", level: "Beginner",
    //     question: "They _____ happy.",
    //     questionMeaning: "他們很開心。",
    //     options: ["is", "am", "are", "be"],
    //     answer: "are",
    //     explanation: "They 搭配 are。"
    // },
    // {
    //     id: "G014", category: "Be Verbs", level: "Beginner",
    //     question: "You _____ my friend.",
    //     questionMeaning: "你是我的朋友。",
    //     options: ["is", "am", "are", "be"],
    //     answer: "are",
    //     explanation: "You 搭配 are。"
    // },
    // {
    //     id: "G015", category: "Be Verbs", level: "Beginner",
    //     question: "It _____ a cat.",
    //     questionMeaning: "牠是一隻貓。",
    //     options: ["am", "are", "is", "be"],
    //     answer: "is",
    //     explanation: "It 是第三人稱單數，搭配 is。"
    // },
    // {
    //     id: "G016", category: "Be Verbs", level: "Intermediate",
    //     question: "We _____ students.",
    //     questionMeaning: "我們是學生。",
    //     options: ["am", "is", "are", "be"],
    //     answer: "are",
    //     explanation: "We 搭配 are。"
    // },
    // {
    //     id: "G017", category: "Be Verbs", level: "Intermediate",
    //     question: "My father _____ tall.",
    //     questionMeaning: "我的爸爸很高。",
    //     options: ["am", "are", "is", "be"],
    //     answer: "is",
    //     explanation: "My father 是單數主詞，搭配 is。"
    // },
    // {
    //     id: "G018", category: "Be Verbs", level: "Intermediate",
    //     question: "The dogs _____ cute.",
    //     questionMeaning: "那些狗很可愛。",
    //     options: ["is", "am", "are", "be"],
    //     answer: "are",
    //     explanation: "The dogs 是複數主詞，搭配 are。"
    // },
    // {
    //     id: "G019", category: "Be Verbs", level: "Intermediate",
    //     question: "_____ he your brother?",
    //     questionMeaning: "他是你的兄弟嗎？",
    //     options: ["Am", "Is", "Are", "Be"],
    //     answer: "Is",
    //     explanation: "疑問句中，He 搭配 Is。"
    // },
    // {
    //     id: "G020", category: "Be Verbs", level: "Intermediate",
    //     question: "_____ you ready?",
    //     questionMeaning: "你準備好了嗎？",
    //     options: ["Is", "Am", "Are", "Be"],
    //     answer: "Are",
    //     explanation: "You 搭配 Are。"
    // },

    // Pronouns（代名詞）8 題
    {
        id: "G021", category: "Pronouns", level: "Beginner",
        question: "_____ am a boy.",
        questionMeaning: "我是一個男孩。",
        options: ["He", "She", "I", "They"],
        answer: "I",
        explanation: "說話者用 I 表示我。"
    },
    {
        id: "G022", category: "Pronouns", level: "Beginner",
        question: "Tom is my friend. _____ is kind.",
        questionMeaning: "Tom 是我的朋友。他很親切。",
        options: ["She", "He", "It", "We"],
        answer: "He",
        explanation: "男性人物使用 He。"
    },
    {
        id: "G023", category: "Pronouns", level: "Beginner",
        question: "Mary is a girl. _____ is nice.",
        questionMeaning: "Mary 是一個女孩。她人很好。",
        options: ["He", "They", "She", "It"],
        answer: "She",
        explanation: "女性人物使用 She。"
    },
    // {
    //     id: "G024", category: "Pronouns", level: "Beginner",
    //     question: "The cat is small. _____ is cute.",
    //     questionMeaning: "這隻貓很小。牠很可愛。",
    //     options: ["He", "She", "It", "We"],
    //     answer: "It",
    //     explanation: "一般動物或物品可使用 It。"
    // },
    // {
    //     id: "G025", category: "Pronouns", level: "Intermediate",
    //     question: "My brother and I are students. _____ study together.",
    //     questionMeaning: "我和哥哥是學生。我們一起讀書。",
    //     options: ["They", "We", "He", "You"],
    //     answer: "We",
    //     explanation: "包含說話者的複數主詞使用 We。"
    // },
    // {
    //     id: "G026", category: "Pronouns", level: "Intermediate",
    //     question: "These are my books. _____ are new.",
    //     questionMeaning: "這些是我的書。它們是新的。",
    //     options: ["It", "He", "They", "She"],
    //     answer: "They",
    //     explanation: "複數人物或物品使用 They。"
    // },
    {
        id: "G027", category: "Pronouns", level: "Intermediate",
        question: "This is _____ pencil.",
        questionMeaning: "這是我的鉛筆。",
        options: ["I", "me", "my", "mine"],
        answer: "my",
        explanation: "名詞前使用所有格 my。"
    },
    // {
    //     id: "G028", category: "Pronouns", level: "Intermediate",
    //     question: "That bag is _____.",
    //     questionMeaning: "那個包包是我的。",
    //     options: ["I", "my", "me", "mine"],
    //     answer: "mine",
    //     explanation: "Mine 是名詞性所有格，可以單獨使用。"
    // },

    // Articles（冠詞）6 題
    // {
    //     id: "G029", category: "Articles", level: "Beginner",
    //     question: "I have _____ apple.",
    //     questionMeaning: "我有一顆蘋果。",
    //     options: ["a", "an", "the", "am"],
    //     answer: "an",
    //     explanation: "Apple 開頭是母音音素，使用 an。"
    // },
    // {
    //     id: "G030", category: "Articles", level: "Beginner",
    //     question: "This is _____ dog.",
    //     questionMeaning: "這是一隻狗。",
    //     options: ["a", "an", "are", "am"],
    //     answer: "a",
    //     explanation: "Dog 開頭是子音音素，使用 a。"
    // },
    // {
    //     id: "G031", category: "Articles", level: "Beginner",
    //     question: "She has _____ orange.",
    //     questionMeaning: "她有一顆橘子。",
    //     options: ["a", "an", "is", "are"],
    //     answer: "an",
    //     explanation: "Orange 開頭是母音音素，使用 an。"
    // },
    // {
    //     id: "G032", category: "Articles", level: "Intermediate",
    //     question: "I see _____ sun in the sky.",
    //     questionMeaning: "我看到天空中的太陽。",
    //     options: ["a", "an", "the", "am"],
    //     answer: "the",
    //     explanation: "世界上獨一無二的太陽通常使用 the。"
    // },
    // {
    //     id: "G033", category: "Articles", level: "Intermediate",
    //     question: "He is _____ teacher.",
    //     questionMeaning: "他是一位老師。",
    //     options: ["a", "an", "the", "are"],
    //     answer: "a",
    //     explanation: "Teacher 開頭是子音音素，使用 a。"
    // },
    // {
    //     id: "G034", category: "Articles", level: "Intermediate",
    //     question: "There is _____ egg on the plate.",
    //     questionMeaning: "盤子上有一顆蛋。",
    //     options: ["a", "an", "the", "am"],
    //     answer: "an",
    //     explanation: "Egg 開頭是母音音素，使用 an。"
    // },

    // Singular & Plural（單複數）6 題
    // {
    //     id: "G035", category: "Singular & Plural", level: "Beginner",
    //     question: "I have two _____.",
    //     questionMeaning: "我有兩隻貓。",
    //     options: ["cat", "cats", "cates", "cat's"],
    //     answer: "cats",
    //     explanation: "一般可數名詞變複數通常加 s。"
    // },
    // {
    //     id: "G036", category: "Singular & Plural", level: "Beginner",
    //     question: "There are three _____.",
    //     questionMeaning: "這裡有三個盒子。",
    //     options: ["box", "boxs", "boxes", "boxies"],
    //     answer: "boxes",
    //     explanation: "以 x 結尾的名詞變複數通常加 es。"
    // },
    // {
    //     id: "G037", category: "Singular & Plural", level: "Beginner",
    //     question: "One baby, two _____.",
    //     questionMeaning: "一個嬰兒，兩個嬰兒。",
    //     options: ["babys", "babies", "babyes", "babys'"],
    //     answer: "babies",
    //     explanation: "子音加 y 結尾，通常將 y 改成 ies。"
    // },
    // {
    //     id: "G038", category: "Singular & Plural", level: "Intermediate",
    //     question: "I see two _____.",
    //     questionMeaning: "我看到兩個男人。",
    //     options: ["man", "mans", "men", "mens"],
    //     answer: "men",
    //     explanation: "Man 的不規則複數是 men。"
    // },
    // {
    //     id: "G039", category: "Singular & Plural", level: "Intermediate",
    //     question: "There are five _____.",
    //     questionMeaning: "這裡有五個孩子。",
    //     options: ["child", "childs", "children", "childes"],
    //     answer: "children",
    //     explanation: "Child 的不規則複數是 children。"
    // },
    // {
    //     id: "G040", category: "Singular & Plural", level: "Intermediate",
    //     question: "One tooth, two _____.",
    //     questionMeaning: "一顆牙齒，兩顆牙齒。",
    //     options: ["tooths", "toothes", "teeth", "tooth"],
    //     answer: "teeth",
    //     explanation: "Tooth 的不規則複數是 teeth。"
    // },

    // Do / Does（助動詞）10 題
    // {
    //     id: "G041", category: "Do / Does", level: "Beginner",
    //     question: "_____ you like apples?",
    //     questionMeaning: "你喜歡蘋果嗎？",
    //     options: ["Do", "Does", "Is", "Are"],
    //     answer: "Do",
    //     explanation: "You 搭配 Do。"
    // },
    // {
    //     id: "G042", category: "Do / Does", level: "Beginner",
    //     question: "_____ she like cats?",
    //     questionMeaning: "她喜歡貓嗎？",
    //     options: ["Do", "Does", "Is", "Are"],
    //     answer: "Does",
    //     explanation: "She 是第三人稱單數，搭配 Does。"
    // },
    // {
    //     id: "G043", category: "Do / Does", level: "Beginner",
    //     question: "_____ he play basketball?",
    //     questionMeaning: "他打籃球嗎？",
    //     options: ["Do", "Does", "Am", "Are"],
    //     answer: "Does",
    //     explanation: "He 是第三人稱單數，搭配 Does。"
    // },
    // {
    //     id: "G044", category: "Do / Does", level: "Beginner",
    //     question: "_____ they go to school?",
    //     questionMeaning: "他們去上學嗎？",
    //     options: ["Does", "Is", "Do", "Am"],
    //     answer: "Do",
    //     explanation: "They 搭配 Do。"
    // },
    // {
    //     id: "G045", category: "Do / Does", level: "Intermediate",
    //     question: "My mother _____ not like coffee.",
    //     questionMeaning: "我的媽媽不喜歡咖啡。",
    //     options: ["do", "does", "is", "are"],
    //     answer: "does",
    //     explanation: "My mother 是第三人稱單數，使用 does not。"
    // },
    // {
    //     id: "G046", category: "Do / Does", level: "Intermediate",
    //     question: "I _____ not have a dog.",
    //     questionMeaning: "我沒有狗。",
    //     options: ["does", "do", "is", "am"],
    //     answer: "do",
    //     explanation: "I 搭配 do not。"
    // },
    // {
    //     id: "G047", category: "Do / Does", level: "Intermediate",
    //     question: "_____ your brother swim?",
    //     questionMeaning: "你的兄弟會游泳嗎？",
    //     options: ["Do", "Does", "Are", "Am"],
    //     answer: "Does",
    //     explanation: "Your brother 是第三人稱單數，搭配 Does。"
    // },
    // {
    //     id: "G048", category: "Do / Does", level: "Intermediate",
    //     question: "Where _____ you live?",
    //     questionMeaning: "你住在哪裡？",
    //     options: ["does", "do", "is", "are"],
    //     answer: "do",
    //     explanation: "You 搭配 do。"
    // },
    // {
    //     id: "G049", category: "Do / Does", level: "Intermediate",
    //     question: "What _____ she want?",
    //     questionMeaning: "她想要什麼？",
    //     options: ["do", "does", "is", "are"],
    //     answer: "does",
    //     explanation: "She 是第三人稱單數，搭配 does。"
    // },
    // {
    //     id: "G050", category: "Do / Does", level: "Intermediate",
    //     question: "_____ your parents work here?",
    //     questionMeaning: "你的父母在這裡工作嗎？",
    //     options: ["Does", "Do", "Is", "Am"],
    //     answer: "Do",
    //     explanation: "Your parents 是複數主詞，搭配 Do。"
    // }

];
