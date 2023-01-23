const wordlist = new Set(require('./cell-tower-words.json').map(w => w.toUpperCase()))

function Puzzle(w, h, ...letters) {
	this.w = w;  this.h = h
	this.letters = []
	let solve = false
	for(const L of letters) {
		if(L === true) solve = true
		else this.letters.push(...L.split(''))
	}
	if(this.letters.length !== w*h) {
		throw new Error('Expected '+w*h+' letters but got '+this.letters.length)
	}
	if(solve) console.log(this.solutionsList())
}

Puzzle.prototype.i = function(x, y) {
	return x + y*this.w
}

Puzzle.prototype.xy = function(i) {
	return [i%this.w + 1, Math.floor(i/this.w) + 1]
}

Puzzle.prototype.neighbors = function(i) {
	const x = i%this.w
	const y = Math.floor(i/this.w)
	const n = []
	if(x < this.w-1) n.push(i+1)
	if(y < this.h-1) n.push(i+this.w)
	if(x > 0) n.push(i-1)
	if(y > 0) n.push(i-this.w)
	return n
}

Puzzle.prototype.text = function(indices) {
	indices.sort((a,b) => a-b)
	return indices.map(i => this.letters[i]).join('')
}

Puzzle.prototype.wordsStartingAt = function(i, words, seen, i0, n, w) {
	i0 ??= i; words ??= new Set(); seen ??= new Set()
	const m = new Set(n), v = new Set(w)
	m.delete(i); v.add(i)
	const indices = [...v].sort((a,b) => a-b)
	const wi = indices.join(' ')
	if(!seen.has(wi)) {
		seen.add(wi)
		if(v.size >= 4 && v.size <= 8) {
			const text = indices.map(i => this.letters[i]).join('')
			if(wordlist.has(text)) words.add(wi)
		}
		if(v.size < 8) {
			for(const j of this.neighbors(i)) {
				if(j>i0 && !v.has(j)) m.add(j)
			}
			for(const j of m) {
				this.wordsStartingAt(j, words, seen, i0, m, v)
			}
		}
	}
	return words
}

Puzzle.prototype.allWords = function() {
	if(this._allWords == null) {
		const words = new Set()
		for(let i=0; i<this.w*this.h - 4; ++i) {
			this.wordsStartingAt(i, words)
		}
		this._allWords = [...words].map(s => s.split(' ').map(n => +n))
	}
	return this._allWords
}

Puzzle.prototype.wordInfo = function(w) {
	const coords = w.map(i => this.xy(i).join(','))
	return coords.join(' ')+': '+this.text(w)
}

Puzzle.prototype.wordList = function() {
	const list = [...this.allWords()].map(w => this.wordInfo(w))
	return list.join('\n')
}

function fits(used, word) {
	for(const i of word) if(used.has(i)) return false
	return true
}

function firstUnused(used) {
	let i=0; while(used.has(i)) ++i; return i
}

Puzzle.prototype.solve = function(words, used, soln, solns) {
	words ??= this.allWords()
	used ??= new Set
	soln ??= []
	solns ??= []
	if(used.size === this.w*this.h) {
		solns.push([...soln])
	} else {
		words = words.filter(w => fits(used, w))
		const n = firstUnused(used)
		const next = words.filter(w => w[0] === n)
		for(const w of next) {
			const u = new Set(used), s = [...soln, w]
			for(const l of w) u.add(l)
			this.solve(words, u, s, solns)
		}
	}
	return solns
}

Puzzle.prototype.solutionsList = function() {
	const solns = this.solve()
	return solns.map(s => s.map(w => this.wordInfo(w)))
}

const p1 = new Puzzle(7, 12,
	'RADOGAAREWSONOHENLITHLPMNINEBAIESERORNBRTA',
	'PEUUSCCNCTRYORAURNADEWFETUDSULPRAAFAIDLELY')

const p2 = new Puzzle(7, 12,
	'IMEASUSGNREDPEORETRLTODLEULELDETSRMFIRSTIN',
	'LELVAALRSIMNSSESITHOWPOINSTINDGATINBITSONG')

const p3 = new Puzzle(7, 12,
	'LAMODTANDIFIEBINWDOLEGRICCASOTIUNGRWNGRFYO',
	'ESFSORBPELGETTALCHAAISSENNECWADGEDHRNARGES')

const p4 = new Puzzle(7, 12,
	'LIKEWLAITEASUWSCHPPOSEOESRTJRDTRSUDGEAVBUG',
	'IRELILEVSREDSDEVEALECNEDCINIRILAFDISKIMONG')

const p5 = new Puzzle(7, 12,
	'RSUPESEERIPORNLIESDINOUGWAGHHTBRNAPECOMINP',
	'ANINGGEYPCODHNLACSEEREMLOWEDULLYEDUTIPLECE')

const p6 = new Puzzle(7, 12, true,
	'SLCEWOROCNTPTHWOURUTEURSYTXPESCHRECPANACET',
	'EANELEDEKENTITXFLOWNECIEECRWLULHAANDEDINTS')

const p7 = new Puzzle(7, 12, true,
	'NOISPTADEOSSIKEVBLNEEICWASTNESAHYPLFLKACAC',
	'INRKLOEISIAADEHDSIMDAECAEEDVSMEXDANCUSECED')

const p8 = new Puzzle(7, 12, true,
	'JOTROININSUBLDLUCOMEUNCPUSTRTHTEAYNRAIRFEE',
	'NIFAIDINGFIRNGSHRMPRAEEDRONVBTEAMEOUYSIDED')

const p9 = new Puzzle(7, 12, true,
	'CHICWHILRDHOLSAOOOSETCMHUNORHIESGIGVETOSIN',
	'LSODHALIMICELFHTSHAININFNGTETSLESGEASHEDRS')

const p10 = new Puzzle(7, 12, true,
	'BUCKMARECTARIGDLUWAGROBWAKEEORHIEATSFLSTLY',
	'TRESPAIEELUNHOXYFREMETASTEINGARBSTVAGEOLVE')

const p221 = new Puzzle(7, 12,
	'HINPLEAMTSICNWANGITYIATURARNGNEOUMSEPDNDAT',
	'ICBINNRMKBDSYUISRINCKLITGBUSTARAPYSRYCEARK')

const p263 = new Puzzle(7, 12, true,
	'RARSCAIELDENNDYLIVEELREAWRXIMOTFTOSEPULWNT',
	'ECULPOHAIALLOLPPRBENDLICOEFKERRUINODPTSTWS')
