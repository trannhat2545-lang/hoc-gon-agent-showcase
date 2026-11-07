const demoViews = {
  summary: {
    kicker: "Ý CHÍNH · 04:18–09:42",
    title: "Một câu hỏi nghiên cứu tốt cần rõ phạm vi và có thể kiểm chứng.",
    copy: "Bản demo cho thấy cách Agent nối ý từ bài giảng với nội dung tài liệu, đồng thời giữ mốc thời gian để bạn tìm lại đoạn gốc.",
    note: "Có nguồn và mốc thời gian minh họa",
    caution: false
  },
  assignment: {
    kicker: "NHIỆM VỤ MẪU · TRÍCH TỪ PDF GIẢ LẬP",
    title: "Viết một câu hỏi nghiên cứu có đối tượng và phạm vi cụ thể.",
    copy: "Hướng làm mẫu: xác định chủ đề → giới hạn đối tượng → viết câu hỏi → đối chiếu với yêu cầu bài tập.",
    note: "Deadline không có trong nguồn minh họa",
    caution: true
  },
  review: {
    kicker: "ĐIỂM CẦN ĐỐI CHIẾU",
    title: "Không tự đặt deadline hoặc chọn nguồn khi thông tin mâu thuẫn.",
    copy: "Trong một lượt chạy thật, Agent sẽ nêu nguồn và điểm chưa khớp để người học xác nhận trước khi chốt.",
    note: "Ví dụ này được dựng sẵn, không kiểm tra tài liệu thật",
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
