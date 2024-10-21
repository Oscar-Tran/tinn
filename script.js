const questions = [
    {
        question: "Theo quy tắc nền tảng của văn hóa ứng xử trên mạng, điều gì là quan trọng khi hoạt động trong không gian mạng?",
        answers: [
            "Hành xử tùy ý mà không cần tuân thủ quy tắc",
            "Tuân thủ tiêu chuẩn đạo đức, văn hóa và pháp luật",
            "Chỉ cởi mở với những người quen biết",
            "Để mặc mọi thứ diễn ra mà không can thiệp"
        ],
        correct: 1
    },
    {
        question: "Khi phản ứng với ai đó trên mạng, cách tiếp cận nào là đúng đắn?",
        answers: [
            "Lên án họ một cách công khai và mạnh mẽ",
            "Phản ứng lịch sự và giải quyết theo cách riêng tư",
            "Bỏ qua lỗi của họ và không nói gì",
            "Chia sẻ sự khó chịu của mình với mọi người xung quanh"
        ],
        correct: 1
    },
    {
        question: "Tôn trọng quyền riêng tư trong văn hóa ứng xử trên mạng có nghĩa là:",
        answers: [
            "Đọc và chuyển tiếp thông tin cá nhân của người khác mà không cần sự cho phép",
            "Không thu thập thông tin cá nhân của người khác để chia sẻ cho nhau",
            "Chia sẻ mọi thông tin cá nhân mà mình có được với người khác",
            "Chỉ quan tâm đến thông tin cá nhân của những người nổi tiếng"
        ],
        correct: 1
    },
    {
        question: "Hành vi nào sau đây không là hành vi vi phạm pháp luật về chia sẻ thông tin?",
        answers: [
            "Chia sẻ tin tức của trang báo Lao Động lên trang cá nhân Facebook.",
            "Chia sẻ văn hoá phẩm đồi truỵ trên mạng.",
            "Đăng tin sai sự thật về người khác lên Zalo.",
            "Phát tán video độc hại lên mạng."
        ],
        correct: 0
    },
    {
        question: "Đâu là hành vi ứng xử thiếu văn hóa trên mạng xã hội?",
        answers: [
            "Sử dụng ngôn từ “Body Shaming”",
            "Sử dụng ngôn từ văn minh lịch sự",
            "Chia sẻ tin tức đã được kiểm chứng",
            "Bảo vệ thông tin cá nhân"
        ],
        correct: 0
    },
    {
        question: "Khi có chuyện bực tức một ai đó, mà em đang sử dụng mạng xã hội, em sẽ làm gì?",
        answers: [
            "Đăng ngay lên mạng xã hội.",
            "Không đăng lên mạng xã hội vì mạng xã hội không phải là nơi xả cơn giận.",
            "Đăng lên mạng xã hội để chỉ trích người đó",
            "Nhờ bạn bè đăng lên mạng xã hội để xả giận."
        ],
        correct: 1
    }
];

let currentBag = null;
const modal = document.getElementById('questionModal');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const bagsContainer = document.querySelector('.bags-container');

// Tạo 6 túi
for (let i = 0; i < 6; i++) {
    const bag = document.createElement('div');
    bag.className = 'bag';
    bag.addEventListener('click', () => openBag(i));
    bagsContainer.appendChild(bag);
}

function openBag(index) {
    const bag = document.querySelectorAll('.bag')[index];
    if (bag.classList.contains('opened')) return;
    
    currentBag = bag;
    showQuestion(index);
}

function showQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(i, question.correct));
        answersContainer.appendChild(button);
    });

    modal.style.display = 'block';
}

function checkAnswer(selectedIndex, correctIndex) {
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    
    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add('correct');
        currentBag.classList.add('opened');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 1000);
    } else {
        buttons[selectedIndex].classList.add('wrong');
        setTimeout(() => {
            buttons[selectedIndex].classList.remove('wrong');
        }, 1000);
    }
}

// Đóng modal khi click bên ngoài
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Thêm biến đếm số túi đã mở
let openedBags = 0;

// Audio elements
const bgMusic = document.getElementById('bgMusic');
const questionMusic = document.getElementById('questionMusic');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const finalBag = document.getElementById('finalBag');

// Thiết lập âm lượng
bgMusic.volume = 0.1;
questionMusic.volume = 100;
correctSound.volume = 10;
wrongSound.volume = 10;

// Bắt đầu nhạc nền khi trang web được load
document.addEventListener('DOMContentLoaded', () => {
    bgMusic.play().catch(error => {
        console.log("Autoplay bị chặn: ", error);
    });
});

function openBag(index) {
    const bag = document.querySelectorAll('.bag')[index];
    if (bag.classList.contains('opened')) return;
    
    currentBag = bag;
    showQuestion(index);
    
    // Tạm dừng nhạc nền và bắt đầu nhạc câu hỏi
    bgMusic.pause();
    questionMusic.currentTime = 0;
    questionMusic.play();
}

function checkAnswer(selectedIndex, correctIndex) {
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    
    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add('correct');
        currentBag.classList.add('opened');
        correctSound.play();
        openedBags++;
        
        setTimeout(() => {
            modal.style.display = 'none';
            questionMusic.pause();
            questionMusic.currentTime = 0;
            bgMusic.play();
            
            // Kiểm tra nếu đã mở hết túi
            if (openedBags === 6) {
                showFinalBag();
            }
        }, 1000);
    } else {
        buttons[selectedIndex].classList.add('wrong');
        wrongSound.play();
        setTimeout(() => {
            buttons[selectedIndex].classList.remove('wrong');
        }, 1000);
    }
}

function showFinalBag() {
    finalBag.classList.remove('hidden');
    setTimeout(() => {
        finalBag.classList.add('show');
    }, 100);
}

// Đóng modal khi click bên ngoài
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        questionMusic.pause();
        questionMusic.currentTime = 0;
        bgMusic.play();
    }
});