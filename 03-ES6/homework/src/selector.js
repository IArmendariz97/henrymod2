var traverseDomAndCollectElements = function (sabeBuscar, startEl = document.body) {
  var resultSet = []; 

  // if (typeof startEl === "undefined") {
  //   startEl = document.body;
  // }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(sabeBuscar(startEl)) resultSet.push(startEl)

  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(sabeBuscar, startEl.children[i])
    resultSet = [...resultSet, ...result]
  }

  // for (const i of startEl.children) {
    
  // }

  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // "#id"
  if (selector[0] === "#") return "id";
  // .class
  if (selector[0] === ".") return "class";
  // div.class
  if (selector.includes(".")) return "tag.class";
  // div
  else return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector); // "id", "class", "tag.class", "tag"
  var matchFunction;
  if (selectorType === "id") {
    // #square
    matchFunction = function (elementoDOM) {
      // elementoDOM.id === selecto.slice(1)
      // `#${elementoDOM.id}` === selector

      // if ("#" + elementoDOM.id === selector) return true;
      // else return false;​
      return "#" + elementoDOM.id === selector;
    };
  } else if (selectorType === "class") {
    // ".square"
    matchFunction = function (elementoDOM) {
      for (let i = 0; i < elementoDOM.classList.length; i++) {
        if ("." + elementoDOM.classList[i] === selector) return true;
      }
      // si sale del for no encontró la clase por ende
      return false;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = function (elementoDOM) {
      // selector: "div.square"
      // elementoDOM ----> <div  id="id" class="square">​
      let [tag, clase] = selector.split("."); //  tag =  "div" - clase = "square"

      // let encontrarTag = matchFunctionMaker(tag)(elementoDOM) // true o false
      // let encontrarClase = matchFunctionMaker("." + clase)(elementoDOM) // true o false

      // return encontrarTag && encontrarClase

      return (
        matchFunctionMaker(tag)(elementoDOM) &&
        matchFunctionMaker("." + clase)(elementoDOM)
      );
    };
  } else if (selectorType === "tag") {
    matchFunction = function (elementoDOM) {
      // me doy cuenta si es un tag especifico o no
      return elementoDOM.tagName === selector.toUpperCase();
    };
  }
  return matchFunction;
};

let funcion = matchFunctionMaker("div.square");

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector); // FUNCION QUE SABE BUSCAR EN BASE AL SELECTOR
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

// $("div.square"); // deberia devolver un < id="id" />
// matchFunctionMaker; // devolvia una funcion en base al selector
// traverseDomAndCollectElements; // (recorre el DOM)
