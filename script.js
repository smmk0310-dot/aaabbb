'use strict';

// 각 지표(E/I, S/N, T/F, J/P)를 4문항씩 비교하는 오락용 성향 테스트입니다.
const QUESTIONS = [
  { emoji: '📱', text: '친구가 갑자기 “10분 뒤에 나와!”라고 한다.', options: [{ text: '오예! 누구랑 더 놀 수 있지?', trait: 'E' }, { text: '10분? 나 이불이랑 선약 있는데.', trait: 'I' }] },
  { emoji: '🧊', text: '냉장고에서 정체불명의 반찬을 발견했다.', options: [{ text: '일단 유통기한과 재료를 확인한다.', trait: 'S' }, { text: '설마 외계인이 남긴 알인가?', trait: 'N' }] },
  { emoji: '💇', text: '친구가 머리를 망쳤다며 울고 있다.', options: [{ text: '사진 보여줘. 고칠 방법 찾아보자.', trait: 'T' }, { text: '누가 우리 애 머리를 이렇게 만들었어!', trait: 'F' }] },
  { emoji: '🧳', text: '내일 당장 여행을 떠나게 됐다!', options: [{ text: '동선, 날씨, 짐 목록부터 완성한다.', trait: 'J' }, { text: '일단 출발! 가서 생각하지 뭐.', trait: 'P' }] },
  { emoji: '🎉', text: '낯선 사람들이 가득한 파티에 갔다.', options: [{ text: '새 친구 5명 만들고 돌아온다.', trait: 'E' }, { text: '간식 챙겨 조용한 구석을 찾는다.', trait: 'I' }] },
  { emoji: '👽', text: '외계인이 지구에 대해 물어본다면?', options: [{ text: '실제 사진과 지도부터 보여준다.', trait: 'S' }, { text: '외계인도 월요일이 싫은지 묻는다.', trait: 'N' }] },
  { emoji: '🍰', text: '친구가 네 케이크를 몰래 먹어버렸다.', options: [{ text: '누가 먹었는지 확인하고 배상 협상!', trait: 'T' }, { text: '어떤 기분이었길래 그랬을까…?', trait: 'F' }] },
  { emoji: '📋', text: '몬스터 소풍을 준비하게 됐다.', options: [{ text: '시간표에 간식 분배표까지 작성!', trait: 'J' }, { text: '돗자리만 챙겨서 모험 시작!', trait: 'P' }] },
  { emoji: '🎤', text: '갑자기 노래방 마이크가 내 손에!', options: [{ text: '첫 소절부터 콘서트 오픈!', trait: 'E' }, { text: '조용히 듀엣 상대를 찾는다.', trait: 'I' }] },
  { emoji: '🗺️', text: '보물지도의 반쪽을 발견했다.', options: [{ text: '남은 표시와 지형을 자세히 살핀다.', trait: 'S' }, { text: '숨겨진 고대 왕국의 비밀을 상상한다.', trait: 'N' }] },
  { emoji: '🤖', text: '친구가 만든 로봇이 자꾸 넘어진다.', options: [{ text: '바퀴와 센서부터 점검한다.', trait: 'T' }, { text: '속상해하지 말라고 먼저 응원한다.', trait: 'F' }] },
  { emoji: '🍕', text: '친구들과 피자 파티를 연다면?', options: [{ text: '인원, 메뉴, 주문 시간을 딱 정한다.', trait: 'J' }, { text: '그때 먹고 싶은 걸 시키면 되지!', trait: 'P' }] },
  { emoji: '🚀', text: '우주선에 혼자 또는 다 같이 탈 수 있다.', options: [{ text: '대원들과 수다 떨며 출발!', trait: 'E' }, { text: '나만의 조용한 조종석이 좋아.', trait: 'I' }] },
  { emoji: '🔮', text: '마법 구슬이 딱 하나 생겼다.', options: [{ text: '사용법, 한계, 부작용부터 알아본다.', trait: 'S' }, { text: '이걸로 새로운 세상을 만들 수 있겠어!', trait: 'N' }] },
  { emoji: '🧦', text: '친구가 양말을 짝짝이로 신고 왔다.', options: [{ text: '한 짝이 다른 거 알려줄게.', trait: 'T' }, { text: '오늘의 스타일인가 봐! 귀여운데?', trait: 'F' }] },
  { emoji: '🌈', text: '내일 하루 자유시간이 생겼다.', options: [{ text: '하고 싶은 일 3개를 미리 정한다.', trait: 'J' }, { text: '눈 뜨고 끌리는 대로 움직인다.', trait: 'P' }] }
];

