const question = [
    {
        q: "野菜",
        a: ["は", "く", "さ", "い"]
    },
    {
        q: "虫",
        a: ["こ", "お", "ろ", "ぎ"]
    },
    {
        q: "動物",
        a: ["ラ", "イ", "オ", "ン"]
    },
    {
        q: "文房具",
        a: ["え", "ん", "ぴ", "つ"]
    },
];

//top画面
const scenetop = document.querySelector("#start");
//game画面
const scecegame = document.querySelector("#game");
//next画面
const next = document.querySelector("#next");

const select = document.querySelectorAll(".select");
const answer = document.querySelectorAll(".answer");

//選択された答え
let answers = [];
let questionnum = 0;

init();

function init() {
    changescene(scecegame, scenetop);
    scenetop.addEventListener('click', gamestart, false);
}

function changescene(hiddenscene, visiblescene) {
    hiddenscene.classList.add("is-hidden");
    hiddenscene.classList.remove("is-visible");
    visiblescene.classList.add("is-visible");
}

function gamestart() {
    changescene(scenetop, scecegame);
    showQuestion();
}

//シャッフル（正しい版）
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//問題もシャッフル
shuffle(question);

//問題表示
function showQuestion() {

    answers = [];

    //答えリセット（4文字対応）
    for (let i = 0; i < answer.length; i++) {
        answer[i].textContent = "";
    }

    //選択リセット
    for (let i = 0; i < select.length; i++) {
        select[i].onpointerdown = null;
        select[i].classList.remove("used");
        select[i].classList.remove("is-hidden");
    }

    //問題の文字
    let shufflea = question[questionnum].a.concat();

    //シャッフル
    for (let i = shufflea.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        [shufflea[i], shufflea[r]] = [shufflea[r], shufflea[i]];
    }

    document.querySelector("h1").textContent = question[questionnum].q;

    //選択肢表示
    for (let i = 0; i < shufflea.length; i++) {
        select[i].textContent = shufflea[i];
    }

    let count = 0;

    //クリック処理
    for (let i = 0; i < shufflea.length; i++) {

        select[i].onpointerdown = () => {

            if (select[i].classList.contains("used")) return;

            answer[count].textContent = select[i].textContent;
            answers.push(select[i].textContent);

            select[i].classList.add("used");

            count++;

            // ★自動判定（4文字揃ったら）
            if (count === shufflea.length) {
                setTimeout(() => {
                    Judgment();
                }, 150);
            }
        };
    }
}

//判定
function Judgment() {

    next.innerHTML = "";

    changescene(scecegame, next);

    if (JSON.stringify(question[questionnum].a) === JSON.stringify(answers)) {
        next.innerHTML =
            "<p style='font-size:3em;color:#008000;'>バッチリ😄　 です！</p>" +
            "<button onclick='nextquestion()'>次に　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　進みます！</button>";
    } else {
        next.innerHTML =
            "<p style='font-size:3em;color:#008080;'>オーケー😊　 です！</p>" +
            "<button onclick='nextquestion()'>次に　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　進みます！</button>";
    }
}

//次へ
function nextquestion() {

    questionnum++;

    if (question.length > questionnum) {
        changescene(next, scecegame);
        showQuestion();
    } else {
        questionnum = 0;
        changescene(next, scecegame);
        showQuestion();
    }
}
