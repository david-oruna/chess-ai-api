async function makeEngineMove() {
    const fen = game.fen();
    const level = 'medio'; // You can make this configurable

    try {
        const response = await fetch(`/move/?level=${level}&fen=${encodeURIComponent(fen)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const move = await response.text();
        
        if (move) {
            game.move(move);
            board.position(game.fen());
            updateStatus();
        } else {
            console.error('No move returned from engine');
        }
    } catch (error) {
        console.error('Error getting move from engine:', error);
    }
}

// Replace the onDrop function with this:
function onDrop (source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    updateStatus();
    window.setTimeout(makeEngineMove, 250);
}