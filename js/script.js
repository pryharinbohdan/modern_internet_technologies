const button = document.querySelector('#header-button-area button');
const burgerMenu = document.querySelector('#burger-menu');

// ВИПАДАЮЧЕ БУРГЕР МЕНЮ

button.addEventListener('click', () => {
    if (burgerMenu.className === "burger-menu-hidden") {
        burgerMenu.className = "burger-menu-show";
    } else {
        burgerMenu.className = "burger-menu-hidden";
    }
})


const reviewsData = document.querySelector("#reviews-data");
let commentsRange = 0;
let siteInfo;

// ФУНКЦІЯ ДЛЯ ПОКАЗУ 5 ОБРАНИХ ВІДГУКІВ

function showComments() {
    reviewsData.innerHTML = '';
    for (let i = 0; i < 5; ++i) {
        const currInfo = siteInfo[commentsRange+i];
        reviewsData.innerHTML += `
            <blockquote>
                <p style="margin-bottom: 10px;"><small>${currInfo.email}</small></p>
                <p>${currInfo.body}</p>
            </blockquote>
        `;
    }
}

// КНОПКИ ВПЕРЕД ТА НАЗАД (ДЛЯ ПОКАЗУ ПОТРІБНИХ ВІДГУКІВ)

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

prevBtn.addEventListener('click', ()=> {
    if (commentsRange >= 0) {
        commentsRange -= 5;
        showComments();
    }
});

nextBtn.addEventListener('click', ()=> {
    if (commentsRange < siteInfo.length) {
        commentsRange += 5;
        showComments();
    }
});

const catalog = document.querySelector("#catalog-div");

// flowers info (FETCH)

let flowersInfo;

function loadCards() {
    catalog.innerHTML = '';
    for (let i = 0; flowersInfo[i] !== undefined; ++i) {
        const imgURL = flowersInfo[i].imgURL;
        const altImgDescription = flowersInfo[i].altImgDescription;
        const flowerDescription = flowersInfo[i].description;
        const flowerPrice = flowersInfo[i].price;

        catalog.innerHTML += `
            <article>
                <img src="${imgURL}" alt="${altImgDescription}">
                <p>${flowerDescription}</p>
                <p>${flowerPrice} грн</p>
            </article>
        `;
    }
}

// GET ЗАПИТ ДО СЕРВЕРУ (для інфи квітів)

fetch('https://bohdan-pryh.free.beeceptor.com/assortment')
    .then(response => response.json())
    .then(data => {
        flowersInfo = data;
        loadCards();
    })




// GET ЗАПИТ ДО СЕРВЕРУ (для відгуків)

fetch("https://jsonplaceholder.typicode.com/comments")
    .then(response => response.json())
    .then(data => {
        siteInfo = data;
        showComments();
    });

const inputName = document.querySelector("#name").value;
const inputReview = document.querySelector("#review").value;

const postBtn = document.querySelector("#reviews form button")


function press_post() {
    // POST ЗАПИТ ДО СЕРВЕРУ (для відгуків)

    fetch("https://bohdan-pryh.free.beeceptor.com/comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: inputName,
            name: inputName,
            body: inputReview
        })
    })
        .then(response => response.json())
        .then(data => alert(data.status));
}

postBtn.addEventListener('click', ()=>{
    if (inputName != "" && inputReview != "") {
        press_post();
    }
});