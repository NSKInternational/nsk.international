// text background - ascii styles
//
// function renderAsciiOverlay() {
// 	fetch('/media/ningen.txt')
// 		.then(response => response.text())
// 		.then(text => {
// 			const container = document.querySelector('.ascii-grid');
// 			const charsPerLine = 125;
// 			const minFontPx = 4, maxFontPx = 200;
// 			const measureChar = '漢', measureRepeat = 200;
// 			const containerPadding = 10;
// 
// 			// Measure character width
// 			function measureCharWidth(fontSizePx) {
// 				const span = document.createElement('span');
// 				span.className = 'ascii-measure-span';
// 				span.style.fontSize = fontSizePx + 'px';
// 				span.textContent = measureChar.repeat(measureRepeat);
// 				document.body.appendChild(span);
// 				const width = span.getBoundingClientRect().width / measureRepeat;
// 				document.body.removeChild(span);
// 				return width;
// 			}
// 
// 			// Find best font size
// 			const targetWidth = container.clientWidth - containerPadding;
// 			let minFont = minFontPx, maxFont = maxFontPx, bestFont = minFontPx;
// 			for (let i = 0; i < 12; i++) {
// 				const midFont = (minFont + maxFont) / 2;
// 				const charWidth = measureCharWidth(midFont);
// 				if (charWidth * charsPerLine > targetWidth) {
// 					maxFont = midFont;
// 				} else {
// 					bestFont = midFont;
// 					minFont = midFont;
// 				}
// 			}
// 			const fontSizePx = Math.max(minFontPx, Math.floor(bestFont));
// 			container.style.fontSize = fontSizePx + 'px';
// 
// 			// Final char height/width
// 			const span = document.createElement('span');
// 			span.className = 'ascii-measure-span';
// 			span.style.fontSize = fontSizePx + 'px';
// 			span.textContent = measureChar;
// 			document.body.appendChild(span);
// 			const charHeight = span.offsetHeight;
// 			const charWidth = measureCharWidth(fontSizePx);
// 			document.body.removeChild(span);
// 
// 			const linesPerPage = Math.floor(container.clientHeight / charHeight);
// 			const topPad = 2, bottomPad = 2;
// 
// 			// Prepare text
// 			let cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '');
// 			let loopedText = '';
// 			while (loopedText.length < charsPerLine * linesPerPage) {
// 				loopedText += cleanText;
// 			}
// 			loopedText = loopedText.slice(0, charsPerLine * linesPerPage);
// 
// 			const rawArtTop = [
// 				"   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓███████▓▒░      ░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░ ",
// 				"   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░",
// 				"   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░",
// 				"   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░░▒▓██████▓▒░       ░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░",
// 				"   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░",
// 				"   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░",
// 				"   ░▒▓█▓▒░       ░▒▓█████████████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░       ░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░"
// 			];
// 			const rawArtBot = [
// 				"       ░▒▓█▓▒░▒▓███████▓▒░       ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓███████▓▒░░▒▓██████▓▒░ ",
// 				"       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░",
// 				"       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░",
// 				"       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓████████▓▒░▒▓██████▓▒░        ░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓████████▓▒░",
// 				"       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░",
// 				"       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░",
// 				"       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░       ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░"
// 			];
// 
// 			const botArtY = Math.max(0, linesPerPage - rawArtBot.length - bottomPad);
// 
// 			// Overlay row lookup
// 			const overlayRows = new Set();
// 			for (let i = 0; i < rawArtTop.length; i++) overlayRows.add(topPad + i);
// 			for (let i = 0; i < rawArtBot.length; i++) overlayRows.add(botArtY + i);
// 
// 			function getBlockBaseOpacity(ch) {
// 				if (ch === '░') return 0.10;
// 				if (ch === '▒') return 0.25;
// 				if (ch === '▓') return 0.45;
// 				if (ch === '█') return 1.00;
// 				return null;
// 			}
// 
// 			let html = '';
// 			const baseRowStyle = `display:flex;flex-direction:row;line-height:1;white-space:pre;`;
// 
// 			for (let y = 0; y < linesPerPage; y++) {
// 				let rowStyle = `${baseRowStyle}height:${charHeight}px;`;
// 				let rowContent = '';
// 
// 				const line = loopedText.slice(y * charsPerLine, (y + 1) * charsPerLine);
// 
// 				// Justify to fill width
// 				if (charsPerLine > 1) {
// 					const totalCharWidth = charWidth * charsPerLine;
// 					const availableWidth = container.clientWidth - containerPadding;
// 					const extraSpace = availableWidth - totalCharWidth;
// 					rowStyle += `letter-spacing:${extraSpace / (charsPerLine - 1)}px;`;
// 				} else {
// 					rowStyle += `letter-spacing:0px;`;
// 				}
// 
// 				if (overlayRows.has(y)) {
// 					// Overlay rows per character spans for opacity control
// 					let overlayArt = null, overlayRow = null;
// 					if (y >= topPad && y < topPad + rawArtTop.length) {
// 						overlayArt = rawArtTop;
// 						overlayRow = y - topPad;
// 					} else if (y >= botArtY && y < botArtY + rawArtBot.length) {
// 						overlayArt = rawArtBot;
// 						overlayRow = y - botArtY;
// 					}
// 					for (let x = 0; x < charsPerLine; x++) {
// 						let overlayOpacity = 0.05;
// 						if (overlayArt && overlayArt[overlayRow] && overlayArt[overlayRow][x]) {
// 							const overlayChar = overlayArt[overlayRow][x];
// 							const baseOpacity = getBlockBaseOpacity(overlayChar);
// 							if (baseOpacity !== null) overlayOpacity = baseOpacity;
// 						}
// 						const char = line[x] || ' ';
// 						rowContent += `<span style="opacity:${overlayOpacity}">${char}</span>`;
// 					}
// 				} else {
// 					// Non overlay rows
// 					rowContent = `<span style="opacity:0.05">${line}</span>`;
// 				}
// 				html += `<div style="${rowStyle}">${rowContent}</div>`;
// 			}
// 			container.innerHTML = html;
// 		});
// }
// renderAsciiOverlay();

// window.addEventListener('resize', renderAsciiOverlay);
