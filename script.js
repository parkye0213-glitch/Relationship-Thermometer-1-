const inputText = document.getElementById("inputText");
const analyzeBtn = document.getElementById("analyzeBtn");

const emptyState = document.getElementById("emptyState");
const resultBox = document.getElementById("result");

const thermoFill = document.getElementById("thermoFill");
const tempValue = document.getElementById("tempValue");
const tempLabel = document.getElementById("tempLabel");
const summaryText = document.getElementById("summaryText");
const reasonText = document.getElementById("reasonText");
const adviceText = document.getElementById("adviceText");

function analyzeRelationship(text) {
  const clean = text.trim();
  if (!clean) return null;

  let score = 50;
  let pos = 0;
  let neg = 0;

  const positiveKeywords = [
    "고마워",
    "고맙",
    "사랑",
    "좋아",
    "재밌",
    "행복",
    "보고 싶",
    "보고싶",
    "응원",
    "배려",
    "위로",
  ];

  const negativeKeywords = [
    "짜증",
    "화나",
    "싫어",
    "힘들",
    "피곤",
    "귀찮",
    "싸웠",
    "무시",
    "답이 없",
    "읽씹",
    "손절",
    "냉랭",
    "거리감",
  ];

  positiveKeywords.forEach((kw) => {
    if (clean.includes(kw)) {
      pos += 1;
      score += 6;
    }
  });

  negativeKeywords.forEach((kw) => {
    if (clean.includes(kw)) {
      neg += 1;
      score -= 7;
    }
  });

  if (clean.includes("연락") || clean.includes("카톡")) {
    if (clean.includes("줄었") || clean.includes("안 오") || clean.includes("안와")) {
      score -= 8;
      neg += 1;
    }
    if (clean.includes("자주") || clean.includes("매일") || clean.includes("항상")) {
      score += 5;
      pos += 1;
    }
  }

  if (clean.length < 40) {
    score -= 5;
  } else if (clean.length > 200) {
    score += 3;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let reason = "";
  if (pos === 0 && neg === 0) {
    reason =
      "입력된 문장 안에서 뚜렷한 긍정·부정 표현이 많이 보이지 않아, 비교적 중립적인 관계로 판단했어요. 추가 정보에 따라 온도는 달라질 수 있습니다.";
  } else if (pos > neg) {
    reason =
      "긍정적인 말과 행동에 대한 언급이 더 많이 나타나기 때문에, 전반적으로 안정적이고 따뜻한 관계로 볼 수 있어요.";
  } else if (pos < neg) {
    reason =
      "부정적인 감정, 피로감, 서운함과 관련된 표현이 더 자주 등장하고 있습니다. 서로의 기대가 어긋나 있거나, 대화 방식 때문에 상처가 쌓였을 수 있어요.";
  } else {
    reason =
      "좋은 기억과 서운함이 동시에 존재하는 관계로 보입니다. 서로에게 의미 있는 사이지만, 작은 오해들이 쌓이면 분위기가 쉽게 바뀔 수 있는 단계예요.";
  }

  let summary = "";
  if (score >= 80) {
    summary = "서로에 대한 신뢰와 애정이 탄탄한, 따뜻한 관계입니다.";
    reason +=
      " 온도만 보았을 때는 서로를 신뢰하면서도 솔직하게 표현하는 건강한 관계에 가깝습니다.";
  } else if (score >= 60) {
    summary = "기본적으로는 좋지만, 미묘한 거리감이 섞여 있는 관계입니다.";
    reason +=
      " 다만 표현 방식이나 연락 패턴 차이로 인해 가끔 오해가 생길 수 있어, 작은 확인과 대화가 중요해지는 시기예요.";
  } else if (score >= 40) {
    summary = "서로에게 아직 의미는 있지만, 불편함과 서운함이 섞여 있는 단계입니다.";
    reason +=
      " 관계를 유지하고 싶다면 지금이 솔직한 대화와 경계 설정을 통해 방향을 다시 잡을 수 있는 기회가 될 수 있습니다.";
  } else {
    summary = "오해와 감정이 꽤 누적된, 차가운 상태에 가까운 관계입니다.";
    reason +=
      " 그대로 두면 점점 대화 시도조차 어려워질 수 있어, 감정을 정리한 뒤 천천히 다시 연결을 시도해 보는 편이 좋습니다.";
  }

  let advice = "";
  if (score <= 30) {
    advice =
      "먼저 상대를 비난하기보다, 내가 어떤 순간에 상처받았는지 구체적인 상황을 중심으로 설명해보세요. 직접 만나기가 부담스럽다면, 감정이 정리된 뒤에 메시지로 솔직하게 적어 보내는 것도 방법입니다. 만약 계속해서 일방적으로 소모된다고 느낀다면, 관계를 유지할지 스스로에게도 질문해보는 것이 필요해요.";
  } else if (score <= 70) {
    advice =
      "연락 빈도나 표현 방식에 대해 서로 기대하는 수준이 다를 수 있어요. 상대가 편해하는 스타일을 관찰하면서, '나는 이런 방식이 좋더라'라고 부드럽게 제안해보세요. 작은 안부 인사, 고마웠던 순간을 짧게 언급하는 것만으로도 관계 온도를 서서히 올릴 수 있습니다.";
  } else {
    advice =
      "지금처럼 서로에게 관심을 표현하고, 힘들 때 기댈 수 있는 분위기를 유지하는 것이 중요해요. 가끔은 특별한 날이 아니더라도 고마웠던 순간을 떠올리며 말해주거나, 상대가 좋아하는 것을 기억해주는 행동이 관계를 더 단단하게 만들어 줍니다.";
  }

  return { score, reason, advice, summary };
}

function updateThermo(score) {
  thermoFill.classList.remove("low", "mid", "high");

  if (score <= 40) {
    thermoFill.classList.add("low");
    tempLabel.textContent = "관계 온도가 꽤 낮은 상태예요";
  } else if (score <= 70) {
    thermoFill.classList.add("mid");
    tempLabel.textContent = "괜찮지만 더 따뜻해질 수 있는 관계예요";
  } else {
    thermoFill.classList.add("high");
    tempLabel.textContent = "매우 따뜻하고 안정적인 관계예요";
  }

  thermoFill.style.height = score + "%";
  tempValue.textContent = score;
}

analyzeBtn.addEventListener("click", () => {
  const text = inputText.value;
  const result = analyzeRelationship(text);

  if (!result) {
    alert("먼저 관계 상황을 입력해 주세요!");
    return;
  }

  emptyState.style.display = "none";
  resultBox.classList.remove("hidden");

  updateThermo(result.score);
  summaryText.textContent = result.summary;
  reasonText.textContent = result.reason;
  adviceText.textContent = result.advice;
});
