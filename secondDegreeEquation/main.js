
let text = document.getElementById("returnedSolution")

document.getElementById("solution").onclick = function() {
    let a = document.getElementById("a-value").value,
    b = document.getElementById("b-value").value,
    c = document.getElementById("c-value").value,
    delta = b**2 - 4*a*c
    console.log(delta)
    if (a==0) {
        text.textContent = "the number A value cannot be null, try again"
    } else if (delta > 0) {
        x1 = (b+Math.sqrt(delta))/(2*a)
        x2 = (b-Math.sqrt(delta))/(2*a)
        text.textContent = "this equation has two real solutions which are : x1 = " + x1 + " and x2 = " + x2
    } else if (delta == 0) {
        x = b/(2*a)
        text.textContent = "this equation has one only real solution which is : x = " + x
    } else if (delta < 0) {
        text.textContent = "this equation has no real solutions"
    }
}

document.getElementById("reset").onclick = function() {
    document.getElementById("a-value").value = 0
    document.getElementById("b-value").value = 0
    document.getElementById("c-value").value = 0
    text.textContent = ""
}