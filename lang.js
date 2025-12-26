const SUPPORTED_LANGS = ["zh", "en"];
const STORAGE_KEY_LANG = "portfolio-lang";

const translations = {
  zh: {
    "nav.home": "首頁",
    "nav.about": "關於我",
    "nav.works": "專案介紹",
    "nav.gallery": "作品展間",
    "nav.contact": "留言互動",

    "home.hero.title": "你好，我是",
    "home.hero.subtitle": "Senior UI/UX Designer | Product Designer",
    "home.hero.subtitle2": "擁有 5+ 年專案實戰經驗。致力於透過系統化設計思維（Design System）和深入的使用者研究（UX Research），將優異的使用者體驗（UX）轉化為產品的實質業務增長，並持續優化用戶留存與轉換率。",
    "home.hero.desc":
      "這裡整理了我的工作經歷、代表作品與聯絡方式，歡迎逛逛，也可以在留言頁和我互動。",
    "home.hero.viewWorks": "查看作品",
    "home.hero.goContact": "前往留言",
    "home.hero.role": "職稱 / 角色",
    "home.hero.company": "目前任職於 XXX 公司，負責 YYY 相關開發。",

    "about.title": "關於我",
    "about.subtitle": "Senior UI/UX Designer | 5+年經驗",
    "about.subtitle2": "專注使用者旅程優化 | Design System｜精通 Prototyping, Mobile & Web | 跨平台設計與驗證",
    "about.section.profile": "個人簡介",
    "about.profile.p1":
      "我是一名擁有 5 年以上業界經驗的 UI/UX 設計師。曾服務於金融業領域，並有自行接案的經驗。主要負責協助公司製作各項使用者體驗設計，含前期使用者研究到後期切版，是一位橫向發展能力的設計師。",
    "about.profile.p2":
      "由於學習過前端框架技術，現在的我是個擁有設計與工程能力並存的設計師，除了對美感有要求外也專注於創造流暢的前端使用體驗，讓團隊溝通更有效率，致力於讓產品帶給使用者更多的回饋與價值。在長期的數位產品設計經驗中，不僅提升了設計技能，更養成了以數據與使用者需求為核心的設計思維。",
    "about.section.skills": "技能",
    "about.skill.frontend": "UI/UX Design",
    "about.skill.backend": "使用者研究",
    "about.skill.tools": "前端技術",
    "about.timeline.title": "工作經歷",
    "about.timeline.a.title": "玉山商業銀行 E.SUN COMMERCIAL BANK - Senior UI/UX Designer",
    "about.timeline.a.period": "10/2019 - 04/2025",
    "about.timeline.a.desc":
      "透過 NPS、Kano 分析與 Google Analytics 資料洞察使用者需求，開發跨國產品 - UCB Mobile Banking App，與柬埔寨主管機關、開發團隊、專案經理及其他設計師協作，優化使用者體驗，提升轉換率與使用滿意度。",
    "about.timeline.a.desc2":
      "依據 WCAG 無障礙設計標準，迭代並優化內部系統，提升長者及視覺障礙使用者的可用性；同時建立可共用並擴充的 Figma Library，將公司設計系統標準化，實踐 DesignOps 精神，提升跨部門合作效率並確保跨專案一致性。",
    "about.timeline.a.desc3":
      "重新設計招募網站並梳理招募流程，包含應徵者使用的 SaaS 平台（B2C）以及 HR 內部招募後台系統（B2B），優化職缺申請流程與新人入職體驗，並透過易用性測試照出 8 項鍵優化建議。",
    "about.timeline.a.desc4":
      "舉辦 5 場內部 UI/UX 講座與工作坊（ Design Thinking、使用者旅程、Card Sorting等等），增加公司對於設計的重要性，促進跨部門合作成長 30%，展現有效傳達複雜設計概念與推動協作成果的能力。",
    "about.timeline.a.desc5":
      "為團隊設計官方網站，推廣並介紹團隊工作內容及設計的價值，且協助前端網頁開發切版上線。",
    "about.timeline.a.projects.title": "主要代表專案：",
    "about.timeline.a.projects":
      "海外子行行動銀行、智能系統櫃、新分行系統、行內匯款系統、新甄選系統、團隊官方網站、UX 課程規劃與教學、入職旅程體驗精進、中小企業App",
    "about.timeline.b.title": "Freelancer - Graphic Designer / UI/UX Designer",
    "about.timeline.b.period": "2017 - Now",
    "about.timeline.b.desc":
      "05/2025-10/2025 - 參與跨國新創公司 TicketRecipe 二手票券交易平台 Web 之 UIUX 設計。",
    "about.timeline.b.desc2":
      "10/2023-01/2025 - 田寮生技數位科技股份有限公司及其子品牌之社群媒體營運規劃及設計，將複雜的生技資訊轉化為易懂的視覺內容，獨立完成產品推廣、品牌形象、節慶活動等各類平面設計稿件。",
    "about.timeline.b.desc3":
      "09/2018-03/2020 - 與 5% Design Action 社會設計平台專案合作，設計一項含線上線下的服務系統，梳理服務流程、服務藍圖、規劃APP與網站架構設計。",
    "about.timeline.b.desc4":
      "08/2017-06/2020 - 小紅樓音樂藝術工作室各項活動海報、招生文宣設計，及社群媒體營運。",
    "about.timeline.c.title": "其他",
    "about.timeline.c.desc": "2019 德國 iF 新秀獎 best of the year (UI/UX)",
    "about.timeline.c.desc2": "2019 荷蘭 Indigo Design Award 銀獎 (UI/UX)",
    "about.timeline.c.desc3": "2021 第三屆 The F2E 前端 & UI 修煉精神時光屋 團體組佳作",
    "about.timeline.c.desc4": "2022 第四屆 The F2E 前端 & UI 修煉精神時光屋 團體組第一名",

    "works.title": "專案介紹",
    "works.subtitle": "Hello，這邊放了我的代表性的專案或作品，歡迎逛逛，並且分享您的想法唷。",
    "works.card1.badge": "Web 專案",
    "works.card1.title": "專案名稱 A",
    "works.card1.desc":
      "簡短介紹這個專案的目的、你在其中負責的部分，以及使用到的技術。",
    "works.card1.link": "查看 Demo / GitHub",
    "works.card2.badge": "UI 設計",
    "works.card2.title": "專案名稱 B",
    "works.card2.desc":
      "如果你有設計相關的作品，可以放一些介面設計、流程圖或原型的連結。",
    "works.card2.link": "查看設計稿",
    "works.card3.badge": "Side Project",
    "works.card3.title": "個人小作品",
    "works.card3.desc":
      "可以放一些你在下班後或學習期間做的小工具、小遊戲或實驗性專案。",
    "works.card3.link": "查看更多",

    "gallery.title": "作品展間",
    "gallery.subtitle": "這裡展示了我過往的一些設計作品，歡迎參觀。",
    "gallery.img1.caption": "作品圖片 1 說明文字",
    "gallery.img2.caption": "作品圖片 2 說明文字",
    "gallery.img3.caption": "作品圖片 3 說明文字",
    "gallery.img4.caption": "作品圖片 4 說明文字",

    "contact.title": "留言互動",
    "contact.subtitle": "歡迎留下你的想法、問題或給我的建議。",
    "contact.form.title": "留下留言",
    "contact.form.name": "名稱（可留暱稱）",
    "contact.form.name.placeholder": "例如：小明 / 前端同好",
    "contact.form.message": "留言內容",
    "contact.form.message.placeholder":
      "寫下你對作品的想法、問題或任何想對我說的話：）",
    "contact.form.submit": "送出留言",
    "contact.form.hint":
      "留言目前會儲存在你的瀏覽器本機，不會上傳到伺服器。",
    "contact.board.title": "留言板",
    "contact.board.clear": "清除所有本機留言",
    "contact.board.empty": "目前還沒有留言，成為第一個吧！",

    "footer.copyright": "All rights reserved.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.works": "Projects",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",

    "home.hero.title": "Hi, I'm",
    "home.hero.subtitle":
      "A front-end / full-stack developer focusing on great user experience.",
    "home.hero.desc":
      "Here you can find my work experience, featured projects and ways to reach me. Feel free to say hi on the contact page.",
    "home.hero.viewWorks": "View projects",
    "home.hero.goContact": "Leave a message",
    "home.hero.role": "Role / Title",
    "home.hero.company":
      "Currently working at XXX, building YYY related products.",

    "about.title": "About Me",
    "about.subtitle": "Senior UI/UX Designer | 5+ years experience",
    "about.subtitle2": "Focus on user journey optimization | Design System | Proficient in Prototyping, Mobile & Web | Cross-platform design and validation",
    "about.section.profile": "Profile",
    "about.profile.p1":
      "Write a short paragraph about who you are, your background, interests and strengths.",
    "about.profile.p2":
      "You can mention your current role, the products or projects you work on, and your thoughts on technology or design.",
    "about.section.skills": "Skill Set",
    "about.skill.frontend": "Front-end",
    "about.skill.backend": "Back-end / Services",
    "about.skill.tools": "Tools & Workflow",
    "about.timeline.title": "Experience",
    "about.timeline.a.title": "E.SUN COMMERCIAL BANK - Senior UI/UX Designer",
    "about.timeline.a.period": "10/2019 - 04/2025",
    "about.timeline.a.desc":
      "Analyzed user needs through NPS, Kano analysis, and Google Analytics data to develop cross-border product - UCB Mobile Banking App. Collaborated with Cambodian regulatory authorities, development teams, project managers, and other designers to optimize user experience, improve conversion rates and user satisfaction.",
    "about.timeline.a.desc2":
      "Iterated and optimized internal systems according to WCAG accessibility design standards, improving usability for elderly and visually impaired users. Established a shareable and expandable Figma Library, standardizing the company's design system, practicing DesignOps principles, enhancing cross-departmental collaboration efficiency and ensuring cross-project consistency.",
    "about.timeline.a.desc3":
      "Redesigned recruitment website and streamlined recruitment processes, including SaaS platform for applicants (B2C) and HR internal recruitment backend system (B2B), optimized job application process and new employee onboarding experience, and identified 8 key optimization recommendations through usability testing.",
    "about.timeline.a.desc4":
      "Conducted 5 internal UI/UX lectures and workshops (Design Thinking, User Journey, Card Sorting, etc.), increasing company awareness of design importance, promoting cross-departmental collaboration growth by 30%, demonstrating ability to effectively communicate complex design concepts and drive collaborative results.",
    "about.timeline.a.desc5":
      "Designed official website for the team, promoting and introducing team work content and design value, and assisted in front-end web development and deployment.",
    "about.timeline.a.projects.title": "Key Representative Projects:",
    "about.timeline.a.projects":
      "Overseas Subsidiary Mobile Banking, Intelligent System Counter, New Branch System, Internal Remittance System, New Recruitment System, Team Official Website, UX Course Planning and Teaching, Onboarding Journey Experience Enhancement, SME App",
    "about.timeline.b.title": "Freelancer - Graphic Designer / UI/UX Designer",
    "about.timeline.b.period": "2017 - Now",
    "about.timeline.b.desc":
      "05/2025-10/2025 - Participated in UI/UX design for TicketRecipe, a cross-border startup's second-hand ticket trading platform Web.",
    "about.timeline.b.desc2":
      "10/2023-01/2025 - Social media operation planning and design for Tianliao Biotechnology Digital Technology Co., Ltd. and its sub-brands, transforming complex biotech information into understandable visual content, independently completing various graphic design works for product promotion, brand image, and holiday campaigns.",
    "about.timeline.b.desc3":
      "09/2018-03/2020 - Collaborated with 5% Design Action social design platform project, designed an online and offline service system, organized service processes, service blueprints, and planned APP and website architecture design.",
    "about.timeline.b.desc4":
      "08/2017-06/2020 - Various event posters, recruitment materials design, and social media operation for Xiaohonglou Music Art Studio.",
    "about.timeline.c.title": "Others",
    "about.timeline.c.desc": "2019 Germany iF Design Talent Award best of the year (UI/UX)",
    "about.timeline.c.desc2": "2019 Netherlands Indigo Design Award Silver (UI/UX)",
    "about.timeline.c.desc3": "2021 3rd The F2E Frontend & UI Training Time Chamber Team Category Merit",
    "about.timeline.c.desc4": "2022 4th The F2E Frontend & UI Training Time Chamber Team Category 1st Place",

    "works.title": "Projects",
    "works.subtitle": "Some selected projects I’ve worked on.",
    "works.card1.badge": "Web Project",
    "works.card1.title": "Project A",
    "works.card1.desc":
      "Describe what this project is about, what you were responsible for and the tech stack you used.",
    "works.card1.link": "View demo / GitHub",
    "works.card2.badge": "UI Design",
    "works.card2.title": "Project B",
    "works.card2.desc":
      "If you do design work, you can link UI screens, user flows or prototypes here.",
    "works.card2.link": "View designs",
    "works.card3.badge": "Side Project",
    "works.card3.title": "Personal Projects",
    "works.card3.desc":
      "Showcase some tools, experiments or side projects you build in your spare time.",
    "works.card3.link": "See more",

    "gallery.title": "Gallery",
    "gallery.subtitle":
      "Use this space for design shots, project screenshots or photography.",
    "gallery.img1.caption": "Image 1 description",
    "gallery.img2.caption": "Image 2 description",
    "gallery.img3.caption": "Image 3 description",
    "gallery.img4.caption": "Image 4 description",

    "contact.title": "Say Hello",
    "contact.subtitle":
      "Feel free to leave your thoughts, questions or suggestions.",
    "contact.form.title": "Leave a message",
    "contact.form.name": "Name / Nickname",
    "contact.form.name.placeholder": "e.g. Alex / Front-end dev",
    "contact.form.message": "Message",
    "contact.form.message.placeholder":
      "Share what you think about my work, ask a question or just say hi :)",
    "contact.form.submit": "Send",
    "contact.form.hint":
      "Messages are stored locally in your browser only and are not uploaded.",
    "contact.board.title": "Message Board",
    "contact.board.clear": "Clear local messages",
    "contact.board.empty": "No messages yet, be the first one!",

    "footer.copyright": "All rights reserved.",
  },
};

