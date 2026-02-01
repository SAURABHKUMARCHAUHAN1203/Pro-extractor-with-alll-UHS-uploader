const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const card = document.getElementById('card');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');

// "No" button running away logic
const moveButton = () => {
    // Get viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Get card dimensions and position
    const cardRect = card.getBoundingClientRect();

    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Define a "safe area" around the card
    // We want it to be near the card, but not covering it completely if possible,
    // and definitely within viewport.

    // Calculate the safe bounds (viewport minus padding)
    const padding = 20;
    const minX = padding;
    const maxX = vw - btnWidth - padding;
    const minY = padding;
    const maxY = vh - btnHeight - padding;

    // Generate a random position relative to the CARD center
    // This keeps it "around the card"
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    // Random offset from center (e.g., +/- 150px to 250px range)
    // We use a minimum offset to avoid staying ON the card too much
    const maxOffset = 250;
    const minOffset = 100; // minimum distance from center

    // Random angle
    const angle = Math.random() * 2 * Math.PI;
    const distance = minOffset + Math.random() * (maxOffset - minOffset);

    let newLeft = cardCenterX + Math.cos(angle) * distance - (btnWidth / 2);
    let newTop = cardCenterY + Math.sin(angle) * distance - (btnHeight / 2);

    // Clamp to Viewport
    newLeft = Math.min(Math.max(newLeft, minX), maxX);
    newTop = Math.min(Math.max(newTop, minY), maxY);

    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = px(newLeft);
    noBtn.style.top = px(newTop);

    // Add a little spin for fun
    const randomRot = Math.floor(Math.random() * 20) - 10;
    noBtn.style.transform = `rotate(${randomRot}deg)`;
};

function px(v) {
    return v + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click on mobile if possible
    moveButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

// "Yes" button celebration logic
yesBtn.addEventListener('click', () => {
    // Update content
    let gifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q3ZGI1YjE2N2E5ODQ1YjE2N2E5ODQ1YjE2N2E5ODQ1/26BRv0ThflsHCqDrG/giphy.gif"; // Cute heart/love gif
    // Fallback or specific gif

    card.innerHTML = `
        <h1>Yay! ❤️</h1>
        <p>Best Valentine Ever!</p>
        <img src="valentine_moment.png" alt="Cute Hug" style="max-width: 250px; border-radius: 10px;">
    `;

    // Trigger confetti
    startConfetti();
});

function startConfetti() {
    // Simple confetti burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Honest confetti shower
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.1, 0.2) } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.1, 0.2) } }));
    }, 250);
}
