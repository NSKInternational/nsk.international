const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
let lastTime = 0, isHover = false, langIdx = 0, txtTimer = 0, step = 0;

let sqSize = [54, 58, 62], txtSize = 11, rot = [0, 0], rotSpeed = [0.5, -0.35];
let state = { showTxt: true };
let dirTxt = { text: "", vis: false, x: 0, y: 0, op: 1 };
let recTxt = { text: "", vis: false, x: 0, y: 0, op: 1 };
let links = [], para = { text: "", vis: false, op: 1 };

const configs = [
	{ txts: [["click me", "Klicka här", "Кликните", "클릭하세요", "クリックして"]], hasContent: false },
	{ txts: [["No?", "Nej?", "Нет?", "아니죠?", "違う？"]], hasContent: true, dir: "Would you like to download SOPA?", rec: "PLEASE READ THE SOPA_Manual.txt FILE", linkTxt: ["Download Windows", "Download MacOS"], linkURL: ["https://nsk.international/", "https://nsk.international/"], desc: "sopa_description" },
	{ txts: [["No?", "Nej?", "Нет?", "아니죠?", "違う？"]], hasContent: true, dir: "Would you like to contact me?", rec: "Here you go...", linkTxt: ["YouTube", "Twitter", "GitHub", "Patreon", "Itch.io"], linkURL: ["https://www.youtube.com/@magnusnsk", "https://x.com/magnusnsk", "https://github.com/NSKInternational", "https://www.patreon.com/c/TheNSK", "https://nskinternational.itch.io/"], desc: "links_description" }
];

const bottomLinks = [
	{ text: "SOPA Mac", url: "https://nsk.international/" },
	{ text: "SOPA Win", url: "https://nsk.international/" },
	{ text: "Arch Dot Files", url: "https://github.com/NSKInternational/dots-hyprland" }
];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;
const px = v => Math.round(v * (window.devicePixelRatio || 1));

function resizeCanvas() {
	const w = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8), h = window.innerHeight * 0.95;
	canvas.style.width = w + "px"; canvas.style.height = h + "px";
	canvas.width = px(w); canvas.height = px(h);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
}
window.addEventListener('resize', () => { lastTime = performance.now(); resizeCanvas(); });

function drawSquare(x, y, size, op, rot) {
	ctx.save();
	ctx.translate(x, y); ctx.rotate(rot);
	ctx.globalAlpha = op;
	ctx.fillStyle = "#fff";
	ctx.fillRect(-size/2, -size/2, size, size);
	ctx.restore();
}

function drawMainSquare(x, y, size, txt, tSize, op) {
	ctx.save();
	ctx.globalAlpha = op;
	ctx.fillStyle = "#000";
	ctx.fillRect(x-size/2, y-size/2, size, size);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#fff";
	ctx.strokeRect(x-size/2, y-size/2, size, size);
	if (txt) {
		ctx.fillStyle = "#fff";
		let fontSz = tSize;
		ctx.font = `400 ${fontSz}px "Noto Sans JP"`;
		let m = ctx.measureText(txt);
		if (m.width > size-8) fontSz *= (size-8)/m.width, ctx.font = `400 ${fontSz}px "Noto Sans JP"`;
		ctx.textAlign = "center"; ctx.textBaseline = "middle";
		ctx.shadowColor = "black"; ctx.shadowBlur = 2;
		ctx.fillText(txt, x, y);
	}
	ctx.restore();
}

function drawText(obj, x, y) {
	if (!obj.vis) return;
	ctx.save();
	ctx.globalAlpha = obj.op;
	ctx.fillStyle = "#fff";
	ctx.font = '400 12px "Noto Sans JP"';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.shadowColor = "black";
	ctx.shadowBlur = 2;
	ctx.fillText(obj.text, x, y);
	ctx.restore();
}

function drawPara(obj, x, y, maxW, h) {
	if (!obj.vis || !obj.op) return;
	ctx.save();
	ctx.globalAlpha = obj.op;
	ctx.font = '400 12px "Noto Sans JP"';
	ctx.fillStyle = "#fff";
	ctx.textAlign = "left";
	let lh = 15, words = obj.text.split(' '), line = '', sy = y;
	for (let i=0; i<words.length; i++) {
		let test = line + words[i] + ' ';
		if (ctx.measureText(test).width > maxW && line) {
			ctx.fillText(line.trim(), x-maxW/2, sy); sy += lh; line = words[i] + ' ';
		} else line = test;
	}
	if (line) ctx.fillText(line.trim(), x-maxW/2, sy);
	ctx.restore();
}

function drawLinksRow(links, y, canvasWidth) {
	if (!links || !links.length) return;
	ctx.save();
	ctx.font = '400 12px "Noto Sans JP"';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.shadowColor = "black";
	ctx.shadowBlur = 2;
	let visible = links.filter(l => l.vis !== false);
	let totalW = visible.reduce((sum, l) => sum + ctx.measureText(l.text).width, 0) + (visible.length - 1) * 20;
	let x = canvasWidth / 2 - totalW / 2;
	visible.forEach(link => {
		let tw = ctx.measureText(link.text).width;
		link.x = x + tw / 2;
		link.y = y;
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#fff";
		ctx.fillText(link.text, link.x, link.y);
		ctx.beginPath();
		ctx.moveTo(link.x - tw / 2, link.y + 6);
		ctx.lineTo(link.x + tw / 2, link.y + 6);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#fff";
		ctx.stroke();
		link.rect = { x: link.x - tw / 2, y: link.y - 8, width: tw, height: 18 };
		x += tw + 20;
	});
	ctx.restore();
}

