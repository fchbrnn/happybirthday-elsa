const questions = [
    {
        question: "Dimana tempat pertama kali kita bertemu??",
        options: ["Kampus", "Kafe", "Bioskop", "Mall"],
        answer: "Kafe"
    },
    {
        question: "Tanggal berapa kita resmi jadian?",
        options: ["14 Februari", "1 Oktober", "1 Januari", "10 Oktober"],
        answer: "1 Januari"
    },
    {
        question: "Apa makanan favorit kita saat kencan?",
        options: ["Pizza", "Sushi", "Nasi goreng", "Udon"],
        answer: "Udon"
    },
    {
        question: "Apa film pertama yang kita tonton bersama?",
        options: ["Wonka", "172 Days", "Marvel", "Desa Penari"],
        answer: "Marvel"
    },
    {
        question: "Apa lagu yang paling kita sukai dan sering kita dengarkan bersama?",
        options: ["Perfect - Ed Sheeran", "locked Out of Heaven - Bruno Mars", "Million Years Ago - Adele", "All of Me - John Legend"],
        answer: "locked Out of Heaven - Bruno Mars"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedOption) {
    const questionData = questions[currentQuestionIndex];
    if (selectedOption === questionData.answer) {
        score++;
        document.getElementById('score').innerText = `Score : ${score} / 5`;
        if (currentQuestionIndex < questions.length - 1) {
            document.getElementById('next-button').style.display = 'block';
        } else {
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('result-screen').style.display = 'block';
        }
    } else {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('retry-screen').style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('question-number').innerText = `Question : ${currentQuestionIndex + 1} / 5`;
    loadQuestion();
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').innerText = `Score : ${score} / 5`;
    document.getElementById('question-number').innerText = `Question : 1 / 5`;
    document.getElementById('retry-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function nextLevel() {
    document.getElementById('quiz-container').style.display = 'none'; // Hide the quiz container
    document.getElementById('result-screen').style.display = 'none'; // Hide the result screen

    Swal.fire({
        title: 'Do you want to play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
        }
        
        // Show the greeting and scroll to the top of the container smoothly
        document.querySelector('.container').style.display = 'block'; // Display the container
        document.querySelector('.container').scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the container's top

        // Start the animation timeline after scrolling
        animationTimeline();
    });
}


// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 2.5, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3.5")
    .to(".two",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "-=1")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        2, {
            visibility: "visible",
        },
        0.05
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "+=4")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-5",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-5",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .staggerFrom(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    .staggerFromTo(
        ".baloons img",
        2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        },
        0.2
    )
    .from(
        ".profile-picture",
        0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        },
        0.1,
        "party"
    )
    .from(
        ".wish h5",
        0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    .staggerTo(
        ".eight svg",
        1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
        },
        0.3
    )
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=1"
    );

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
}
