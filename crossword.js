let clueText = document.getElementById("clue")
let restartBtn = document.getElementById("restartBtn")
let clues = document.getElementById("clues")
let boxes = Array.from(document.getElementsByClassName("box"))
let nums = Array.from(document.getElementsByClassName("num"))

row = 2
col = 2
dir = "down"
bg_color = "#37505C"
letter_color = "#5099ad"
word_color = "#232d2e"

across = ["1A:  A small amount",
    "4A:  Pdf, txt, png, etc.",
    "5A:  -- --- •-• ••• • code",
    "6A:  Prefix meaning self",
    "7A:  Sob"
]

down = ["5D:  Commonly seen computer at Proof",
    "4D:  Number of blocks Proof will have next year",
    "1D:  Not clean",
    "2D:  In addition",
    "3D:  Busy buzzer"
]

text = (
"Across:\n\
    1.  A small amount\n\
    4.  Pdf, txt, png, etc.\n\
    5.  -- --- •-• ••• • code\n\
    6.  Prefix meaning self\n\
    7.  Sob\n\n\
Down:\n\
    1.  Not clean\n\
    2.  In addition\n\
    3.  Busy buzzer\n\
    4.  Number of blocks Proof will have next year\n\
    5.  Commonly seen computer at Proof\n"
)

solution = "DABFILEMORSEAUTOCRY"

const startGame = () => {
    for (let i = 0; i < 25; i++) {
        if (boxes[i].id != "X") {
            boxes[i].addEventListener("click", function() {select(i)})
        }
    }
    document.addEventListener("keydown", input)
    restartBtn.addEventListener("click", restart)
    clues.textContent = text
}

function index(row, col) {
    return row * 5 + col
}

function select(i) {
    highlight(bg_color)
    if (Math.floor(i / 5) == row && i % 5 == col) {
        change_direction()
    }
    
    row = Math.floor(i / 5)
    col = i % 5
    highlight(word_color)
    boxes[i].style.backgroundColor = letter_color
    display_clue()
}

function display_clue() {
    if (dir == "down") {
        clueText.textContent = down[col]
    } else {
        clueText.textContent = across[row]
    }
}

function change_direction() {
    if (dir == "down") {
        dir = "across"
    } else {
        dir = "down"
    }
}

function highlight_row(color) {
    for (let i = 0; i < 5; i++) {
        var b = boxes[index(row, i)]
        if (b.id != "X") {
            b.style.backgroundColor = color
        }
    }
}

function highlight_col(color) {
    for (let i = 0; i < 5; i++) {
        var b = boxes[index(i, col)]
        if (b.id != "X") {
            b.style.backgroundColor = color
        }
    }
}

function highlight(color) {
    if (dir == "down") {
        highlight_col(color)
    } else {
        highlight_row(color)
    }
}

function next_row(r) {
    if (r + 1 >= 5 || boxes[index(r + 1, col)].id == "X") {
        return [row + 1, col]
    } else if (boxes[index(r + 1, col)].firstChild.textContent == "") {
        return [r + 1, col]
    } else {
        return next_row(r + 1)
    }
}

function next_col(c) {
    if (c + 1 >= 5 || boxes[index(row, c + 1)].id == "X") {
        return [row, col + 1]
    } else if (boxes[index(row, c + 1)].firstChild.textContent == "") {
        return [row, c + 1]
    } else {
        return next_col(c + 1)
    }
}

function next() {
    if (dir == "down") {
        return next_row(row)
    } else {
        return next_col(col)
    }
}

function prev() {
    if (dir == "down") {
        return [row - 1, col]
    } else {
        return [row, col - 1]
    }
}

function input(e) {
    var key = e.key
    if (key >= "a" && key <= "z") {
        write(key.toUpperCase())
    } else if (key == "Backspace") {
        del()
    }
}

function write(letter) {
    var b = boxes[index(row, col)]
    var nq = b.firstChild.textContent
    b.firstChild.textContent = letter
    
    var [r, c] = next()
    var i = index(r, c)
    if (r >= 0 && r < 5 && c >= 0 && c < 5 && boxes[i].id != "X") {
        select(i)
    }
    setTimeout(function() {check_solve(nq)}, 10)
}

function del() {
    var b = boxes[index(row, col)]
    if (b.firstChild.textContent != "") {
        b.firstChild.textContent = ""
    } else {
        var [r, c] = prev()
        var i = index(r, c)
        if (r >= 0 && r < 5 && c >= 0 && c < 5 && boxes[i].id != "X") {
            boxes[i].firstChild.textContent = ""
            select(i)
        }
    }
}

function restart() {
    for (const b of boxes) {
        b.firstChild.textContent = ""
    }
}

function check_solve(nq) {
    var s = ""
    for (const b of boxes) {
        if (b.id != "X" && b.firstChild.textContent == "") {
            return
        } else {
            s += b.firstChild.textContent
        }
    }

    if (s == solution) {
        alert("solved!")
    } else if (nq == "") {
        alert("not quite...")
    }
}

startGame()