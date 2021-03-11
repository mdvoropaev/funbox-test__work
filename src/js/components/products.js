const cardsProduct = () => {
  class ProdCard {
    constructor(
      classProd,
      src,
      title,
      ingr,
      motto,
      stock,
      weight,
      avail,
      msgFront,
      msgBack,
      parentSelector
    ) {
      this.classProd = classProd;
      this.src = src;
      this.title = title;
      this.ingr = ingr;
      this.motto = motto;
      this.stock = stock;
      this.weight = weight;
      this.avail = avail;
      this.msgFront = msgFront;
      this.msgBack = msgBack;
      this.parent = document.querySelector(parentSelector);
    }

    render() {
      const element = document.createElement("article");
      element.className = "catalog__item-card product-card";
      element.innerHTML = `
              <div class="product-card__${this.classProd}" data-availability="${this.avail}">
              <div class="product-card__wrapper">
                <div class="product-card__info">
                  <p class="product-card__motto">${this.motto}</p>
                  <h3 class="product-card__title h3">${this.title} <span class="ingredient">${this.ingr}</span></h3>
                  <ul class="product-card__stock">
                  ${this.stock}
                  </ul>
                </div>
                <img class="product-card__image" src="${this.src}" alt="${this.title} ${this.ingr}" title="${this.title} ${this.ingr}">
                <div class="product-card__weight">
                  <p>${this.weight}</p>
                </div>
              </div>
              <p class="product-card__message front">${this.msgFront}</p>
              <p class="product-card__message back">${this.msgBack}</p>
              </div>
        `;
      this.parent.append(element);
    }
  }

  new ProdCard(
    "foie-gras",
    "img/cat-2.png",
    "Нямушка",
    "с&nbsp;фуa-гра",
    "Cказочное заморское яство",
    "<li><span>10</span> порций</li><li>мышь в&nbsp;подарок</li>",
    "0,5<span>кг</span>",
    "yes",
    'Чего сидишь? Порадуй котэ, <button class="product-card__button btn" type="button">купи.</button>',
    "Печень утки разварная с&nbsp;артишоками.",
    ".catalog-list"
  ).render();

  new ProdCard(
    "fish",
    "img/cat-2.png",
    "Нямушка",
    "с&nbsp;рыбой",
    "Cказочное заморское яство",
    "<li><span>40</span> порций</li><li><span>2</span>&nbsp;мыши в&nbsp;подарок</li>",
    "2<span>кг</span>",
    "yes",
    'Чего сидишь? Порадуй котэ, <button class="product-card__button btn" type="button">купи.</button>',
    "Головы щучьи с&nbsp;чесноком да&nbsp;свежайшая сёмгушка.",
    ".catalog-list"
  ).render();

  new ProdCard(
    "chicken",
    "img/cat-2.png",
    "Нямушка",
    "с&nbsp;курой",
    "Cказочное заморское яство",
    "<li><span>100</span> порций</li><li><span>5</span>&nbsp;мышей в&nbsp;подарок</li><li>Заказчик доволен</li>",
    "5<span>кг</span>",
    "no",
    'Чего сидишь? Порадуй котэ, <button class="product-card__button btn" type="button">купи.</button>',
    "Филе из&nbsp;цыплят с&nbsp;трюфелями в&nbsp;бульоне.",
    ".catalog-list"
  ).render();
};

cardsProduct();

// поведение карточек со статусом "no"
const noProd = Array.prototype.slice.call(
  document.querySelectorAll('[data-availability="no"]')
);
noProd.forEach(element => {
  // console.log(element);
  let ingrName = element.querySelector(".ingredient").textContent;
  element.querySelector(".front").textContent =
    "Печалька, " + ingrName + " закончился.";
});

// поведение карточек со статусом "yes"
const onProd = Array.prototype.slice.call(
  document.querySelectorAll('[data-availability="yes"]')
);
onProd.forEach(elem => {
  //добавляем класс selected для карточки с классом product-card__fish
  const fish = document.querySelector(".product-card__fish");
  fish.classList.add("selected");

  //настройка кликабельности кнопок и карточек
  const prodCards = elem.querySelector(".product-card__wrapper");
  const btn = elem.querySelector(".btn");

  prodCards.onclick = () => {
    elem.classList.toggle("selected");
  };

  btn.onclick = () => {
    elem.classList.toggle("selected");
  };

  //реализуем поведение активных карточек при наведении курсора и после того как курсор убрали

  const mottoDefault = elem.querySelector(".product-card__motto");
  elem.querySelector(".product-card__wrapper").onmouseout = event => {
    target = event.target.closest(".selected");
    if (target) {
      mottoDefault.classList.add("active");
      mottoDefault.textContent = "Котэ не одобряет?";
    }
  };
  elem.querySelector(".product-card__wrapper").onmouseover = event => {
    target = event.target.closest(".selected");
    if (target) {
      mottoDefault.classList.remove("active");
      mottoDefault.textContent = "Cказочное заморское яство";
    }
  };

  // console.log(elem);
});
