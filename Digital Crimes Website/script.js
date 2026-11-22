// Educational demo only - fake SEDD (Sharjah Economic Development) site
// This form does NOT submit anywhere real

// ----- Game: find fake-website signs, double-tap to score, 90s timer -----
(function () {
  var scoreEl = document.getElementById('game-score');
  var timerEl = document.getElementById('game-timer');
  if (!scoreEl) return;

  var score = 0;
  var foundTargets = {};
  var gameOver = false;
  var gameStarted = false;
  var DURATION_KEY = 'sedd-game-duration';
  var WINNING_SCORE_KEY = 'sedd-game-winning-score';
  var gameDurationSeconds = (function () {
    var saved = localStorage.getItem(DURATION_KEY);
    if (saved != null) {
      var n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 30 && n <= 300) return n;
    }
    return 90;
  })();
  var winningScore = (function () {
    var saved = localStorage.getItem(WINNING_SCORE_KEY);
    if (saved != null) {
      var n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 500 && n <= 1000) return n;
    }
    return 700;
  })();
  var secondsLeft = gameDurationSeconds;
  var timerInterval = null;
  var startBtn = document.getElementById('game-start-btn');

  function updateScore() {
    scoreEl.textContent = score;
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateTimer() {
    if (timerEl) {
      timerEl.textContent = formatTime(secondsLeft);
      timerEl.classList.remove('game-timer--green', 'game-timer--yellow', 'game-timer--red');
      if (secondsLeft > 30) {
        timerEl.classList.add('game-timer--green');
      } else if (secondsLeft >= 11) {
        timerEl.classList.add('game-timer--yellow');
      } else {
        timerEl.classList.add('game-timer--red');
      }
    }
  }

  function startTimer() {
    updateTimer();
    timerInterval = setInterval(function () {
      secondsLeft--;
      updateTimer();
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        gameOver = true;
        if (timerEl) timerEl.textContent = '0:00';
        showGameOverModal(score);
      }
    }, 1000);
  }

  function showScorePopup(el, points) {
    var popup = document.createElement('span');
    popup.className = 'score-popup score-popup--on-target';
    popup.textContent = '+' + points;
    /* Host on target so popup inherits portrait-play rotation */
    if (el && el.nodeType === 1) {
      var pos = window.getComputedStyle(el).position;
      if (!pos || pos === 'static') el.classList.add('score-popup-host');
      el.appendChild(popup);
    } else {
      var stage = document.getElementById('page-stage');
      (stage || document.body).appendChild(popup);
    }
    setTimeout(function () {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
    }, 1000);
  }

  function onTargetFound(el, points, popupAtEl) {
    if (gameOver || !gameStarted) return;
    var id = el.id || ('target-' + (el.className || '').replace(/\s/g, '-'));
    if (foundTargets[id]) return;
    foundTargets[id] = true;
    score += points;
    updateScore();
    var displayEl = popupAtEl || el;
    if (displayEl.classList && displayEl.classList.add) displayEl.classList.add('game-target-found');
    showScorePopup(displayEl, points);
    setTimeout(function () {
      if (displayEl.classList && displayEl.classList.remove) displayEl.classList.remove('game-target-found');
    }, 600);
    if (score >= winningScore) {
      gameOver = true;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      showGameOverModal(score);
    }
  }

  function attachToTarget(el) {
    if (!el || !el.classList.contains('game-target')) return;
    var points = parseInt(el.getAttribute('data-points'), 10) || 100;
    var lastTap = 0;

    el.addEventListener('dblclick', function (e) {
      e.preventDefault();
      e.stopPropagation();
      onTargetFound(el, points);
    });

    el.addEventListener('touchend', function (e) {
      var now = Date.now();
      if (now - lastTap < 400) {
        e.preventDefault();
        onTargetFound(el, points);
        lastTap = 0;
      } else {
        lastTap = now;
      }
    }, { passive: false });
  }

  function showGameOverModal(finalScore) {
    var modal = document.getElementById('game-over-modal');
    var titleEl = document.getElementById('game-over-title');
    var messageEl = document.getElementById('game-over-message');
    var scoreEl = document.getElementById('game-over-score');
    var btnEl = document.getElementById('game-over-btn');
    if (!modal || !messageEl || !btnEl) return;

    scoreEl.textContent = 'النتيجة: ' + finalScore;

    if (finalScore >= winningScore) {
      titleEl.textContent = 'تهانينا!';
      messageEl.textContent = 'أنت فائز! لقد فزت بجائزة!';
      btnEl.textContent = 'إغلاق';
      btnEl.onclick = function () {
        window.location.reload();
      };
    } else {
      titleEl.textContent = 'انتهى الوقت';
      messageEl.textContent = 'لقد خسرت. احصل على أكثر من ' + winningScore + ' نقطة للفوز بجائزة.';
      btnEl.textContent = 'حاول مرة أخرى';
      btnEl.onclick = function () {
        window.location.reload();
      };
    }

    modal.classList.add('game-over-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
  }

  function onStartClick() {
    if (gameStarted) return;
    gameStarted = true;
    window.scrollTo(0, 0);
    secondsLeft = gameDurationSeconds;
    if (startBtn) startBtn.style.display = 'none';
    var restartBtn = document.getElementById('game-restart-btn');
    if (restartBtn) restartBtn.style.display = '';
    if (timerEl) timerEl.classList.remove('game-timer--idle');
    startTimer();
  }

  // Difficulty modal: open from bookmark, set duration from option
  var difficultyModal = document.getElementById('difficulty-modal');
  var difficultyTrigger = document.querySelector('.js-difficulty-trigger');
  var difficultyCloseBtn = document.getElementById('difficulty-close');

  function openDifficultyModal() {
    if (!difficultyModal) return;
    var scoreDisplay = document.getElementById('difficulty-score-display');
    if (scoreDisplay) scoreDisplay.textContent = winningScore;
    var timeDisplay = document.getElementById('difficulty-time-display');
    if (timeDisplay) timeDisplay.textContent = gameDurationSeconds;
    difficultyModal.classList.add('modal-visible');
    difficultyModal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
  }

  function closeDifficultyModal() {
    if (!difficultyModal) return;
    difficultyModal.classList.remove('modal-visible');
    difficultyModal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('modal-open');
  }

  if (difficultyTrigger) {
    difficultyTrigger.addEventListener('click', function () {
      if (!gameStarted) openDifficultyModal();
    });
    difficultyTrigger.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !gameStarted) {
        e.preventDefault();
        openDifficultyModal();
      }
    });
  }
  var difficultyBtn = document.getElementById('difficulty-btn');
  if (difficultyBtn) {
    difficultyBtn.addEventListener('click', function () {
      openDifficultyModal();
    });
  }
  if (difficultyCloseBtn) difficultyCloseBtn.addEventListener('click', closeDifficultyModal);

  var timeMin = 30;
  var timeMax = 300;
  var difficultyTimeDisplay = document.getElementById('difficulty-time-display');
  var timeMinusBtn = document.querySelector('.js-difficulty-time-minus');
  var timePlusBtn = document.querySelector('.js-difficulty-time-plus');
  function updateTimeDisplay() {
    if (difficultyTimeDisplay) difficultyTimeDisplay.textContent = gameDurationSeconds;
  }
  if (timeMinusBtn) {
    timeMinusBtn.addEventListener('click', function () {
      if (gameDurationSeconds > timeMin) {
        gameDurationSeconds -= 30;
        secondsLeft = gameDurationSeconds;
        try { localStorage.setItem(DURATION_KEY, String(gameDurationSeconds)); } catch (e) {}
        updateTimeDisplay();
      }
    });
  }
  if (timePlusBtn) {
    timePlusBtn.addEventListener('click', function () {
      if (gameDurationSeconds < timeMax) {
        gameDurationSeconds += 30;
        secondsLeft = gameDurationSeconds;
        try { localStorage.setItem(DURATION_KEY, String(gameDurationSeconds)); } catch (e) {}
        updateTimeDisplay();
      }
    });
  }
  updateTimeDisplay();

  var difficultyScoreDisplay = document.getElementById('difficulty-score-display');
  var startScreenSubtitle = document.getElementById('start-screen-subtitle');
  var winMin = 500;
  var winMax = 1000;

  function updateStartScreenSubtitle() {
    if (startScreenSubtitle) {
      startScreenSubtitle.textContent = 'اكتشف علامات الموقع الوهمي لتحصل على نقاط. احصل على ' + winningScore + ' نقطة أو أكثر للفوز.';
    }
  }

  function updateWinningScoreDisplay() {
    if (difficultyScoreDisplay) difficultyScoreDisplay.textContent = winningScore;
    updateStartScreenSubtitle();
    try { localStorage.setItem(WINNING_SCORE_KEY, String(winningScore)); } catch (e) {}
  }

  var winMinusBtn = document.querySelector('.js-difficulty-win-minus');
  var winPlusBtn = document.querySelector('.js-difficulty-win-plus');
  if (winMinusBtn) {
    winMinusBtn.addEventListener('click', function () {
      if (winningScore > winMin) {
        winningScore -= 100;
        updateWinningScoreDisplay();
      }
    });
  }
  if (winPlusBtn) {
    winPlusBtn.addEventListener('click', function () {
      if (winningScore < winMax) {
        winningScore += 100;
        updateWinningScoreDisplay();
      }
    });
  }

  updateStartScreenSubtitle();
  if (difficultyScoreDisplay) difficultyScoreDisplay.textContent = winningScore;

  if (difficultyModal) {
    difficultyModal.addEventListener('click', function (e) {
      if (e.target === difficultyModal) closeDifficultyModal();
    });
  }

  document.querySelectorAll('.game-target').forEach(attachToTarget);

  // UAE Pass: single tap = red toast at top, double tap = game score (sign is the UAE Pass image)
  var uaepassToast = document.getElementById('uaepass-toast');
  var uaepassProxy = document.getElementById('game-target-uaepass');
  var uaepassTriggers = document.querySelectorAll('.js-uaepass-modal');
  var uaepassLastTap = 0;
  var uaepassPopupTimeout = null;

  function showUaePassToast() {
    if (!uaepassToast) return;
    uaepassToast.classList.add('visible');
    uaepassToast.setAttribute('aria-hidden', 'false');
    if (uaepassPopupTimeout) clearTimeout(uaepassPopupTimeout);
    uaepassPopupTimeout = setTimeout(function () {
      uaepassToast.classList.remove('visible');
      uaepassToast.setAttribute('aria-hidden', 'true');
    }, 4000);
  }

  function attachUaePassTrigger(trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var now = Date.now();
      if (now - uaepassLastTap < 400) {
        if (uaepassPopupTimeout) {
          clearTimeout(uaepassPopupTimeout);
          uaepassPopupTimeout = null;
        }
        uaepassLastTap = 0;
        if (uaepassProxy) onTargetFound(uaepassProxy, 100, trigger);
      } else {
        uaepassLastTap = now;
        uaepassPopupTimeout = setTimeout(showUaePassToast, 350);
      }
    });
    trigger.addEventListener('touchend', function (e) {
      e.preventDefault();
      var now = Date.now();
      if (now - uaepassLastTap < 400) {
        if (uaepassPopupTimeout) {
          clearTimeout(uaepassPopupTimeout);
          uaepassPopupTimeout = null;
        }
        uaepassLastTap = 0;
        if (uaepassProxy) onTargetFound(uaepassProxy, 100, trigger);
      } else {
        uaepassLastTap = now;
        uaepassPopupTimeout = setTimeout(showUaePassToast, 350);
      }
    }, { passive: false });
  }
  if (uaepassTriggers.length) uaepassTriggers.forEach(attachUaePassTrigger);

  if (startBtn) startBtn.addEventListener('click', onStartClick);

  var restartBtn = document.getElementById('game-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      window.location.reload();
    });
  }
})();

