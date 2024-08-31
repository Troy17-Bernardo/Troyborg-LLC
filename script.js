document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    const effectDuration = 5000; // 5 seconds for each effect
    const gapDuration = 5000; // 5 seconds gap between effects

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function drawBinaryEffect() {
        const cols = Math.floor(width / 20);
        const rows = Math.floor(height / 20);
        const chars = '01';
        ctx.fillStyle = 'lightblue';
        ctx.font = '20px monospace';

        function animateBinary() {
            ctx.clearRect(0, 0, width, height);
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(char, x * 20, y * 20);
                }
            }
            requestAnimationFrame(animateBinary);
        }
        animateBinary();
    }

    function drawMicroElectronicEffect() {
        const numLines = 30;
        const lineLength = 100;
        const lineWidth = 2;

        function animateMicroElectronic() {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = '#00bfff';
            ctx.lineWidth = lineWidth;

            for (let i = 0; i < numLines; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const angle = Math.random() * 2 * Math.PI;
                const xEnd = x + lineLength * Math.cos(angle);
                const yEnd = y + lineLength * Math.sin(angle);

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(xEnd, yEnd);
                ctx.stroke();
            }
            requestAnimationFrame(animateMicroElectronic);
        }
        animateMicroElectronic();
    }

    function stopMicroElectronicEffect() {
        // Stop the micro-electronic effect animation
        ctx.clearRect(0, 0, width, height);
    }

    function startEffects() {
        drawBinaryEffect();
        setTimeout(() => {
            ctx.clearRect(0, 0, width, height); // Clear binary effect
            setTimeout(() => {
                drawMicroElectronicEffect();
                setTimeout(() => {
                    stopMicroElectronicEffect(); // Stop micro-electronic effect
                    // No more effects after this
                }, effectDuration); // Micro-electronic effect for 5 seconds
            }, effectDuration); // Wait 5 seconds before starting micro-electronic effect
        }, effectDuration); // Binary effect for 5 seconds
    }

    function setupAnimationCycle() {
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        startEffects(); // Start the effects sequence
    }

    setupAnimationCycle();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
