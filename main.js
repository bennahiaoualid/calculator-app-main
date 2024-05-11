/* add keys to ui */
let sectionKeys = document.querySelector(".keys");
console.log(sectionKeys)
let arrKeys = [7,8,9,"DEL",4,5,6,"+",1,2,3,"-",".",0,"/","x","RESET","="];
arrKeys.forEach((element)=>{
    let keyHolder = document.createElement("button");
    if (element === "RESET" || element === "="){
        keyHolder.classList.add("class","grid-span-2")
    }
    if (element === "RESET" || element === "DEL"){
        keyHolder.classList.add("class","secondry-key")
    }
    if (element === "="){
        keyHolder.classList.add("class","egal-key")
    }
    keyHolder.appendChild(document.createTextNode(element));
    sectionKeys.appendChild(keyHolder);
})

/* set them toggle options */
let themeBtns = document.querySelectorAll(".radio-btn");
themeBtns.forEach((element)=>{
    element.addEventListener("click",(event)=>{
        document.querySelector(".checked").classList.remove("checked");;
        event.currentTarget.classList.add("checked");
        let id = event.currentTarget.id;
        switch(id){
            case "theme-1":
                document.body.removeAttribute("class");
                break;
            default:
                document.body.setAttribute("class",id);
        }
    })
})

/* set up calculation */
var screen = document.querySelector("#screen p");
var calcObj = {
    preValue : 0,
    op : null,
    sequenceOpearation : false,// this var is true if i press another op when i already have one without press egal button
    rest(){
    preValue = 0;
    op = null;
    sequenceOpearation = false;
    }
}
let buttons = document.querySelectorAll(".keys button");
buttons.forEach((element)=>{
    element.addEventListener("click",(event)=>{
        calc(event.currentTarget.innerHTML);
    })
})

function calc(value){
    let currentContent = screen.textContent;
    switch(value){
        case "DEL":
            screen.innerHTML = currentContent.length == 1? 0 : currentContent.slice(0,-1);
            break;
        case "RESET":
            screen.innerHTML = 0;
            calcObj.rest();
            break;
        case "=":
        case "x":
        case "-":
        case "+":
        case "/":
            if (calcObj.op === null || calcObj.op === "="){
                calcObj.op = value;
                calcObj.preValue = parseFloat(currentContent);
                screen.innerHTML = 0;
            }
            else{
                let res = simpleCalc(calcObj.preValue,parseFloat(currentContent),calcObj.op
                    )
                    calcObj.sequenceOpearation = true;
                if (!res) {
                    window.alert("can not devide on zero");
                    res = 0;
                    value = null;
                    calcObj.sequenceOpearation = false;
                }
                screen.innerHTML = res;
                calcObj.op = value;
                
                calcObj.preValue =res;
            }
            break;
        case ".":
            break;
        default:
            if (calcObj.op !== null && calcObj.sequenceOpearation){
                screen.innerHTML = value;
                calcObj.sequenceOpearation = false;
                if (calcObj.op === "=") calcObj.preValue = 0;
            }
            else{
                screen.innerHTML = currentContent == 0 ? value: currentContent + value;
            }       
    }
}

function simpleCalc(a,b,op){
    switch(op){
        case "+":
            return a+b
        case "-":
            return a - b
        case "x":
            return a * b
        case "/":
            return b==0? false: a/b;
    }
}