// ----- Guide slider (احذر من الاحتيال): show 2 cards, arrows move by 1 -----
(function () {
  var viewport = document.querySelector('.guide-slider-viewport');
  var track = document.querySelector('.guide-slider-track');
  var prevBtn = document.querySelector('.guide-slider-prev');
  var nextBtn = document.querySelector('.guide-slider-next');
  if (!viewport || !track || !prevBtn || !nextBtn) return;

  var cards = track.querySelectorAll('.guide-card');
  var gap = 24;
  var currentIndex = 0;

  function isNarrowLayout() {
    return window.matchMedia('(max-width: 768px)').matches
      || document.documentElement.classList.contains('portrait-play');
  }

  function getMaxIndex() {
    var w = viewport.offsetWidth;
    if (!w) return 0;
    return isNarrowLayout()
      ? Math.max(0, cards.length - 1)
      : Math.max(0, cards.length - 2);
  }

  function getStepWidth() {
    var w = viewport.offsetWidth;
    if (!w) return 0;
    if (isNarrowLayout()) return w;
    var cardWidth = (w - gap) / 2;
    return cardWidth + gap;
  }

  function updateTransform() {
    var maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    var step = getStepWidth();
    var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    var tx = isRtl ? currentIndex * step : -currentIndex * step;
    track.style.transform = 'translateX(' + tx + 'px)';
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function goNext() {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateTransform();
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateTransform();
    }
  }

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  window.addEventListener('resize', function () {
    updateTransform();
  });
  window.addEventListener('portraitplaychange', function () {
    updateTransform();
  });

  updateTransform();
})();

