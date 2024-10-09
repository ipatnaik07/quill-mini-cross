let clueText = document.getElementById("clue")
let restartBtn = document.getElementById("restartBtn")
let boxes = Array.from(document.getElementsByClassName("box"))

row = 2
col = 2
dir = "down"
bg_color = "#37505C"
letter_color = "#5099ad"
word_color = "#232d2e"

down = ["5D: See 5-Across",
    "4D: What food choices are on",
    "1D: Not well",
    "2D: Like an octagon or rock music?",
    "3D: Can be worn or put into the ground"
]

across = ["1A: Risk or wager",
    "4A: Created",
    "5A: With 5-Down, Proof School mascot",
    "6A: The one and ____",
    "7A: Generic male"
]

solution = "BETMADEHEDGEONLYGUY"

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    document.addEventListener("keydown", input)
    restartBtn.addEventListener('click', restart)
}

function index(row, col) {
    return row * 5 + col
}

function boxClicked(e) {
    const id = e.target.id
    if (id != "X") {
        select(parseInt(id))
    }
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

function next() {
    if (dir == "down") {
        return [row + 1, col]
    } else {
        return [row, col + 1]
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
    var nq = b.textContent
    b.textContent = letter
    
    var [r, c] = next()
    var i = index(r, c)
    if (r >= 0 && r < 5 && c >= 0 && c < 5 && boxes[i].id != "X") {
        select(i)
    }
    setTimeout(function() {check_solve(nq)}, 100)
}

function del() {
    var b = boxes[index(row, col)]
    if (b.textContent != "") {
        b.textContent = ""
    } else {
        var [r, c] = prev()
        var i = index(r, c)
        if (r >= 0 && r < 5 && c >= 0 && c < 5 && boxes[i].id != "X") {
            boxes[i].textContent = ""
            select(i)
        }
    }
}

function restart() {
    for (const b of boxes) {
        b.textContent = ""
    }
}

function check_solve(nq) {
    var s = ""
    for (const b of boxes) {
        if (b.id != "X" && b.textContent == "") {
            return
        } else {
            s += b.textContent
        }
    }

    if (s == solution) {
        alert("solved!")
    } else if (nq == "") {
        alert("not quite...")
    }
}

startGame()