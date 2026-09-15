// Жөнөкөй сан экенин текшерүү функциясы
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Хакерлик текст анимациясы
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Digital Rain эффект
function createDigitalRain() {
    const rainContainer = document.getElementById('digitalRain');
    if (!rainContainer) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        drop.style.fontSize = (Math.random() * 10 + 10) + 'px';
        drop.style.opacity = Math.random() * 0.5 + 0.3;
        
        rainContainer.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 5000);
    }
    
    // Майда тамчыларды жасоо
    setInterval(createDrop, 100);
}

// Хакерлик эффекттерди иштетүү
function playHackerEffects() {
    const hackText = document.getElementById('hackText');
    const messages = [
        'ACCESSING SYSTEM...',
        'DECRYPTING DATA...',
        'BYPASSING SECURITY...',
        'CRACKING ENCRYPTION...',
        'ACCESS GRANTED!'
    ];
    
    let messageIndex = 0;
    
    function showNextMessage() {
        if (messageIndex < messages.length) {
            typeWriter(hackText, messages[messageIndex], 100);
            messageIndex++;
            setTimeout(showNextMessage, 1500);
        }
    }
    
    showNextMessage();
}

// Санды жөнөкөй сандарга көбөтүү (прайм факторизация)
function primeFactorization(num) {
    const factors = [];
    let n = num;
    
    // 2 бөлүнүшүн текшерүү
    while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
    }
    
    // Так сандар үчүн
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }
    }
    
    // Эгер n 1ден чоң болсо, ал өзү жөнөкөй сан
    if (n > 2) {
        factors.push(n);
    }
    
    return factors;
}

// Оюн үчүн максат сандар (татаал эмес сандар)
const targetNumbers = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 25, 27, 28, 30];

// Учурдагы максат сан
let currentTarget = 12;

// Жаңы оюн баштоо
function newGame() {
    // Ичкериси ачылмаса тийешелүү.
    const safeDoor = document.getElementById('safeDoor');
    const safeOpened = document.getElementById('safeOpened');
    const result = document.getElementById('result');
    
    // Бардык элементтерди калыбына келтирүү
    safeDoor.style.display = 'block';
    safeDoor.classList.remove('opening');
    safeOpened.style.display = 'none';
    safeOpened.classList.remove('revealed');
    result.style.display = 'none';
    result.className = 'result';
    
    // Input талааларын тазалоо
    document.getElementById('factor1').value = '';
    document.getElementById('factor2').value = '';
    document.getElementById('factor3').value = '';
    
    // Жаңы максат сан тандоо
    currentTarget = targetNumbers[Math.floor(Math.random() * targetNumbers.length)];
    document.getElementById('targetNumber').textContent = currentTarget;
}

// Жоопту текшерүү
function checkAnswer() {
    const factor1 = parseInt(document.getElementById('factor1').value);
    const factor2 = parseInt(document.getElementById('factor2').value);
    const factor3 = document.getElementById('factor3').value;
    
    const result = document.getElementById('result');
    const safeDoor = document.getElementById('safeDoor');
    const safeOpened = document.getElementById('safeOpened');
    
    // Биринчи эки input толтурулганбы текшерүү
    if (isNaN(factor1) || isNaN(factor2) || factor1 < 2 || factor2 < 2) {
        result.style.display = 'block';
        result.className = 'result error';
        result.textContent = '[ОШИБКА] Эки жөнөкөй сан керек!';
        return;
    }
    
    // Колдонучунун сандары
    const userFactors = [factor1, factor2];
    if (factor3 && !isNaN(parseInt(factor3))) {
        userFactors.push(parseInt(factor3));
    }
    
    // Бардык сандар жөнөкөйбу текшерүү
    const allPrimes = userFactors.every(num => isPrime(num));
    
    if (!allPrimes) {
        result.style.display = 'block';
        result.className = 'result error';
        result.textContent = '[ACCESS DENIED] Жөнөкөй сандар эмес!';
        return;
    }
    
    // Көбөйтүндүсү туура келеби текшерүү
    const product = userFactors.reduce((acc, num) => acc * num, 1);
    
    if (product !== currentTarget) {
        result.style.display = 'block';
        result.className = 'result error';
        result.textContent = `[ACCESS DENIED] Көбөйтүндүсү: ${product} != ${currentTarget}`;
        return;
    }
    
    // Туура жооп!
    result.style.display = 'block';
    result.className = 'result success';
    result.textContent = '[ACCESS GRANTED] Сейф ачылууда...';
    
    // 3D сейф ачылыш анимациясы
    setTimeout(() => {
        safeDoor.classList.add('opening');
        
        // 1 секунддан кийин контентти көрсөтүү
        setTimeout(() => {
            safeDoor.style.display = 'none';
            safeOpened.style.display = 'block';
            safeOpened.classList.add('revealed');
            playHackerEffects(); // Хакерлик анимацияларды иштетүү
        }, 1000);
    }, 500);
}

// Барак жүктөлгөндө оюн баштоо
window.onload = function() {
    newGame();
    createDigitalRain(); // Digital rain эффектин баштоо
};

// Enter баскычы менен текшерүү
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});
