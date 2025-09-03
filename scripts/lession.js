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
    const removeBtn = document.getElementsByClassName('lessonButton');
    for(const button of removeBtn){
        button.classList.remove('active');
    }
}

const loadWords = (lessonNo) => {
  fetch(`https://openapi.programming-hero.com/api/level/${lessonNo}`)
    .then((res) => res.json())
        .then((data) => displayWords(data.data));
    removeActive();
  const activeBtn = document.getElementById(`lessonBtn-${lessonNo}`);
  activeBtn.classList.add('active');
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
                    <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF1A]">
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
};
loadLesson();
