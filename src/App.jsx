import { useState, useEffect, useRef } from "react";

const DARK = {
  bg:"#0D0F14", surface:"#161A23", card:"#1E2330", border:"#2A3045",
  accent:"#4F8EF7", accentSoft:"#1A2E50",
  green:"#2ECC88", greenSoft:"#0D3325",
  orange:"#F5813F", orangeSoft:"#3D200D",
  purple:"#A278F5", purpleSoft:"#221540",
  yellow:"#F5C842", yellowSoft:"#3D2E00",
  red:"#F55C5C", pink:"#E8468A", pinkSoft:"#3D0F23", text:"#EDF0F7", textMuted:"#6B7593", textSub:"#9BA3BE",
};

const LIGHT = {
  bg:"#EEF0F7", surface:"#FFFFFF", card:"#FFFFFF", border:"#D0D5E8",
  accent:"#2563EB", accentSoft:"#DBEAFE",
  green:"#059652", greenSoft:"#D1FAE5",
  orange:"#EA6C1A", orangeSoft:"#FFEDD5",
  purple:"#7C3AED", purpleSoft:"#EDE9FE",
  yellow:"#D18A00", yellowSoft:"#FEF3C7",
  red:"#DC2626", pink:"#D4276E", pinkSoft:"#FCE7F0", text:"#0F1120", textMuted:"#6B7280", textSub:"#374151",
};

// C는 가변 객체 — 테마 전환 시 내용을 갈아끼움
const C = { ...DARK };
function applyTheme(theme) {
  const pal = theme === "light" ? LIGHT : DARK;
  Object.keys(pal).forEach(k => { C[k] = pal[k]; });
  // 보상 카테고리 색상도 갱신
  const meta = theme === "light" ? REWARD_META_LIGHT : REWARD_META_DARK;
  REWARD_META.forEach((m, i) => { m.color = meta[i].color; m.soft = meta[i].soft; });
}

const REWARD_META_DARK = [
  { color:"#2ECC88", soft:"#0D3325" },
  { color:"#A278F5", soft:"#221540" },
  { color:"#E8468A", soft:"#3D0F23" },
  { color:"#F5C842", soft:"#3D2E00" },
];
const REWARD_META_LIGHT = [
  { color:"#059652", soft:"#D1FAE5" },
  { color:"#7C3AED", soft:"#EDE9FE" },
  { color:"#D4276E", soft:"#FCE7F0" },
  { color:"#D18A00", soft:"#FEF3C7" },
];

const REWARD_META = [
  { id:"exercise", emoji:"🏐", color:"#2ECC88", soft:"#0D3325" },
  { id:"game",     emoji:"🎮", color:"#A278F5", soft:"#221540" },
  { id:"sns",      emoji:"📱", color:"#E8468A", soft:"#3D0F23" },
  { id:"nap",      emoji:"😴", color:"#F5C842", soft:"#3D2E00" },
];

const LANG = {
  ko: {
    langToggle:"EN",
    nav:{ home:"홈", timer:"시간투자", wallet:"보상", report:"리포트", settings:"설정" },
    homeSub:"내 시간 자산 현황판",
    goalLabel:"오늘의 공부 목표",
    goalUnit:(d,g)=>`${d}/${g}분`,
    goalLeft:(n)=>`목표까지 ${n}분 남음`,
    goalDone:"🎉 오늘 목표 달성!",
    balanceLabel:"획득 보상", balanceUnit:"사용 가능한 분",
    sessionLabel:"오늘 세션", sessionUnit:"완료된 세션",
    portfolioLabel:"시간 포트폴리오", studyLegend:"공부",
    ctaBtn:"▶ 새 공부 세션 시작", donutCenter:"총 사용",
    timerSub:"집중 세션", timerTitle:"공부 타이머", timerRewardLabel:"보상 선택",
    timerRule:(s,c,r)=>`📌 규칙: 공부 ${s}분 → ${c} ${r}분 적립`,
    timerStart:"▶ 시작", timerPause:"⏸ 일시정지", timerNext:"✨ 다음 세션 시작",
    timerDone:"✅ 완료!", timerReady:"준비", timerFocusing:"집중 중...",
    notifyDone:(s,e,c,r)=>`🎉 ${s}분 완료! ${e} ${c} +${r}분 적립!`,
    walletSub:"보상 지갑", walletTitle:"획득 보상",
    walletTotal:"사용 가능", walletTotalUnit:"분",
    walletUsed:(n)=>`오늘 사용: ${n}분`, walletMin:"분",
    walletPrompt:(c)=>`${c} 보상 사용하기`, walletHowMany:"몇 분 사용할까요?",
    walletRemaining:"사용 후 잔여", walletCancel:"취소",
    walletStart:(n)=>`▶ ${n}분 사용 시작`, walletAll:"전부",
    walletCapTitle:"주간 한도", walletCapUnit:(n)=>`최대 ${n}분/주`,
    noBalance:(c)=>`❌ ${c} 보상이 없어요. 공부 세션을 완료하세요!`,
    overBalance:(n)=>`❌ 보유 보상: ${n}분. 초과할 수 없어요!`,
    useNotify:(e,c,n)=>`${e} ${c} ${n}분 — 즐거운 시간 보내세요!`,
    reportSub:"시간 운용 리포트", reportTitle:"주간 분석",
    weekDays:["월","화","수","목","금","토","일"],
    chartTitle:"📊 주간 공부 시간",
    avgStudy:"평균 공부", goalRate:"목표달성률", rewardUsed:"보상 사용",
    hypoTitle:"지금 나, 달라지고 있어?",
    hypos:["📚 공부시간 증가", "🧠 자기조절력", "🤝 갈등 감소", "🔥 연속 사용일"],
    hypoDesc:["Baseline 대비 공부시간 증가율","주간 설문 자기조절 점수 기반","주간 갈등 횟수 감소율","목표 21일 연속 사용 대비 현재"],
    surveyBtn:"📋 주간 설문 입력",
    surveyDone:"✅ 이번 주 설문 완료",
    noSurvey:"설문을 입력하면 가설이 실제 데이터로 계산됩니다",
    shareBtn:"📤 부모님께 요약 리포트 공유 (선택)",
    surveyTitle:"주간 설문", surveyHint:"지난 1주의 경험을 바탕으로 응답하세요",
    secA:"A. 공부 효용",
    qA1:"공부를 이어갈수록 집중력이 더 오래 유지되었다",
    qA2:"공부를 마쳤을 때 성취감이 컸다",
    qA3:"이번 주 공부는 목표 대비 만족스러웠다",
    secB:"B. 보상 활동 효용",
    qB1:"활동 후 기분이 좋아졌다",
    qB2:"활동 후 머리가 맑아져 공부 복귀가 쉬웠다",
    qB3:"과몰입·후회가 적었다",
    qB3desc:"지나치게 비학습활동을 많이 해서 후회나 죄책감이 드는 경우가 적었다",
    qB4:"이 활동은 이번 주에 꼭 필요하다고 느꼈다",
    secC:"C. 교환·분배",
    qC1:"이번 주 더 가치 있다고 느끼는 쪽은?",
    c1opts:["공부 60분","보상 15분","같다"],
    qC2:"1시간 보상시간을 어떻게 나누고 싶은가? (합=60분)",
    secD:"D. 갈등 및 자기조절",
    qD1:"이번 주 부모/멘토와의 갈등 횟수",
    qD2:"이번 주 자기조절 점수 (1=전혀못함, 5=매우잘함)",
    qD3:"기타 코멘트",
    submit:"설문 제출", cancel:"취소",
    scale:["전혀 아님","","보통","","매우 그렇다"],
    total:"합계", submitted:"✅ 설문이 제출되었어요! 가설이 업데이트됩니다.",
    settingsSub:"설정", settingsTitle:"보상 규칙 & 목표",
    settingsHint:"수정 후 하단 저장 버튼을 눌러주세요",
    secStudy:"⏰ 공부 목표",
    dailyGoal:"하루 공부 목표", studyPerSess:"세션당 공부 시간", rewardPerSess:"세션당 적립 시간",
    rulePreview:(s,r)=>`📌 규칙: 공부 ${s}분 → 보상 ${r}분 적립`,
    secCap:"🚦 주간 보상 한도",
    parentTitle:"부모/멘토 공유", parentSub:"주간 요약 간략히 전송",
    saveBtn:"💾 설정 저장하기", saved:"✅ 설정이 저장되었어요!",
    tutorialTitle:"📖 앱 사용법",
    themeLabel:"화면 테마", themeDark:"🌙 다크", themeLight:"☀️ 라이트",
    resetBtn:"🗑 모든 데이터 초기화", resetConfirm:"정말 모든 데이터를 초기화할까요? 되돌릴 수 없어요.", resetDone:"데이터가 초기화되었어요",
    tutorial:[
      { icon:"🏠", title:"홈 — 오늘 현황 보기", body:"홈 탭에서 오늘의 현황을 한눈에 확인할 수 있어요.\n\n• 목표 링: 오늘 목표 대비 공부 진행률\n• 시간 포트폴리오: 공부·보상 시간 비율 도넛 차트\n  (날짜를 탭하면 과거 날짜도 볼 수 있어요)\n• 오늘의 한 마디: 매 4초마다 바뀌는 동기부여 문구" },
      { icon:"💡", title:"세션이란?", body:"공부 시간 + 보상 시간 1세트를 세션이라고 해요.\n\n예) 60분 공부 → 15분 보상 적립 → 보상 사용\n이 흐름이 세션 1회예요.\n\n세션을 반복할수록 시간 자산이 쌓이고,\n스스로 정한 규칙을 지키는 힘이 길러져요." },
      { icon:"⏱", title:"공부 타이머 — 시작하기", body:"① 하단 시간투자 탭을 누르세요.\n② 보상 카테고리(운동·게임·SNS·낮잠) 중 하나를 선택하세요.\n③ ▶ 시작 버튼을 누르면 공부 타이머가 돌아가요.\n④ 목표 시간(기본 60분)을 채우면 선택한 보상 시간이 자동으로 지갑에 쌓여요.\n중간에 잠깐 멈춰도 괜찮아요 — ⏸ 버튼으로 일시정지할 수 있어요." },
      { icon:"🎁", title:"보상 지갑 — 보상 사용하기", body:"공부를 완료할 때마다 보상 시간이 쌓여요.\n\n① 하단 지갑 탭을 누르세요.\n② 사용할 보상 카테고리를 탭하세요.\n③ 원하는 시간(5분 단위)을 선택하고 ▶ 시작을 누르세요.\n\n주간 한도 안에서만 사용할 수 있어요. 한도는 설정에서 조정할 수 있어요." },
      { icon:"⏳", title:"보상 타이머 — 시간 지키기", body:"보상을 시작하면 카운트다운 타이머가 작동해요.\n남은 시간이 원형 링으로 표시되고,\n시간이 끝나면 알람 소리와 진동으로 알려줘요.\n\n⏹ 조기 종료 버튼으로 일찍 끝낼 수도 있어요.\n이 타이머가 핵심이에요 — 보상 시간을 정확히 지키는 게 공정한 규칙이에요!" },
      { icon:"📊", title:"리포트 — 주간 분석", body:"리포트 탭에서 내 한 주를 돌아볼 수 있어요.\n\n• 주간 바 차트: 요일별 공부 시간 (바를 탭하면 상세 보상 내역 확인)\n• ‹ 이전 버튼으로 지난 주 데이터도 볼 수 있어요\n• 주간 설문 입력 후 '지금 나, 달라지고 있어?' 지표가 계산돼요\n• 설정에서 공유를 켜면 부모님께 리포트를 전송할 수 있어요" },
      { icon:"🔬", title:"지금 나, 달라지고 있어?", body:"매주 짧은 설문을 입력하면 4가지 변화 지표가 계산돼요.\n\n📚 공부시간 증가율 — 저번 주보다 공부가 늘었나요?\n🧠 자기조절력 — 보상을 얼마나 잘 조절했나요?\n🤝 갈등 감소 — 보상 때문에 싸운 횟수가 줄었나요?\n🔥 연속 사용일 — 며칠 연속으로 앱을 썼나요? (목표: 21일)\n\n설문은 리포트 탭 하단에서 입력할 수 있어요." },
      { icon:"⚙️", title:"설정 — 내게 맞게 조정하기", body:"설정 탭에서 규칙을 직접 정할 수 있어요.\n\n• 하루 목표: 하루에 목표하는 총 공부 시간\n• 세션당 공부: 한 번에 공부할 시간 (기본 60분)\n• 세션당 보상: 세션 완료 시 적립되는 보상 시간\n• 주간 보상 한도: 카테고리별 최대 사용 시간\n• 부모/멘토 공유: ON으로 켜면 리포트 탭에서 공유 버튼 활성화\n\n변경 후 반드시 💾 저장 버튼을 눌러주세요!" },
    ],
    phiTitle:"💡 Trust-in-Minutes 철학",
    phi:'"시간은 자산입니다. 공부에 투자한 만큼, 원하는 보상을 공정하게 얻을 수 있어요."',
    phiLines:["시간은 자산이다","투자한 만큼 공정하게 돌려받는다","스스로 정한 규칙이 가장 강한 규칙이다"],
    dailyMottos:[
      "오늘의 집중이 내일의 자유를 만든다",
      "규칙을 지키는 사람이 결국 원하는 것을 얻는다",
      "공부는 투자, 보상은 수익 — 지금 적립 중",
      "스스로 정한 약속, 스스로 지키는 힘",
      "한 세션씩, 차곡차곡 쌓이는 나의 자산",
      "유혹을 이긴 오늘이 내 가장 큰 수익",
      "시간을 설계하는 사람이 자신의 삶을 설계한다",
    ],
    timerReadyMsg:"지금 이 순간이 당신의 자산입니다",
    timerFocusMsg:"투자 중 — 약속을 지키고 있어요 💪",
    sessionDoneMsg:(s,r)=>`${s}분 투자 완료. 약속대로 ${r}분을 얻었어요 ✅`,
    studyDonePopupTitle:"🎉 약속을 지켰어요!",
    studyDonePopupBody:(s,e,c,r)=>`${s}분 집중 완료 — ${e} ${c} ${r}분이 지갑에 쏙 들어왔어요.\n시간을 투자한 당신, 멋져요!`,
    rewardDonePopupTitle:"⏰ 보상 시간 종료!",
    rewardDonePopupBody:(e,c,m)=>`${e} ${c} ${m}분 보상 시간이 끝났어요!\n잘 쉬었다면, 이제 다시 시간을 투자할 시간이에요 💪`,
    popupConfirm:"확인",
    useRewardMsg:"충분히 벌었으니, 마음껏 누려도 돼요 🎁",
    unit:"분", cats:{ exercise:"운동", game:"게임", sns:"SNS", nap:"낮잠" },
  },
  en: {
    langToggle:"한국어",
    nav:{ home:"Home", timer:"Invest", wallet:"Rewards", report:"Report", settings:"Settings" },
    homeSub:"My Time Asset Dashboard",
    goalLabel:"Today's Study Goal",
    goalUnit:(d,g)=>`${d}/${g} min`,
    goalLeft:(n)=>`${n} min left`,
    goalDone:"🎉 Goal achieved!",
    balanceLabel:"Earned Rewards", balanceUnit:"minutes available",
    sessionLabel:"Sessions Today", sessionUnit:"completed",
    portfolioLabel:"Time Portfolio", studyLegend:"Study",
    ctaBtn:"▶ Start Study Session", donutCenter:"Total",
    timerSub:"Focus Session", timerTitle:"Study Timer", timerRewardLabel:"Choose Reward",
    timerRule:(s,c,r)=>`📌 Rule: Study ${s} min → Earn ${r} min of ${c}`,
    timerStart:"▶ Start", timerPause:"⏸ Pause", timerNext:"✨ Next Session",
    timerDone:"✅ Done!", timerReady:"Ready", timerFocusing:"Focusing...",
    notifyDone:(s,e,c,r)=>`🎉 ${s} min done! ${e} ${c} +${r} min earned!`,
    walletSub:"Reward Wallet", walletTitle:"Earned Rewards",
    walletTotal:"Available", walletTotalUnit:"min",
    walletUsed:(n)=>`Used today: ${n} min`, walletMin:"min",
    walletPrompt:(c)=>`Use ${c} Reward`, walletHowMany:"How many minutes?",
    walletRemaining:"Remaining after use", walletCancel:"Cancel",
    walletStart:(n)=>`▶ Start ${n} min`, walletAll:"All",
    walletCapTitle:"Weekly Cap", walletCapUnit:(n)=>`max ${n} min/wk`,
    noBalance:(c)=>`❌ No ${c} balance. Complete a study session first!`,
    overBalance:(n)=>`❌ Available: ${n} min. Cannot exceed!`,
    useNotify:(e,c,n)=>`${e} ${c} ${n} min — Enjoy!`,
    reportSub:"Time Report", reportTitle:"Weekly Analysis",
    weekDays:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    chartTitle:"📊 Weekly Study Time",
    avgStudy:"Avg Study", goalRate:"Goal Rate", rewardUsed:"Rewards Used",
    hypoTitle:"Am I Getting Better?",
    hypos:["📚 Study Time Up", "🧠 Self-Control", "🤝 Less Conflict", "🔥 Streak"],
    hypoDesc:["Study time increase vs baseline","Based on weekly survey self-regulation score","Weekly conflict reduction","Consecutive days used (target: 21 days)"],
    surveyBtn:"📋 Fill Weekly Survey",
    surveyDone:"✅ This week's survey done",
    noSurvey:"Fill in the survey to calculate hypotheses from real data",
    shareBtn:"📤 Share Summary with Parent (Optional)",
    surveyTitle:"Weekly Survey", surveyHint:"Answer based on your past week",
    secA:"A. Study Utility",
    qA1:"My focus lasted longer as I continued studying",
    qA2:"I felt a strong sense of accomplishment after study",
    qA3:"I was satisfied with my study relative to my goals",
    secB:"B. Reward Utility",
    qB1:"This activity improved my mood",
    qB2:"This activity helped me return to studying",
    qB3:"I felt little regret or guilt after this activity",
    qB3desc:"I didn't over-indulge in non-study activities to the point of feeling regret",
    qB4:"This activity felt like a necessary reward",
    secC:"C. Trade-off & Allocation",
    qC1:"Which felt more valuable this week?",
    c1opts:["Study 60 min","Reward 15 min","Equal"],
    qC2:"If you had 1 hour of reward time, how would you split it? (total=60)",
    secD:"D. Conflict & Self-regulation",
    qD1:"Number of conflicts with parent/mentor this week",
    qD2:"Self-regulation score (1=Not at all, 5=Very well)",
    qD3:"Additional comments",
    submit:"Submit Survey", cancel:"Cancel",
    scale:["Not at all","","Neutral","","Very much"],
    total:"Total", submitted:"✅ Survey submitted! Hypotheses updated.",
    settingsSub:"Settings", settingsTitle:"Rules & Goals",
    settingsHint:"Adjust values, then tap Save",
    secStudy:"⏰ Study Goals",
    dailyGoal:"Daily Study Goal", studyPerSess:"Study per Session", rewardPerSess:"Reward per Session",
    rulePreview:(s,r)=>`📌 Rule: Study ${s} min → Earn ${r} min`,
    secCap:"🚦 Weekly Reward Cap",
    parentTitle:"Parent / Mentor Share", parentSub:"Send a brief weekly summary",
    saveBtn:"💾 Save Settings", saved:"✅ Settings saved!",
    tutorialTitle:"📖 How to Use",
    themeLabel:"Theme", themeDark:"🌙 Dark", themeLight:"☀️ Light",
    resetBtn:"🗑 Reset All Data", resetConfirm:"Reset all data? This cannot be undone.", resetDone:"All data has been reset",
    tutorial:[
      { icon:"🏠", title:"Home — Today's Overview", body:"Check today's status at a glance from the Home tab.\n\n• Goal ring: today's study progress vs. target\n• Time portfolio: donut chart of study vs. reward time\n  (tap a date to view past days)\n• Today's motto: motivational quote that changes every 4 sec" },
      { icon:"💡", title:"What's a Session?", body:"A session = 1 set of study time + its earned reward.\n\nExample: 60 min study → earn 15 min reward → use reward\nThat's one complete session.\n\nEach session builds your time assets and\nstrengthens the habit of keeping your own rules." },
      { icon:"⏱", title:"Study Timer — Getting Started", body:"① Tap the Timer tab at the bottom.\n② Choose a reward category (exercise, gaming, SNS, or nap).\n③ Press ▶ Start to begin your study session.\n④ When you reach your goal (default: 60 min), your chosen reward time is automatically added to your wallet.\n\nYou can pause anytime with the ⏸ button — life happens!" },
      { icon:"🎁", title:"Reward Wallet — Using Rewards", body:"Every completed study session adds reward time to your wallet.\n\n① Tap the Wallet tab at the bottom.\n② Tap the reward category you want to use.\n③ Set the time (in 5-min steps) and press ▶ Start.\n\nYou can only use rewards within your weekly limit. Adjust limits anytime in Settings." },
      { icon:"⏳", title:"Reward Timer — Keeping It Fair", body:"When you start a reward, a countdown timer begins.\nThe remaining time is shown as a ring, and an alarm + vibration notifies you when time is up.\n\nYou can end early with ⏹ End Early.\n\nThis timer is the core of the app — sticking to your reward time is what makes the system fair!" },
      { icon:"📊", title:"Report — Weekly Analysis", body:"The Report tab helps you review your week.\n\n• Weekly bar chart: study time by day (tap a bar to see reward details)\n• Use ‹ Prev to view past weeks\n• After filling in the weekly survey, your progress indicators are calculated\n• Turn on sharing in Settings to send reports to a parent or mentor" },
      { icon:"🔬", title:"Am I Getting Better?", body:"Fill in a short weekly survey and 4 progress indicators are calculated.\n\n📚 Study time growth — Did you study more than last week?\n🧠 Self-control — How well did you manage your rewards?\n🤝 Less conflict — Fewer arguments over screen time?\n🔥 Streak — How many days in a row? (Goal: 21 days)\n\nFind the survey at the bottom of the Report tab." },
      { icon:"⚙️", title:"Settings — Make It Yours", body:"Set your own rules in the Settings tab.\n\n• Daily goal: total study time you aim for each day\n• Study per session: how long one session lasts (default: 60 min)\n• Reward per session: reward time earned per session\n• Weekly reward limits: max usage per category\n• Parent/mentor sharing: turn ON to enable the share button in Report\n\nAlways tap 💾 Save Settings after making changes!" },
    ],
    phiTitle:"💡 Philosophy",
    phi:'"Time is an asset. Invest in study, earn your reward fairly."',
    phiLines:["Time is an asset","You earn what you invest — fairly","Rules you set yourself are the strongest rules"],
    dailyMottos:[
      "Today's focus builds tomorrow's freedom",
      "Those who keep their rules get what they want",
      "Study is investment, reward is return — earning now",
      "The promise you make to yourself is the one that matters",
      "Session by session, building your time wealth",
      "Beating temptation today is your biggest win",
      "Those who design their time, design their life",
    ],
    timerReadyMsg:"This moment is your asset",
    timerFocusMsg:"Investing — keeping your promise 💪",
    sessionDoneMsg:(s,r)=>`${s} min invested. You earned ${r} min, as promised ✅`,
    studyDonePopupTitle:"🎉 Promise kept!",
    studyDonePopupBody:(s,e,c,r)=>`${s} min of focus done — ${e} ${r} min of ${c} just landed in your wallet.\nSmart investment!`,
    rewardDonePopupTitle:"⏰ Reward time's up!",
    rewardDonePopupBody:(e,c,m)=>`Your ${e} ${m} min of ${c} is done!\nRecharged? Time to invest again 💪`,
    popupConfirm:"Got it",
    useRewardMsg:"You earned it — enjoy every minute 🎁",
    unit:"min", cats:{ exercise:"Exercise", game:"Gaming", sns:"SNS", nap:"Nap" },
  },
};

