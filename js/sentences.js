
const sentenceQuestions = [

    // ===== Greetings 打招呼：6 組 =====

    {
        id: "S001",
        category: "Greetings",
        level: "Beginner",
        question: "How are you?",
        questionMeaning: "你好嗎？",
        answer: "I'm fine, thank you.",
        answerMeaning: "我很好，謝謝你。"
    },
    // {
    //     id: "S002",
    //     category: "Greetings",
    //     level: "Beginner",
    //     question: "How are you today?",
    //     questionMeaning: "你今天好嗎？",
    //     answer: "I'm great!",
    //     answerMeaning: "我很好！"
    // },
    // {
    //     id: "S003",
    //     category: "Greetings",
    //     level: "Beginner",
    //     question: "Good morning! How are you?",
    //     questionMeaning: "早安！你好嗎？",
    //     answer: "Good morning! I'm fine.",
    //     answerMeaning: "早安！我很好。"
    // },
    // {
    //     id: "S004",
    //     category: "Greetings",
    //     level: "Beginner",
    //     question: "What's up?",
    //     questionMeaning: "最近怎麼樣？",
    //     answer: "Not much.",
    //     answerMeaning: "沒什麼特別的。"
    // },
    // {
    //     id: "S005",
    //     category: "Greetings",
    //     level: "Beginner",
    //     question: "How's it going?",
    //     questionMeaning: "最近過得如何？",
    //     answer: "It's going well.",
    //     answerMeaning: "一切都很好。"
    // },
    {
        id: "S006",
        category: "Greetings",
        level: "Beginner",
        question: "Nice to meet you.",
        questionMeaning: "很高興認識你。",
        answer: "Nice to meet you, too.",
        answerMeaning: "我也很高興認識你。"
    },


    // ===== Personal Information 個人資料：8 組 =====

    {
        id: "S007",
        category: "Personal",
        level: "Beginner",
        question: "What's your name?",
        questionMeaning: "你叫什麼名字？",
        answer: "My name is Sam.",
        answerMeaning: "我的名字是 Sam。"
    },
    {
        id: "S008",
        category: "Personal",
        level: "Beginner",
        question: "How old are you?",
        questionMeaning: "你幾歲？",
        answer: "I'm nine years old.",
        answerMeaning: "我九歲。"
    },
    {
        id: "S009",
        category: "Personal",
        level: "Beginner",
        question: "Where are you from?",
        questionMeaning: "你來自哪裡？",
        answer: "I'm from Taiwan.",
        answerMeaning: "我來自台灣。"
    },
    {
        id: "S010",
        category: "Personal",
        level: "Beginner",
        question: "Where do you live?",
        questionMeaning: "你住在哪裡？",
        answer: "I live in Taipei.",
        answerMeaning: "我住在台北。"
    },
    {
        id: "S011",
        category: "Personal",
        level: "Intermediate",
        question: "What grade are you in?",
        questionMeaning: "你讀幾年級？",
        answer: "I'm in the third grade.",
        answerMeaning: "我讀三年級。"
    },
    {
        id: "S012",
        category: "Personal",
        level: "Beginner",
        question: "Are you a student?",
        questionMeaning: "你是學生嗎？",
        answer: "Yes, I am.",
        answerMeaning: "是的，我是。"
    },
    {
        id: "S013",
        category: "Personal",
        level: "Intermediate",
        question: "What is your favorite subject?",
        questionMeaning: "你最喜歡的科目是什麼？",
        answer: "My favorite subject is English.",
        answerMeaning: "我最喜歡的科目是英文。"
    },
    {
        id: "S014",
        category: "Personal",
        level: "Intermediate",
        question: "Do you have a pet?",
        questionMeaning: "你有寵物嗎？",
        answer: "Yes, I have a dog.",
        answerMeaning: "有，我有一隻狗。"
    },


    // ===== Feelings & Conditions 感受與狀態：6 組 =====

    // {
    //     id: "S015",
    //     category: "Feelings",
    //     level: "Beginner",
    //     question: "Are you happy?",
    //     questionMeaning: "你開心嗎？",
    //     answer: "Yes, I am.",
    //     answerMeaning: "是的，我很開心。"
    // },
    // {
    //     id: "S016",
    //     category: "Feelings",
    //     level: "Beginner",
    //     question: "Are you tired?",
    //     questionMeaning: "你累了嗎？",
    //     answer: "Yes, I'm tired.",
    //     answerMeaning: "是的，我累了。"
    // },
    {
        id: "S017",
        category: "Feelings",
        level: "Beginner",
        question: "Are you hungry?",
        questionMeaning: "你餓了嗎？",
        answer: "Yes, I'm hungry.",
        answerMeaning: "是的，我餓了。"
    },
    // {
    //     id: "S018",
    //     category: "Feelings",
    //     level: "Beginner",
    //     question: "Are you thirsty?",
    //     questionMeaning: "你渴了嗎？",
    //     answer: "No, I'm not.",
    //     answerMeaning: "不，我不渴。"
    // },
    // {
    //     id: "S019",
    //     category: "Feelings",
    //     level: "Intermediate",
    //     question: "What's the matter?",
    //     questionMeaning: "怎麼了？",
    //     answer: "I have a headache.",
    //     answerMeaning: "我頭痛。"
    // },
    {
        id: "S020",
        category: "Feelings",
        level: "Beginner",
        question: "How do you feel?",
        questionMeaning: "你感覺如何？",
        answer: "I feel good.",
        answerMeaning: "我感覺很好。"
    },


    // ===== Favorites & Hobbies 喜好與興趣：8 組 =====

    {
        id: "S021",
        category: "Favorites",
        level: "Beginner",
        question: "What's your favorite color?",
        questionMeaning: "你最喜歡什麼顏色？",
        answer: "My favorite color is blue.",
        answerMeaning: "我最喜歡的顏色是藍色。"
    },
    {
        id: "S022",
        category: "Favorites",
        level: "Beginner",
        question: "What's your favorite animal?",
        questionMeaning: "你最喜歡什麼動物？",
        answer: "My favorite animal is a cat.",
        answerMeaning: "我最喜歡的動物是貓。"
    },
    {
        id: "S023",
        category: "Favorites",
        level: "Beginner",
        question: "Do you like apples?",
        questionMeaning: "你喜歡蘋果嗎？",
        answer: "Yes, I do.",
        answerMeaning: "是的，我喜歡。"
    },
    {
        id: "S024",
        category: "Favorites",
        level: "Beginner",
        question: "What's your favorite food?",
        questionMeaning: "你最喜歡的食物是什麼？",
        answer: "My favorite food is pizza.",
        answerMeaning: "我最喜歡的食物是披薩。"
    },
    {
        id: "S025",
        category: "Favorites",
        level: "Intermediate",
        question: "What do you like to do?",
        questionMeaning: "你喜歡做什麼？",
        answer: "I like to play baseball.",
        answerMeaning: "我喜歡打棒球。"
    },
    {
        id: "S026",
        category: "Favorites",
        level: "Beginner",
        question: "Can you swim?",
        questionMeaning: "你會游泳嗎？",
        answer: "Yes, I can.",
        answerMeaning: "是的，我會。"
    },
    {
        id: "S027",
        category: "Favorites",
        level: "Intermediate",
        question: "What do you do after school?",
        questionMeaning: "你放學後會做什麼？",
        answer: "I do my homework.",
        answerMeaning: "我做功課。"
    },
    {
        id: "S028",
        category: "Favorites",
        level: "Intermediate",
        question: "Do you like music?",
        questionMeaning: "你喜歡音樂嗎？",
        answer: "Yes, I love music.",
        answerMeaning: "是的，我很喜歡音樂。"
    },


    // ===== Daily Life 日常生活：8 組 =====

    {
        id: "S029",
        category: "Daily Life",
        level: "Beginner",
        question: "What time is it?",
        questionMeaning: "現在幾點？",
        answer: "It's seven o'clock.",
        answerMeaning: "現在七點。"
    },
    {
        id: "S030",
        category: "Daily Life",
        level: "Beginner",
        question: "What do you want?",
        questionMeaning: "你想要什麼？",
        answer: "I want some water.",
        answerMeaning: "我想要一些水。"
    },
    {
        id: "S031",
        category: "Daily Life",
        level: "Beginner",
        question: "Are you ready?",
        questionMeaning: "你準備好了嗎？",
        answer: "Yes, I'm ready.",
        answerMeaning: "是的，我準備好了。"
    },
    {
        id: "S032",
        category: "Daily Life",
        level: "Beginner",
        question: "Where is my bag?",
        questionMeaning: "我的包包在哪裡？",
        answer: "It's on the table.",
        answerMeaning: "它在桌子上。"
    },
    {
        id: "S033",
        category: "Daily Life",
        level: "Intermediate",
        question: "What are you doing?",
        questionMeaning: "你正在做什麼？",
        answer: "I'm reading a book.",
        answerMeaning: "我正在看書。"
    },
    {
        id: "S034",
        category: "Daily Life",
        level: "Beginner",
        question: "Would you like some milk?",
        questionMeaning: "你想喝一些牛奶嗎？",
        answer: "Yes, please.",
        answerMeaning: "好的，謝謝。"
    },
    {
        id: "S035",
        category: "Daily Life",
        level: "Beginner",
        question: "Thank you!",
        questionMeaning: "謝謝你！",
        answer: "You're welcome.",
        answerMeaning: "不客氣。"
    },
    {
        id: "S036",
        category: "Daily Life",
        level: "Beginner",
        question: "Can I have some water?",
        questionMeaning: "我可以喝一些水嗎？",
        answer: "Of course!",
        answerMeaning: "當然可以！"
    },


    // ===== Classroom 課堂用語：8 組 =====

    {
        id: "S037",
        category: "Classroom",
        level: "Beginner",
        question: "May I come in?",
        questionMeaning: "我可以進來嗎？",
        answer: "Yes, come in.",
        answerMeaning: "可以，請進。"
    },
    {
        id: "S038",
        category: "Classroom",
        level: "Beginner",
        question: "Can you help me?",
        questionMeaning: "你可以幫我嗎？",
        answer: "Sure, I can help you.",
        answerMeaning: "當然，我可以幫你。"
    },
    {
        id: "S039",
        category: "Classroom",
        level: "Beginner",
        question: "May I go to the restroom?",
        questionMeaning: "我可以去洗手間嗎？",
        answer: "Yes, you may.",
        answerMeaning: "可以，你可以去。"
    },
    {
        id: "S040",
        category: "Classroom",
        level: "Beginner",
        question: "Do you understand?",
        questionMeaning: "你聽懂了嗎？",
        answer: "Yes, I understand.",
        answerMeaning: "是的，我聽懂了。"
    },
    {
        id: "S041",
        category: "Classroom",
        level: "Beginner",
        question: "Can you repeat that?",
        questionMeaning: "你可以再說一次嗎？",
        answer: "Sure!",
        answerMeaning: "當然可以！"
    },
    // {
    //     id: "S042",
    //     category: "Classroom",
    //     level: "Beginner",
    //     question: "Be quiet, please.",
    //     questionMeaning: "請安靜。",
    //     answer: "Okay, I will.",
    //     answerMeaning: "好的，我會安靜。"
    // },
    // {
    //     id: "S043",
    //     category: "Classroom",
    //     level: "Beginner",
    //     question: "Pay attention, please.",
    //     questionMeaning: "請注意聽。",
    //     answer: "Okay, teacher.",
    //     answerMeaning: "好的，老師。"
    // },
    {
        id: "S044",
        category: "Classroom",
        level: "Beginner",
        question: "How do you spell your name?",
        questionMeaning: "你的名字怎麼拼？",
        answer: "S-A-M.",
        answerMeaning: "S-A-M。"
    },


    // ===== Places & Family 地點與家庭：6 組 =====

    {
        id: "S045",
        category: "Places & Family",
        level: "Beginner",
        question: "Who is that?",
        questionMeaning: "那個人是誰？",
        answer: "That is my mother.",
        answerMeaning: "那是我的媽媽。"
    },
    {
        id: "S046",
        category: "Places & Family",
        level: "Beginner",
        question: "How many people are in your family?",
        questionMeaning: "你家有幾個人？",
        answer: "There are four people in my family.",
        answerMeaning: "我家有四個人。"
    },
    {
        id: "S047",
        category: "Places & Family",
        level: "Beginner",
        question: "Where is the school?",
        questionMeaning: "學校在哪裡？",
        answer: "It's near the park.",
        answerMeaning: "它在公園附近。"
    },
    {
        id: "S048",
        category: "Places & Family",
        level: "Beginner",
        question: "Where are you going?",
        questionMeaning: "你要去哪裡？",
        answer: "I'm going to school.",
        answerMeaning: "我要去學校。"
    },
    {
        id: "S049",
        category: "Places & Family",
        level: "Intermediate",
        question: "Who is your best friend?",
        questionMeaning: "誰是你最好的朋友？",
        answer: "My best friend is Amy.",
        answerMeaning: "我最好的朋友是 Amy。"
    }
    // },
    // {
    //     id: "S050",
    //     category: "Places & Family",
    //     level: "Beginner",
    //     question: "Do you love your family?",
    //     questionMeaning: "你愛你的家人嗎？",
    //     answer: "Yes, I do.",
    //     answerMeaning: "是的，我愛我的家人。"
    // }

];
