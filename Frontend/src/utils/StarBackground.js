// StarBackground.js - Animated Star Background for React/JSX
class StarBackground {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Configuration options
        this.options = {
            starCount: options.starCount || 500,
            starSpeed: options.starSpeed || 1,
            starSize: options.starSize || 2,
            twinkleSpeed: options.twinkleSpeed || 0.02,
            shootingStarChance: options.shootingStarChance || 0.003,
            colors: options.colors || ['#ffffff', '#ffffcc', '#ccccff', '#ffcccc', '#ccffcc']
        };
        
        this.stars = [];
        this.shootingStars = [];
        this.animationId = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createStars();
        this.handleResize = this.handleResize.bind(this);
        this.animate = this.animate.bind(this);
        
        window.addEventListener('resize', this.handleResize);
    }
    
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    handleResize() {
        this.resizeCanvas();
        this.createStars();
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.options.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * this.options.starSize + 0.5,
                opacity: Math.random(),
                twinkleSpeed: (Math.random() - 0.5) * this.options.twinkleSpeed,
                color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                vx: (Math.random() - 0.5) * this.options.starSpeed,
                vy: (Math.random() - 0.5) * this.options.starSpeed
            });
        }
    }
    
    createShootingStar() {
        const side = Math.floor(Math.random() * 4);
        let x, y, vx, vy;
        
        switch(side) {
            case 0: // Top
                x = Math.random() * this.canvas.width;
                y = 0;
                vx = (Math.random() - 0.5) * 4;
                vy = Math.random() * 3 + 2;
                break;
            case 1: // Right
                x = this.canvas.width;
                y = Math.random() * this.canvas.height;
                vx = -(Math.random() * 3 + 2);
                vy = (Math.random() - 0.5) * 4;
                break;
            case 2: // Bottom
                x = Math.random() * this.canvas.width;
                y = this.canvas.height;
                vx = (Math.random() - 0.5) * 4;
                vy = -(Math.random() * 3 + 2);
                break;
            case 3: // Left
                x = 0;
                y = Math.random() * this.canvas.height;
                vx = Math.random() * 3 + 2;
                vy = (Math.random() - 0.5) * 4;
                break;
        }
        
        this.shootingStars.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            size: Math.random() * 2 + 1,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            trail: []
        });
    }
    
    updateStars() {
        this.stars.forEach(star => {
            star.x += star.vx;
            star.y += star.vy;
            
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
            
            star.opacity += star.twinkleSpeed;
            if (star.opacity <= 0 || star.opacity >= 1) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }
            star.opacity = Math.max(0, Math.min(1, star.opacity));
        });
    }
    
    updateShootingStars() {
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            const shootingStar = this.shootingStars[i];
            
            shootingStar.trail.push({x: shootingStar.x, y: shootingStar.y});
            if (shootingStar.trail.length > 10) {
                shootingStar.trail.shift();
            }
            
            shootingStar.x += shootingStar.vx;
            shootingStar.y += shootingStar.vy;
            shootingStar.life -= shootingStar.decay;
            
            if (shootingStar.life <= 0 || 
                shootingStar.x < -50 || shootingStar.x > this.canvas.width + 50 ||
                shootingStar.y < -50 || shootingStar.y > this.canvas.height + 50) {
                this.shootingStars.splice(i, 1);
            }
        }
    }
    
    drawStars() {
        this.stars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = star.color;
            this.ctx.shadowColor = star.color;
            this.ctx.shadowBlur = star.size * 2;
            
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawShootingStars() {
        this.shootingStars.forEach(shootingStar => {
            this.ctx.save();
            this.ctx.globalAlpha = shootingStar.life;
            
            if (shootingStar.trail.length > 1) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = shootingStar.size;
                this.ctx.lineCap = 'round';
                
                const gradient = this.ctx.createLinearGradient(
                    shootingStar.trail[0].x, shootingStar.trail[0].y,
                    shootingStar.x, shootingStar.y
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
                this.ctx.strokeStyle = gradient;
                
                this.ctx.beginPath();
                this.ctx.moveTo(shootingStar.trail[0].x, shootingStar.trail[0].y);
                for (let i = 1; i < shootingStar.trail.length; i++) {
                    this.ctx.lineTo(shootingStar.trail[i].x, shootingStar.trail[i].y);
                }
                this.ctx.stroke();
            }
            
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowBlur = shootingStar.size * 3;
            
            this.ctx.beginPath();
            this.ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateStars();
        this.drawStars();
        
        this.updateShootingStars();
        this.drawShootingStars();
        
        if (Math.random() < this.options.shootingStarChance) {
            this.createShootingStar();
        }
        
        this.animationId = requestAnimationFrame(this.animate);
    }
    
    // Public methods
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    destroy() {
        this.stop();
        window.removeEventListener('resize', this.handleResize);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateOptions(newOptions) {
        this.options = {...this.options, ...newOptions};
        this.createStars();
    }
    
    addStar(x, y) {
        this.stars.push({
            x: x,
            y: y,
            size: Math.random() * this.options.starSize + 0.5,
            opacity: Math.random(),
            twinkleSpeed: (Math.random() - 0.5) * this.options.twinkleSpeed,
            color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
            vx: (Math.random() - 0.5) * this.options.starSpeed,
            vy: (Math.random() - 0.5) * this.options.starSpeed
        });
    }
}

// React Hook for easy integration
const useStarBackground = (canvasRef, options = {}) => {
    const starBgRef = { current: null };
    
    const initStarBackground = () => {
        if (canvasRef.current && !starBgRef.current) {
            starBgRef.current = new StarBackground(canvasRef.current, options);
            starBgRef.current.start();
        }
    };
    
    const destroyStarBackground = () => {
        if (starBgRef.current) {
            starBgRef.current.destroy();
            starBgRef.current = null;
        }
    };
    
    return {
        initStarBackground,
        destroyStarBackground,
        starBackground: starBgRef.current
    };
};

// ES6 Module exports (for React/Vite)
export { StarBackground, useStarBackground };

// Default export
export default StarBackground;

// Fallback for other module systems
if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = { StarBackground, useStarBackground };
} else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() {
        return { StarBackground, useStarBackground };
    });
} else if (typeof window !== 'undefined') {
    // Browser globals
    window.StarBackground = StarBackground;
    window.useStarBackground = useStarBackground;
}