const RESULTS = {
  INFP: { emoji: '😴', name: '이불 봉인 몬스터', description: '상상력은 우주급, 외출력은 0%! 혼자만의 세계에서 매일 모험을 떠나는 몬스터.', note: '특수 능력: 이불 속에서 세계관 100개 만들기' },
  ENFP: { emoji: '🥳', name: '파티 폭주 몬스터', description: '흥이 멈추질 않아! 새로운 친구와 신나는 아이디어를 만나면 에너지가 폭발해.', note: '특수 능력: 조용한 방도 축제 현장으로 바꾸기' },
  ISTJ: { emoji: '🧐', name: '계획 집착 몬스터', description: '계획 변경은 몬스터급 재난! 체크리스트를 완성할 때 가장 마음이 편안해.', note: '특수 능력: 1분 만에 일정표 세우기' },
  ENTJ: { emoji: '👑', name: '대장 본능 몬스터', description: '모임에서도 자연스럽게 CEO 모드! 목표가 생기면 모두를 이끌고 돌진해.', note: '특수 능력: 간식 모임도 프로젝트로 만들기' },
  INTP: { emoji: '🧪', name: '뇌 과열 몬스터', description: '질문 하나에 생각이 999개! 엉뚱한 호기심으로 세상의 비밀을 파헤쳐.', note: '특수 능력: 아무도 안 물어본 문제까지 해결하기' },
  ESFJ: { emoji: '🥹', name: '감동 폭발 몬스터', description: '남의 생일에도 본인이 울컥! 주변 사람을 챙기고 함께 웃을 때 행복해.', note: '특수 능력: 친구의 간식 취향까지 기억하기' },
  INFJ: { emoji: '🔮', name: '예언 과몰입 몬스터', description: '머릿속에서 인생 드라마 12부작 제작! 사람과 세상 속 숨은 의미를 찾아.', note: '특수 능력: 한마디에 숨은 열 가지 마음 읽기' },
  INTJ: { emoji: '♟️', name: '비밀 설계 몬스터', description: '이미 머릿속엔 마스터플랜 완성! 조용히 큰 그림을 그리는 전략가.', note: '특수 능력: 세상 정복 계획을 표로 정리하기' },
  ENFJ: { emoji: '🦸', name: '오지랖 히어로 몬스터', description: '누가 어려워하면 출동! 사람들의 가능성을 발견하고 응원하는 리더.', note: '특수 능력: 남의 고민 듣다 하루가 사라지기' },
  ENTP: { emoji: '🎤', name: '말싸움 천재 몬스터', description: '토론 엔진 풀가동! 기발한 반론과 장난스러운 아이디어가 샘솟아.', note: '특수 능력: 사소한 질문도 대토론으로 만들기' },
  ISFP: { emoji: '🎨', name: '감성 젤리 몬스터', description: '기분 따라 색깔 변신! 내 취향과 감각을 자유롭게 표현하는 예술가.', note: '특수 능력: 평범한 하루를 감성 작품으로 바꾸기' },
  ISTP: { emoji: '🔧', name: '무심한 해결사 몬스터', description: '말보다 수리! 복잡한 상황에서도 침착하게 직접 해결책을 찾아.', note: '특수 능력: 고장 난 물건 앞에서 조용히 각성하기' },
  ISFJ: { emoji: '☂️', name: '걱정 보따리 몬스터', description: '친구 우산까지 챙기는 챙김 장인! 작은 배려로 사람들을 따뜻하게 해.', note: '특수 능력: 가방에서 필요한 물건 무한 소환하기' },
  ESTP: { emoji: '🛹', name: '일단 돌진 몬스터', description: '생각보다 행동이 먼저! 새로운 도전 앞에서 눈이 반짝이는 모험가.', note: '특수 능력: 3초 만에 흥미로운 일에 뛰어들기' },
  ESFP: { emoji: '💖', name: '관심 폭식 몬스터', description: '주목받아야 에너지 충전! 주변을 웃게 만드는 타고난 분위기 메이커.', note: '특수 능력: 아무데서나 즉석 무대 만들기' },
  ESTJ: { emoji: '📣', name: '규칙 수호 몬스터', description: '질서가 최고! 맡은 일은 확실하게 처리하는 든든한 정리 대장.', note: '특수 능력: 혼란스러운 모임을 5분 안에 정리하기' }
};

// 도감의 왼쪽부터 오른쪽, 위에서 아래 순서입니다.
const ART_ORDER = ['INFP','ENFP','ISTJ','ENTJ','INTP','ESFJ','INFJ','INTJ','ENFJ','ENTP','ISFP','ISTP','ISFJ','ESTP','ESFP','ESTJ'];