// ----- Form submit (phishing demo) -----
function handleSubmit(event) {
  event.preventDefault();
  // In a real phishing site, data would be sent to attacker's server.
  // For this demo we only show an alert.
  alert(
    '⚠️ هذا موقع وهمي للتوعية فقط.\n\n' +
    'في هجوم احتيال حقيقي، قد يتم إرسال بياناتك إلى مجرمين. ' +
    'لا تدخل أبداً رقم الرخصة أو الهوية أو كلمة المرور في موقع وصلت إليه عبر رابط بريد أو رسالة. ' +
    'اكتب دائماً الرابط الرسمي بنفسك: sedd.ae\n\n' +
    '---\n\n' +
    'This is a fake site for awareness only. In a real phishing attack, your data could be sent to criminals. ' +
    'Never enter license number, Emirates ID, or password on a site you reached via email or SMS link. ' +
    'Always type the official URL yourself: sedd.ae'
  );
  return false;
}

// UAE Pass error modal – no longer opened by UAE Pass (toast used instead); close button kept for any other use
(function () {
  var modal = document.getElementById('uaepass-error-modal');
  var closeBtn = document.getElementById('modal-close');
  if (!modal || !closeBtn) return;
  function closeModal() {
    modal.classList.remove('modal-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('modal-open');
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('modal-visible')) closeModal();
  });
})();

