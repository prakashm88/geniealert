/* This script and many more are available free online at
The JavaScript Source!! https://github.com/prakashm88/geniealert
Created by: Prakash Mohankumar | http://itechgenie.com/ */

// constants to define the title of the alert and button text.
var ALERT_TITLE ;
var IMAGE_URL ;

function doNothing()
{
    window.status = "Do Nothing function called"  ;
}

// removes the custom alert from the DOM
function removeCustomAlert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

function createCustomAlert(alertText, buttonsNames, buttonCallFuncs) {
  // shortcut reference to the document object
  d = document;

// if the modalContainer object already exists in the DOM, bail out.
  if(d.getElementById("modalContainer")) return;

  // create the modalContainer div as a child of the BODY element
  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
   // make sure its as tall as it needs to be to overlay all the content on the page
  mObj.style.height = document.documentElement.scrollHeight + "px";

  // create the DIV that will be the alert 
  alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";

  // MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
  if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
  // center the alert box
  alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";

headerContainer = alertObj.appendChild(d.createElement("div"));
headerContainer.id = "headerContainer" ;
hLeft = headerContainer.appendChild(d.createElement("div"));
hLeft.id = "hLeftCorner" ;
hRight = hLeft.appendChild(d.createElement("div"));
hRight.id = "hRightCorner" ; 
hMids = hRight.appendChild(d.createElement("div"));
hMids.id = "hMiddle" ; 

  // create an H1 element as the title bar
  h1 = hMids.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(ALERT_TITLE));

    bodyCont = alertObj.appendChild(d.createElement("div"));
	bodyCont.id = "bodyContainer" ;
	
	  imageURLs =  "url('"+IMAGE_URL+"')" ; 
  bodyCont.style.backgroundImage = imageURLs;
	
  // create a paragraph element to contain the txt argument
  msg = bodyCont.appendChild(d.createElement("p"));
  msg.innerHTML = alertText;
  
  btnDiva = bodyCont.appendChild(d.createElement("div"));
  btnDiva.id = "btnDiv";
  btnDiva.align= "center" ;

	for(var count=0; count < buttonsNames.length; count++)
	{
		btn = btnDiva.appendChild(d.createElement("a"));
		btn.id = buttonsNames[count];
		btn.setAttribute("class", "alertButtons");
		btn.appendChild(d.createTextNode(buttonsNames[count]));
		functionName = buttonCallFuncs[count] ;
		btn.href = "javascript:" + functionName + ";removeCustomAlert();" ;
		
	}	
}

// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
if(document.getElementById) {
  window.alert = function(alertText, buttonsNames, buttonCallFuncs, alertBoxTitle, imageURL) {
      if(alertText)
	  {
		 if(buttonsNames==null && buttonCallFuncs==null )
		  {			 
			  buttonsNames = ["OK"] ;
			  buttonCallFuncs = ["doNothing()"] ;
		  }	
		  if(buttonsNames==null || buttonCallFuncs==null) {
		  window.status = "Button names length and Functions does not match."  ;
		  return false;
		  }
		  else if(buttonsNames.length != buttonCallFuncs.length) {
		  window.status = "Button names length and Functions does not match."  ;
  		return false;
		  }
	  }
	  else 
	  {
		  window.status = "Enter Proper Alert Message"  ;
		  return false ;
	  }
	  
if( alertBoxTitle == null )
{
	ALERT_TITLE = "Alert!";
}
else
{
	ALERT_TITLE = alertBoxTitle ;
}

if(imageURL == null)
{
	IMAGE_URL = "images/info.png" ;
}
else
{
	IMAGE_URL = imageURL ;
}

createCustomAlert(alertText, buttonsNames, buttonCallFuncs, imageURL);
	}
}