function getCurrentLang() {
  const stored = localStorage.getItem(STORAGE_KEY_LANG);
  if (SUPPORTED_LANGS.includes(stored)) return stored;
  return "zh";
}

function setCurrentLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  localStorage.setItem(STORAGE_KEY_LANG, lang);
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations.zh;
  document.documentElement.setAttribute("data-lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || !(key in dict)) return;

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (el.hasAttribute("data-i18n-placeholder")) {
        el.placeholder = dict[key];
      } else {
        el.value = dict[key];
      }
    } else if (el.hasAttribute("data-i18n-attr")) {
      const attrName = el.getAttribute("data-i18n-attr");
      el.setAttribute(attrName, dict[key]);
    } else {
      const content = dict[key];
      // 如果是 About Me 區塊的段落，處理 "|" 符號
      if (el.tagName === "P" && (el.closest(".page-header") || el.parentElement?.classList.contains("page-header"))) {
        el.innerHTML = content.replace(/\s*\|\s*/g, ' <span class="separator">|</span> ');
      } else {
        el.textContent = content;
      }
    }
  });

  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.lang === lang)
    );
}

function initLangSwitcher() {
  const current = getCurrentLang();
  applyTranslations(current);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!SUPPORTED_LANGS.includes(lang)) return;
      setCurrentLang(lang);
      applyTranslations(lang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLangSwitcher);