function animate(now=0) {
	let dt = clamp((now-lastTime)/1000, 0, 0.1); lastTime = now;
	let w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height);
	ctx.clearRect(0, 0, w, h);

	let grow = isHover ? 1.15 : 1, base = [54,58,62], tBase = 11;
	for (let i=0; i<3; i++) sqSize[i] = lerp(sqSize[i], base[i]*grow, 7*dt);
	txtSize = lerp(txtSize, tBase*grow, 7*dt);
	rotSpeed[0] = lerp(rotSpeed[0], isHover?0.75:0.5, 7*dt);
	rotSpeed[1] = lerp(rotSpeed[1], isHover?-0.525:-0.35, 7*dt);
	rot[0] += rotSpeed[0]*dt; rot[1] += rotSpeed[1]*dt;

	txtTimer += dt;
	let cfg = configs[step];
	if (txtTimer > 1 && cfg.txts) {
		langIdx = (langIdx+1)%cfg.txts[0].length; txtTimer = 0;
	}

	let cx = w/2, cy = h/2;
	drawSquare(cx, cy, sqSize[2], 0.2, rot[1]);
	drawSquare(cx, cy, sqSize[1], 0.4, rot[0]);
	let txtY = cy + (sqSize[0]-base[0])/2;
	drawMainSquare(cx, cy, sqSize[0], state.showTxt && cfg.txts ? cfg.txts[0][langIdx] : "", txtSize, 1);

	if (cfg.hasContent) {
		let offset = sqSize[0]/2 + 45;
		dirTxt.y = cy - offset;
		recTxt.y = cy + offset;
		drawText(dirTxt, cx, dirTxt.y);
		drawText(recTxt, cx, recTxt.y);

		if (links.length && links.some(l=>l.vis)) {
			ctx.font = '400 12px "Noto Sans JP"';
			let totalW = links.filter(l=>l.vis).reduce((s,l)=>s+ctx.measureText(l.text).width,0) + (links.filter(l=>l.vis).length-1)*15;
			let ly = recTxt.y+26;
			drawLinksRow(links, ly, w);
			if (para.vis) drawPara(para, cx, ly+26, totalW, h);
		}
	}

	drawLinksRow(bottomLinks, h - 28, w);

	requestAnimationFrame(animate);
}

function isInRect(x, y, r) {
	return r && x>=r.x && x<=r.x+r.width && y>=r.y && y<=r.y+r.height;
}

canvas.addEventListener('mousemove', e=>{
	let rect = canvas.getBoundingClientRect(), mx = e.clientX-rect.left, my = e.clientY-rect.top;
	let w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height), cx = w/2, cy = h/2;
	isHover = mx>=cx-34&&mx<=cx+34&&my>=cy-34&&my<=cy+34;
	let pointer = isHover && state.showTxt;
	links.forEach(l=>{ if (l.vis && isInRect(mx, my, l.rect)) pointer = true; });
	bottomLinks.forEach(b=>{ if (isInRect(mx, my, b.rect)) pointer = true; });
	canvas.style.cursor = pointer ? "pointer" : "default";
});

canvas.addEventListener('mouseleave', ()=>{ isHover = false; canvas.style.cursor = "default"; });

canvas.addEventListener('click', e=>{
	let rect = canvas.getBoundingClientRect(), mx = e.clientX-rect.left, my = e.clientY-rect.top;
	let w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height), cx = w/2, cy = h/2;
	for (const l of links) if (l.vis && isInRect(mx, my, l.rect)) {
		if (l.url.startsWith("media/")) {
			let a = document.createElement('a'); a.href = l.url; a.download = l.url.split('/').pop(); document.body.appendChild(a); a.click(); a.remove();
		} else window.open(l.url,'_blank');
		return;
	}
	for (const b of bottomLinks) if (isInRect(mx, my, b.rect)) {
		let a = document.createElement('a');
		a.href = b.url;
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		a.remove();
		return;
	}
	if (mx>=cx-34&&mx<=cx+34&&my>=cy-34&&my<=cy+34 && state.showTxt) nextStep();
});

function nextStep() {
	state.showTxt = false;
	recTxt.vis = false;
	links.forEach(l=>l.vis=false);
	para.vis = false;
	step = configs[step+1]?step+1:1;
	let cfg = configs[step];
	if (!cfg.hasContent) { state.showTxt = true; return; }
	dirTxt.text = cfg.dir; dirTxt.vis = true;
	recTxt.text = cfg.rec;
	links = cfg.linkTxt.map((t,i)=>({text:t,url:cfg.linkURL[i],vis:false,rect:{}}));
	[()=>{ recTxt.vis=true; },
		()=>{ links.forEach(l=>l.vis=true); },
		()=>{
			let d = document.getElementById(cfg.desc);
			para.text = d ? (d.textContent||d.innerText||"") : "";
			para.vis = true;
		},
		()=>{ state.showTxt=true; langIdx=0; txtTimer=0; }
	].reduce((p,fn)=>p.then(()=>new Promise(r=>setTimeout(()=>{fn();r();},800))),Promise.resolve());
}

function init() {
	let cfg = configs[step];
	if (cfg.hasContent) {
		dirTxt.text = cfg.dir; recTxt.text = cfg.rec;
		links = cfg.linkTxt.map((t,i)=>({text:t,url:cfg.linkURL[i],vis:false,rect:{}}));
	}
	lastTime = performance.now();
	resizeCanvas();
	animate();
}
init();

