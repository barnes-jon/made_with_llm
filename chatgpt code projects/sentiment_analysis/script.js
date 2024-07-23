const happyWords = [
    'happy', 'joyful', 'cheerful', 'delighted', 'content', 'pleased', 'ecstatic', 'elated', 'gleeful', 'jovial',
    'jubilant', 'merry', 'overjoyed', 'radiant', 'blissful', 'satisfied', 'sunny', 'upbeat', 'buoyant', 'euphoric',
    'exuberant', 'glad', 'grateful', 'hopeful', 'inspired', 'joyous', 'lighthearted', 'lively', 'pleasant', 'thrilled',
    'zestful', 'exhilarated', 'exultant', 'glee', 'hilarious', 'jolly', 'jovial', 'jubilant', 'mirthful', 'vivacious',
    'bubbly', 'chirpy', 'chipper', 'blithe', 'bright', 'cheery', 'contented', 'convivial', 'genial', 'grinning',
    'radiating', 'rejoicing', 'sparkling', 'buoyed', 'chuffed', 'elevated', 'enraptured', 'enthusiastic', 'frolicsome',
    'gay', 'gratified', 'heartwarming', 'jubilating', 'light', 'lightsome', 'mirth', 'over the moon', 'peppy', 
    'perky', 'rapturous', 'rejoiced', 'sparkling', 'tickled', 'tickled pink', 'animated', 'blazing', 'bliss',
    'bouncing', 'dancing', 'dazzling', 'effervescent', 'enlivened', 'fervent', 'festive', 'glowing', 'high-spirited',
    'in high spirits', 'in seventh heaven', 'on cloud nine', 'on top of the world', 'perked up', 'radiant', 'sparkling',
    'uplifted', 'vibrant', 'zingy'
];

const angryWords = [
    'angry', 'furious', 'mad', 'irate', 'livid', 'outraged', 'incensed', 'fuming', 'irritated', 'annoyed',
    'cross', 'enraged', 'infuriated', 'wrathful', 'indignant', 'resentful', 'aggravated', 'offended', 'bitter',
    'hostile', 'exasperated', 'choleric', 'displeased', 'irascible', 'vexed', 'riled', 'incensed', 'irritable',
    'agitated', 'wrath', 'smoldering', 'sulking', 'seething', 'enragement', 'tempestuous', 'touchy', 'short-tempered',
    'hot-tempered', 'testy', 'snappish', 'choler', 'ballistic', 'huffy', 'fiery', 'infuriation', 'resentment',
    'bothered', 'perturbed', 'wrathfully', 'crossly', 'sullen', 'peeved', 'irked', 'frustrated', 'irritation', 
    'fretful', 'huffish', 'vexation', 'umbrage', 'disgruntled', 'exasperation', 'fury', 'apoplectic', 'outrage',
    'rancor', 'wrathfulness', 'acrimony', 'indignation', 'hatred', 'rage', 'hostility', 'antipathy', 'belligerence',
    'pique', 'ire', 'irritability', 'animosity', 'venomous', 'embittered', 'raging', 'contentious', 'hateful', 
    'spiteful', 'vengeful', 'mean', 'antagonistic', 'malevolent', 'vindictive', 'malicious', 'miffed', 'upset', 
    'discontent', 'displeasure', 'begrudging', 'animus', 'enmity', 'wrathfulness'
];

const neutralWords = [
    'average', 'basic', 'common', 'conventional', 'customary', 'decent', 'expected', 'fair', 'general', 'mediocre',
    'moderate', 'normal', 'ordinary', 'plain', 'regular', 'routine', 'standard', 'typical', 'usual', 'adequate',
    'alright', 'balanced', 'commonplace', 'customary', 'everyday', 'familiar', 'general', 'indifferent', 'mainstream',
    'medium', 'moderate', 'neutral', 'passable', 'plain', 'predominant', 'prevailing', 'prosaic', 'public', 'so-so',
    'steady', 'tolerable', 'unexceptional', 'unremarkable', 'widespread', 'customary', 'middle-of-the-road', 'unbiased',
    'unprejudiced', 'nonpartisan', 'disinterested', 'equitable', 'fair-minded', 'even-handed', 'objective', 'impartial',
    'detached', 'dispassionate', 'unemotional', 'indifferent', 'uninvolved', 'apathetic', 'indeterminate', 'nonaligned',
    'ambivalent', 'unconcerned', 'cool', 'indifferent', 'moderate', 'equivocal', 'tempered', 'middle-ground', 'mundane',
    'lackluster', 'nondescript', 'conservative', 'measured', 'controlled', 'reserved', 'restrained', 'staid', 'sober',
    'serious', 'pragmatic', 'realistic', 'down-to-earth', 'grounded', 'level-headed', 'sensible', 'practical', 'reasoned',
    'rational', 'logical', 'analytic', 'matter-of-fact', 'steady', 'even-tempered', 'unassuming', 'undemonstrative',
    'unsentimental'
];

function analyzeText() {
    const text = document.getElementById('text-input').value;

    if (!text.trim()) {
        alert('Please enter some text to analyze.');
        return;
    }

    // Get sentiment and score from getSentiment
    const result = getSentiment(text);
    const sentiment = result.sentiment; // Extract sentiment from the result
    const score = result.score; // Extract score from the result

    const summary = getSummary(text);
    const readingLevel = getReadingLevel(text);

    document.getElementById('sentiment').innerText = `Sentiment: ${sentiment} (Score: ${score})`;
    document.getElementById('summary').innerText = `Summary: ${summary}`;
    document.getElementById('reading-level').innerText = `Reading Level: ${readingLevel}`;
}

function getSentiment(text) {
    let score = 0;
    const words = text.split(/\s+/);

    words.forEach(word => {
        const lowerCaseWord = word.toLowerCase();
        if (happyWords.includes(lowerCaseWord)) {
            score++;
        } else if (angryWords.includes(lowerCaseWord)) {
            score--;
        } else if (neutralWords.includes(lowerCaseWord)) {
            // Adjust score towards zero based on the current score
            if (score > 0) {
                score--;
            } else if (score < 0) {
                score++;
            }
        }
    });

     let sentiment;
    if (score > 5) {
        sentiment = 'Happy';
    } else if (score < -5) {
        sentiment = 'Angry';
    } else {
        sentiment = 'Neutral';
    }

    return { sentiment, score };  // Return both sentiment and score
}

function getSummary(text) {
    // Placeholder function for summarization
    const sentences = text.split('. ');
    if (sentences.length > 2) {
        return `${sentences[0]}... ${sentences[sentences.length - 1]}`;
    } else {
        return text;
    }
}

function getReadingLevel(text) {
    // Placeholder function for reading level analysis
    const words = text.split(/\s+/).length;
    const sentences = text.split('.').length;
    const syllables = text.split(/[aeiouy]+/).length - 1;

    const readingLevel = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
    
    if (readingLevel < 6) {
        return '5th Grade';
    } else if (readingLevel < 9) {
        return '8th Grade';
    } else {
        return 'High School';
    }
}
