// Funciones reutilizables

// Capitaliza: Primera letra en mayúscula, resto en minúscula
const formatText = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Valida que haya primer nombre y primer apellido
function isValidPerson(firstName, firstSurname) {
  return firstName !== "" && firstSurname !== "";
}

// Formatea nombre completo, nombre capitalizacion normal, apellidos en mayusculas
function formatName(fullName) {
  const parts = fullName.trim().split(/\s+/); //divido en palabras y elimino espacios extra
  if (parts.length < 2) return "Nombre inválido";

  let nameParts = [];
  let surnameParts = [];

  // casos posibles segun la cantidad de palabras
  if (parts.length === 2) {
    nameParts = [parts[0]]; // primer nombre
    surnameParts = [parts[1]]; // primer apellido
  } else if (parts === 3) {
    nameParts = parts.slice(0, 2); // tomo elementos desde el 0 al 2 sin incluir el 2, agrego el 2do nombre
    surnameParts = [parts[2]]; // primer apellido
  } else {
    nameParts = parts.slice(0, parts.length - 2); // los dos nombres
    surnameParts = parts.slice(-2); //dos ultimos apellidos
  }

  // formateo los nombres
  let formattedNames = [];
  for (let i = 0; i < nameParts.length; i++) {
    const formatted = formatText(nameParts[i]);
    formattedNames.push(formatted); //agrego el o los nombres
  }

  // formateo los apellidos
  let formattedSurnames = [];
  for (let i = 0; i < surnameParts.length; i++) {
    const formatted = surnameParts[i].toUpperCase(); // apellidos en mayus
    formattedSurnames.push(formatted); // agrego el o los apellidos
  }

  const fullParts = formattedNames.concat(formattedSurnames); // combino nombre y apellido
  return fullParts.join(" "); // uno todo separado por espacios
}

// Funcion para solicitar y aplicar color si hay coincidencias, recibe lista de elementos y array con valores coincidentes
function colorIfConfirmed(elements1, elements2, matches, tipo = "nombres") {
  if (matches.length > 0) { // verifica si hay coincidencia
    
    console.log(`Hay coincidencias en los ${tipo}.`);

    const color = prompt(
      `Se encontraron ${tipo} iguales. Ingresá un color para resaltarlos (por ejemplo: red, blue, #ff0000):`
    )

    const allElements = [...elements1, ...elements2] // junto ambos arrays

    // aplico color a los elementos que coinciden
    allElements.forEach(el => {
        const value = el.tagName === "INPUT" ? el.value.trim() : el.textContent.trim() //pregunto si es lista o form
        if (matches.includes(formatText(value))) {
            el.style.color = color
        }
    })

  } else {
    console.log(`No hay coincidencias en los ${tipo}.`);
  }
}

