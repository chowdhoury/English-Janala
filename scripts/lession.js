const loadingContainer = document.getElementById("loading-container");
const wordContainer = document.getElementById("word-container");
const display = (loader) => {
  if (loader) {
    loadingContainer.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  } else {
    wordContainer.classList.remove("hidden");
    loadingContainer.classList.add("hidden");
  }
};

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      displayLesson(data.data);
    });
};

const displayLesson = (lessons) => {
  const parent = document.getElementById("lesson-container");
  for (const lesson of lessons) {
    const child = document.createElement("div");
    child.innerHTML = `
        <button onclick='loadWords(${lesson.level_no})' id="lessonBtn-${lesson.level_no}" class="btn btn-outline btn-primary lessonButton"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `;
    parent.appendChild(child);
  }
};

const removeActive = () => {
  const removeBtn = document.getElementsByClassName("lessonButton");
  for (const button of removeBtn) {
    button.classList.remove("active");
  }
};

const loadWords = (lessonNo) => {
  display(true);
  fetch(`https://openapi.programming-hero.com/api/level/${lessonNo}`)
    .then((res) => res.json())
    .then((data) => displayWords(data.data));
  removeActive();
  const activeBtn = document.getElementById(`lessonBtn-${lessonNo}`);
  activeBtn.classList.add("active");
};

const displayWords = (words) => {
  const parent = document.getElementById("word-container");
  parent.innerHTML = "";
  if (words.length === 0) {
    parent.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify- gap-5 py-[50px]">
                <img src="./assets/alert-error.png">
                <p class="text-[#79716B] text-[14px] hind-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[#292524] text-[34px] font-medium hind-font">নেক্সট Lesson এ যান</h2>
            </div>
        `;
    display(false);
    return;
  }
  words.forEach((element) => {
    const child = document.createElement("div");
    // "id": 4,
    // "level": 5,
    // "word": "Diligent",
    // "meaning": "পরিশ্রমী",
    // "pronunciation": "ডিলিজেন্ট"
    child.innerHTML = `
            <div class="h-[372px] bg-white rounded-[12px] items-center flex flex-col gap-6 pt-[56px]">
                <h2 class="font-bold text-[32px] text-[#000]">${
                  element.word ? element.word : "শব্দ পাওয়া যাইনি"
                }</h2>
                <p class="font-medium text-[20px] text-[#000]">Meaning /Pronounciation</p>
                <h2 class="text-[#18181B] font-semibold text-[32px] hind-font">"${
                  element.meaning ? element.meaning : "অর্থ পাওয়া যাইনি"
                } / ${
      element.pronunciation
        ? element.pronunciation
        : "Pronunciation পাওয়া যাইনি"
    }"</h2>
                    <div class="mt-6 flex justify-between text-[28px] w-full px-[47px]">
                    <button onclick="displayModal(${
                      element.id
                    })" class="btn bg-[#1A91FF1A]">
                        <i class="fa-solid fa-circle-exclamation"></i> 
                    </button>
                    <button class="btn bg-[#1A91FF1A]">     
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                    </div>
            </div>
        `;
    parent.appendChild(child);
  });
  display(false);
};

const displayModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      shownModal(data.data);
    });
};
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
const shownModal = (info) => {
  const parent = document.getElementById("modal-content");
  parent.innerHTML = `
  <h2 class="text-[36px] font-semibold text-[#000000] mb-8">${
    info.word
  } (<i class="fa-solid fa-microphone-lines"></i> :${info.pronunciation})</h2>
          <p class="text-[24px] font-semibold text-[#000000]">Meaning</p>
          <p class="text-[24px] font-medium hind-font text-[#000000] mt-[10px] mb-[32px]">${
            info.meaning
          }</p>
          <p class="text-[24px] font-semibold text-[#000000]">Example</p>
          <p class="text-[24px] text-[#000000] mt-2 mb-8">${info.sentence}</p>
          <p class="text-[24px] font-semibold text-[#000000] hind-font">সমার্থক শব্দ গুলো</p>
          <div class="mt-[16px]">
            ${createBtn(info.synonyms)}
          </div>
  `;
  my_modal_5.showModal();
};

const createBtn = (synonyms) => {
  console.log(synonyms);
  const htmlElements = synonyms.map(
    (el) => `<button class="btn">${el}</button>`
  );
  return htmlElements.join(" ");
};

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", () => {
  const searchKey = document.getElementById("searchKey");
  const searchKeyword = searchKey.value.trim().toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const ddata = data.data;
      const finalData = ddata.filter((item) =>
        item.word.toLowerCase().includes(searchKeyword)
      );
      displayWords(finalData);
      // console.log(finalData);
    });

  searchKey.value = "";
  removeActive();
});

loadLesson();