// ----- Start screen: hide overlay and start game when Start is clicked -----
(function () {
  var startScreen = document.getElementById('start-screen');
  var startScreenBtn = document.getElementById('start-screen-btn');
  var gameStartBtn = document.getElementById('game-start-btn');
  if (!startScreen || !startScreenBtn) return;

  document.body.classList.add('start-screen-open');

  startScreenBtn.addEventListener('click', function () {
    startScreen.classList.add('start-screen--hidden');
    startScreen.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('start-screen-open');
    if (gameStartBtn) gameStartBtn.click();
  });
})();

// ----- Portrait play on 16:9 landscape: rotate stage 90° so URL sits on the right -----
(function () {
  var PORTRAIT_KEY = 'sedd-portrait-play';
  var buttons = [
    document.getElementById('portrait-btn'),
    document.getElementById('portrait-btn-start')
  ].filter(Boolean);
  if (!buttons.length) return;

  var labelEnter = 'عمودي';
  var labelExit = 'أفقي';

  function isPortraitPlay() {
    return document.documentElement.classList.contains('portrait-play');
  }

  function updateButtons(on) {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.title = on
        ? 'العودة للعرض الأفقي'
        : 'تدوير الصفحة عمودياً (شريط العنوان على اليمين)';
      btn.setAttribute('aria-label', btn.title);
      var label = btn.querySelector('.portrait-btn-label');
      if (label) label.textContent = on ? labelExit : labelEnter;
    });
  }

  function setPortraitPlay(on) {
    document.documentElement.classList.toggle('portrait-play', on);
    updateButtons(on);
    try {
      localStorage.setItem(PORTRAIT_KEY, on ? '1' : '0');
    } catch (e) {}
    window.scrollTo(0, 0);
    var scroll = document.getElementById('page-scroll');
    if (scroll) scroll.scrollTop = 0;
    window.dispatchEvent(new Event('portraitplaychange'));
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setPortraitPlay(!isPortraitPlay());
    });
  });

  var saved = false;
  try {
    saved = localStorage.getItem(PORTRAIT_KEY) === '1';
  } catch (e) {}
  if (saved) setPortraitPlay(true);
  else updateButtons(false);
})();
