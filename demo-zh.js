const demoViews = {
  summary: {
    kicker: "核心内容 · 04:18–09:42",
    title: "好的研究问题应当范围明确，并且可以验证。",
    copy: "这个演示展示了智能助手如何串联课堂讲解与学习资料，并保留时间戳，方便你回到原文查找。",
    note: "示例内容附有来源和时间戳",
    caution: false
  },
  assignment: {
    kicker: "任务示例 · 摘自模拟 PDF",
    title: "提出一个对象和范围明确的研究问题。",
    copy: "示例思路：确定主题 → 限定对象 → 写出问题 → 对照作业要求。",
    note: "示例资料中没有截止日期",
    caution: true
  },
  review: {
    kicker: "需要核对的内容",
    title: "信息冲突时，不自行设定截止日期或选择来源。",
    copy: "在真实运行中，智能助手会列出来源和不一致之处，请学习者确认后再定稿。",
    note: "此示例为预设内容，未检查真实资料",
    caution: true
  }
};

const tabs = Array.from(document.querySelectorAll(".demo-tab"));
const panel = document.querySelector("#demo-panel");

function showDemoView(key) {
  const view = demoViews[key];
  if (!view || !panel) return;

  tabs.forEach((tab) => {
    const selected = tab.dataset.view === key;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) panel.setAttribute("aria-labelledby", tab.id);
  });

  panel.replaceChildren();
  const kicker = document.createElement("div");
  kicker.className = "panel-kicker";
  kicker.textContent = view.kicker;

  const title = document.createElement("p");
  title.className = "panel-title";
  title.textContent = view.title;

  const copy = document.createElement("p");
  copy.className = "panel-copy";
  copy.textContent = view.copy;

  const note = document.createElement("div");
  note.className = view.caution ? "panel-foot panel-foot-caution" : "panel-foot";
  const icon = document.createElement("span");
  icon.className = view.caution ? "info-mark" : "check-mark";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = view.caution ? "!" : "✓";
  note.append(icon, document.createTextNode(view.note));

  panel.append(kicker, title, copy, note);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showDemoView(tab.dataset.view));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = tabs.indexOf(tab);
    let next = current;
    if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    tabs[next].focus();
    tabs[next].click();
  });
});
