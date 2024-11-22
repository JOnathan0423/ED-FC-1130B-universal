document.getElementById('measure-btn').addEventListener('click', measureFrequency);
document.getElementById('reset-btn').addEventListener('click', resetCounter);
document.getElementById('trigger-level').addEventListener('input', updateTriggerLevel);
document.getElementById('trigger-mode').addEventListener('change', changeTriggerMode);
document.getElementById('frequency-range').addEventListener('input', updateFrequency);

// Давтамжийн хэмжээг симуляци хийх
function measureFrequency() {
    let inputType = document.getElementById('input-type').value;
    let frequencyRange = parseFloat(document.getElementById('frequency-range').value);
    let triggerMode = document.getElementById('trigger-mode').value;
    
    // Давтамжийн хүрээнд санамсаргүй давтамж үүсгэх
    let randomFrequency = (Math.random() * frequencyRange).toFixed(3);
    
    // Хугацааны периодыг тооцоолох
    let timePeriod = (1 / randomFrequency).toFixed(3);
    
    // Давтамж болон нэгжийг дэлгэцэнд харуулах
    document.getElementById('frequency-display').innerText = randomFrequency;
    
    // Давтамжийн утгын дагуу нэгжийг шинэчлэх
    let unit = "MHz";
    if (randomFrequency < 1) {
        randomFrequency *= 1000;
        unit = "kHz";
    }
    if (randomFrequency >= 1000) {
        randomFrequency /= 1000;
        unit = "GHz";
    }
    document.getElementById('unit').innerText = unit;

    // Хугацааны периодыг (нано секунд) харуулах
    document.getElementById('period-display').innerText = (timePeriod * 1000000000).toFixed(3) + " ns";

    // Trigger статусыг шинэчлэх
    document.getElementById('trigger-status').innerText = `Trigger: ${triggerMode}`;

    console.log(`Оруулах төрөл: ${inputType}, Давтамжийн хүрээ: ${frequencyRange} MHz, Trigger горим: ${triggerMode}`);
}

// Тооцогчийг дахин тохируулах
function resetCounter() {
    document.getElementById('frequency-display').innerText = '000.000';
    document.getElementById('unit').innerText = 'MHz';
    document.getElementById('period-display').innerText = '0.000 ns';
    document.getElementById('trigger-status').innerText = 'Идэвхгүй';
    console.log('Тооцогчийг дахин тохируулав');
}

// Trigger түвшинг шинэчлэх
function updateTriggerLevel() {
    let triggerLevel = document.getElementById('trigger-level').value;
    document.getElementById('trigger-level-value').innerText = triggerLevel + "V";
}

// Trigger горимыг өөрчлөх (Авто, Нэг удаа, Энгийн)
function changeTriggerMode() {
    let triggerMode = document.getElementById('trigger-mode').value;
    console.log(`Trigger горим: ${triggerMode}`);
}

// Эргэлттэй тохируулгын хүрээг шинэчлэх
function updateFrequency() {
    let frequencyRange = document.getElementById('frequency-range').value;
    document.getElementById('knob-value').innerText = frequencyRange + " MHz";
}

// Сигналын визуализаци (Давхар визуал эффект)
function visualizeSignal() {
    const oscilloscope = document.getElementById('oscilloscope');
    const width = oscilloscope.offsetWidth;
    const height = oscilloscope.offsetHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    oscilloscope.innerHTML = ''; // Өмнөх canvas-ийг арилгах
    oscilloscope.appendChild(canvas);

    // Энгийн синус долгио зурж үзүүлэх (зөвхөн визуал эффект)
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.05) * height / 4 + height / 2;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#28a745';
    ctx.stroke();
}

// Сигналын визуализацийг тогтмол хугацаагаар дуудна
setInterval(visualizeSignal, 500);