// Espera a que el DOM este cargado
document.addEventListener("DOMContentLoaded", () => {

    const title = document.title;
    console.log(title);

    // MANEJO DE FORMULARIO

    // Botones
    const btn1 = document.getElementById("btnCompare1")
    const btn2 = document.getElementById("btnCompare2")

    let formData1 = {}, formData2 = {}

    // Boton del primer integrante - capturo los valores de los inputs, escribo la funcion dentro del evento
    btn1.addEventListener("click", () => {

        // capturo los valores
        const f1 = document.getElementById("formFirstName1");
        const s1 = document.getElementById("formSecondName1");
        const a1 = document.getElementById("formFirstSurname1");
        const b1 = document.getElementById("formSecondSurname1")

        // formateo valores
        const firstName1 = formatText(f1.value.trim())
        const secondName1 = formatText(s1.value.trim())
        const firstSurname1 = formatText(a1.value.trim())
        const secondSurname1 = formatText(b1.value.trim())

        // valido primer integrante
        if (!isValidPerson(firstName1, firstSurname1)) {
            alert("El primer integrante debe tener al menos un nombre y un apellido.")
            return
        }

        // Armo y muestro el nombre completo usando la funcion 
        const fullName1 = `${firstName1} ${secondName1} ${firstSurname1} ${secondSurname1}`.replace(/\s+/g, ' ').trim();
        console.log(`Integrante 1: ${formatName(fullName1)}`)

        // Guardo los datos en el objeto para luego comparar
        formData1 = {firstName1, secondName1, firstSurname1, secondSurname1}
    })

    // Boton del primer integrante - capturo los valores de los inputs, escribo la funcion dentro del evento
    btn2.addEventListener("click", () => {

        const f2 = document.getElementById("formFirstName2")
        const s1 = document.getElementById("formSecondName2")
        const a1 = document.getElementById("formFirstSurname2")
        const b1 = document.getElementById("formSecondSurname2")

        const firstName2 = formatText(f2.value.trim())
        const secondName2 = formatText(s1.value.trim())
        const firstSurname2 = formatText(a1.value.trim())
        const secondSurname2 = formatText(b1.value.trim())

        if (!isValidPerson(firstName2, firstSurname2)) {
            alert("El segundo integrante debe tener al menos un nombre y un apellido.")
            return
        }

        const fullName2 = `${firstName2} ${secondName2} ${firstSurname2} ${secondSurname2}`.replace(/\s+/g, ' ').trim();
        console.log(`Integrante 1: ${formatName(fullName2)}`)

        formData2 = {firstName2, secondName2, firstSurname2, secondSurname2}
    })

    //
    // FALTA AGREGAR COMPARACION PARA FORM
    //


    // MANEJO DE LISTA -> DESCOMENTAR ESTA PARTE
    // Selecciona los elementos <dd> por clase 
    // const member1Items = document.querySelectorAll("#member1 dd")
    // const member2Items = document.querySelectorAll("#member2 dd")

    // // Obtiene y formatea los datos del primer integrante
    // const firstName1 = formatText(document.getElementById("firstName1").textContent.trim())
    // const secondName1 = formatText(document.getElementById("secondName1").textContent.trim())
    // const firstSurname1 = formatText(document.getElementById("firstSurname1").textContent.trim())
    // const secondSurname1 = formatText(document.getElementById("secondSurname1").textContent.trim())

    
    // // Obtiene y formatea los datos del segundo integrante
    // const firstName2 = formatText(document.getElementById("firstName2").textContent.trim())
    // const secondName2 = formatText(document.getElementById("secondName2").textContent.trim())
    // const firstSurname2 = formatText(document.getElementById("firstSurname2").textContent.trim())
    // const secondSurname2 = formatText(document.getElementById("secondSurname2").textContent.trim())


    // // Validar que ambos integrantes tengan al menos un nombre y un apellido
    // const isPerson1Valid = isValidPerson(firstName1, firstSurname1)
    // const isPerson2Valid = isValidPerson(firstName2, firstSurname2)

    // if (!isPerson1Valid || ! isPerson2Valid) {
    //     alert("Ambas personas deben tener al menos un nombre y un apellido.")
    //     return
    // }

    // // Crea el nombre completo del primer y segundo integrante
    // const fullName1 = `${firstName1} ${secondName1} ${firstSurname1} ${secondSurname1}`.replace(/\s+/g, ' ').trim();
    // const fullName2 = `${firstName2} ${secondName2} ${firstSurname2} ${secondSurname2}`.replace(/\s+/g, ' ').trim();
 
    // // Muestra en consola
    // console.log("----");
    // console.log(`Integrante 1: "${formatName(fullName1)}"`);
    // console.log(`Integrante 2: "${formatName(fullName2)}"`);
    // console.log("----");

    // // Comparacion de nombres - PASO 4
    // const name1 = [firstName1, secondName1].filter(name => name !== "")
    // const name2 = [firstName2, secondName2].filter(name => name !== "")
    // const matchingNames = name1.filter(name => name2.includes(name))

    // colorIfConfirmed(member1Items, member2Items, matchingNames, "nombres")
    


    // // Comparacion de apellidos con confirmacion previa - PASO 5
    // const checkSurnames = confirm("¿Querés verificar si hay coincidencias en los apellidos?")

    // if (checkSurnames) {
    //     const surnames1 = [firstSurname1, secondSurname1]. filter(s => s !== "")
    //     const surnames2 = [firstSurname2, secondSurname2].filter(s => s !== "")
    //     const matchingSurnames = surnames1.filter(s => surnames2.includes(s))

    //     colorIfConfirmed(member1Items, member2Items, matchingSurnames, "apellidos")

    // }

})