const defaultSurvey = {
  a1:0, a2:0, a3:0,
  b1:0, b2:0, b3:0, b4:0,
  c1:"",
  c2:{ exercise:15, game:15, sns:15, nap:15 },
  d1:"", d2:0, d3:"",
  submitted: false,
};

function calcHypo(survey, weekData, goalMin, dailyHistory) {
  const baseline = 100;
  const active = weekData.filter(d => d > 0);
  const avg = active.length ? active.reduce((a,b)=>a+b,0)/active.length : 0;
  const h1 = survey.submitted
    ? Math.min(100, Math.max(0, Math.round(((avg - baseline) / baseline) * 100 + 50)))
    : null;
  const h2 = survey.submitted && survey.d2 > 0
    ? Math.round(((survey.d2 - 1) / 4) * 100)
    : null;
  const conflicts = parseInt(survey.d1);
  const h3 = survey.submitted && survey.d1 !== ""
    ? Math.max(0, Math.round((1 - conflicts / 5) * 100))
    : null;

  // H4: 연속 사용일 — dailyHistory에서 오늘부터 역순으로 연속된 날 계산
  // 목표: 21일(3주) 연속을 100%로 설정
  const TARGET_STREAK = 21;
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const str = d.toISOString().slice(0,10);
    if (dailyHistory[str] && dailyHistory[str].study > 0) {
      streak++;
    } else if (i > 0) { // 오늘은 아직 공부 안 했을 수 있으니 첫날은 패스
      break;
    }
  }
  const h4 = Math.min(100, Math.round((streak / TARGET_STREAK) * 100));
  return [h1, h2, h3, h4, streak];
}

function fmtTime(s) {
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}

function Ring({ pct, size=100, stroke=8, color, children }) {
  const r=(size-stroke)/2, circ=2*Math.PI*r, dash=circ*(pct/100);
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition:"stroke-dasharray 0.6s ease" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        {children}
      </div>
    </div>
  );
}

function DonutChart({ data, centerLabel }) {
  const total = data.reduce((a,b)=>a+b.value,0) || 1;
  let cum = 0;
  const size=140, stroke=28, r=(size-stroke)/2, circ=2*Math.PI*r;
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
        {data.map((d,i) => {
          const pct=d.value/total, dash=circ*pct, offset=circ*(1-cum);
          cum += pct;
          return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={d.color}
            strokeWidth={stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={offset}/>;
        })}
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:11, color:C.textMuted }}>{centerLabel}</span>
        <span style={{ fontSize:18, fontWeight:700, color:C.text }}>{total}</span>
      </div>
    </div>
  );
}

// ── Philosophy Text (핵심 단어 순환 하이라이트) ────────────────
function PhilosophyText({ phi, lang }) {
  const koKeywords = ["시간", "자산", "투자", "보상", "공정"];
  const enKeywords = ["Time", "asset", "Invest", "reward", "fairly"];
  const keywords = lang === "ko" ? koKeywords : enKeywords;
  const [kwIdx, setKwIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setKwIdx(i => (i+1) % keywords.length), 1800);
    return () => clearInterval(t);
  }, [keywords.length]);

  // phi 텍스트에서 현재 키워드만 색상 강조
  const activeKw = keywords[kwIdx];
  const parts = phi.split(activeKw);
  return (
    <p style={{ color:C.text, fontSize:16, fontWeight:700, margin:0, lineHeight:1.7, fontFamily:"Georgia,serif", position:"relative" }}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{
              color: C.accent,
              borderBottom: `2px solid ${C.accent}`,
              paddingBottom: 1,
              transition: "color 0.4s ease",
              animation: "pulseGlow 1.8s ease-in-out infinite",
            }}>{activeKw}</span>
          )}
        </span>
      ))}
    </p>
  );
}

