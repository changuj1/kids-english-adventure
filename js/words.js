
// ==========================================
// Kids English Adventure
// 英文單字資料庫
// Version 1.0
// ==========================================

const vocabulary = [

    // ===== Fruits 水果 =====

    { id: 1, word: "Apple", meaning: "蘋果", category: "Fruits", image: "assets/images/apple.png" },
    { id: 2, word: "Banana", meaning: "香蕉", category: "Fruits", image: "assets/images/banana.png" },
    { id: 3, word: "Orange", meaning: "橘子", category: "Fruits", image: "assets/images/orange.png" },
    { id: 4, word: "Grape", meaning: "葡萄", category: "Fruits", image: "assets/images/grape.png" },
    { id: 5, word: "Strawberry", meaning: "草莓", category: "Fruits", image: "assets/images/strawberry.png" },
    { id: 6, word: "Watermelon", meaning: "西瓜", category: "Fruits", image: "assets/images/watermelon.png" },
    { id: 7, word: "Pineapple", meaning: "鳳梨", category: "Fruits", image: "assets/images/pineapple.png" },
    { id: 8, word: "Peach", meaning: "水蜜桃", category: "Fruits", image: "assets/images/peach.png" },
    { id: 9, word: "Pear", meaning: "梨子", category: "Fruits", image: "assets/images/pear.png" },
    { id: 10, word: "Lemon", meaning: "檸檬", category: "Fruits", image: "assets/images/lemon.png" },
    { id: 11, word: "Cherry", meaning: "櫻桃", category: "Fruits", image: "assets/images/cherry.png" },
    { id: 12, word: "Mango", meaning: "芒果", category: "Fruits", image: "assets/images/mango.png" },
    { id: 13, word: "Kiwi", meaning: "奇異果", category: "Fruits", image: "assets/images/kiwi.png" },
    { id: 14, word: "Coconut", meaning: "椰子", category: "Fruits", image: "assets/images/coconut.png" },
    { id: 15, word: "Papaya", meaning: "木瓜", category: "Fruits", image: "assets/images/papaya.png" },
    { id: 16, word: "Plum", meaning: "李子", category: "Fruits", image: "assets/images/plum.png" },
    { id: 17, word: "Melon", meaning: "甜瓜", category: "Fruits", image: "assets/images/melon.png" },
    { id: 18, word: "Lime", meaning: "萊姆", category: "Fruits", image: "assets/images/lime.png" },
    { id: 19, word: "Blueberry", meaning: "藍莓", category: "Fruits", image: "assets/images/blueberry.png" },
    { id: 20, word: "Avocado", meaning: "酪梨", category: "Fruits", image: "assets/images/avocado.png" },

    // ===== Animals 動物 =====

    { id: 101, word: "Cat", meaning: "貓", category: "Animals", image: "assets/images/cat.png" },
    { id: 102, word: "Dog", meaning: "狗", category: "Animals", image: "assets/images/dog.png" },
    { id: 103, word: "Rabbit", meaning: "兔子", category: "Animals", image: "assets/images/rabbit.png" },
    { id: 104, word: "Elephant", meaning: "大象", category: "Animals", image: "assets/images/elephant.png" },
    { id: 105, word: "Lion", meaning: "獅子", category: "Animals", image: "assets/images/lion.png" },
    { id: 106, word: "Tiger", meaning: "老虎", category: "Animals", image: "assets/images/tiger.png" },
    { id: 107, word: "Monkey", meaning: "猴子", category: "Animals", image: "assets/images/monkey.png" },
    { id: 108, word: "Bear", meaning: "熊", category: "Animals", image: "assets/images/bear.png" },
    { id: 109, word: "Panda", meaning: "熊貓", category: "Animals", image: "assets/images/panda.png" },
    { id: 110, word: "Giraffe", meaning: "長頸鹿", category: "Animals", image: "assets/images/giraffe.png" },
    { id: 111, word: "Zebra", meaning: "斑馬", category: "Animals", image: "assets/images/zebra.png" },
    { id: 112, word: "Horse", meaning: "馬", category: "Animals", image: "assets/images/horse.png" },
    { id: 113, word: "Cow", meaning: "乳牛", category: "Animals", image: "assets/images/cow.png" },
    { id: 114, word: "Pig", meaning: "豬", category: "Animals", image: "assets/images/pig.png" },
    { id: 115, word: "Sheep", meaning: "綿羊", category: "Animals", image: "assets/images/sheep.png" },
    { id: 116, word: "Duck", meaning: "鴨子", category: "Animals", image: "assets/images/duck.png" },
    { id: 117, word: "Chicken", meaning: "雞", category: "Animals", image: "assets/images/chicken.png" },
    { id: 118, word: "Penguin", meaning: "企鵝", category: "Animals", image: "assets/images/penguin.png" },
    { id: 119, word: "Dolphin", meaning: "海豚", category: "Animals", image: "assets/images/dolphin.png" },
    { id: 120, word: "Turtle", meaning: "烏龜", category: "Animals", image: "assets/images/turtle.png" },

    // ===== Vehicles 交通工具 =====

    { id: 201, word: "Car", meaning: "汽車", category: "Vehicles", image: "assets/images/car.png" },
    { id: 202, word: "Bus", meaning: "公車", category: "Vehicles", image: "assets/images/bus.png" },
    { id: 203, word: "Train", meaning: "火車", category: "Vehicles", image: "assets/images/train.png" },
    { id: 204, word: "Airplane", meaning: "飛機", category: "Vehicles", image: "assets/images/airplane.png" },
    { id: 205, word: "Bicycle", meaning: "腳踏車", category: "Vehicles", image: "assets/images/bicycle.png" },
    { id: 206, word: "Motorcycle", meaning: "機車", category: "Vehicles", image: "assets/images/motorcycle.png" },
    { id: 207, word: "Truck", meaning: "卡車", category: "Vehicles", image: "assets/images/truck.png" },
    { id: 208, word: "Taxi", meaning: "計程車", category: "Vehicles", image: "assets/images/taxi.png" },
    { id: 209, word: "Boat", meaning: "小船", category: "Vehicles", image: "assets/images/boat.png" },
    { id: 210, word: "Ship", meaning: "輪船", category: "Vehicles", image: "assets/images/ship.png" },
    { id: 211, word: "Helicopter", meaning: "直升機", category: "Vehicles", image: "assets/images/helicopter.png" },
    { id: 212, word: "Rocket", meaning: "火箭", category: "Vehicles", image: "assets/images/rocket.png" },
    { id: 213, word: "Ambulance", meaning: "救護車", category: "Vehicles", image: "assets/images/ambulance.png" },
    { id: 214, word: "Fire Truck", meaning: "消防車", category: "Vehicles", image: "assets/images/fire-truck.png" },
    { id: 215, word: "Police Car", meaning: "警車", category: "Vehicles", image: "assets/images/police-car.png" },
    //{ id: 216, word: "Subway", meaning: "地鐵", category: "Vehicles", image: "assets/images/subway.png" },
    //{ id: 217, word: "Scooter", meaning: "滑板車", category: "Vehicles", image: "assets/images/scooter.png" },
    //{ id: 218, word: "Van", meaning: "廂型車", category: "Vehicles", image: "assets/images/van.png" },
    //{ id: 219, word: "Sailboat", meaning: "帆船", category: "Vehicles", image: "assets/images/sailboat.png" },
    //{ id: 220, word: "Tractor", meaning: "曳引機", category: "Vehicles", image: "assets/images/tractor.png" },

    // ===== Objects 生活用品 =====

    { id: 301, word: "Chair", meaning: "椅子", category: "Objects", image: "assets/images/chair.png" },
    { id: 302, word: "Table", meaning: "桌子", category: "Objects", image: "assets/images/table.png" },
    { id: 303, word: "Bed", meaning: "床", category: "Objects", image: "assets/images/bed.png" },
    { id: 304, word: "Clock", meaning: "時鐘", category: "Objects", image: "assets/images/clock.png" },
    { id: 305, word: "Lamp", meaning: "檯燈", category: "Objects", image: "assets/images/lamp.png" },
    { id: 306, word: "Book", meaning: "書", category: "Objects", image: "assets/images/book.png" },
    { id: 307, word: "Pencil", meaning: "鉛筆", category: "Objects", image: "assets/images/pencil.png" },
    { id: 308, word: "Pen", meaning: "原子筆", category: "Objects", image: "assets/images/pen.png" },
    { id: 309, word: "Bag", meaning: "袋子", category: "Objects", image: "assets/images/bag.png" },
    { id: 310, word: "Phone", meaning: "電話", category: "Objects", image: "assets/images/phone.png" },
    { id: 311, word: "Computer", meaning: "電腦", category: "Objects", image: "assets/images/computer.png" },
    { id: 312, word: "Television", meaning: "電視", category: "Objects", image: "assets/images/television.png" },
    { id: 313, word: "Cup", meaning: "杯子", category: "Objects", image: "assets/images/cup.png" },
    { id: 314, word: "Plate", meaning: "盤子", category: "Objects", image: "assets/images/plate.png" },
    { id: 315, word: "Spoon", meaning: "湯匙", category: "Objects", image: "assets/images/spoon.png" },
    { id: 316, word: "Fork", meaning: "叉子", category: "Objects", image: "assets/images/fork.png" },
    { id: 317, word: "Toothbrush", meaning: "牙刷", category: "Objects", image: "assets/images/toothbrush.png" },
    { id: 318, word: "Umbrella", meaning: "雨傘", category: "Objects", image: "assets/images/umbrella.png" },
    { id: 319, word: "Key", meaning: "鑰匙", category: "Objects", image: "assets/images/key.png" },
    { id: 320, word: "Ball", meaning: "球", category: "Objects", image: "assets/images/ball.png" },

    // ===== Food 食物 =====

    { id: 401, word: "Bread", meaning: "麵包", category: "Food", image: "assets/images/bread.png" },
    { id: 402, word: "Milk", meaning: "牛奶", category: "Food", image: "assets/images/milk.png" },
    { id: 403, word: "Egg", meaning: "雞蛋", category: "Food", image: "assets/images/egg.png" },
    { id: 404, word: "Rice", meaning: "米飯", category: "Food", image: "assets/images/rice.png" },
    { id: 405, word: "Noodles", meaning: "麵條", category: "Food", image: "assets/images/noodles.png" },
    { id: 406, word: "Pizza", meaning: "披薩", category: "Food", image: "assets/images/pizza.png" },
    { id: 407, word: "Hamburger", meaning: "漢堡", category: "Food", image: "assets/images/hamburger.png" },
    { id: 408, word: "Sandwich", meaning: "三明治", category: "Food", image: "assets/images/sandwich.png" },
    { id: 409, word: "Cheese", meaning: "起司", category: "Food", image: "assets/images/cheese.png" },
    { id: 410, word: "Butter", meaning: "奶油", category: "Food", image: "assets/images/butter.png" },
    { id: 411, word: "Cake", meaning: "蛋糕", category: "Food", image: "assets/images/cake.png" },
    { id: 412, word: "Cookie", meaning: "餅乾", category: "Food", image: "assets/images/cookie.png" },
    { id: 413, word: "Ice Cream", meaning: "冰淇淋", category: "Food", image: "assets/images/ice-cream.png" },
    { id: 414, word: "Chocolate", meaning: "巧克力", category: "Food", image: "assets/images/chocolate.png" },
    { id: 415, word: "Soup", meaning: "湯", category: "Food", image: "assets/images/soup.png" },
    { id: 416, word: "Salad", meaning: "沙拉", category: "Food", image: "assets/images/salad.png" },
    { id: 417, word: "Hot Dog", meaning: "熱狗", category: "Food", image: "assets/images/hot-dog.png" },
    { id: 418, word: "French Fries", meaning: "薯條", category: "Food", image: "assets/images/french-fries.png" },
    { id: 419, word: "Pancake", meaning: "鬆餅", category: "Food", image: "assets/images/pancake.png" },
    { id: 420, word: "Popcorn", meaning: "爆米花", category: "Food", image: "assets/images/popcorn.png" },

    // ===== Colors 顏色 =====

    { id: 501, word: "Red", meaning: "紅色", category: "Colors", image: "assets/images/red.png" },
    { id: 502, word: "Blue", meaning: "藍色", category: "Colors", image: "assets/images/blue.png" },
    { id: 503, word: "Yellow", meaning: "黃色", category: "Colors", image: "assets/images/yellow.png" },
    { id: 504, word: "Green", meaning: "綠色", category: "Colors", image: "assets/images/green.png" },
    { id: 505, word: "Orange", meaning: "橘色", category: "Colors", image: "assets/images/orange-color.png" },
    { id: 506, word: "Purple", meaning: "紫色", category: "Colors", image: "assets/images/purple.png" },
    { id: 507, word: "Pink", meaning: "粉紅色", category: "Colors", image: "assets/images/pink.png" },
    { id: 508, word: "Black", meaning: "黑色", category: "Colors", image: "assets/images/black.png" },
    { id: 509, word: "White", meaning: "白色", category: "Colors", image: "assets/images/white.png" },
    { id: 510, word: "Brown", meaning: "棕色", category: "Colors", image: "assets/images/brown.png" },
    { id: 511, word: "Gray", meaning: "灰色", category: "Colors", image: "assets/images/gray.png" },
    { id: 512, word: "Gold", meaning: "金色", category: "Colors", image: "assets/images/gold.png" },
    { id: 513, word: "Silver", meaning: "銀色", category: "Colors", image: "assets/images/silver.png" },
    { id: 514, word: "Beige", meaning: "米色", category: "Colors", image: "assets/images/beige.png" },
    //{ id: 515, word: "Rainbow", meaning: "彩虹色", category: "Colors", image: "assets/images/rainbow.png" },

    // ===== Numbers 數字 =====

    { id: 601, word: "Zero", meaning: "零", category: "Numbers", image: "assets/images/zero.png" },
    { id: 602, word: "One", meaning: "一", category: "Numbers", image: "assets/images/one.png" },
    { id: 603, word: "Two", meaning: "二", category: "Numbers", image: "assets/images/two.png" },
    { id: 604, word: "Three", meaning: "三", category: "Numbers", image: "assets/images/three.png" },
    { id: 605, word: "Four", meaning: "四", category: "Numbers", image: "assets/images/four.png" },
    { id: 606, word: "Five", meaning: "五", category: "Numbers", image: "assets/images/five.png" },
    { id: 607, word: "Six", meaning: "六", category: "Numbers", image: "assets/images/six.png" },
    { id: 608, word: "Seven", meaning: "七", category: "Numbers", image: "assets/images/seven.png" },
    { id: 609, word: "Eight", meaning: "八", category: "Numbers", image: "assets/images/eight.png" },
    { id: 610, word: "Nine", meaning: "九", category: "Numbers", image: "assets/images/nine.png" },
    { id: 611, word: "Ten", meaning: "十", category: "Numbers", image: "assets/images/ten.png" },
    { id: 612, word: "Eleven", meaning: "十一", category: "Numbers", image: "assets/images/eleven.png" },
    { id: 613, word: "Twelve", meaning: "十二", category: "Numbers", image: "assets/images/twelve.png" },
    { id: 614, word: "Thirteen", meaning: "十三", category: "Numbers", image: "assets/images/thirteen.png" },
    { id: 615, word: "Fourteen", meaning: "十四", category: "Numbers", image: "assets/images/fourteen.png" },
    { id: 616, word: "Fifteen", meaning: "十五", category: "Numbers", image: "assets/images/fifteen.png" },
    { id: 617, word: "Sixteen", meaning: "十六", category: "Numbers", image: "assets/images/sixteen.png" },
    { id: 618, word: "Seventeen", meaning: "十七", category: "Numbers", image: "assets/images/seventeen.png" },
    { id: 619, word: "Eighteen", meaning: "十八", category: "Numbers", image: "assets/images/eighteen.png" },
    { id: 620, word: "Nineteen", meaning: "十九", category: "Numbers", image: "assets/images/nineteen.png" },
    { id: 621, word: "Twenty", meaning: "二十", category: "Numbers", image: "assets/images/twenty.png" },
    { id: 622, word: "Hundred", meaning: "百", category: "Numbers", image: "assets/images/hundred.png" },
    { id: 623, word: "Thousand", meaning: "千", category: "Numbers", image: "assets/images/thousand.png" },

    // ===== Body Parts 身體部位 =====

    { id: 701, word: "Head", meaning: "頭", category: "Body Parts", image: "assets/images/head.png" },
    { id: 702, word: "Hair", meaning: "頭髮", category: "Body Parts", image: "assets/images/hair.png" },
    { id: 703, word: "Eye", meaning: "眼睛", category: "Body Parts", image: "assets/images/eye.png" },
    { id: 704, word: "Ear", meaning: "耳朵", category: "Body Parts", image: "assets/images/ear.png" },
    { id: 705, word: "Nose", meaning: "鼻子", category: "Body Parts", image: "assets/images/nose.png" },
    { id: 706, word: "Mouth", meaning: "嘴巴", category: "Body Parts", image: "assets/images/mouth.png" },
    { id: 707, word: "Tooth", meaning: "牙齒", category: "Body Parts", image: "assets/images/tooth.png" },
    { id: 708, word: "Neck", meaning: "脖子", category: "Body Parts", image: "assets/images/neck.png" },
    { id: 709, word: "Shoulder", meaning: "肩膀", category: "Body Parts", image: "assets/images/shoulder.png" },
    { id: 710, word: "Arm", meaning: "手臂", category: "Body Parts", image: "assets/images/arm.png" },
    { id: 711, word: "Hand", meaning: "手", category: "Body Parts", image: "assets/images/hand.png" },
    { id: 712, word: "Finger", meaning: "手指", category: "Body Parts", image: "assets/images/finger.png" },
    { id: 713, word: "Chest", meaning: "胸部", category: "Body Parts", image: "assets/images/chest.png" },
    //{ id: 714, word: "Back", meaning: "背部", category: "Body Parts", image: "assets/images/back.png" },
    { id: 715, word: "Stomach", meaning: "肚子", category: "Body Parts", image: "assets/images/stomach.png" },
    { id: 716, word: "Leg", meaning: "腿", category: "Body Parts", image: "assets/images/leg.png" },
    { id: 717, word: "Knee", meaning: "膝蓋", category: "Body Parts", image: "assets/images/knee.png" },
    { id: 718, word: "Foot", meaning: "腳", category: "Body Parts", image: "assets/images/foot.png" },
    { id: 719, word: "Toe", meaning: "腳趾", category: "Body Parts", image: "assets/images/toe.png" },
    { id: 720, word: "Heart", meaning: "心臟", category: "Body Parts", image: "assets/images/heart.png" },

    // ===== Family 家庭 =====

    { id: 801, word: "Father", meaning: "爸爸", category: "Family", image: "assets/images/father.png" },
    { id: 802, word: "Mother", meaning: "媽媽", category: "Family", image: "assets/images/mother.png" },
    { id: 803, word: "Parents", meaning: "父母", category: "Family", image: "assets/images/parents.png" },
    { id: 804, word: "Brother", meaning: "兄弟", category: "Family", image: "assets/images/brother.png" },
    { id: 805, word: "Sister", meaning: "姊妹", category: "Family", image: "assets/images/sister.png" },
    { id: 806, word: "Baby", meaning: "嬰兒", category: "Family", image: "assets/images/baby.png" },
    { id: 807, word: "Grandfather", meaning: "爺爺／外公", category: "Family", image: "assets/images/grandfather.png" },
    { id: 808, word: "Grandmother", meaning: "奶奶／外婆", category: "Family", image: "assets/images/grandmother.png" },
    { id: 809, word: "Grandparents", meaning: "祖父母／外祖父母", category: "Family", image: "assets/images/grandparents.png" },
    { id: 810, word: "Uncle", meaning: "叔叔／舅舅", category: "Family", image: "assets/images/uncle.png" },
    { id: 811, word: "Aunt", meaning: "阿姨／姑姑", category: "Family", image: "assets/images/aunt.png" },
    { id: 812, word: "Cousin", meaning: "堂／表兄弟姊妹", category: "Family", image: "assets/images/cousin.png" },
    { id: 813, word: "Son", meaning: "兒子", category: "Family", image: "assets/images/son.png" },
    { id: 814, word: "Daughter", meaning: "女兒", category: "Family", image: "assets/images/daughter.png" },
    { id: 815, word: "Family", meaning: "家庭", category: "Family", image: "assets/images/family.png" },

    // ===== School 學校 =====

    { id: 901, word: "School", meaning: "學校", category: "School", image: "assets/images/school.png" },
    { id: 902, word: "Teacher", meaning: "老師", category: "School", image: "assets/images/teacher.png" },
    { id: 903, word: "Student", meaning: "學生", category: "School", image: "assets/images/student.png" },
    { id: 904, word: "Classroom", meaning: "教室", category: "School", image: "assets/images/classroom.png" },
    { id: 905, word: "Desk", meaning: "書桌", category: "School", image: "assets/images/desk.png" },
    //{ id: 906, word: "Chair", meaning: "椅子", category: "School", image: "assets/images/chair.png" },
    //{ id: 907, word: "Book", meaning: "書", category: "School", image: "assets/images/book.png" },
    { id: 908, word: "Notebook", meaning: "筆記本", category: "School", image: "assets/images/notebook.png" },
    //{ id: 909, word: "Pencil", meaning: "鉛筆", category: "School", image: "assets/images/pencil.png" },
    //{ id: 910, word: "Pen", meaning: "原子筆", category: "School", image: "assets/images/pen.png" },
    { id: 911, word: "Eraser", meaning: "橡皮擦", category: "School", image: "assets/images/eraser.png" },
    { id: 912, word: "Ruler", meaning: "尺", category: "School", image: "assets/images/ruler.png" },
    //{ id: 913, word: "Backpack", meaning: "背包", category: "School", image: "assets/images/backpack.png" },
    //{ id: 914, word: "Crayon", meaning: "蠟筆", category: "School", image: "assets/images/crayon.png" },
    { id: 915, word: "Scissors", meaning: "剪刀", category: "School", image: "assets/images/scissors.png" },
    { id: 916, word: "Glue", meaning: "膠水", category: "School", image: "assets/images/glue.png" },
    { id: 917, word: "Blackboard", meaning: "黑板", category: "School", image: "assets/images/blackboard.png" },
    //{ id: 918, word: "Computer", meaning: "電腦", category: "School", image: "assets/images/computer.png" },
    //{ id: 919, word: "School Bus", meaning: "校車", category: "School", image: "assets/images/school-bus.png" },
    { id: 920, word: "Lunchbox", meaning: "便當盒", category: "School", image: "assets/images/lunchbox.png" },

    // ===== Nature 自然 =====

    { id: 1001, word: "Sun", meaning: "太陽", category: "Nature", image: "assets/images/sun.png" },
    { id: 1002, word: "Moon", meaning: "月亮", category: "Nature", image: "assets/images/moon.png" },
    { id: 1003, word: "Star", meaning: "星星", category: "Nature", image: "assets/images/star.png" },
    { id: 1004, word: "Sky", meaning: "天空", category: "Nature", image: "assets/images/sky.png" },
    { id: 1005, word: "Cloud", meaning: "雲", category: "Nature", image: "assets/images/cloud.png" },
    { id: 1006, word: "Rain", meaning: "雨", category: "Nature", image: "assets/images/rain.png" },
    { id: 1007, word: "Snow", meaning: "雪", category: "Nature", image: "assets/images/snow.png" },
    { id: 1008, word: "Wind", meaning: "風", category: "Nature", image: "assets/images/wind.png" },
    { id: 1009, word: "Rainbow", meaning: "彩虹", category: "Nature", image: "assets/images/rainbow.png" },
    { id: 1010, word: "Tree", meaning: "樹", category: "Nature", image: "assets/images/tree.png" },
    { id: 1011, word: "Flower", meaning: "花", category: "Nature", image: "assets/images/flower.png" },
    { id: 1012, word: "Grass", meaning: "草", category: "Nature", image: "assets/images/grass.png" },
    { id: 1013, word: "Mountain", meaning: "山", category: "Nature", image: "assets/images/mountain.png" },
    { id: 1014, word: "River", meaning: "河流", category: "Nature", image: "assets/images/river.png" },
    { id: 1015, word: "Ocean", meaning: "海洋", category: "Nature", image: "assets/images/ocean.png" },
    { id: 1016, word: "Beach", meaning: "海灘", category: "Nature", image: "assets/images/beach.png" },
    { id: 1017, word: "Rock", meaning: "岩石", category: "Nature", image: "assets/images/rock.png" },
    { id: 1018, word: "Leaf", meaning: "葉子", category: "Nature", image: "assets/images/leaf.png" },
    { id: 1019, word: "Forest", meaning: "森林", category: "Nature", image: "assets/images/forest.png" },
    { id: 1020, word: "Fire", meaning: "火", category: "Nature", image: "assets/images/fire.png" }

];

// ==========================================
// 單字資料庫輔助函式
// ==========================================

// 取得指定分類的單字
function getWordsByCategory(category) {
    return vocabulary.filter(item => item.category === category);
}

// 依照 ID 取得單字
function getWordById(id) {
    return vocabulary.find(item => item.id === id);
}

// 隨機打亂單字
function shuffleWords(words) {
    return [...words].sort(() => Math.random() - 0.5);
}

// 取得隨機單字
function getRandomWord() {
    const index = Math.floor(Math.random() * vocabulary.length);
    return vocabulary[index];
}

// 取得單字總數
function getVocabularyCount() {
    return vocabulary.length;
}

// 取得所有分類
function getCategories() {
    return [...new Set(vocabulary.map(item => item.category))];
}

console.log("英文單字資料庫載入成功！");
console.log("單字總數：", getVocabularyCount());
console.log("單字分類：", getCategories());
