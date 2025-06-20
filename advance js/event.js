//  Event Bubbling :- child elements are clicked first, then parent elements

// Event Capturing :  parent elements are clicked first, then child elements

// Stop Propagation, Immediate Propagation, Prevent Default

/* Event bubling example
// Uncomment the code below to see event bubbling in action

var div = document.querySelector("div");

div.addEventListener("click", () => {
  console.log("Div clicked!");
});

var button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked!");
});
*/

/* Event capturing example
// Note: The third parameter in addEventListener is set to true for capturing 

var div = document.querySelector("div");

div.addEventListener(
  "click",
  () => {
    console.log("Div clicked!");
  },
  true
);

var button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked!");
},true);
*/
