export function getVisibleGrid(domElements, config) {
    // Returns a 2D array [row][col] of {id, el}
    const grid = [];
    for (let col = 0; col < 5; col++) {
        const reel = domElements.reels[col];
        const strip = reel.querySelector('.emoji-strip');
        const symbols = Array.from(strip.children);
        // Find the topmost visible symbol (based on currentY)
        const transform = strip.style.transform;
        const match = transform.match(/-?\d+/);
        const offset = match ? Math.round(Math.abs(parseInt(match[0], 10)) / config.slotSizePx) : 0;
        const visible = [];
        for (let row = 0; row < 5; row++) {
            const idx = (offset + row) % symbols.length;
            const el = symbols[idx];
            visible.push({ id: el.dataset.symbolId, el });
        }
        grid.push(visible);
    }
    // Transpose to [row][col]
    return grid[0].map((_, rowIdx) => grid.map(colArr => colArr[rowIdx]));
}

export function findWins(grid) {
    const wins = [];
    // Horizontal (must start from first column, run of 3+)
    for (let row = 0; row < 5; row++) {
        let run = [grid[row][0]];
        for (let col = 1; col < 5; col++) {
            if (grid[row][col].id === run[0].id) {
                run.push(grid[row][col]);
            } else {
                break;
            }
        }
        if (run.length >= 3) wins.push([...run]);
    }
    // Diagonals (main, must start at top-left or top-right, run of 3+)
    // Top-left to bottom-right
    let diag1 = [grid[0][0]];
    for (let i = 1; i < 5; i++) {
        if (grid[i][i].id === diag1[0].id) diag1.push(grid[i][i]);
        else break;
    }
    if (diag1.length >= 3) wins.push([...diag1]);
    // Top-right to bottom-left
    let diag2 = [grid[0][4]];
    for (let i = 1; i < 5; i++) {
        if (grid[i][4-i].id === diag2[0].id) diag2.push(grid[i][4-i]);
        else break;
    }
    if (diag2.length >= 3) wins.push([...diag2]);
    // V and inverted V
    const v1 = [grid[0][0], grid[1][1], grid[2][2], grid[3][1], grid[4][0]];
    if (v1.every(cell => cell.id === v1[0].id)) wins.push(v1);
    const v2 = [grid[0][4], grid[1][3], grid[2][2], grid[3][3], grid[4][4]];
    if (v2.every(cell => cell.id === v2[0].id)) wins.push(v2);
    return wins;
}

export function calculatePrize(wins) {
    // Simple: 2 in a row = 2 credits, 3 in a row = 5, diagonal/V = 10
    let prize = 0;
    for (const win of wins) {
        if (win.length === 2) prize += 2;
        else if (win.length === 3) prize += 5;
        else if (win.length >= 5) prize += 10;
    }
    return prize;
} 

export function highlightWins(wins) {
    console.log('Highlighting wins:', wins);
    wins.flat().forEach(cell => {
        const img = cell.el.querySelector('img');
        if (img) {
            img.classList.add('win-highlight');
            console.log('Added win-highlight to IMG:', img);
        } else {
            cell.el.classList.add('win-highlight');
            console.log('Added win-highlight to DIV:', cell.el);
        }
    });
}