// ── Pick Panel — 시간 선택만 담당 ─────────────────────────────
function PickPanel({ cat, max, T, onStart, onCancel, pickMins, setPickMins }) {
  return (
    <div style={{ background:cat.soft, borderRadius:20, padding:20, marginBottom:14, border:`2px solid ${cat.color}66` }}>
      <p style={{ color:cat.color, fontWeight:700, fontSize:14, margin:"0 0 14px" }}>{cat.emoji} {T.walletPrompt(cat.label)}</p>
      <p style={{ color:C.textMuted, fontSize:11, margin:"0 0 10px" }}>{T.walletHowMany}</p>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
        <button onClick={()=>setPickMins(m=>Math.max(5,m-5))} style={{ width:38, height:38, borderRadius:10, border:`1px solid ${cat.color}55`, background:C.card, color:C.text, fontSize:22, cursor:"pointer" }}>−</button>
        <div style={{ flex:1, background:C.card, borderRadius:12, padding:10, textAlign:"center" }}>
          <span style={{ color:cat.color, fontSize:30, fontWeight:800 }}>{pickMins}</span>
          <span style={{ color:C.textMuted, fontSize:12 }}> {T.walletMin}</span>
        </div>
        <button onClick={()=>setPickMins(m=>Math.min(max,m+5))} style={{ width:38, height:38, borderRadius:10, border:`1px solid ${cat.color}55`, background:C.card, color:C.text, fontSize:22, cursor:"pointer" }}>+</button>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        {[10,15,20,30].filter(v=>v<=max).map(v=>(
          <button key={v} onClick={()=>setPickMins(v)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:`1px solid ${pickMins===v?cat.color:C.border}`, background:pickMins===v?cat.color:C.card, color:pickMins===v?"#fff":C.textSub, fontSize:12, fontWeight:600, cursor:"pointer" }}>{v}{T.walletMin}</button>
        ))}
        <button onClick={()=>setPickMins(max)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:`1px solid ${pickMins===max?cat.color:C.border}`, background:pickMins===max?cat.color:C.card, color:pickMins===max?"#fff":C.textSub, fontSize:12, fontWeight:600, cursor:"pointer" }}>{T.walletAll}</button>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
        <span style={{ color:C.textMuted, fontSize:12 }}>{T.walletRemaining}</span>
        <span style={{ color:cat.color, fontWeight:700, fontSize:12 }}>{max-pickMins} {T.walletMin}</span>
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button onClick={onCancel} style={{ flex:1, padding:13, borderRadius:12, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontSize:13, cursor:"pointer" }}>{T.walletCancel}</button>
        <button onClick={()=>onStart(pickMins)} style={{ flex:2, padding:13, borderRadius:12, border:"none", background:cat.color, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
          ▶ {T.walletStart(pickMins)}
        </button>
      </div>
    </div>
  );
}

// ── Use Panel — 카운트다운 타이머 + 알람 ──────────────────────
function UsePanel({ cat, max, T, onConfirm, onCancel }) {
  const [mins, setMins] = useState(Math.min(10, max));
  const [phase, setPhase] = useState("select"); // "select" | "running" | "done"
  const [secsLeft, setSecsLeft] = useState(0);
  const [totalSecs, setTotalSecs] = useState(0);
  const intervalRef = useRef(null);
  const phaseRef = useRef("select");

  // 알람 소리 (Web Audio API)
  const playAlarm = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const beep = (freq, start, dur) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = freq;
        o.type = "sine";
        g.gain.setValueAtTime(0, ctx.currentTime + start);
        g.gain.linearRampToValueAtTime(0.5, ctx.currentTime + start + 0.03);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
        o.start(ctx.currentTime + start);
        o.stop(ctx.currentTime + start + dur + 0.05);
      };
      beep(660,  0.0, 0.18);
      beep(880,  0.25, 0.18);
      beep(1100, 0.5, 0.35);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    } catch(e) {}
  };

  const startTimer = () => {
    const secs = mins * 60;
    setTotalSecs(secs);
    setSecsLeft(secs);
    phaseRef.current = "running";
    setPhase("running");
    onConfirm(mins);
    intervalRef.current = setInterval(() => {
      setSecsLeft(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          phaseRef.current = "done";
          setPhase("done");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  // phase가 done으로 바뀌면 알람
  useEffect(() => {
    if (phase === "done") playAlarm();
  }, [phase]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const elapsed = totalSecs - secsLeft;
  const pct = totalSecs > 0 ? Math.min((elapsed / totalSecs) * 100, 100) : 0;
  const r = 60, stroke = 10, circ = 2 * Math.PI * r;
  const size = 148;

  // ── 시간 선택 화면 ──
  if (phase === "select") {
    return (
      <div style={{ background:cat.soft, borderRadius:20, padding:20, marginBottom:14, border:`2px solid ${cat.color}66` }}>
        <p style={{ color:cat.color, fontWeight:700, fontSize:14, margin:"0 0 14px" }}>{cat.emoji} {T.walletPrompt(cat.label)}</p>
        <p style={{ color:C.textMuted, fontSize:11, margin:"0 0 10px" }}>{T.walletHowMany}</p>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <button onClick={()=>setMins(m=>Math.max(5,m-5))} style={{ width:38, height:38, borderRadius:10, border:`1px solid ${cat.color}55`, background:C.card, color:C.text, fontSize:22, cursor:"pointer" }}>−</button>
          <div style={{ flex:1, background:C.card, borderRadius:12, padding:10, textAlign:"center" }}>
            <span style={{ color:cat.color, fontSize:30, fontWeight:800 }}>{mins}</span>
            <span style={{ color:C.textMuted, fontSize:12 }}> {T.walletMin}</span>
          </div>
          <button onClick={()=>setMins(m=>Math.min(max,m+5))} style={{ width:38, height:38, borderRadius:10, border:`1px solid ${cat.color}55`, background:C.card, color:C.text, fontSize:22, cursor:"pointer" }}>+</button>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {[10,15,20,30].filter(v=>v<=max).map(v=>(
            <button key={v} onClick={()=>setMins(v)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:`1px solid ${mins===v?cat.color:C.border}`, background:mins===v?cat.color:C.card, color:mins===v?"#fff":C.textSub, fontSize:12, fontWeight:600, cursor:"pointer" }}>{v}{T.walletMin}</button>
          ))}
          <button onClick={()=>setMins(max)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:`1px solid ${mins===max?cat.color:C.border}`, background:mins===max?cat.color:C.card, color:mins===max?"#fff":C.textSub, fontSize:12, fontWeight:600, cursor:"pointer" }}>{T.walletAll}</button>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
          <span style={{ color:C.textMuted, fontSize:12 }}>{T.walletRemaining}</span>
          <span style={{ color:cat.color, fontWeight:700, fontSize:12 }}>{max-mins} {T.walletMin}</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onCancel} style={{ flex:1, padding:13, borderRadius:12, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontSize:13, cursor:"pointer" }}>{T.walletCancel}</button>
          <button onClick={startTimer} style={{ flex:2, padding:13, borderRadius:12, border:"none", background:cat.color, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>▶ {T.walletStart(mins)}</button>
        </div>
      </div>
    );
  }

  // ── 타이머 실행 중 ──
  if (phase === "running") {
    return (
      <div style={{ background:cat.soft, borderRadius:20, padding:24, marginBottom:14, border:`2px solid ${cat.color}88`, textAlign:"center" }}>
        <p style={{ color:cat.color, fontWeight:700, fontSize:14, margin:"0 0 20px" }}>
          {cat.emoji} {T.walletMin==="분" ? "보상 타이머 진행 중" : "Reward Timer Running"}
        </p>
        {/* 링 타이머 */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
          <div style={{ position:"relative", width:size, height:size }}>
            <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
              <circle cx={size/2} cy={size/2} r={r} fill="none"
                stroke={cat.color} strokeWidth={stroke}
                strokeDasharray={`${circ*(pct/100)} ${circ}`}
                strokeLinecap="round"
                style={{ transition:"stroke-dasharray 0.9s linear" }}/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:cat.color, fontSize:32, fontWeight:800, fontFamily:"monospace", letterSpacing:1 }}>
                {String(Math.floor(secsLeft/60)).padStart(2,"0")}:{String(secsLeft%60).padStart(2,"0")}
              </span>
              <span style={{ color:C.textMuted, fontSize:10, marginTop:4 }}>
                {T.walletMin==="분" ? "남은 시간" : "remaining"}
              </span>
            </div>
          </div>
        </div>
        <p style={{ color:C.textMuted, fontSize:12, margin:"0 0 16px", fontStyle:"italic" }}>
          🔔 {T.walletMin==="분" ? "시간이 끝나면 알람이 울려요" : "Alarm will ring when time is up"}
        </p>
        <button onClick={()=>{ clearInterval(intervalRef.current); onCancel(); }}
          style={{ width:"100%", padding:13, borderRadius:12, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontSize:13, fontWeight:600, cursor:"pointer" }}>
          ⏹ {T.walletMin==="분" ? "조기 종료" : "End Early"}
        </button>
      </div>
    );
  }

  // ── 완료 화면 ──
  return (
    <div style={{ background:C.greenSoft, borderRadius:20, padding:24, marginBottom:14, border:`2px solid ${C.green}88`, textAlign:"center", animation:"fadeSlideIn 0.4s ease" }}>
      <p style={{ color:C.green, fontWeight:700, fontSize:15, margin:"0 0 16px" }}>
        {cat.emoji} {T.walletMin==="분" ? "보상 시간 종료! 🔔" : "Time's up! 🔔"}
      </p>
      {/* 완료 링 */}
      <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
        <div style={{ position:"relative", width:size, height:size }}>
          <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
            <circle cx={size/2} cy={size/2} r={r} fill="none"
              stroke={C.green} strokeWidth={stroke}
              strokeDasharray={`${circ} ${circ}`}
              strokeLinecap="round"/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:38 }}>✅</span>
          </div>
        </div>
      </div>
      <p style={{ color:C.green, fontSize:14, fontWeight:700, margin:"0 0 6px" }}>
        {T.walletMin==="분"
          ? `${mins}분 보상 완료!`
          : `${mins} min reward done!`}
      </p>
      <p style={{ color:C.textSub, fontSize:12, margin:"0 0 20px" }}>
        {T.walletMin==="분" ? "공부하러 돌아갈 시간이에요 💪" : "Time to get back to studying 💪"}
      </p>
      <button onClick={onCancel}
        style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:C.green, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
        ✅ {T.walletMin==="분" ? "확인" : "Done"}
      </button>
    </div>
  );
}