const $ = (id) => document.getElementById(id);
const screens = ['start-screen','quiz-screen','result-screen'];
let current = 0;
let selections = Array(QUESTIONS.length).fill(null);

function showScreen(id) {
  for (const screen of screens) {
    const el = $(screen);
    el.hidden = screen !== id;
    el.classList.toggle('active', screen === id);
  }
  window.scrollTo(0,0);
}

function renderQuestion() {
  const question = QUESTIONS[current];
  $('question-counter').textContent = `${String(current + 1).padStart(2,'0')} / ${QUESTIONS.length}`;
  const completed = selections.filter(Boolean).length;
  $('progress-fill').style.width = `${completed / QUESTIONS.length * 100}%`;
  $('progressbar').setAttribute('aria-valuenow', String(completed));
  $('question-emoji').textContent = question.emoji;
  $('question-kicker').textContent = `상황 ${String(current + 1).padStart(2,'0')}`;
  $('question-title').textContent = question.text;
  $('back-btn').disabled = current === 0;
  const container = $('answers');
  container.replaceChildren();
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';
    const label = document.createElement('span');
    label.className = 'answer-label';
    label.textContent = index === 0 ? 'A' : 'B';
    const description = document.createElement('span');
    description.textContent = option.text;
    button.append(label,description);
    button.addEventListener('click', () => {
      selections[current] = option.trait;
      if (current === QUESTIONS.length - 1) renderResult();
      else {current++;renderQuestion();}
    });
    container.append(button);
  });
}

function calculateType() {
  const scores = Object.fromEntries('EISNTFJP'.split('').map(letter => [letter,0]));
  for (const trait of selections) if (trait) scores[trait]++;
  // 4문항씩 묻기 때문에 2:2가 가능하며, 이때 해당 지표의 마지막 선택을 반영합니다.
  return [['E','I'],['S','N'],['T','F'],['J','P']]
    .map(([a,b]) => scores[a] === scores[b]
      ? [...selections].reverse().find(trait => trait === a || trait === b)
      : scores[a] > scores[b] ? a : b).join('');
}

function renderResult() {
  const type = calculateType();
  const result = RESULTS[type];
  $('result-emoji').textContent = result.emoji;
  $('result-name').textContent = result.name;
  $('result-type').textContent = type;
  $('result-description').textContent = result.description;
  $('result-note').textContent = result.note;
  const artIndex = ART_ORDER.indexOf(type);
  $('result-art').style.setProperty('--col', String(artIndex % 4));
  $('result-art').style.setProperty('--row', String(Math.floor(artIndex / 4)));
  $('share-message').textContent = '';
  $('progress-fill').style.width = '100%';
  $('progressbar').setAttribute('aria-valuenow',String(QUESTIONS.length));
  showScreen('result-screen');
}

function reset() {
  current = 0;
  selections = Array(QUESTIONS.length).fill(null);
  showScreen('start-screen');
}

async function shareResult() {
  const type = $('result-type').textContent;
  const result = RESULTS[type];
  const title = `몬BTI 결과: ${result.name} (${type})`;
  const text = `👾 내 몬BTI는 ${result.name} (${type})!\n${result.description}\n너의 숨겨진 몬스터도 찾아봐!`;
  const url = window.location.protocol === 'file:' ? '' : new URL(window.location.pathname, window.location.origin).href;
  const shareData = {title,text,...(url ? {url} : {})};
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      $('share-message').textContent = '공유 화면을 열었어요!';
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url ? `${text}\n${url}` : text);
      $('share-message').textContent = '결과가 복사되었어요! 친구에게 붙여넣어 보세요.';
      return;
    }
    // 로컬 file:// 환경이나 클립보드 권한이 없는 브라우저의 대체 동작.
    const textarea = document.createElement('textarea');
    textarea.value = url ? `${text}\n${url}` : text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    $('share-message').textContent = copied ? '결과가 복사되었어요!' : '복사를 지원하지 않는 브라우저예요. 결과 화면을 캡처해 공유해 주세요.';
  } catch (error) {
    if (error && error.name === 'AbortError') return;
    $('share-message').textContent = '공유를 완료하지 못했어요. 결과 화면을 캡처해 공유해 주세요.';
  }
}

$('start-btn').addEventListener('click', () => {current = 0;selections.fill(null);renderQuestion();showScreen('quiz-screen');});
$('back-btn').addEventListener('click', () => {if(current>0){current--;renderQuestion();}});
$('restart-btn').addEventListener('click',reset);
$('share-btn').addEventListener('click',shareResult);
showScreen('start-screen');