// ── Scale Question ─────────────────────────────────────────────
function ScaleQ({ label, desc, val, onChange, T }) {
  return (
    <div style={{ marginBottom:18 }}>
      <p style={{ color:C.textSub, fontSize:13, margin:"0 0 4px", lineHeight:1.5 }}>{label}</p>
      {desc && <p style={{ color:C.textMuted, fontSize:11, margin:"0 0 10px", lineHeight:1.5, fontStyle:"italic" }}>({desc})</p>}
      {!desc && <div style={{ marginBottom:10 }}/>}
      <div style={{ display:"flex", gap:6 }}>
        {[1,2,3,4,5].map(n=>(
          <button key={n} onClick={()=>onChange(n)} style={{ flex:1, padding:"10px 0", borderRadius:10, border:`2px solid ${val===n?C.accent:C.border}`, background:val===n?C.accent:C.card, color:val===n?"#fff":C.textSub, fontSize:15, fontWeight:700, cursor:"pointer", transition:"all 0.15s" }}>{n}</button>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
        <span style={{ color:C.textMuted, fontSize:9 }}>{T.scale[0]}</span>
        <span style={{ color:C.textMuted, fontSize:9 }}>{T.scale[4]}</span>
      </div>
    </div>
  );
}

// ── HourglassRenderer — 철학 카드 모래시계 ────────────────────
function HourglassRenderer() {
  useEffect(() => {
    let rafId = null, pollId = null;
    let startTime = null, pausing = false, lastSpawn = 0, grains = [];

    const W=46, H=68, CX=W/2;
    const TOP_Y0=2, TOP_Y1=30, BOT_Y0=38, BOT_Y1=66, NECK_Y=34, NECK_R=4;

    function topPath(ctx) {
      ctx.beginPath();
      ctx.moveTo(CX-20, TOP_Y0);
      ctx.bezierCurveTo(CX-22,TOP_Y0+10, CX-6,TOP_Y1-6, CX-NECK_R,TOP_Y1);
      ctx.lineTo(CX-NECK_R,NECK_Y+4); ctx.lineTo(CX+NECK_R,NECK_Y+4);
      ctx.lineTo(CX+NECK_R,TOP_Y1);
      ctx.bezierCurveTo(CX+6,TOP_Y1-6, CX+22,TOP_Y0+10, CX+20,TOP_Y0);
      ctx.closePath();
    }
    function botPath(ctx) {
      ctx.beginPath();
      ctx.moveTo(CX-NECK_R,BOT_Y0-4); ctx.lineTo(CX-NECK_R,BOT_Y0);
      ctx.bezierCurveTo(CX-6,BOT_Y0+6, CX-22,BOT_Y1-10, CX-20,BOT_Y1);
      ctx.lineTo(CX+20,BOT_Y1);
      ctx.bezierCurveTo(CX+22,BOT_Y1-10, CX+6,BOT_Y0+6, CX+NECK_R,BOT_Y0);
      ctx.lineTo(CX+NECK_R,BOT_Y0-4); ctx.closePath();
    }
    function botHalfW(y) {
      const t=Math.max(0,Math.min(1,(y-BOT_Y0)/(BOT_Y1-BOT_Y0))), mt=1-t;
      return mt*mt*mt*NECK_R + 3*mt*mt*t*6 + 3*mt*t*t*22 + t*t*t*20;
    }
    function drawFrame(ctx) {
      // 상단 바
      ctx.fillStyle='rgba(139,94,42,0.55)';
      ctx.beginPath(); ctx.roundRect(2,0,W-4,6,3); ctx.fill();
      ctx.fillStyle='rgba(255,200,120,0.35)';
      ctx.beginPath(); ctx.roundRect(4,0,W-8,3,4); ctx.fill();
      // 하단 바
      ctx.fillStyle='rgba(139,94,42,0.55)';
      ctx.beginPath(); ctx.roundRect(2,H-6,W-4,6,3); ctx.fill();
      // 기둥
      ctx.fillStyle='rgba(122,78,34,0.45)';
      ctx.beginPath(); ctx.roundRect(3,6,3,H-12,2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(W-6,6,3,H-12,2); ctx.fill();
    }
    function drawGlass(ctx) {
      topPath(ctx);
      ctx.fillStyle='rgba(180,230,255,0.10)'; ctx.fill();
      ctx.strokeStyle='rgba(160,220,255,0.55)'; ctx.lineWidth=1; ctx.stroke();
      botPath(ctx);
      ctx.fillStyle='rgba(180,230,255,0.10)'; ctx.fill();
      ctx.strokeStyle='rgba(160,220,255,0.55)'; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.rect(CX-NECK_R,TOP_Y1,NECK_R*2,BOT_Y0-TOP_Y1);
      ctx.fillStyle='rgba(180,230,255,0.18)'; ctx.fill();
      ctx.strokeStyle='rgba(160,220,255,0.5)'; ctx.lineWidth=0.8; ctx.stroke();
    }
    function drawSand(ctx,topR,botR) {
      if(topR>0){
        const fH=(TOP_Y1-TOP_Y0-2)*topR, fTop=TOP_Y1-1-fH;
        ctx.save(); topPath(ctx); ctx.clip();
        const g=ctx.createLinearGradient(0,fTop,0,TOP_Y1);
        g.addColorStop(0,'#f7df90'); g.addColorStop(0.5,'#e8a820'); g.addColorStop(1,'#c07010');
        ctx.fillStyle=g; ctx.fillRect(0,fTop,W,fH+2); ctx.restore();
      }
      if(botR>0){
        const fH=(BOT_Y1-BOT_Y0-2)*botR, fTop=BOT_Y1-fH;
        ctx.save(); botPath(ctx); ctx.clip();
        const g=ctx.createLinearGradient(0,fTop,0,BOT_Y1);
        g.addColorStop(0,'#f7df90'); g.addColorStop(0.5,'#e8a820'); g.addColorStop(1,'#c07010');
        ctx.fillStyle=g; ctx.fillRect(0,fTop,W,fH+2); ctx.restore();
      }
    }
    function getFloorY(r){ return BOT_Y1-(BOT_Y1-BOT_Y0-2)*r; }
    function ease(t){ return 1-Math.pow(1-t,1.7); }
    function spawn(){
      grains.push({
        x:CX+(Math.random()-0.5)*(NECK_R*1.2), y:NECK_Y+7,
        vy:0.45+Math.random()*0.35, vx:(Math.random()-0.5)*0.15,
        size:0.7+Math.random()*0.6, hue:33+Math.random()*14, bright:55+Math.random()*28,
      });
    }

    function frame(ts) {
      const canvas = document.getElementById('phiHG');
      if (!canvas) { rafId=null; return; }
      const ctx = canvas.getContext('2d');
      if (!startTime) startTime = ts;
      const t=Math.min((ts-startTime)/7000,1), pct=ease(t);
      const topR=1-pct, botR=pct, fy=getFloorY(botR);

      if(!pausing && ts-lastSpawn>60){ spawn(); if(Math.random()>0.5) spawn(); lastSpawn=ts; }
      grains=grains.filter(g=>{
        g.vy+=0.08; g.x+=g.vx+(Math.random()-0.5)*0.1; g.y+=g.vy;
        if(g.y>BOT_Y0){
          const hw=botHalfW(Math.min(g.y,BOT_Y1)), mn=CX-hw+2, mx=CX+hw-2;
          if(g.x<mn){g.x=mn;g.vx*=-0.3;} if(g.x>mx){g.x=mx;g.vx*=-0.3;}
        }
        return g.y<fy && g.y<BOT_Y1;
      });

      ctx.clearRect(0,0,W,H);
      drawSand(ctx,topR,botR);
      grains.forEach(g=>{
        const a=0.9-Math.max(0,Math.min(1,(g.y-NECK_Y)/Math.max(1,fy-NECK_Y)))*0.3;
        ctx.beginPath(); ctx.arc(g.x,g.y,g.size,0,Math.PI*2);
        ctx.fillStyle=`hsla(${g.hue},88%,${g.bright}%,${a})`; ctx.fill();
      });
      drawGlass(ctx);
      drawFrame(ctx);

      if(t>=1 && !pausing){
        pausing=true; grains=[];
        setTimeout(()=>{ startTime=null; pausing=false; rafId=requestAnimationFrame(frame); },300);
        return;
      }
      if(!pausing) rafId=requestAnimationFrame(frame);
    }

    pollId=setInterval(()=>{
      const c=document.getElementById('phiHG');
      if(c && !rafId && !pausing){ rafId=requestAnimationFrame(frame); }
    }, 200);

    return ()=>{ clearInterval(pollId); if(rafId) cancelAnimationFrame(rafId); };
  }, []);
  return null;
}

// ── TutorialSlider — 팝업 모달 ───────────────────────────────
function TutorialSlider({ T, lang, onClose }) {
  const [slide, setSlide] = useState(0);
  const slides = T.tutorial;
  const s = slides[slide];
  const isKo = lang === "ko";
  const isLast = slide === slides.length - 1;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.7)" }}/>
      <div style={{ position:"relative", width:"100%", maxWidth:390, background:C.surface, borderRadius:"28px 28px 0 0", paddingBottom:36, animation:"fadeSlideIn 0.3s ease" }}
        onClick={e=>e.stopPropagation()}>

        {/* 핸들 */}
        <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 0" }}>
          <div style={{ width:40, height:4, borderRadius:2, background:C.border }}/>
        </div>

        {/* 헤더 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 22px 0" }}>
          <p style={{ color:C.text, fontWeight:700, fontSize:16, margin:0 }}>
            {T.tutorialTitle}
          </p>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.textMuted, fontSize:24, cursor:"pointer", lineHeight:1, padding:0 }}>✕</button>
        </div>

        {/* 슬라이드 카드 */}
        <div style={{ margin:"16px 20px 0", background:C.bg, borderRadius:20, padding:"22px 20px", minHeight:180, maxHeight:260, overflowY:"auto", border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:C.accentSoft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
              {s.icon}
            </div>
            <p style={{ color:C.text, fontWeight:700, fontSize:16, margin:0 }}>{s.title}</p>
          </div>
          <p style={{ color:C.textSub, fontSize:13, margin:0, lineHeight:1.8, whiteSpace:"pre-line" }}>{s.body}</p>
        </div>

        {/* 도트 */}
        <div style={{ display:"flex", justifyContent:"center", gap:7, margin:"18px 0 14px" }}>
          {slides.map((_,i)=>(
            <div key={i} onClick={()=>setSlide(i)}
              style={{ width:i===slide?20:7, height:7, borderRadius:4, background:i===slide?C.accent:C.border, transition:"all 0.3s", cursor:"pointer" }}/>
          ))}
        </div>

        {/* 버튼 */}
        <div style={{ display:"flex", gap:10, padding:"0 20px" }}>
          <button onClick={()=>setSlide(s=>Math.max(0,s-1))} disabled={slide===0}
            style={{ flex:1, padding:13, borderRadius:14, border:`1px solid ${C.border}`, background:C.card, color:slide===0?C.border:C.textSub, fontSize:14, fontWeight:600, cursor:slide===0?"default":"pointer" }}>
            ‹ {isKo?"이전":"Prev"}
          </button>
          {isLast ? (
            <button onClick={onClose}
              style={{ flex:2, padding:13, borderRadius:14, border:"none", background:C.accent, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              {isKo?"완료 ✓":"Done ✓"}
            </button>
          ) : (
            <button onClick={()=>setSlide(s=>Math.min(slides.length-1,s+1))}
              style={{ flex:2, padding:13, borderRadius:14, border:"none", background:C.accent, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              {isKo?"다음":"Next"} ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── HomePortfolio — 날짜 선택 도넛 ───────────────────────────
function HomePortfolio({ dailyHistory, todayStr, T, lang }) {
  const [sel, setSel] = useState(todayStr);
  const isKo = lang === "ko";
  const dates = Object.keys(dailyHistory).sort();
  const fmtD = (str) => {
    const d = new Date(str);
    return isKo
      ? `${d.getMonth()+1}/${d.getDate()}(${["일","월","화","수","목","금","토"][d.getDay()]})`
      : `${d.getMonth()+1}/${d.getDate()}(${["Su","Mo","Tu","We","Th","Fr","Sa"][d.getDay()]})`;
  };
  const day = dailyHistory[sel] || null;
  const colors = [C.accent, C.green, C.purple, C.pink, C.yellow];
  const items = day ? [
    {label:isKo?"공부":"Study",   value:day.study},
    {label:T.cats.exercise,        value:day.exercise},
    {label:T.cats.game,            value:day.game},
    {label:"SNS",                  value:day.sns},
    {label:T.cats.nap,             value:day.nap},
  ] : [];
  const dData = items.map((d,i)=>({...d, color:colors[i]})).filter(d=>d.value>0);

  return (
    <>
      <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:8, marginBottom:14, scrollbarWidth:"none" }}>
        {dates.map(date=>(
          <button key={date} onClick={()=>setSel(date)} style={{
            flexShrink:0, padding:"5px 11px", borderRadius:18,
            border:`1.5px solid ${sel===date?C.accent:C.border}`,
            background:sel===date?C.accentSoft:C.bg,
            color:sel===date?C.accent:C.textMuted,
            fontSize:10, fontWeight:sel===date?700:400, cursor:"pointer", whiteSpace:"nowrap",
          }}>{date===todayStr?(isKo?"오늘":"Today"):fmtD(date)}</button>
        ))}
      </div>
      {day ? (
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <DonutChart data={dData} centerLabel={isKo?"총 사용":"Total"}/>
          <div style={{ flex:1 }}>
            {items.map((d,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, opacity:d.value>0?1:0.3 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:colors[i], flexShrink:0 }}/>
                <span style={{ color:C.textSub, fontSize:11, flex:1 }}>{d.label}</span>
                <span style={{ color:C.text, fontSize:11, fontWeight:600 }}>{d.value}{T.unit}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ color:C.textMuted, fontSize:12, textAlign:"center", margin:"16px 0" }}>
          {isKo?"데이터가 없어요":"No data"}
        </p>
      )}
    </>
  );
}

// ── localStorage 저장/복원 헬퍼 ───────────────────────────────
// 아티팩트 미리보기에서는 막혀있지만, 실제 배포 환경(Vercel 등)에서는 정상 작동
const STORAGE_KEY = "trust-in-minutes-data";
function loadSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function saveData(data) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}

// ── MAIN APP ───────────────────────────────────────────────────
export default function App() {
  const saved = loadSaved();

  const [lang, setLang] = useState(saved.lang ?? "en");
  const [theme, setTheme] = useState(saved.theme ?? "light");
  // 테마 적용 (C 객체 갱신) — 렌더 전에 동기 실행
  applyTheme(theme);
  const isLight = theme === "light";
  // 테마별 그라데이션/특수 색상
  const gradHero = isLight ? "linear-gradient(135deg, #DBEAFE, #EDE9FE)" : "linear-gradient(135deg, #0D1E3D, #180D30)";
  const shimmerTint = isLight ? "rgba(37,99,235,0.08)" : "rgba(79,142,247,0.06)";
  const shareBg = isLight ? "#F3F4F8" : "#071210";
  const T = LANG[lang];
  const allCats = REWARD_META.map(m => ({ ...m, label:T.cats[m.id] }));
  const getCat = (id) => allCats.find(c=>c.id===id);

  const [screen, setScreen] = useState("home");
  const [showSurvey, setShowSurvey] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  // 완료 축하 팝업 — {type:"study"|"reward", ...정보}
  const [donePopup, setDonePopup] = useState(null);
  const [selCat, setSelCat] = useState(null);
  const [pickMins, setPickMins] = useState(10);
  const [surveyDraft, setSurveyDraft] = useState({ ...defaultSurvey });
  const [lGoal, setLGoal] = useState(180);
  const [lStudy, setLStudy] = useState(60);
  const [lReward, setLReward] = useState(15);
  const [lCaps, setLCaps] = useState({ exercise:200, game:120, sns:90, nap:60 });
  // 설정 화면 진입 시 현재 앱 값으로 1회 동기화
  useEffect(() => {
    if (screen === "settings") {
      setLGoal(goalMin); setLStudy(studyPerSess);
      setLReward(rewardPerSess); setLCaps({...caps});
    }
  }, [screen]);
  const [studySecs, setStudySecs] = useState(0);
  const [running, setRunning] = useState(saved.studyStartAt ? true : false);
  const [sessionDone, setSessionDone] = useState(false);
  // 공부 타이머 시작 시각 (epoch ms) — 앱이 닫혀도 실제 경과시간 계산용
  const [studyStartAt, setStudyStartAt] = useState(saved.studyStartAt ?? null);
  const [wallet, setWallet] = useState(saved.wallet ?? { exercise:0, game:0, sns:0, nap:0 });
  const [usedToday, setUsedToday] = useState(saved.usedToday ?? { exercise:0, game:0, sns:0, nap:0 });
  const [goalMin, setGoalMin] = useState(saved.goalMin ?? 180);
  const [doneMin, setDoneMin] = useState(saved.doneMin ?? 0);
  const [selReward, setSelReward] = useState("exercise");
  const [notif, setNotif] = useState(null);
  const [parentShare, setParentShare] = useState(saved.parentShare ?? false);
  const [studyPerSess, setStudyPerSess] = useState(saved.studyPerSess ?? 60);
  const [rewardPerSess, setRewardPerSess] = useState(saved.rewardPerSess ?? 15);
  const [caps, setCaps] = useState(saved.caps ?? { exercise:200, game:120, sns:90, nap:60 });
  const [survey, setSurvey] = useState(saved.survey ?? defaultSurvey);
  const timerRef = useRef(null);

  // ── 데이터 변경 시 자동 저장 ──
  useEffect(() => {
    const prev = loadSaved();
    saveData({ ...prev, lang, theme, wallet, usedToday, goalMin, doneMin, parentShare, studyPerSess, rewardPerSess, caps, survey, studyStartAt, rewardEndAt, rewardCatId, rewardTotalSecs });
  }, [lang, theme, wallet, usedToday, goalMin, doneMin, parentShare, studyPerSess, rewardPerSess, caps, survey, studyStartAt, rewardEndAt, rewardCatId, rewardTotalSecs]);

  // ── 슬로건 타이머 (앱 최상위 — 리렌더링에 안전) ──
  const [mottoIdx, setMottoIdx] = useState(new Date().getDay() % 7);
  const [mottoVisible, setMottoVisible] = useState(true);
  const mottoTimerRef = useRef(null);

  useEffect(() => {
    mottoTimerRef.current = setInterval(() => {
      setMottoVisible(false);
      setTimeout(() => {
        setMottoIdx(i => (i + 1) % 7);
        setMottoVisible(true);
      }, 350);
    }, 4000); // 4초마다 전환
    return () => clearInterval(mottoTimerRef.current);
  }, []);

  // ── 보상 타이머 state (앱 최상위 — 리렌더링에 안전) ──
  const [rewardPhase, setRewardPhase] = useState(saved.rewardEndAt ? "running" : "idle"); // "idle"|"select"|"running"|"done"
  const [rewardCatId, setRewardCatId] = useState(saved.rewardCatId ?? null);
  const [rewardMins, setRewardMins] = useState(10);
  const [rewardSecsLeft, setRewardSecsLeft] = useState(0);
  const [rewardTotalSecs, setRewardTotalSecs] = useState(saved.rewardTotalSecs ?? 0);
  // 보상 타이머 종료 시각 (epoch ms) — 앱이 닫혀도 실제 경과시간 계산용
  const [rewardEndAt, setRewardEndAt] = useState(saved.rewardEndAt ?? null);
  const rewardTimerRef = useRef(null);

  const playAlarm = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const beep = (freq, start, dur) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = freq; o.type = "sine";
        g.gain.setValueAtTime(0, ctx.currentTime + start);
        g.gain.linearRampToValueAtTime(0.5, ctx.currentTime + start + 0.03);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
        o.start(ctx.currentTime + start);
        o.stop(ctx.currentTime + start + dur + 0.05);
      };
      beep(660, 0.0, 0.18); beep(880, 0.28, 0.18); beep(1100, 0.56, 0.35);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    } catch(e) {}
  };

  const startRewardTimer = (catId, mins) => {
    const secs = mins * 60;
    // 지갑 차감
    const cat = allCats.find(c=>c.id===catId);
    setWallet(w=>({...w,[catId]:w[catId]-mins}));
    setUsedToday(u=>({...u,[catId]:u[catId]+mins}));
    notify(T.useNotify(cat.emoji, cat.label, mins));
    // 타이머 시작 — 종료 시각 기록
    setRewardCatId(catId);
    setRewardMins(mins);
    setRewardTotalSecs(secs);
    setRewardSecsLeft(secs);
    setRewardEndAt(Date.now() + secs * 1000);
    setRewardPhase("running");
  };

  // 보상 카운트다운 — 종료시각 기준 (앱이 닫혀도 실제 시간 반영)
  useEffect(() => {
    if (rewardPhase === "running" && rewardEndAt) {
      const tick = () => {
        const left = Math.ceil((rewardEndAt - Date.now()) / 1000);
        if (left <= 0) {
          clearInterval(rewardTimerRef.current);
          setRewardSecsLeft(0);
          setRewardPhase("done");
          setRewardEndAt(null);
          const rcat = getCat(rewardCatId);
          if (rcat) setDonePopup({ type:"reward", emoji:rcat.emoji, label:rcat.label, mins:rewardMins });
        } else {
          setRewardSecsLeft(left);
        }
      };
      tick(); // 즉시 1회 — 앱 재진입 시 바로 반영
      rewardTimerRef.current = setInterval(tick, 1000);
    } else clearInterval(rewardTimerRef.current);
    return () => clearInterval(rewardTimerRef.current);
  }, [rewardPhase, rewardEndAt]);

  // done 감지 → 알람
  useEffect(() => {
    if (rewardPhase === "done") playAlarm();
  }, [rewardPhase]);

  useEffect(() => () => clearInterval(rewardTimerRef.current), []);

  // 최근 7일 공부시간 — 실제 기록에서 파생 (오늘 포함)
  const _today = new Date().toISOString().slice(0,10);
  const _dstr = (daysAgo) => { const d=new Date(); d.setDate(d.getDate()-daysAgo); return d.toISOString().slice(0,10); };
  const _hist = saved.dailyHistory ?? {};
  const weekData = [6,5,4,3,2,1,0].map(ago => {
    const str = _dstr(ago);
    if (str === _today) return doneMin;
    return _hist[str]?.study || 0;
  });
  const GOAL_SECS = studyPerSess * 60;
  const studyPct = Math.min((studySecs/GOAL_SECS)*100, 100);
  const goalPct  = Math.min((doneMin/goalMin)*100, 100);
  const totalWallet = Object.values(wallet).reduce((a,b)=>a+b,0);
  const hypoColors = [C.green, C.accent, C.purple, C.yellow];

  const notify = (msg) => { setNotif(msg); setTimeout(()=>setNotif(null), 3000); };

  const doReset = () => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch(e) {}
    setWallet({ exercise:0, game:0, sns:0, nap:0 });
    setUsedToday({ exercise:0, game:0, sns:0, nap:0 });
    setDoneMin(0);
    setDailyHistory({});
    setGoalMin(180);
    setStudyPerSess(60);
    setRewardPerSess(15);
    setCaps({ exercise:200, game:120, sns:90, nap:60 });
    setSurvey(defaultSurvey);
    setSurveyDraft({ ...defaultSurvey });
    setParentShare(false);
    setStudySecs(0);
    setRunning(false);
    setSessionDone(false);
    setStudyStartAt(null);
    setRewardPhase("idle");
    setRewardCatId(null);
    setRewardEndAt(null);
    setRewardSecsLeft(0);
    setShowResetConfirm(false);
    notify(T.resetDone);
  };

  // ── 공유 텍스트 & 액션 (앱 레벨 — 리렌더링에 안전) ──
  const shareActive = weekData.filter(d=>d>0);
  const shareGoalDays = weekData.filter(d=>d>=goalMin).length;
  const shareGoalPct = shareActive.length ? Math.round((shareGoalDays/shareActive.length)*100) : 0;
  const shareText = lang==="ko"
    ? `[Trust-in-Minutes 주간 리포트]\n\n📚 총 공부: ${shareActive.reduce((a,b)=>a+b,0)}분\n🎯 목표달성률: ${shareGoalPct}%\n🏆 완료 세션: ${shareActive.length}회\n\n🎁 보상 사용\n${allCats.map(c=>`  ${c.emoji} ${c.label}: ${usedToday[c.id]}분`).join("\n")}${survey.submitted?`\n\n📊 자기조절: ${survey.d2}/5점\n⚡ 갈등 횟수: ${survey.d1||0}회`:""}\n\n✅ "투자한 만큼 공정하게 — Trust-in-Minutes"`
    : `[Trust-in-Minutes Weekly Report]\n\n📚 Study: ${shareActive.reduce((a,b)=>a+b,0)} min\n🎯 Goal rate: ${shareGoalPct}%\n🏆 Sessions: ${shareActive.length}\n\n🎁 Rewards used\n${allCats.map(c=>`  ${c.emoji} ${c.label}: ${usedToday[c.id]} min`).join("\n")}${survey.submitted?`\n\n📊 Self-reg: ${survey.d2}/5\n⚡ Conflicts: ${survey.d1||0}`:""}\n\n✅ "Earn fairly what you invest — Trust-in-Minutes"`;
  const doShare = () => {
    if (navigator.share) {
      navigator.share({ title:"Trust-in-Minutes", text:shareText }).catch(()=>{});
    } else {
      navigator.clipboard?.writeText(shareText)
        .then(()=>notify(lang==="ko"?"📋 클립보드에 복사됐어요! 카카오톡에 붙여넣기 하세요":"📋 Copied! Paste into KakaoTalk"))
        .catch(()=>notify(lang==="ko"?"공유를 지원하지 않는 환경이에요":"Sharing not supported"));
    }
    setShowSharePopup(false);
  };

  useEffect(() => {
    if (running && studyStartAt) {
      // 경과 시간을 시작시각 기준으로 계산 (앱이 닫혀도 실제 시간 반영)
      const tick = () => {
        const elapsed = Math.floor((Date.now() - studyStartAt) / 1000);
        if (elapsed >= GOAL_SECS && !sessionDone) {
          clearInterval(timerRef.current);
          setStudySecs(GOAL_SECS);
          setRunning(false); setSessionDone(true);
          setStudyStartAt(null);
          const cat = getCat(selReward);
          setWallet(w=>({...w,[selReward]:w[selReward]+rewardPerSess}));
          setDoneMin(d=>d+studyPerSess);
          notify(T.notifyDone(studyPerSess, cat.emoji, cat.label, rewardPerSess));
          setDonePopup({ type:"study", mins:studyPerSess, emoji:cat.emoji, label:cat.label, reward:rewardPerSess });
        } else {
          setStudySecs(Math.min(elapsed, GOAL_SECS));
        }
      };
      tick(); // 즉시 1회 — 앱 재진입 시 바로 반영
      timerRef.current = setInterval(tick, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running, studyStartAt, sessionDone, selReward, lang, studyPerSess, rewardPerSess, GOAL_SECS]);

  const resetTimer = () => { setStudySecs(0); setRunning(false); setSessionDone(false); setStudyStartAt(null); };

  // ── 날짜별 히스토리 데이터 ──
  const todayStr = new Date().toISOString().slice(0,10);
  const getDateStr = (daysAgo) => {
    const d = new Date(); d.setDate(d.getDate() - daysAgo);
    return d.toISOString().slice(0,10);
  };
  // 실제 사용 기록 — 저장된 값이 있으면 복원, 없으면 빈 객체 (신규 사용자)
  const [dailyHistory, setDailyHistory] = useState(saved.dailyHistory ?? {});
  // dailyHistory 변경 시 저장
  useEffect(() => {
    const prev = loadSaved();
    saveData({ ...prev, dailyHistory });
  }, [dailyHistory]);

  // 오늘 기록을 dailyHistory에 항상 반영 (도넛/리포트가 오늘 데이터를 보게)
  const todayHistory = { study:doneMin, exercise:usedToday.exercise, game:usedToday.game, sns:usedToday.sns, nap:usedToday.nap };
  const mergedHistory = { ...dailyHistory, [todayStr]: todayHistory };

  // dailyHistory 이후에 hypos 계산
  const hypos = calcHypo(survey, weekData, goalMin, mergedHistory);

  // 오늘 데이터 (홈 포트폴리오용)
  const todayData = {
    study: doneMin,
    exercise: usedToday.exercise,
    game: usedToday.game,
    sns: usedToday.sns,
    nap: usedToday.nap,
  };

  const donutData = [
    { color:C.accent, value:todayData.study, label:T.studyLegend },
    ...allCats.map(c=>({ color:c.color, value:todayData[c.id], label:c.label })),
  ];

  // ── Shared UI ──────────────────────────────────────────────
  function PageHeader({ sub, title }) {
    return (
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <p style={{ color:C.textMuted, fontSize:11, letterSpacing:2, textTransform:"uppercase", margin:0 }}>{sub}</p>
          <h2 style={{ color:C.text, fontSize:20, fontWeight:800, margin:"4px 0 0", fontFamily:"Georgia,serif" }}>{title}</h2>
        </div>
        <button onClick={()=>setLang(l=>l==="ko"?"en":"ko")} style={{ background:C.card, border:`1.5px solid ${C.accent}`, borderRadius:20, color:C.accent, fontSize:12, fontWeight:700, padding:"5px 13px", cursor:"pointer", flexShrink:0, marginTop:2 }}>{T.langToggle}</button>
      </div>
    );
  }

  function StepCtrl({ value, onChange, min=5, max=600, step=5 }) {
    return (
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <button onClick={()=>onChange(Math.max(min,value-step))} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:C.card, color:C.text, fontSize:18, cursor:"pointer" }}>−</button>
        <div style={{ background:C.bg, border:`1.5px solid ${C.accent}55`, borderRadius:10, padding:"6px 10px", minWidth:68, textAlign:"center" }}>
          <span style={{ color:C.accent, fontWeight:800, fontSize:15 }}>{value}</span>
          <span style={{ color:C.textMuted, fontSize:11 }}> {T.unit}</span>
        </div>
        <button onClick={()=>onChange(Math.min(max,value+step))} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:C.card, color:C.text, fontSize:18, cursor:"pointer" }}>+</button>
      </div>
    );
  }

  function NavBar() {
    return (
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:390, background:C.surface, borderTop:`2px solid ${C.border}`, display:"flex", justifyContent:"space-around", alignItems:"center", padding:"12px 8px 24px", zIndex:100, boxShadow:isLight?"0 -4px 24px rgba(0,0,30,0.08)":"0 -4px 24px rgba(0,0,0,0.4)" }}>
        {[{id:"home",icon:"🏠"},{id:"timer",icon:"⏱️"},{id:"wallet",icon:"🎁"},{id:"report",icon:"📊"},{id:"settings",icon:"⚙️"}].map(nav=>{
          const active = screen===nav.id && !showSurvey;
          return (
            <button key={nav.id} onClick={()=>{ setScreen(nav.id); setShowSurvey(false); }} style={{ background:active?C.accentSoft:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:5, borderRadius:14, padding:"8px 14px", minWidth:56 }}>
              <span style={{ fontSize:26, lineHeight:1 }}>{nav.icon}</span>
              <span style={{ fontSize:12, fontWeight:active?700:500, color:active?C.accent:C.textSub }}>{T.nav[nav.id]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // ── HOME ──────────────────────────────────────────────────
  function HomeScreen() {
    const mottos = T.dailyMottos;

    return (
      <div style={{ padding:"24px 20px", paddingBottom:100 }}>
        <PageHeader sub="Trust-in-Minutes" title={T.homeSub}/>

        {/* 애니메이션 슬로건 카드 */}
        <div style={{
          background:gradHero,
          borderRadius:18, padding:"18px 20px", marginBottom:14,
          border:`1px solid ${C.accent}55`,
          position:"relative", overflow:"hidden", cursor:"pointer",
        }} onClick={() => {
          clearInterval(mottoTimerRef.current);
          setMottoVisible(false);
          setTimeout(() => {
            setMottoIdx(i => (i+1) % mottos.length);
            setMottoVisible(true);
            // 탭 후 다시 자동 타이머 재시작
            mottoTimerRef.current = setInterval(() => {
              setMottoVisible(false);
              setTimeout(() => { setMottoIdx(i => (i+1) % 7); setMottoVisible(true); }, 350);
            }, 4000);
          }, 350);
        }}>
          {/* 흐르는 배경 광선 */}
          <div style={{
            position:"absolute", inset:0, overflow:"hidden", borderRadius:18,
            background:`linear-gradient(90deg, transparent 0%, ${shimmerTint} 50%, transparent 100%)`,
            animation:"shimmer 3s linear infinite",
          }}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <p style={{ color:C.accent, fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", margin:0, animation:"pulseGlow 3s ease-in-out infinite" }}>
              {lang==="ko" ? "오늘의 한 마디" : "Today's Motto"}
            </p>
            <div style={{ display:"flex", gap:4 }}>
              {mottos.map((_,i)=>(
                <div key={i} style={{ width: i===mottoIdx?16:5, height:5, borderRadius:3, background: i===mottoIdx?C.accent:C.border, transition:"all 0.4s ease" }}/>
              ))}
            </div>
          </div>
          <p style={{
            fontSize:14, fontWeight:700, margin:0, lineHeight:1.6, fontStyle:"italic",
            opacity: mottoVisible ? 1 : 0,
            transform: mottoVisible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            background: isLight
              ? "linear-gradient(90deg, #7B4F00 0%, #C8860A 25%, #FFD700 50%, #C8860A 75%, #7B4F00 100%)"
              : "linear-gradient(90deg, #B8860B 0%, #FFD700 30%, #FFF8DC 50%, #FFD700 70%, #B8860B 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "goldShimmer 2.5s linear infinite",
          }}>
            "{mottos[mottoIdx % mottos.length]}"
          </p>
          <p style={{ color:C.textMuted, fontSize:9, margin:"8px 0 0", letterSpacing:0.5 }}>
            {lang==="ko" ? "탭하면 다음 문구로 →" : "Tap for next →"}
          </p>
        </div>
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div>
              <p style={{ color:C.textMuted, fontSize:11, margin:0, letterSpacing:1 }}>{T.goalLabel}</p>
              <p style={{ color:C.text, fontSize:22, fontWeight:800, margin:"4px 0 0", fontFamily:"Georgia,serif" }}>{T.goalUnit(doneMin,goalMin)}</p>
            </div>
            <Ring pct={goalPct} size={78} stroke={7} color={C.accent}>
              <span style={{ fontSize:14, fontWeight:700, color:C.accent }}>{Math.round(goalPct)}%</span>
            </Ring>
          </div>
          <div style={{ background:C.bg, borderRadius:6, height:6, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${goalPct}%`, background:`linear-gradient(90deg,${C.accent},${C.green})`, borderRadius:6, transition:"width 0.8s ease" }}/>
          </div>
          <p style={{ color:C.textMuted, fontSize:11, margin:"8px 0 0" }}>{goalMin-doneMin>0?T.goalLeft(goalMin-doneMin):T.goalDone}</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          {[
            {icon:"⏱", label:T.balanceLabel, value:totalWallet, unit:T.balanceUnit, color:C.green},
            {icon:"📚", label:T.sessionLabel, value:Math.floor(doneMin / studyPerSess), unit:T.sessionUnit, color:C.accent},
          ].map((s,i)=>(
            <div key={i} style={{ background:C.card, borderRadius:16, padding:16, border:`1px solid ${C.border}` }}>
              <p style={{ color:C.textMuted, fontSize:10, margin:"0 0 8px", letterSpacing:1 }}>{s.icon} {s.label}</p>
              <p style={{ color:s.color, fontSize:28, fontWeight:800, margin:0, fontFamily:"Georgia,serif" }}>{s.value}</p>
              <p style={{ color:C.textMuted, fontSize:10, margin:"2px 0 0" }}>{s.unit}</p>
            </div>
          ))}
        </div>
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <p style={{ color:C.textMuted, fontSize:11, margin:0, letterSpacing:1, textTransform:"uppercase" }}>📈 {lang==="ko" ? "시간 포트폴리오" : "Time Portfolio"}</p>
          </div>
          <HomePortfolio dailyHistory={mergedHistory} todayStr={todayStr} T={T} lang={lang}/>
        </div>
        <button onClick={()=>setScreen("timer")} style={{ width:"100%", padding:16, borderRadius:16, border:"none", background:`linear-gradient(135deg,${C.accent},#2563EB)`, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" }}>{T.ctaBtn}</button>
      </div>
    );
  }

  // ── TIMER ─────────────────────────────────────────────────
  function TimerScreen() {
    const statusMsg = sessionDone
      ? T.sessionDoneMsg(studyPerSess, rewardPerSess)
      : running ? T.timerFocusMsg : T.timerReadyMsg;
    return (
      <div style={{ padding:"24px 20px", paddingBottom:100 }}>
        <PageHeader sub={T.timerSub} title={T.timerTitle}/>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <Ring pct={studyPct} size={210} stroke={13} color={sessionDone?C.green:C.accent}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:42, fontWeight:800, color:C.text, fontFamily:"monospace", letterSpacing:2 }}>{fmtTime(GOAL_SECS-studySecs)}</div>
              <div style={{ fontSize:11, color:C.textMuted, letterSpacing:1 }}>{sessionDone?T.timerDone:running?T.timerFocusing:T.timerReady}</div>
            </div>
          </Ring>
        </div>

        {/* 철학 메시지 */}
        <p style={{ textAlign:"center", color: sessionDone ? C.green : running ? C.accent : C.textMuted, fontSize:12, fontStyle:"italic", margin:"0 0 20px", lineHeight:1.5 }}>
          {statusMsg}
        </p>
        <div style={{ background:C.card, borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.textMuted, fontSize:11, margin:"0 0 12px", letterSpacing:1 }}>{T.timerRewardLabel}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
            {allCats.map(cat=>(
              <button key={cat.id} onClick={()=>!running&&setSelReward(cat.id)} style={{ border:`2px solid ${selReward===cat.id?cat.color:C.border}`, background:selReward===cat.id?cat.soft:C.bg, borderRadius:12, padding:"10px 4px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:22 }}>{cat.emoji}</span>
                <span style={{ fontSize:10, color:selReward===cat.id?cat.color:C.textMuted }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ background:C.accentSoft, borderRadius:12, padding:12, marginBottom:20, border:`1px solid ${C.accent}33` }}>
          <p style={{ color:C.accent, fontSize:12, margin:0 }}>{T.timerRule(studyPerSess, getCat(selReward).label, rewardPerSess)}</p>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          {!sessionDone ? (
            <>
              <button onClick={()=>{
                if (running) {
                  // 일시정지 — 시작시각 해제, 현재 경과초 유지
                  setRunning(false);
                  setStudyStartAt(null);
                } else {
                  // 시작/재개 — 이미 흐른 studySecs만큼 과거로 시작시각 설정
                  setStudyStartAt(Date.now() - studySecs * 1000);
                  setRunning(true);
                }
              }} style={{ flex:1, padding:16, borderRadius:16, border:"none", background:running?C.orange:C.accent, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>{running?T.timerPause:T.timerStart}</button>
              <button onClick={resetTimer} style={{ width:56, borderRadius:16, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontSize:18, cursor:"pointer" }}>↺</button>
            </>
          ) : (
            <button onClick={resetTimer} style={{ flex:1, padding:16, borderRadius:16, border:"none", background:C.green, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>{T.timerNext}</button>
          )}
        </div>
      </div>
    );
  }

  // ── WALLET ────────────────────────────────────────────────
  function WalletScreen() {
    const rewardPct = rewardTotalSecs > 0
      ? Math.min(((rewardTotalSecs - rewardSecsLeft) / rewardTotalSecs) * 100, 100) : 0;
    const r = 60, stroke = 10, circ = 2 * Math.PI * r, sz = 148;
    const activeCat = rewardCatId ? getCat(rewardCatId) : null;
    const isKo = T.walletMin === "분";

    return (
      <div style={{ padding:"24px 20px", paddingBottom:110 }}>
        <PageHeader sub={T.walletSub} title={T.walletTitle}/>
        <p style={{ color:C.textMuted, fontSize:12, margin:"-12px 0 18px" }}>
          {T.walletTotal}: <span style={{ color:C.green, fontWeight:700 }}>{totalWallet} {T.walletTotalUnit}</span>
        </p>

        {/* ── 타이머 실행 중 ── */}
        {rewardPhase === "running" && activeCat && (
          <div style={{ background:activeCat.soft, borderRadius:20, padding:24, marginBottom:16, border:`2px solid ${activeCat.color}88`, textAlign:"center" }}>
            <p style={{ color:activeCat.color, fontWeight:700, fontSize:14, margin:"0 0 18px" }}>
              {activeCat.emoji} {isKo ? "보상 타이머 진행 중" : "Reward Timer Running"}
            </p>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
              <div style={{ position:"relative", width:sz, height:sz }}>
                <svg width={sz} height={sz} style={{ transform:"rotate(-90deg)" }}>
                  <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
                  <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={activeCat.color} strokeWidth={stroke}
                    strokeDasharray={`${circ*(rewardPct/100)} ${circ}`} strokeLinecap="round"
                    style={{ transition:"stroke-dasharray 0.9s linear" }}/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:activeCat.color, fontSize:34, fontWeight:800, fontFamily:"monospace", letterSpacing:1 }}>
                    {String(Math.floor(rewardSecsLeft/60)).padStart(2,"0")}:{String(rewardSecsLeft%60).padStart(2,"0")}
                  </span>
                  <span style={{ color:C.textMuted, fontSize:10, marginTop:4 }}>
                    {isKo ? "남은 시간" : "remaining"}
                  </span>
                </div>
              </div>
            </div>
            <p style={{ color:C.textMuted, fontSize:12, margin:"0 0 16px", fontStyle:"italic" }}>
              🔔 {isKo ? "시간이 끝나면 알람이 울려요" : "Alarm will ring when time is up"}
            </p>
            <button onClick={()=>{ clearInterval(rewardTimerRef.current); setRewardPhase("idle"); setRewardCatId(null); setRewardEndAt(null); }}
              style={{ width:"100%", padding:13, borderRadius:12, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontSize:13, fontWeight:600, cursor:"pointer" }}>
              ⏹ {isKo ? "조기 종료" : "End Early"}
            </button>
          </div>
        )}

        {/* ── 완료 화면 ── */}
        {rewardPhase === "done" && activeCat && (
          <div style={{ background:C.greenSoft, borderRadius:20, padding:24, marginBottom:16, border:`2px solid ${C.green}88`, textAlign:"center", animation:"fadeSlideIn 0.4s ease" }}>
            <p style={{ color:C.green, fontWeight:700, fontSize:15, margin:"0 0 16px" }}>
              {activeCat.emoji} {isKo ? "보상 시간 종료! 🔔" : "Time's up! 🔔"}
            </p>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
              <div style={{ position:"relative", width:sz, height:sz }}>
                <svg width={sz} height={sz} style={{ transform:"rotate(-90deg)" }}>
                  <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
                  <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={C.green} strokeWidth={stroke}
                    strokeDasharray={`${circ} ${circ}`} strokeLinecap="round"/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:42 }}>✅</span>
                </div>
              </div>
            </div>
            <p style={{ color:C.green, fontSize:15, fontWeight:700, margin:"0 0 6px" }}>
              {isKo ? `${rewardMins}분 보상 완료!` : `${rewardMins} min reward done!`}
            </p>
            <p style={{ color:C.textSub, fontSize:13, margin:"0 0 20px" }}>
              {isKo ? "공부하러 돌아갈 시간이에요 💪" : "Time to get back to studying 💪"}
            </p>
            <button onClick={()=>{ setRewardPhase("idle"); setRewardCatId(null); setSelCat(null); setRewardEndAt(null); }}
              style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:C.green, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              ✅ {isKo ? "확인" : "Done"}
            </button>
          </div>
        )}

        {/* ── 카테고리 그리드 (타이머 없을 때만) ── */}
        {rewardPhase === "idle" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
              {allCats.map(cat=>{
                const active=selCat===cat.id, has=wallet[cat.id]>0;
                return (
                  <button key={cat.id} onClick={()=>{ if(!has){notify(T.noBalance(cat.label));return;} setSelCat(active?null:cat.id); setRewardCatId(cat.id); setPickMins(Math.min(10, wallet[cat.id])); }}
                    style={{ background:active?cat.soft:C.card, border:`2px solid ${active?cat.color:has?cat.color+"44":C.border}`, borderRadius:18, padding:16, cursor:"pointer", textAlign:"left", opacity:has?1:0.5 }}>
                    <div style={{ fontSize:26, marginBottom:8 }}>{cat.emoji}</div>
                    <div style={{ color:C.textSub, fontSize:11, marginBottom:2 }}>{cat.label}</div>
                    <div style={{ color:has?cat.color:C.textMuted, fontSize:22, fontWeight:800, lineHeight:1 }}>
                      {wallet[cat.id]}<span style={{ fontSize:11, fontWeight:400, color:C.textMuted }}> {T.walletMin}</span>
                    </div>
                    <div style={{ color:C.textMuted, fontSize:10, marginTop:4 }}>{T.walletUsed(usedToday[cat.id])}</div>
                  </button>
                );
              })}
            </div>

            {/* ── 시간 선택 패널 ── */}
            {selCat && getCat(selCat) && (
              <PickPanel
                cat={getCat(selCat)}
                max={wallet[selCat]}
                T={T}
                pickMins={Math.min(pickMins, wallet[selCat])}
                setPickMins={setPickMins}
                onStart={(m)=>{ startRewardTimer(selCat, m); setSelCat(null); }}
                onCancel={()=>setSelCat(null)}
              />
            )}
          </>
        )}

        <div style={{ background:C.orangeSoft, borderRadius:14, padding:14, border:`1px solid ${C.orange}44` }}>
          <p style={{ color:C.orange, fontSize:12, margin:"0 0 8px", fontWeight:700 }}>⚠️ {T.walletCapTitle}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-start" }}>
            {allCats.map(cat=>(
              <span key={cat.id} style={{ background:cat.soft, color:cat.color, fontSize:11, padding:"5px 12px", borderRadius:20, fontWeight:600 }}>{cat.emoji} {cat.label} {T.walletCapUnit(caps[cat.id])}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── SURVEY ────────────────────────────────────────────────
  function SurveyScreen() {
    const draft = surveyDraft;
    const setDraft = setSurveyDraft;
    const set = (k,v) => setDraft(d=>({...d,[k]:v}));
    const setC2 = (cat,v) => setDraft(d=>({...d, c2:{...d.c2,[cat]:Math.max(0,Math.min(60,Number(v)||0))}}));
    const c2Total = Object.values(draft.c2).reduce((a,b)=>a+b,0);

    const handleSubmit = () => {
      setSurvey({ ...draft, submitted:true });
      setSurveyDraft({ ...defaultSurvey });
      setShowSurvey(false);
      notify(T.submitted);
    };

    return (
      <div style={{ padding:"24px 20px", paddingBottom:110 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <p style={{ color:C.textMuted, fontSize:11, letterSpacing:2, textTransform:"uppercase", margin:0 }}>{T.surveyTitle}</p>
            <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:"4px 0 0", fontFamily:"Georgia,serif" }}>{T.surveyHint}</h2>
          </div>
          <button onClick={()=>setShowSurvey(false)} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, color:C.textMuted, fontSize:12, padding:"5px 12px", cursor:"pointer" }}>{T.cancel}</button>
        </div>

        {/* A */}
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.accent, fontSize:12, fontWeight:700, margin:"0 0 16px", letterSpacing:1 }}>{T.secA}</p>
          <ScaleQ label={T.qA1} val={draft.a1} onChange={v=>set("a1",v)} T={T}/>
          <ScaleQ label={T.qA2} val={draft.a2} onChange={v=>set("a2",v)} T={T}/>
          <ScaleQ label={T.qA3} val={draft.a3} onChange={v=>set("a3",v)} T={T}/>
        </div>

        {/* B */}
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.green, fontSize:12, fontWeight:700, margin:"0 0 16px", letterSpacing:1 }}>{T.secB}</p>
          <ScaleQ label={T.qB1} val={draft.b1} onChange={v=>set("b1",v)} T={T}/>
          <ScaleQ label={T.qB2} val={draft.b2} onChange={v=>set("b2",v)} T={T}/>
          <ScaleQ label={T.qB3} desc={T.qB3desc} val={draft.b3} onChange={v=>set("b3",v)} T={T}/>
          <ScaleQ label={T.qB4} val={draft.b4} onChange={v=>set("b4",v)} T={T}/>
        </div>

        {/* C */}
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.purple, fontSize:12, fontWeight:700, margin:"0 0 16px", letterSpacing:1 }}>{T.secC}</p>
          <p style={{ color:C.textSub, fontSize:13, margin:"0 0 10px" }}>{T.qC1}</p>
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            {T.c1opts.map(opt=>(
              <button key={opt} onClick={()=>set("c1",opt)} style={{ flex:1, padding:"10px 4px", borderRadius:10, border:`2px solid ${draft.c1===opt?C.purple:C.border}`, background:draft.c1===opt?C.purpleSoft:C.bg, color:draft.c1===opt?C.purple:C.textSub, fontSize:11, fontWeight:600, cursor:"pointer" }}>{opt}</button>
            ))}
          </div>
          <p style={{ color:C.textSub, fontSize:13, margin:"0 0 12px" }}>{T.qC2}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {allCats.map(cat=>(
              <div key={cat.id} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>{cat.emoji}</span>
                <span style={{ color:C.textSub, fontSize:13, flex:1 }}>{cat.label}</span>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <button onClick={()=>setC2(cat.id, draft.c2[cat.id]-5)} style={{ width:28, height:28, borderRadius:7, border:`1px solid ${C.border}`, background:C.bg, color:C.text, fontSize:14, cursor:"pointer" }}>−</button>
                  <div style={{ background:cat.soft, borderRadius:8, padding:"4px 12px", minWidth:50, textAlign:"center" }}>
                    <span style={{ color:cat.color, fontWeight:700, fontSize:14 }}>{draft.c2[cat.id]}</span>
                    <span style={{ color:C.textMuted, fontSize:10 }}>{T.unit}</span>
                  </div>
                  <button onClick={()=>setC2(cat.id, draft.c2[cat.id]+5)} style={{ width:28, height:28, borderRadius:7, border:`1px solid ${C.border}`, background:C.bg, color:C.text, fontSize:14, cursor:"pointer" }}>+</button>
                </div>
              </div>
            ))}
            <div style={{ background:c2Total===60?C.greenSoft:C.orangeSoft, borderRadius:10, padding:"8px 12px", display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:C.textSub, fontSize:12 }}>{T.total}</span>
              <span style={{ color:c2Total===60?C.green:C.orange, fontWeight:700, fontSize:12 }}>{c2Total}/60{T.unit}</span>
            </div>
          </div>
        </div>

        {/* D */}
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.orange, fontSize:12, fontWeight:700, margin:"0 0 16px", letterSpacing:1 }}>{T.secD}</p>
          <p style={{ color:C.textSub, fontSize:13, margin:"0 0 8px" }}>{T.qD1}</p>
          <input type="number" min="0" max="20" value={draft.d1} onChange={e=>set("d1",e.target.value)}
            style={{ width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:16, fontWeight:700, padding:"10px 14px", marginBottom:18, boxSizing:"border-box", outline:"none" }}
            placeholder="0"/>
          <ScaleQ label={T.qD2} val={draft.d2} onChange={v=>set("d2",v)} T={T}/>
          <p style={{ color:C.textSub, fontSize:13, margin:"0 0 8px" }}>{T.qD3}</p>
          <textarea value={draft.d3} onChange={e=>set("d3",e.target.value)}
            style={{ width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:13, padding:"10px 14px", minHeight:70, resize:"none", boxSizing:"border-box", outline:"none" }}
            placeholder={lang==="ko"?"자유롭게 적어주세요...":"Write freely..."}/>
        </div>

        <button onClick={handleSubmit} style={{ width:"100%", padding:16, borderRadius:16, border:"none", background:`linear-gradient(135deg,${C.accent},#2563EB)`, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>{T.submit}</button>
      </div>
    );
  }

  // ── REPORT ────────────────────────────────────────────────
  function ReportScreen() {
    const active = weekData.filter(d=>d>0);
    const avgStudy = active.length ? Math.round(active.reduce((a,b)=>a+b,0)/active.length) : 0;
    const goalDays = weekData.filter(d=>d>=goalMin).length;
    const goalRatePct = active.length ? Math.round((goalDays/active.length)*100) : 0;
    const [weekOffset, setWeekOffset] = useState(0); // 0=이번주, 1=지난주, ...
    const [selectedBarIdx, setSelectedBarIdx] = useState(null);
    const isKo = lang === "ko";

    // 표시할 주간 날짜 문자열 배열 계산
    const getWeekDayStrs = (offset) => {
      const today = new Date();
      const dow = today.getDay(); // 0=일
      // 월요일 기준으로 이번주 시작
      const monday = new Date(today);
      monday.setDate(today.getDate() - ((dow+6)%7) - offset*7);
      return Array.from({length:7}, (_,i) => {
        const d = new Date(monday); d.setDate(monday.getDate()+i);
        return d.toISOString().slice(0,10);
      });
    };

    const displayWeekDayStrs = getWeekDayStrs(weekOffset);
    const displayWeekData = displayWeekDayStrs.map(str => mergedHistory[str]?.study || 0);
    const displayWeekDays = displayWeekDayStrs.map(str => {
      const d = new Date(str);
      return isKo
        ? ["일","월","화","수","목","금","토"][d.getDay()]
        : ["Su","Mo","Tu","We","Th","Fr","Sa"][d.getDay()];
    });
    const maxBar = Math.max(...displayWeekData, 1);

    return (
      <div style={{ padding:"24px 20px", paddingBottom:100 }}>
        <PageHeader sub={T.reportSub} title={T.reportTitle}/>

        {/* ── 주간 바 차트 (주 선택 가능) ── */}
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          {/* 주 이동 버튼 */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <button onClick={()=>setWeekOffset(w=>Math.min(w+1,3))} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, color:C.textSub, fontSize:13, padding:"4px 12px", cursor:"pointer" }}>‹ {isKo?"이전":"Prev"}</button>
            <p style={{ color:C.text, fontSize:12, fontWeight:700, margin:0 }}>
              {weekOffset===0
                ? (isKo?"이번 주":"This Week")
                : (isKo?`${weekOffset}주 전`:`${weekOffset}w ago`)}
            </p>
            <button onClick={()=>setWeekOffset(w=>Math.max(w-1,0))} disabled={weekOffset===0}
              style={{ background:weekOffset===0?C.bg:C.bg, border:`1px solid ${weekOffset===0?C.border:C.border}`, borderRadius:8, color:weekOffset===0?C.border:C.textSub, fontSize:13, padding:"4px 12px", cursor:weekOffset===0?"default":"pointer" }}>
              {isKo?"다음":"Next"} ›
            </button>
          </div>
          <p style={{ color:C.textMuted, fontSize:10, margin:"0 0 12px", letterSpacing:1 }}>{T.chartTitle}</p>
          <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:100 }}>
            {displayWeekData.map((d,i)=>{
              const isToday = weekOffset===0 && i===4;
              const isSel = selectedBarIdx===i;
              return (
                <div key={i} onClick={()=>setSelectedBarIdx(isSel?null:i)}
                  style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer" }}>
                  <div style={{ width:"100%", background:isSel?C.accent:isToday?C.accent:C.accentSoft, borderRadius:4, height:maxBar>0?`${(d/maxBar)*90}px`:"4px", transition:"all 0.4s ease", border:isSel?`2px solid ${C.accent}`:undefined }}/>
                  <span style={{ color:isSel?C.accent:isToday?C.accent:C.textMuted, fontSize:10 }}>{displayWeekDays[i]}</span>
                </div>
              );
            })}
          </div>
          {/* 선택된 바 상세 */}
          {selectedBarIdx !== null && displayWeekData[selectedBarIdx] !== undefined && (
            <div style={{ background:C.bg, borderRadius:12, padding:"10px 14px", marginTop:12, border:`1px solid ${C.accent}33` }}>
              <p style={{ color:C.accent, fontSize:11, fontWeight:700, margin:"0 0 6px" }}>
                {displayWeekDays[selectedBarIdx]} — {isKo?`공부 ${displayWeekData[selectedBarIdx]}분`:`Study ${displayWeekData[selectedBarIdx]} min`}
              </p>
              {mergedHistory[displayWeekDayStrs[selectedBarIdx]] && (() => {
                const hist = mergedHistory[displayWeekDayStrs[selectedBarIdx]];
                const rewards = [
                  {color:C.green,  emoji:"🏐", val:hist.exercise, label:T.cats.exercise},
                  {color:C.purple, emoji:"🎮", val:hist.game,     label:T.cats.game},
                  {color:C.pink,   emoji:"📱", val:hist.sns,      label:"SNS"},
                  {color:C.yellow, emoji:"😴", val:hist.nap,      label:T.cats.nap},
                ].filter(r=>r.val>0);
                return (
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {rewards.length > 0 ? rewards.map((r,i)=>(
                      <span key={i} style={{ background:C.card, borderRadius:20, padding:"3px 10px", fontSize:11, color:r.color, fontWeight:600 }}>
                        {r.emoji} {r.label} {r.val}{T.unit}
                      </span>
                    )) : (
                      <span style={{ color:C.textMuted, fontSize:11 }}>{isKo?"보상 사용 없음":"No rewards used"}</span>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
          {[
            {label:T.avgStudy, value:`${avgStudy}${T.unit}`, color:C.accent},
            {label:T.goalRate, value:`${goalRatePct}%`, color:C.green},
            {label:T.rewardUsed, value:`${Object.values(usedToday).reduce((a,b)=>a+b,0)}${T.unit}`, color:C.purple},
          ].map((s,i)=>(
            <div key={i} style={{ background:C.card, borderRadius:14, padding:14, textAlign:"center", border:`1px solid ${C.border}` }}>
              <p style={{ color:s.color, fontSize:18, fontWeight:800, margin:"0 0 4px", fontFamily:"Georgia,serif" }}>{s.value}</p>
              <p style={{ color:C.textMuted, fontSize:9, margin:0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* 지금 나, 달라지고 있어? */}
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <p style={{ color:C.textMuted, fontSize:11, margin:0, letterSpacing:1 }}>🔬 {T.hypoTitle}</p>
            {!survey.submitted && (
              <span style={{ background:C.orangeSoft, color:C.orange, fontSize:10, padding:"3px 8px", borderRadius:20, fontWeight:600 }}>
                {isKo?"설문 입력 시 더 많은 지표":"More data with survey"}
              </span>
            )}
          </div>
          {!survey.submitted && (
            <div style={{ background:C.orangeSoft, borderRadius:12, padding:12, marginBottom:14, border:`1px solid ${C.orange}33` }}>
              <p style={{ color:C.orange, fontSize:12, margin:0 }}>{T.noSurvey}</p>
            </div>
          )}
          {hypos.slice(0,4).map((val,i)=>{
            // H4(streak)는 설문 없이 항상 표시
            const streak = hypos[4];
            const isStreak = i === 3;
            const displayVal = isStreak ? val : val;
            const hasData = displayVal !== null;
            return (
              <div key={i} style={{ marginBottom: i<3 ? 16 : 0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <div style={{ flex:1 }}>
                    <span style={{ color:C.text, fontSize:12, fontWeight:700 }}>{T.hypos[i]}</span>
                    <p style={{ color:C.textMuted, fontSize:10, margin:"2px 0 0" }}>{T.hypoDesc[i]}</p>
                  </div>
                  <span style={{ color:hasData?hypoColors[i]:C.textMuted, fontSize:13, fontWeight:700, marginLeft:8 }}>
                    {isStreak
                      ? (isKo ? `${streak}일 연속` : `${streak} days`)
                      : hasData ? `${displayVal}%` : "—"}
                  </span>
                </div>
                <div style={{ background:C.bg, borderRadius:4, height:6, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${displayVal||0}%`, background:hasData?hypoColors[i]:C.border, borderRadius:4, transition:"width 0.8s ease" }}/>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={()=>setShowSurvey(true)} style={{ width:"100%", padding:14, borderRadius:14, border:`1.5px solid ${survey.submitted?C.green:C.accent}`, background:survey.submitted?C.greenSoft:C.accentSoft, color:survey.submitted?C.green:C.accent, fontSize:13, fontWeight:700, cursor:"pointer", marginBottom:12 }}>
          {survey.submitted?T.surveyDone:T.surveyBtn}
        </button>

        {/* 공유 버튼 */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${parentShare?C.green+"66":C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px" }}>
            <div>
              <p style={{ color:parentShare?C.green:C.textSub, fontWeight:700, fontSize:13, margin:0 }}>
                {lang==="ko" ? "카카오톡 · 문자로 공유" : "Share via KakaoTalk · SMS"}
              </p>
              <p style={{ color:C.textMuted, fontSize:11, margin:"3px 0 0" }}>
                {parentShare
                  ? (lang==="ko" ? "탭하면 전송 내용을 확인 후 공유할 수 있어요" : "Tap to preview & share")
                  : (lang==="ko" ? "설정에서 공유를 켜면 활성화돼요" : "Enable sharing in Settings first")}
              </p>
            </div>
            <button
              onClick={()=> parentShare ? setShowSharePopup(true) : setScreen("settings")}
              style={{ padding:"9px 16px", borderRadius:10, border:"none", fontSize:12, fontWeight:700, cursor:"pointer", background:parentShare?C.green:C.border, color:parentShare?"#fff":C.textMuted, flexShrink:0 }}>
              {parentShare ? (lang==="ko" ? "📤 공유" : "📤 Share") : (lang==="ko" ? "설정 →" : "Settings →")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SETTINGS ──────────────────────────────────────────────
  function SettingsScreen() {
    return (
      <div style={{ padding:"24px 20px", paddingBottom:110 }}>
        <PageHeader sub={T.settingsSub} title={T.settingsTitle}/>
        <p style={{ color:C.textMuted, fontSize:12, margin:"-12px 0 18px" }}>{T.settingsHint}</p>
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.textMuted, fontSize:11, margin:"0 0 16px", letterSpacing:1 }}>{T.secStudy}</p>
          {[
            {label:T.dailyGoal, value:lGoal, set:setLGoal, min:30, max:600, step:10},
            {label:T.studyPerSess, value:lStudy, set:setLStudy, min:10, max:120, step:5},
            {label:T.rewardPerSess, value:lReward, set:setLReward, min:5, max:60, step:5},
          ].map((item,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:i<2?16:0 }}>
              <span style={{ color:C.textSub, fontSize:13 }}>{item.label}</span>
              <StepCtrl value={item.value} onChange={item.set} min={item.min} max={item.max} step={item.step}/>
            </div>
          ))}
          <div style={{ background:C.accentSoft, borderRadius:10, padding:10, marginTop:16 }}>
            <p style={{ color:C.accent, fontSize:12, margin:0 }}>{T.rulePreview(lStudy,lReward)}</p>
          </div>
        </div>
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.textMuted, fontSize:11, margin:"0 0 16px", letterSpacing:1 }}>{T.secCap}</p>
          {allCats.map(cat=>(
            <div key={cat.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ background:cat.soft, width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{cat.emoji}</div>
              <span style={{ flex:1, color:C.textSub, fontSize:13 }}>{cat.label}</span>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <button onClick={()=>setLCaps(p=>({...p,[cat.id]:Math.max(10,p[cat.id]-10)}))} style={{ width:28, height:28, borderRadius:7, border:`1px solid ${C.border}`, background:C.bg, color:C.text, fontSize:16, cursor:"pointer" }}>−</button>
                <div style={{ background:cat.soft, borderRadius:8, padding:"4px 10px", minWidth:60, textAlign:"center" }}>
                  <span style={{ color:cat.color, fontWeight:700, fontSize:13 }}>{lCaps[cat.id]}</span>
                  <span style={{ color:C.textMuted, fontSize:10 }}>{T.unit}</span>
                </div>
                <button onClick={()=>setLCaps(p=>({...p,[cat.id]:Math.min(600,p[cat.id]+10)}))} style={{ width:28, height:28, borderRadius:7, border:`1px solid ${C.border}`, background:C.bg, color:C.text, fontSize:16, cursor:"pointer" }}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:C.card, borderRadius:20, padding:20, marginBottom:14, border:`1px solid ${parentShare?C.green+"55":C.border}`, transition:"border 0.3s" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ color:C.text, fontWeight:600, margin:0, fontSize:14 }}>{T.parentTitle}</p>
              <p style={{ color:C.textMuted, fontSize:11, margin:"4px 0 0" }}>{T.parentSub}</p>
              <p style={{ color:parentShare?C.green:C.textMuted, fontSize:10, margin:"6px 0 0", fontWeight:600 }}>
                {parentShare
                  ? (lang==="ko" ? "✅ ON — 리포트에서 전송할 수 있어요" : "✅ ON — You can send from Report")
                  : (lang==="ko" ? "⭕ OFF — 리포트 공유 버튼이 비활성화돼요" : "⭕ OFF — Report share button is disabled")}
              </p>
            </div>
            <div onClick={()=>setParentShare(!parentShare)} style={{ width:52, height:28, borderRadius:14, background:parentShare?C.green:C.border, cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:4, left:parentShare?26:4, width:20, height:20, borderRadius:10, background:"#fff", transition:"left 0.2s" }}/>
            </div>
          </div>
        </div>

        {/* ── 화면 테마 ── */}
        <div style={{ background:C.card, borderRadius:16, padding:"16px 18px", marginBottom:14, border:`1px solid ${C.border}` }}>
          <p style={{ color:C.textSub, fontWeight:600, fontSize:14, margin:"0 0 12px" }}>{T.themeLabel}</p>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setTheme("dark")} style={{ flex:1, padding:"12px 0", borderRadius:12, border:`1.5px solid ${theme==="dark"?C.accent:C.border}`, background:theme==="dark"?C.accentSoft:C.bg, color:theme==="dark"?C.accent:C.textMuted, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              {T.themeDark}
            </button>
            <button onClick={()=>setTheme("light")} style={{ flex:1, padding:"12px 0", borderRadius:12, border:`1.5px solid ${theme==="light"?C.accent:C.border}`, background:theme==="light"?C.accentSoft:C.bg, color:theme==="light"?C.accent:C.textMuted, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              {T.themeLight}
            </button>
          </div>
        </div>

        <button onClick={()=>{ setGoalMin(lGoal); setStudyPerSess(lStudy); setRewardPerSess(lReward); setCaps(lCaps); notify(T.saved); }} style={{ width:"100%", padding:16, borderRadius:16, border:"none", background:`linear-gradient(135deg,${C.accent},#2563EB)`, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", marginBottom:14 }}>{T.saveBtn}</button>

        {/* ── 튜토리얼 버튼 ── */}
        <button onClick={()=>setShowTutorial(true)} style={{ width:"100%", padding:14, borderRadius:16, border:`1.5px solid ${C.accent}`, background:C.accentSoft, color:C.accent, fontSize:14, fontWeight:700, cursor:"pointer", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          📖 {lang==="ko" ? "앱 사용법 보기" : "How to Use"}
        </button>

        {/* ── 데이터 초기화 버튼 ── */}
        <button onClick={()=>setShowResetConfirm(true)} style={{ width:"100%", padding:13, borderRadius:16, border:`1px solid ${C.red}55`, background:"transparent", color:C.red, fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:14 }}>
          {T.resetBtn}
        </button>
        <div style={{ borderRadius:20, overflow:"hidden", marginBottom:14, border:`1px solid ${C.accent}55` }}>
          <div style={{ background:gradHero, padding:"26px 22px 20px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, transparent 0%, ${shimmerTint} 50%, transparent 100%)`, animation:"shimmer 4s ease-in-out infinite" }}/>
            <canvas id="phiHG" width="46" height="68" style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", opacity:0.85 }}/>
            <p style={{ color:C.accent, fontSize:10, fontWeight:700, letterSpacing:3, textTransform:"uppercase", margin:"0 0 14px", position:"relative" }}>{T.phiTitle}</p>
            <p style={{ color:C.text, fontSize:13.5, fontWeight:700, margin:0, lineHeight:1.65, fontFamily:"Georgia,serif", position:"relative", paddingRight:54 }}>{T.phi}</p>
          </div>
          {/* 핵심 3줄 */}
          <div key="phi-lines-stable" style={{ background:C.card, padding:"16px 20px" }}>
            {T.phiLines.map((line, i) => {
              const icons = ["💎","⚖️","🔑"];
              const bgs = [C.accentSoft, C.greenSoft, C.purpleSoft];
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom: i<2 ? 12 : 0 }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:bgs[i], display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:16 }}>
                    {icons[i]}
                  </div>
                  <p style={{ color:C.textSub, fontSize:12, margin:0, fontWeight:600, lineHeight:1.4 }}>{line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── RENDER ────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Pretendard',-apple-system,sans-serif", background:C.bg, color:C.text, minHeight:"100vh", maxWidth:390, margin:"0 auto", position:"relative", overflowX:"hidden" }}>
      {/* 전역 애니메이션 */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes goldShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      <HourglassRenderer/>
      {/* ── 튜토리얼 팝업 ── */}
      {showTutorial && <TutorialSlider T={T} lang={lang} onClose={()=>setShowTutorial(false)}/>}
      {/* ── 데이터 초기화 확인 모달 ── */}
      {/* ── 완료 축하 팝업 ── */}
      {donePopup && (
        <div style={{ position:"fixed", inset:0, zIndex:550, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
          onClick={()=>setDonePopup(null)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)" }}/>
          <div style={{ position:"relative", width:"100%", maxWidth:330, background:C.card, borderRadius:24, padding:"28px 24px 24px", boxShadow:"0 20px 60px rgba(0,0,0,0.4)", textAlign:"center", animation:"fadeSlideIn 0.3s ease" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:52, marginBottom:8, lineHeight:1 }}>{donePopup.type==="study" ? "🎉" : "⏰"}</div>
            <p style={{ color:C.text, fontSize:18, fontWeight:800, margin:"0 0 12px" }}>
              {donePopup.type==="study" ? T.studyDonePopupTitle : T.rewardDonePopupTitle}
            </p>
            <p style={{ color:C.textSub, fontSize:14, margin:"0 0 22px", lineHeight:1.65, whiteSpace:"pre-line" }}>
              {donePopup.type==="study"
                ? T.studyDonePopupBody(donePopup.mins, donePopup.emoji, donePopup.label, donePopup.reward)
                : T.rewardDonePopupBody(donePopup.emoji, donePopup.label, donePopup.mins)}
            </p>
            <button onClick={()=>setDonePopup(null)} style={{ width:"100%", padding:15, borderRadius:14, border:"none", background:donePopup.type==="study" ? C.green : C.accent, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" }}>
              {T.popupConfirm}
            </button>
          </div>
        </div>
      )}
      {showResetConfirm && (
        <div style={{ position:"fixed", inset:0, zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
          onClick={()=>setShowResetConfirm(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)" }}/>
          <div style={{ position:"relative", width:"100%", maxWidth:320, background:C.card, borderRadius:20, padding:"24px 22px", boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:36, textAlign:"center", marginBottom:12 }}>🗑</div>
            <p style={{ color:C.text, fontSize:15, fontWeight:700, textAlign:"center", margin:"0 0 8px" }}>
              {lang==="ko" ? "모든 데이터 초기화" : "Reset All Data"}
            </p>
            <p style={{ color:C.textSub, fontSize:13, textAlign:"center", margin:"0 0 20px", lineHeight:1.6 }}>
              {T.resetConfirm}
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setShowResetConfirm(false)} style={{ flex:1, padding:13, borderRadius:12, border:`1px solid ${C.border}`, background:C.bg, color:C.textSub, fontSize:14, fontWeight:600, cursor:"pointer" }}>
                {lang==="ko" ? "취소" : "Cancel"}
              </button>
              <button onClick={doReset} style={{ flex:1, padding:13, borderRadius:12, border:"none", background:C.red, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                {lang==="ko" ? "초기화" : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── 공유 팝업 — 앱 최상위 (깜빡임 없음) ── */}
      {showSharePopup && (
        <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
          onClick={()=>setShowSharePopup(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.65)" }}/>
          <div style={{ position:"relative", width:"100%", maxWidth:390, background:C.surface, borderRadius:"24px 24px 0 0", paddingBottom:32 }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 0" }}>
              <div style={{ width:36, height:4, borderRadius:2, background:C.border }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px 10px" }}>
              <p style={{ color:C.text, fontWeight:700, fontSize:15, margin:0 }}>
                {lang==="ko" ? "📋 전송 내용 확인" : "📋 Preview Message"}
              </p>
              <button onClick={()=>setShowSharePopup(false)} style={{ background:"none", border:"none", color:C.textMuted, fontSize:22, cursor:"pointer", lineHeight:1, padding:0 }}>✕</button>
            </div>
            <div style={{ background:"#071210", margin:"0 16px 16px", borderRadius:14, padding:"14px 16px", border:`1px solid ${C.green}33` }}>
              <pre style={{ color:C.textSub, fontSize:12, margin:0, lineHeight:1.8, fontFamily:"monospace", whiteSpace:"pre-wrap" }}>{shareText}</pre>
            </div>
            <div style={{ display:"flex", gap:10, padding:"0 16px" }}>
              <button onClick={()=>setShowSharePopup(false)} style={{ flex:1, padding:14, borderRadius:14, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                {lang==="ko" ? "취소" : "Cancel"}
              </button>
              <button onClick={doShare} style={{ flex:2, padding:14, borderRadius:14, border:"none", background:C.green, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                {lang==="ko" ? "📤 카카오톡·문자로 공유" : "📤 Share via KakaoTalk · SMS"}
              </button>
            </div>
          </div>
        </div>
      )}
      {totalWallet>0 && (
        <div style={{ background:C.surface, padding:"10px 20px", display:"flex", justifyContent:"flex-end", alignItems:"center", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:50 }}>
          <span style={{ background:C.greenSoft, color:C.green, fontSize:11, padding:"3px 10px", borderRadius:20, fontWeight:600 }}>💰 {totalWallet}{T.unit}</span>
        </div>
      )}
      {notif && (
        <div style={{ position:"fixed", top:60, left:"50%", transform:"translateX(-50%)", background:C.card, border:`1px solid ${C.green}`, borderRadius:12, padding:"12px 20px", zIndex:200, color:C.text, fontSize:13, fontWeight:600, maxWidth:340, boxShadow:`0 4px 24px ${C.green}33` }}>{notif}</div>
      )}
      <div style={{ minHeight:"calc(100vh - 50px - 70px)", overflowY:"auto" }}>
        {showSurvey ? <SurveyScreen/> : (
          <>
            {screen==="home"     && <HomeScreen/>}
            {screen==="timer"    && <TimerScreen/>}
            {screen==="wallet"   && <WalletScreen/>}
            {screen==="report"   && <ReportScreen/>}
            {screen==="settings" && <SettingsScreen/>}
          </>
        )}
      </div>
      <NavBar/>
    </div>
  );
}
